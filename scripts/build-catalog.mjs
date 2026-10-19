/**
 * The catalogue the shop reads.
 *
 *   node scripts/scrape-akey-catalog.mjs     every product page, once
 *   node scripts/scrape-akey-sections.mjs    which shelves each one stands on
 *   node scripts/classify-akey.mjs           what each one is
 *   node scripts/build-catalog.mjs           -> src/lib/catalog.json
 *
 * This step does no deciding. The category was settled in classify-akey.mjs
 * against A-Key's own filing, and the Dutch copy is composed in
 * product-copy.mjs from the facts on their page. What is left here is
 * assembly: price, photo, specification table, and the three companion files
 * the shop's menu and brand pages read.
 *
 * The rule the whole chain is built on: a field is either something A-Key
 * states or it is null. Nothing is inferred to fill a gap, because a filled
 * gap reads exactly like a fact to the customer who acts on it.
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, mkdirSync, linkSync, copyFileSync } from 'fs';
import path from 'path';

/** The supplier's own name: never shown to a customer. */
const IS_SUPPLIER = (brand) => /^a[\s-]?key$/i.test(brand ?? '');
import { CATEGORIES } from './taxonomy.mjs';
import {
  fitmentOf,
  crossReferences,
  cuttingTools,
  dutchTitle,
  descriptionHtml,
  directAnswer,
  metaDescription,
  spellMake,
  tidyFrequency,
  tidyChip,
  chipsIn,
  buttonCount,
  buttonLabel,
  tidyBlade,
  tidyArticleNumber,
} from './product-copy.mjs';
import { translateDescription } from './accessory-copy.mjs';

const RAW = path.join(process.cwd(), 'src/data/akey-catalog-raw.json');
const CLASSIFIED = path.join(process.cwd(), 'src/data/akey-classified.json');
const KEYCASE_PHOTOS = path.join(process.cwd(), 'src/data/keycase-photos.json');
const ACCESSFOBS_MATCHES = path.join(process.cwd(), 'src/data/accessfobs-photo-matches.json');
/* Checked by eye, side by side with A-Key's own photo — last, so it wins. */
const ACCESSFOBS_VERIFIED = path.join(process.cwd(), 'src/data/accessfobs-photo-verified.json');
/* autosleutels.info (WVO Trading, with permission) and AccessFobs — same housing checked by eye;
   adds their model list and, where ours is watermarked, their photo. */
const AUTOSLEUTELS = path.join(process.cwd(), 'src/data/autosleutels-matches.json');
const autosleutels = existsSync(AUTOSLEUTELS) ? JSON.parse(readFileSync(AUTOSLEUTELS, 'utf8')) : {};
/* Battery shared by every confirmed sibling (same make, type, buttons, blade; ≥2, unanimous). */
const BATTERY_FAMILY = existsSync(path.join(process.cwd(), 'src/data/battery-by-family.json')) ? JSON.parse(readFileSync(path.join(process.cwd(), 'src/data/battery-by-family.json'), 'utf8')) : {};
/* auto-sleutel.nl (with permission): model list, years and battery only — never photos or text. */
const AUTOSLEUTEL_NL = path.join(process.cwd(), 'src/data/autosleutel-nl-matches.json');
const FITMENT_MANUAL = path.join(process.cwd(), 'src/data/fitment-manual.json');
const extraFitment = (file) => Object.entries(existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')) : {}).filter(([k]) => k !== '_doc');
for (const [slug, e] of [...extraFitment(AUTOSLEUTEL_NL), ...extraFitment(FITMENT_MANUAL)]) {
  const a = (autosleutels[slug] ??= { fitment: [] });
  a.fitment = [...(a.fitment ?? []), ...e.fitment];
  a.battery ??= e.battery;
}
/* Wrong make, merged or misspelt model names in either supplier's list — fixed in one place. */
const MODEL_FIXES = JSON.parse(readFileSync(path.join(process.cwd(), 'src/data/model-fixes.json'), 'utf8'));
const BMW_SERIES = /^([1-8]) Series( [EFG]\d\d)?$/;
/*
 * The supplier's leftover German, as the few facts a buyer needs — in Dutch.
 * Everything else (example-image captions, trademark boilerplate, half lines)
 * is dropped: no German is ever shown.
 */
const NOTE_RULES = [
  [/ohne Schl[üu]sselblatt geliefert/i, () => 'Geleverd zonder sleutelblad; het blad bestelt u apart.'],
  [/Rohling.*verschieden.*Anbieter|verschieden.*Anbieter ersetzt/i, () => 'De sleutelbaard kan van een andere fabrikant komen dan op de foto.'],
  [/(?:Packungs)?[Ii]nhalt:\s*([\d.,]+)\s*St[üu]ck/, (m) => { const n = Number(m[1].replace(',', '.')); return `Inhoud: ${n} ${n === 1 ? 'stuk' : 'stuks'}.`; }],
  [/NUR der Notschl[üu]ssel ohne Geh[äa]use/i, () => 'Alleen de noodsleutel, zonder behuizing.'],
  [/Kopfform.*abweichen/i, () => 'De vorm van de kop kan per fabrikant iets afwijken.'],
  [/ausschlie[ßs]lich f[üu]r .*Fahrzeugmarke/i, () => 'Werkt alleen voor het automerk waarvoor hij is aangemaakt.'],
  [/vom Umtausch ausgeschlossen|nach Nutzung nicht mehr zur[üu]ck/i, () => 'Na een (poging tot) inleren is de sleutel niet meer te verkopen: retourneren kan, maar u krijgt dan niets terug.'],
  [/Kein .*Original/i, () => 'Geen origineel onderdeel van de autofabrikant (aftermarket).'],
  [/Unterst[üu]tzte Chiptypen:\s*(.+)/i, (m) => `Ondersteunde chiptypes: ${m[1].trim()}.`],
  [/Unterst[üu]tzt Tasten und Frequenz/i, () => 'Knoppen en frequentie zijn in te stellen.'],
  [/Leergeh[äa]use f[üu]r Wegfahrsperre/i, () => 'Lege behuizing voor de transponderchip van de startonderbreker.'],
  [/Mit (\w+) (4D|ID\d+|8A|4A)-?Chip/i, (m) => `Met ${m[1]} ${m[2]}-chip.`],
];
function dutchNotes(lines) {
  const out = [];
  for (const line of lines) for (const [re, say] of NOTE_RULES) { const m = line.match(re); if (m) { const t = say(m); if (!out.includes(t)) out.push(t); break; } }
  return out.length ? out : null;
}

function fixModels(list) {
  const out = [];
  for (let f of list) {
    if (!f.model) { out.push(f); continue; }
    if (f.from && f.to && f.to !== 9999 && f.from > f.to) f = { ...f, from: null, to: null }; // unreadable range: say nothing
    const model = f.make === 'BMW' ? f.model.replace(BMW_SERIES, (_, n, code = '') => `${n}-serie${code}`) : f.model;
    const to = MODEL_FIXES[`${f.make}|${model}`] ?? [model];
    for (const t of to) {
      const [make, raw] = t.includes('|') ? t.split('|') : [f.make, t];
      const m = make === 'Mercedes-Benz' ? raw.replace(/^([A-Z]{1,3})-Class\b/, '$1-Klasse') : raw; // Dutch: A-Klasse
      // One row per car: a row with years replaces the same model without, a second yearless row is dropped.
      const known = (r) => r.from > 0 || (r.to && r.to < 9999);
      const i = out.findIndex((g) => g.make === make && g.model?.toLowerCase() === m.toLowerCase() && (!known(g) || !known(f) || (g.from === f.from && g.to === f.to)));
      if (i < 0) out.push({ ...f, make, model: m });
      else if (!known(out[i]) && known(f)) out[i] = { ...f, make, model: m };
    }
  }
  list.splice(0, list.length, ...out);
}
// Originals keep their source names here and are never served; see "photos under neutral names" below.
const IMAGE_DIR = path.join(process.cwd(), 'assets/products');
const PHOTO_PICKS = existsSync(path.join(process.cwd(), 'src/data/photo-picks.json')) ? JSON.parse(readFileSync(path.join(process.cwd(), 'src/data/photo-picks.json'), 'utf8')) : {};
const WM_SCORE = existsSync(path.join(process.cwd(), 'src/data/watermark-scores.json')) ? JSON.parse(readFileSync(path.join(process.cwd(), 'src/data/watermark-scores.json'), 'utf8')) : {};

/*
 * Clean AccessFobs photos swapped in for specific A-Key products whose own
 * photo carries their watermark — see extract-keycase-photos.mjs and
 * match-accessfobs-photos.mjs for how these maps are built and, just as
 * importantly, how conservatively: a wrong photo is worse than a watermarked
 * one. Only high-confidence matches are ever applied here; keycase-photos.json
 * carries no confidence field because every one of its matches already
 * requires a blade match plus make or button agreement.
 */
function loadPhotoOverrides() {
  const overrides = new Map();
  for (const file of [KEYCASE_PHOTOS, ACCESSFOBS_MATCHES, ACCESSFOBS_VERIFIED, AUTOSLEUTELS, path.join(process.cwd(), 'src/data/photo-overrides-extra.json')]) {
    if (!existsSync(file)) continue;
    const map = JSON.parse(readFileSync(file, 'utf8'));
    for (const [slug, entry] of Object.entries(map)) {
      // Only photos someone compared by eye with the supplier's: an automatic match on blade + make + buttons
      // put an old oval Fiat key on a new rectangular one (FIR130Or). A wrong photo sells the wrong part.
      if (!entry.image || !entry.verified) continue;
      overrides.set(slug, entry.image);
    }
  }
  return overrides;
}
const photoOverrides = loadPhotoOverrides();

const OUT = path.join(process.cwd(), 'src/lib/catalog.json');
const BRANDS_OUT = path.join(process.cwd(), 'src/lib/brands.json');
const NAV_OUT = path.join(process.cwd(), 'src/lib/navCounts.json');
const VEHICLES_OUT = path.join(process.cwd(), 'src/lib/vehicleSpecs.json');

for (const file of [RAW, CLASSIFIED]) {
  if (!existsSync(file)) {
    console.error(`Missing ${path.relative(process.cwd(), file)} — see the header of this file for the order.`);
    process.exit(1);
  }
}

const raw = JSON.parse(readFileSync(RAW, 'utf8')).products;
const classification = JSON.parse(readFileSync(CLASSIFIED, 'utf8'));

/* ── photos ──────────────────────────────────────────────────────────────
 *
 * The files on disk are named akey_<n>_<hash>[_<i>].jpg, where the hash is the
 * first eight characters of the md5 of the product page URL. The number in
 * front is a download sequence and changes between runs, so the hash is the
 * only stable key — matching on it is what lets a re-scrape keep every photo
 * already downloaded.
 *
 * Two sets are on disk. The suffixed ones (_0, _1) came from A-Key's 320px
 * variant, which carries no watermark; the unsuffixed ones are the 800px
 * variant with their logo printed across the middle of the product. The clean
 * ones win, at the resolution that costs.
 * ─────────────────────────────────────────────────────────────────────── */

import { createHash } from 'crypto';

const urlHash = (url) => createHash('md5').update(url).digest('hex').slice(0, 8);

const photosByHash = new Map();
for (const file of readdirSync(IMAGE_DIR)) {
  const hit = file.match(/^akey_\d+_([0-9a-f]{8})(?:_(\d+))?\.(?:jpg|jpeg|png|webp)$/i);
  if (!hit) continue;
  const [, hash, index] = hit;
  if (!photosByHash.has(hash)) photosByHash.set(hash, { clean: [], watermarked: [] });
  const entry = photosByHash.get(hash);
  if (index === undefined) entry.watermarked.push(file);
  else entry.clean.push({ index: Number(index), file });
}

/*
 * The "clean" filename suffix turned out not to be reliable — many
 * `_<i>`-suffixed files still carry the watermark, and a single product's own
 * gallery routinely mixes genuinely clean and watermarked photos regardless
 * of suffix (679 products do). Checked pixel-by-pixel instead, once, by
 * flag-watermarked-photos.mjs. Filtering happens per product, never across
 * products — this only ever drops a worse photo of the SAME item in favour of
 * a better one already downloaded for it, so there is no risk of the wrong
 * part being shown.
 */
const WATERMARK_FLAGS_FILE = path.join(process.cwd(), 'src/data/watermark-flags.json');
const watermarkFlags = existsSync(WATERMARK_FLAGS_FILE)
  ? JSON.parse(readFileSync(WATERMARK_FLAGS_FILE, 'utf8'))
  : {};

function preferUnwatermarked(files) {
  const clean = files.filter((f) => !watermarkFlags[f]);
  return clean.length ? clean : files;
}

function photosFor(product) {
  const entry = photosByHash.get(urlHash(product.url));
  if (!entry) return [];
  if (entry.clean.length) {
    const ordered = entry.clean.sort((a, b) => a.index - b.index).map((p) => p.file);
    return preferUnwatermarked(ordered).map((f) => `/images/products/${f}`);
  }
  return preferUnwatermarked(entry.watermarked).map((f) => `/images/products/${f}`);
}

/* ── pricing ─────────────────────────────────────────────────────────── */

/**
 * A-Key's listed price includes German VAT (19% MwSt); what we pay is the net.
 * The shelf price is set in src/lib/catalog.ts from that net, so it is
 * converted here and nowhere else.
 *
 * A cost of exactly 1.00 is their placeholder for "ask us", not a price:
 * 157 articles carried it, and every one of them would have gone on the shelf
 * at €2,95 for a part that costs us more than that.
 */
const DE_VAT = 0.19;
const costOf = (price) => {
  if (price == null || price === 1) return null;
  const net = Math.round((price / (1 + DE_VAT)) * 100) / 100;
  return net === 1 ? null : net; // €1,19 gross is the same placeholder
};

/* ── the specification table ─────────────────────────────────────────── */

const SPEC_LABELS = [
  ['Frequentie', (p) => tidyFrequency(p.frequency)],
  ['Transponder', (p) => chipOf(p)],
  ['Aantal knoppen', (p) => buttonLabel(p.buttons) ?? buttonsOf(p)?.toString() ?? null],
  ['Sleutelbaard', (p) => tidyBlade(p.blade)],
  ['Sleutelrohling', (p) => p.blank],
  ['Printplaat', (p) => p.boardNumber],
  ['Kleur', (p) => translateColour(p.colour)],
  ['Materiaal', (p) => translateMaterial(p.material)],
  ['Artikelnummer', (p) => tidyArticleNumber(p.articleNumber)],
];

const COLOURS = {
  schwarz: 'zwart', weiss: 'wit', weiß: 'wit', silber: 'zilver', grau: 'grijs',
  blau: 'blauw', rot: 'rood', gelb: 'geel', grün: 'groen', braun: 'bruin',
  chrom: 'chroom', gold: 'goud', orange: 'oranje', transparent: 'transparant',
};

// "schwarz / silber" → "zwart / zilver"
const translateColour = (value) =>
  value ? value.split(/\s*\/\s*/).map((c) => COLOURS[c.trim().toLowerCase()] ?? c.trim()).join(' / ') : null;

const translateMaterial = (value) => {
  if (!value) return null;
  return value
    .replace(/hochwertiger?\s+Kunststoff/i, 'hoogwaardig kunststof')
    .replace(/\bKunststoff\b/i, 'kunststof')
    .replace(/\bMetall\b/i, 'metaal')
    .replace(/\bMessing\b/i, 'messing')
    .replace(/\bZink(druckguss)?\b/i, 'zink')
    .replace(/\bStahl\b/i, 'staal')
    .replace(/ohne Emblem/i, 'zonder embleem')
    .replace(/mit Emblem/i, 'met embleem');
};

// A-Key's spec fields bleed into each other ("schwarz Material: hochwertiger Kunststoff"):
// keep the part before the next label, drop a value that is only another label.
const NEXT_LABEL = /\s*\b(?:Material|Farbe|Anzahl der Tasten|Produkttyp|Funkeinheit|Transponder)\s*:.*$/is;
// The button field, else the count A-Key writes in the title ("3 Tasten"), else in the text.
const BUTTONS_IN = /\b([1-6])[\s-]?(?:Tasten|Knöpfe|btn|buttons?)\b/i;
const buttonsOf = (product) =>
  buttonCount(product.buttons) ??
  (Number(product.title?.match(BUTTONS_IN)?.[1] ?? (product.description ?? []).join(' ').match(BUTTONS_IN)?.[1]) || null);

// The chip field first; for keys and chips whose field is empty, the type named in A-Key's title or text.
const CHIP_CATEGORIES = new Set(['afstandsbedieningen', 'smart-keys', 'transpondersleutels', 'transponders', 'printplaten', 'universal-remotes', 'motorsleutels']);
function chipOf(product, filed = classification.filed[product.slug]) {
  const own = tidyChip(product.transponder);
  if (own || /^\s*ohne\s*$/i.test(product.transponder ?? '')) return own;
  return CHIP_CATEGORIES.has(filed?.category) ? chipsIn(product.title, product.description ?? [], product.frequency ?? '') : null;
}

const specsFor = (p) =>
  SPEC_LABELS.map(([label, read]) => [label, read(p)])
    .map(([label, value]) => [label, value && dutchify(String(value).replace(NEXT_LABEL, '').replace(/\s*\bKein\b.*$/is, '').replace(/[,;]\s*$/, ''))])
    .filter(([, value]) => value && !STILL_GERMAN.test(value));

/**
 * "Accessoire (DRS3050)" says nothing. For articles the copy writer could only
 * file by code, A-Key's own name (the slug) says what it is: translate that.
 */
const up = (x) => x.toUpperCase();
const NAMED = [
  [/^v(\d{3})-(\d\d)(\d\d)-sonderposten$/, (m) => `Varta V${m[1]} knoopcelbatterij (THT ${m[2]}/${m[3]})`],
  [/^(?:varta-)?v(\d{2,3})(ga|a|pxl)?(?:-.*)?$/, (m) => `Varta V${m[1]}${up(m[2] ?? '')} knoopcelbatterij`],
  [/^v23ga-12v$/, () => 'Varta V23GA batterij 12 V'],
  [/^cr(\d{4})(?:-.*)?$/, (m) => `CR${m[1]} lithium knoopcelbatterij 3 V`],
  [/^cr1-3n/, () => 'CR1/3N lithium fotobatterij 3 V'],
  [/^lr1$/, () => 'Varta LR1 (N) batterij 1,5 V'],
  [/^(?:10-)?rayovac(\d+)?$|^(\d+)-rayovac$/, (m) => `Rayovac ${m[1] ?? m[2] ?? '10'} hoortoestelbatterij`],
  [/^aaaa-blister$/, () => 'AAAA batterijen (blister)'],
  [/^(aaa?)-longlife-power-4er-blister-varta$/, (m) => `Varta Longlife Power ${up(m[1])} batterijen (4 stuks)`],
  [/^v4906b|^v4903b/, (m) => `Varta ${m[0].includes('4906') ? 'AA' : 'AAA'} batterijen (blister)`],
  [/^v4914b/, () => 'Varta C batterijen (2 stuks)'],
  [/^v4920b/, () => 'Varta D batterij'],
  [/^transponder-texas-(\w+)$/, (m) => `Texas ${up(m[1])} transponderchip`],
  [/^transponder-(.+)$/, (m) => `Transponderchip ${up(m[1].replace(/-/g, ' '))}`],
  [/^kristall-135600-mhz$/, () => 'Kristal 13,56 MHz'],
  [/^tpx-2$/, () => 'Transponderchip TPX-2'],
  [/^transpondergehaeuse-universal$/, () => 'Universele transponderbehuizing'],
  [/^transponderschluessel-universal$/, () => 'Universele transpondersleutel'],
  [/^(hu66a?t)-leergehaeuse/, (m) => `Lege transpondersleutel ${up(m[1])} voor VW, Skoda en Seat`],
  [/^schalter-(sw\d+)$/, (m) => `Microschakelaar ${up(m[1])} voor sleutelprintplaat`],
  [/^antenne-(ac\d+)$/, (m) => `Antennespoel ${up(m[1])} voor sleutelprintplaat`],
  [/^100-schluesselschilder-(.*?)-?zum-beschriften/, (m) => `Sleutellabels om te beschrijven${m[1] ? `, ${({ bunt: 'gekleurd', orange: 'oranje', pink: 'roze', gruen: 'groen', gelb: 'geel', 'weiss-transparent': 'wit/transparant', lila: 'paars', blau: 'blauw', 'mit-ring': 'met ring' })[m[1]] ?? m[1]}` : ''} (100 stuks)`],
  [/^sr-\d+-schluesselringe-(?:o-)?(\d+)-mm(-packung)?/, (m) => `Sleutelringen ${m[1]} mm${m[2] ? ' (100 stuks)' : ''}`],
  [/^(kennkappen|kennringe|kennkappen-und-kennringe)-/, (m) => `${m[1] === 'kennringe' ? 'Sleutelringetjes' : 'Sleutelkapjes'} gekleurd (200 stuks)`],
  [/^schluesselanhaenger-(hellblau|dklblau)/, (m) => `Sleutelhangers ${m[1] === 'hellblau' ? 'lichtblauw' : 'donkerblauw'} (200 stuks)`],
  [/^hotel-schluesselanhaenger-plastik-(\d+)/, (m) => `Hotelsleutelhangers kunststof (${m[1]} stuks)`],
  [/^druckverschlussbeutel/, () => 'Gripzakjes 30 × 50 mm (100 stuks)'],
  [/^aufbewahrungsbox-fuer-schluesselblaetter$/, () => 'Opbergbox voor sleutelbaarden'],
  [/^(?:\d+-pointed-)?ersatzstift-fuer-stiftentferner-(barfute|zange)-?(\d+mm)?/, (m) => `Reservepin voor pinnentrekker${m[2] ? ` ${m[2].replace('mm', ' mm')}` : ''}`],
  [/^(?:15|20)-pointed-ersatzstift/, () => 'Reservepin voor pinnentrekker'],
  [/^stiftentferner-zange|^bafute-demontagewerkzeug|^zur-demontage-montage-von-stiften/, () => 'Pinnentrekker voor klapsleutels'],
  [/^splinte-fuer-klappschluessel-10-stueck-laenge-ca-(\d)(\d)?mm$/, (m) => `Pinnen voor klapsleutels, ${m[1]}${m[2] ? `,${m[2]}` : ''} mm (10 stuks)`],
  [/^gehaeuseoeffner-4er-set$/, () => 'Behuizingsopeners (set van 4)'],
  [/^spannwerkzeuge/, () => 'Spanklem voor sleutelfreesmachine'],
  [/^(?:schluessel-)?spannvorrichtung-spannbacken/, () => 'Spanklemmen voor sleutelfreesmachine'],
  [/^anschlag-x-cut-klappe$/, () => 'Aanslag voor Xhorse Condor X-Cut'],
  [/^ersatzfeder-fuer-x-cut$/, () => 'Reserveveer voor Xhorse X-Cut'],
  [/^ersatz-schleifstein-falke$/, () => 'Reserveslijpsteen voor Falke'],
  [/^(fa\d+)-taster-fuer-falke/, (m) => `Taster ${up(m[1])} voor Falke sleutelmachine`],
  [/^x-key-befestigungsschraube-fuer-(taster|fraeser)/, (m) => `Bevestigingsschroef voor ${m[1] === 'taster' ? 'taster' : 'frees'} (X-Key Terminator)`],
  [/^x-key-terminator-messtastplatte/, () => 'Meetplaat voor taster (X-Key Terminator)'],
  [/^keilriemen-fuer-(tr-\d+)$/, (m) => `V-snaar voor ${up(m[1])}`],
  [/^profilabtaster-klom-3100$/, () => 'Profieltaster KLOM 3100'],
  [/^kalibrierschluessel-sigma$/, () => 'Kalibratiesleutel voor Sigma'],
  [/^atomkleber-(rot|gelb)/, (m) => `Secondelijm ${m[1] === 'rot' ? 'rood, dik' : 'geel, medium'}`],
  [/^aktivator-fuer-atomkleber$/, () => 'Activator voor secondelijm'],
  [/^(?:occus-8586d-elektrische-loetkolben|lkgd300-loetkolben)$/, (m) => `Soldeerbout${m[0].startsWith('occus') ? ' Occus 8586D' : ' LKGD300'}`],
  [/^pd65w-usb-c-ladegeraet/, () => 'USB-C oplader 65 W'],
  [/^poweradapter-usb$/, () => 'USB-netadapter'],
  [/^j5create-usb-30-gigabit/, () => 'j5create USB 3.0 naar gigabit-ethernetadapter'],
  [/^mifare1356mhz/, () => 'MIFARE Classic 1K kaart 13,56 MHz (UID beschrijfbaar)'],
  [/^1175nylonbuerste/, () => 'Nylonborstel Keyline 1175'],
  [/^cgsulit-ts-01-tpms-sensor-(gummi|metall)$/, (m) => `CGSULIT TS-01 TPMS-sensor (${m[1] === 'gummi' ? 'rubber ventiel' : 'metalen ventiel'})`],
  [/^technischer-support-(\d+)-(monate|jahr)$/, (m) => `Technische ondersteuning ${m[1]} ${m[2] === 'jahr' ? 'jaar' : 'maanden'}`],
  [/^support-ticket-obd/, () => 'Supportticket OBD-hulp'],
  [/^zed-full-year-lifs-jahresupdate/, () => 'Zed-FULL jaarupdate voor sleutelkopieermachine'],
  [/^aa-longlife-4er-blister-varta$/, () => 'Varta Longlife AA batterijen (4 stuks)'],
  [/^aums300-auto-diagnostic-tool$/, () => 'AUMS300 diagnosetool'],
  [/^programmierer-127-pitch-alle-sop8$/, () => 'Programmeeradapter SOP8 (1,27 mm pitch)'],
  [/^mc9s12-reflash-kabel/, () => 'Xhorse MC9S12 reflash-kabel'],
  [/^universal-interface-adapter-box$/, () => 'Universele interface-adapterbox'],
  [/^g-box2-apb112-im-sparset$/, () => 'Autel G-Box2 + APB112 voordeelset'],
  [/^t300-key-programmierer/, () => 'T-300+ sleutelprogrammeur (OBD-II)'],
  [/^ak90-auto-key-programmierer/, () => 'AK90+ sleutelprogrammeur voor BMW EWS'],
  [/^fo21ap-schluesselblatt-horseshoe/, () => 'Sleutelbaard FO21AP (Horseshoe) voor Ford'],
  [/^(ne89rep|zd40rdp)-fahrzeugschluessel/, (m) => `Sleutel ${up(m[1])}`],
];
const namedTitle = (slug, title, makes) => {
  for (const [re, make] of NAMED) { const m = slug.match(re); if (m) return make(m); }
  // "Sleutelbaard (HU66)" → "Sleutelbaard HU66 voor Volkswagen"; the slug tells blade from tip.
  const blade = title.match(/^(Sleutelbaard|Noodsleutel)\s*\(([^)]+)\)$/);
  if (blade) {
    const kind = /spitze/.test(slug) ? 'Sleutelpunt' : blade[1];
    const forWhat = makes.length && makes.length <= 3 ? ` voor ${makes.join(', ')}` : /smartkeycard/.test(slug) ? ' voor smart card' : /smartkey/.test(slug) ? ' voor smart key' : /psa/.test(slug) ? ' voor Peugeot en Citroën' : '';
    const variant = !/[-\s]/.test(blade[2]) && slug.match(/^[a-z]+\d+[a-z]*-([a-z]{1,2})(?:-|$)/)?.[1];
    return `${kind} ${up(blade[2])}${variant ? `-${up(variant)}` : ''}${forWhat}`;
  }
  return null;
};

// "v397-0626-sonderposten": clearance stock, best before 06/26. Past that month it is not sold.
const expired = (slug) => {
  const m = slug.toLowerCase().match(/-(\d\d)(\d\d)-sonderposten$/);
  return Boolean(m) && new Date(2000 + Number(m[2]), Number(m[1]), 1) <= new Date();
};

/** Last pass over everything a customer reads: no German word survives. */
const DE_NL = [
  [/\(nicht im (Lieferumfang|Inhoud)\)/gi, '(niet meegeleverd)'],
  [/\bKL\s?Kalibrierschl[üu]ssel/g, 'KL-kalibratiesleutel'],
  [/\bhochwertige[rns]?\b/gi, 'hoogwaardig'],
  [/\bAnzahl der Tasten:?\s*(\d)/gi, '$1 knoppen'],
  [/\b(\d)\s*Tasten[- ]?/g, '$1-knops '],
  [/\bTasten\b/g, 'knoppen'],
  [/\bFernbedienung(en)?\b/gi, 'afstandsbediening'],
  [/\bFahrzeugmodelle?n?\b/gi, 'automodellen'],
  [/\bFahrzeugmarke\b/gi, 'automerk'],
  [/\bkompatibel\b/g, 'geschikt'],
  [/\bKompatibel\b/g, 'Geschikt'],
  [/\bgeeignet\b/gi, 'geschikt'],
  [/\bSpezifikationen\b/gi, 'Specificaties'],
  [/\bArtikelzustand:?\s*Neu\b/gi, 'Staat: nieuw'],
  [/\bArtikelzustand\b/gi, 'Staat'],
  [/\bFunktionen\b/g, 'Functies'],
  [/\bChiptypen\b/gi, 'chiptypes'],
  [/\bUnterst[üu]tzt\b/gi, 'Ondersteunt'],
  [/\bProdukttyp\b/gi, 'Producttype'],
  [/\bhochwertige[rn]?\s+Kunststoff\b/gi, 'hoogwaardig kunststof'],
  [/\bKunststoff\b/gi, 'kunststof'],
  [/\bMetall\b/gi, 'metaal'],
  [/\bMaterial\b/g, 'Materiaal'],
  [/\bFarbe\b/gi, 'Kleur'],
  [/\bohne\s+Emblem\b/gi, 'zonder embleem'],
  [/\bmit\s+Emblem\b/gi, 'met embleem'],
  [/\bBatteriehalter\b/gi, 'batterijhouder'],
  [/\bBatterie\b/gi, 'batterij'],
  [/\bKalibrierschl[üu]ssel\b/gi, 'kalibratiesleutel'],
  [/\bNotschl[üu]ssel\b/gi, 'noodsleutel'],
  [/\bFunkschl[üu]ssel\b/gi, 'autosleutel'],
  [/\bSchl[üu]sselbart\b/gi, 'sleutelbaard'],
  [/\bSchl[üu]sselrohling\b/gi, 'sleutelrohling'],
  [/\bSchl[üu]ssel(geh[äa]use)?\b/gi, (_, h) => (h ? 'sleutelbehuizing' : 'sleutel')],
  [/\bGeh[äa]use\b/gi, 'behuizing'],
  [/\bPlatine\b/gi, 'printplaat'],
  [/\bLieferumfang\b/gi, 'Inhoud'],
  [/\bSt[üu]ck\b/gi, 'stuks'],
  [/\bschwarz\b/gi, 'zwart'], [/\bsilber\b/gi, 'zilver'], [/\bChrom\b/gi, 'chroom'], [/\bwei(ß|ss)\b/gi, 'wit'],
  [/\bf[üu]r\b/gi, 'voor'],
  [/\bund\b/g, 'en'],
  [/\bmit\b/g, 'met'],
  [/\bohne\b/gi, 'zonder'],
  [/\bNeu\b/g, 'nieuw'],
  [/[ \t]{2,}/g, ' '],
];
const dutchify = (s) => (typeof s === 'string' ? DE_NL.reduce((t, [re, to]) => t.replace(re, to), s).trim() : s);

// Whole German sentences a word list can't fix: the sentence goes, not half-translated.
const STILL_GERMAN = /\b(Fahrzeug\w*|Achtung|Bitte|Dieser?|nicht|jedoch|nur|generiert|worden|werden|wird|bestimmten|neueren|auszulesen|Lebensdauer|Robuste|Schnelle|Einfach|meisten|Leistungsstarke|Abdeckung|Reifendruck\w*|Lieferung|Abgebildet|Fehlercode|Kein[e]?|Original\w*schl[üu]ssel|Alternativ|Anbieter|ersetzt|Grund|Preis|Reduzierter|Ersatz\w+|Stiftentferner|beachten|Codieren|Flashen|zum|zur|bei|sind|kann|können|Ihr\w*|Sie|auch|oder|sowie|einer?|eine[nms]?|zwischen|über)\b/;
const sentenceSafe = (text) =>
  text.split(/(?<=[.!?])\s+/).filter((x) => !STILL_GERMAN.test(x)).join(' ');
const dropGerman = (html) =>
  typeof html !== 'string' ? html : html
    .replace(/<(li|p|dd|td|h3)([^>]*)>([\s\S]*?)<\/\1>/g, (m, tag, attrs, inner) => {
      if (!/</.test(inner)) { const kept = sentenceSafe(inner).trim(); return kept ? `<${tag}${attrs}>${kept}</${tag}>` : ''; }
      return STILL_GERMAN.test(inner.replace(/<[^>]+>/g, ' ')) ? '' : m;
    })
    .replace(/<(ul|ol)[^>]*>\s*<\/\1>/g, '');

/* ── which manufacturer made it ──────────────────────────────────────── */

const MANUFACTURERS = [
  ['Xhorse', /\bxhorse\b|\bvvdi\b|\bx[knsez][a-z]{1,2}\d/i],
  ['KeyDIY', /\bkeydiy\b|\bkey ?diy\b|\bkd-?x?\d|\bnb\d{2}\b/i],
  ['Lonsdor', /\blonsdor\b/i],
  ['Autel', /\bautel\b|\bikey\w+/i],
  ['OBDSTAR', /\bobdstar\b/i],
  ['Zed-FULL', /\bzed-?full\b/i],
  ['Silca', /\bsilca\b/i],
  ['Keyline', /\bkeyline\b/i],
  ['JMA', /\bjma\b/i],
  ['Börkey', /\bb[öo]e?rkey\b/i],
  ['KESA', /\bkesa\b/i],
  ['A-Key', /\ba[\s-]?key\b/i],
];

const manufacturerOf = (text) => MANUFACTURERS.find(([, re]) => re.test(text))?.[0] ?? null;

/* ── audience ────────────────────────────────────────────────────────── */

/**
 * Opening tools are sold to the trade, not to whoever finds the page.
 *
 * Not the whole gereedschap category, as before: a screwdriver set is not a
 * lock pick, and hiding it behind a business login sold nothing to anybody.
 * The subcategory the classifier assigned is precise enough to gate on.
 */
const TRADE_SUBCATEGORIES = new Set(['opengereedschap']);
// Key programmers, "All Keys Lost" kits and smart-key emulators make a car's keys without the car's keys:
// trade only, like opening tools.
const TRADE_TITLE = /\b(pick|dietrich|aufsperr|lockpick|schlagschl[üu]ssel|bump|emulator|g-?box|all keys lost|akl|reflash|key ?master|kw100|key tool|obd)/i;

/**
 * Stock that stays out of the shop window.
 *
 * A-Key is a locksmith wholesaler as well as a key supplier, so the catalogue
 * now holds 1.186 house, cabinet and safe keys, 190 cutters and 34 key
 * machines. They are real stock and the office can quote and order them from
 * the CRM — but autosleutel24.nl is a mobile car-key service, and a visitor
 * looking for a Golf key should not have to walk past a cabinet-key range to
 * find it.
 *
 * Gated rather than dropped: the articles keep their category, their photo and
 * their price, and appear for a signed-in business account.
 */
const TRADE_CATEGORIES = new Set(['woningsleutels', 'sloten', 'sleutelmachines', 'frezen-en-tasters', 'programmeerapparatuur']);

/*
 * Words from A-Key's page that the fitment reader takes for a model:
 * "206 u.a." (unter anderem), "3 Beide", "Originalschlüsselgehäuse", "Metall".
 * Suffixes are cut, junk entries dropped; a model must never be printed in a
 * title or a URL in German.
 */
const MODEL_JUNK = /original|schl[üu]ssel|metall|geh[äa]use|platine|fernbedienung|tutorial|learning|kabel|antenne|spule|profil|\btool\b|vvdi|\ba[- ]?key\b|hitag|pcf\d|smart remote|keyless|\bbt\b|^(stop|start)$/i;
function cleanFitment(entries) {
  return entries
    .map((f) => {
      if (!f.model) return f;
      let model = f.model
        .replace(/\s+u\.?\s?a\.?$/i, '')
        .replace(/\s+beide$/i, '')
        .replace(/\s+(älteres|neues)\s+modell$/i, '')
        .replace(/\s+keyless(\s+start)?$/i, '')
        .replace(/\s+(19|20)\d{2}\s*-\s*((19|20)\d{2})?(\s+(19|20)\d{2}\s*-\s*((19|20)\d{2})?)?$/, '')
        .replace(/\s+\d{2}$/, '')
        .replace(/^İ/, 'i')
        .replace(new RegExp(`^${f.make}\\s+`, 'i'), '')
        // BMW's German "3er" is the Dutch "3-serie".
        .replace(/^(\d)er(\s+series?)?\b/i, '$1-serie')
        .trim();
      if (!model || MODEL_JUNK.test(model)) model = null;
      return { ...f, model };
    })
    .filter((f, i, all) => f.model || !all.some((g) => g.make === f.make && g.model));
}

/* ── one article ─────────────────────────────────────────────────────── */

const products = [];
const skipped = { noCategory: 0, noPhoto: 0, noPrice: 0 };

for (const [slug, filed] of Object.entries(classification.filed)) {
  const product = raw[slug];
  if (!product) continue;

  let images = photoOverrides.has(slug.toLowerCase())
    ? [photoOverrides.get(slug.toLowerCase())]
    : photosFor(product);
  /* Show only photos without A-Key's green logo when the article has any; else least-marked first.
     Scores: scripts/watermark-score.mjs (share of watermark-green pixels in the centre). */
  /* Hand-picked by eye where the colour detector cannot tell (green PCBs, coloured backgrounds). */
  // A clean third-party override beats a hand pick of A-Key photos.
  const picked = photoOverrides.has(slug.toLowerCase()) ? undefined : PHOTO_PICKS[slug.toLowerCase()];
  // Never a photo with A-Key's logo: an article with only those shows our placeholder instead.
  // Partner photos (AccessFobs, autosleutels.info) carry no logo; an A-Key photo counts as clean only when scored clean or picked by eye.
  images = picked ?? images.filter((f) => !/\/akey_/.test(f) || (WM_SCORE[f] != null && WM_SCORE[f] < 0.0003));
  if (!images.length) skipped.noPhoto++;

  /* "für Fahrzeugmarke: Toyota / Lexus" names two makes, and a model listed
     after it is sold under both. */
  const statedMakes = product.make
    ? product.make.split(/\s*[/&+]\s*/).map(spellMake).filter(Boolean)
    : filed.makes;
  const fitment = cleanFitment(fitmentOf(product, statedMakes));
  /* Title (and so the URL) keeps to A-Key's own models; the list adds autosleutels.info's. */
  const allFitment = [...fitment];
  for (const f of autosleutels[slug.toLowerCase()]?.fitment ?? []) {
    if (!allFitment.some((g) => g.make === f.make && g.model?.toLowerCase() === f.model.toLowerCase())) allFitment.push(f);
  }
  const xrefs = crossReferences(product.description ?? []);

  /*
   * A-Key's own heading names a different article number than their article
   * field on 448 pages — "Funkschlüssel kompatibel für Toyota - TOYR109" over
   * article TOYR126L. Both numbers are in circulation, so the other one is
   * listed as an alternative: a customer searching the number off their old
   * invoice has to find the article.
   */
  const titleCode = product.title.match(/\b([A-Z]{2,6}\d{2,4}[A-Z]{0,3})\b/)?.[1];
  const ownCode = tidyArticleNumber(product.articleNumber);
  if (titleCode && ownCode && titleCode !== ownCode && !xrefs.some((x) => x.code === titleCode)) {
    xrefs.push({ brand: 'A-Key', code: titleCode });
  }
  const tools = cuttingTools(product.description ?? []);

  /* Every make the article is stated to fit: the classifier's, plus every
     make named in a fitment line. */
  fixModels(allFitment);
  const titleFitment = [...fitment]; fixModels(titleFitment);
  const makes = [...new Set([...filed.makes, ...allFitment.map((f) => f.make)])];

  const text = `${product.title} ${(product.description ?? []).join(' ')}`;

  /*
   * What the supplier says that we could not put into Dutch. The
   * specification block is excluded: those lines are already the table above,
   * and printing "Produkttyp: Funkschlüssel / Schlüsselbart: TOY49" under a
   * heading that says "German" made the page look untranslated when in fact
   * every one of those values is in the table in Dutch.
   */
  const SPEC_LINE =
    /^(Produktinformationen|Produkttyp|Schl[üu]sselbart|Schl[üu]sselrohling|Anzahl der Tasten|Funkeinheit|Transponder|Farbe|Material|f[üu]r Fahrzeugmarke|Board\s*-?\s*Nr)/i;
  const { german } = translateDescription(
    (product.description ?? [])
      .filter((line) => !SPEC_LINE.test(line.trim()))
      // And not the heading again: "3 Tasten-Funkschlüssel kompatibel für
      // Toyota TOYR111K" under "extra information" is the title in German.
      .filter((line) => {
        const strip = (t) => t.toLowerCase().replace(/[^a-z0-9]/g, '');
        return !strip(line).includes(strip(product.title).slice(0, 24));
      })
  );

  const cost = costOf(product.price);
  if (cost == null) skipped.noPrice++;

  const batteryCode = text.match(/\bCR\s?-?(\d{3,4})\b/i)?.[1] ?? null;

  products.push({
    id: tidyArticleNumber(product.articleNumber) ?? slug,
    slug: slug.toLowerCase(),
    title: product.title,
    category: filed.category,
    subcategory: filed.subcategory,
    audience:
      TRADE_CATEGORIES.has(filed.category) ||
      TRADE_SUBCATEGORIES.has(filed.subcategory) ||
      TRADE_TITLE.test(product.title)
        ? 'trade'
        : 'public',
    makes,
    manufacturer: manufacturerOf(text),
    condition: 'aftermarket',
    buttons: buttonsOf(product),
    frequency: tidyFrequency(product.frequency),
    chip: chipOf(product, filed),
    blade: tidyBlade(product.blade),
    battery: batteryCode ? `cr${batteryCode}` : (autosleutels[slug.toLowerCase()]?.battery ?? BATTERY_FAMILY[slug.toLowerCase()])?.toLowerCase() ?? null,
    costPrice: cost,
    image: images[0] ?? null,
    images,
    /** First photo is not one of A-Key's watermarked ones (by the pixel check, or not theirs at all). */
    // An A-Key photo nobody scored is not assumed clean (run scripts/watermark-score.mjs).
    cleanPhoto: Boolean(images[0]) && (picked ? true : WM_SCORE[images[0]] != null ? WM_SCORE[images[0]] < 0.0003 : !/\/akey_/.test(images[0])),
    // "A Key Toy49t" is A-Key's own article name read as a model.
    fitment: allFitment.filter((f) => f.model && !/\ba[- ]?key\b/i.test(f.model)).map((f) => ({ make: f.make, model: f.model, from: f.from, to: f.to })),
    excerpt: (product.description ?? []).join(' ').slice(0, 400),

    titleNl: ((t) => (/^[A-Z][a-z]+\s*\([^)]*\)$/.test(t) && namedTitle(slug.toLowerCase(), t, [...new Set(allFitment.map((f) => f.make).filter(Boolean))])) || t)(
      dutchify(dutchTitle(product, filed, titleFitment, manufacturerOf(text)))),
    descriptionNl: dropGerman(dutchify(descriptionHtml(product, filed, { fitment: allFitment, xrefs: xrefs.filter((x) => !IS_SUPPLIER(x.brand)), tools }))),
    directAnswer: sentenceSafe(dutchify(directAnswer(product, filed, allFitment)) ?? '') || null,
    metaDescriptionNl: sentenceSafe(dutchify(metaDescription(product, filed, titleFitment, cost)) ?? '') || null,

    specs: specsFor(product),
    vehiclesRaw: product.vehicles ?? null,
    replacedBy: product.replacedBy ?? null,
    supplierNote: dutchNotes(german),
    articleCode: tidyArticleNumber(product.articleNumber),
    /** Article numbers the same part is sold under elsewhere in the trade. */
    crossReferences: xrefs.some((x) => !IS_SUPPLIER(x.brand)) ? xrefs.filter((x) => !IS_SUPPLIER(x.brand)) : null,
    /** Internal only: the supplier's other numbers for this article. */
    supplierAltCodes: xrefs.filter((x) => IS_SUPPLIER(x.brand)).map((x) => x.code),
    /** Set by the classifier when a filing deserves a human glance. */
    needsCheck: filed.needsCheck ?? null,
    /** Ready to ship at A-Key now. "Lieferzeit 2-3 Werktage" or "Ausverkauft" would break our 2-3 day promise. */
    inStock: product.availability !== 'OutOfStock' && /^(Sofort verfügbar|Auf Lager|Knapper Lagerbestand)/i.test(product.stockLabel ?? '') && !expired(slug),
  });
}

/*
 * AccessFobs is a supplier of photos and descriptions only, never of articles:
 * its housings are not sold on their own. Clean photos reach A-Key articles
 * through accessfobs-photo-matches.json (see loadPhotoOverrides above).
 */

/* ── brand names only as "geschikt voor" ────────────────────────────────
 * "Opel afstandsbediening" reads as an Opel part; these are aftermarket. A car
 * maker's name may only say what a part fits (EUTMR art. 14(1)(c)), so every
 * title names the part first: "Afstandsbediening voor Opel …".
 */
const PART = /^(.+?) (afstandsbediening|sleutelbehuizing|smart key|transpondersleutel|noodsleutel|printplaat|sleutel zonder chip|autosleutel|sleutelbaard|sleutelpunt|motorsleutel|universele afstandsbediening|universele sleutel|gereedschap|programmeerapparaat|transponder|accessoire|batterij)\b(.*)$/;
const TOOL_MAKERS = /^(Xhorse|KeyDIY|Autel|Lonsdor|OBDSTAR|Silca|Keyline|JMA|Börkey)\b\s*/;
for (const p of products) {
  const m = p.titleNl.match(PART);
  if (!m || !p.makes.some((mk) => m[1].includes(mk))) continue;
  const maker = m[1].match(TOOL_MAKERS)?.[0] ?? '';
  const car = m[1].slice(maker.length).trim();
  const part = m[2][0].toUpperCase() + m[2].slice(1);
  p.titleNl = `${maker}${maker ? m[2] : part}${car ? ` voor ${car}` : ''}${m[3]}`.replace(/\s{2,}/g, ' ');
}

/* ── our own article numbers ───────────────────────────────────────────
 * Customers see our code, not the supplier's: first two and last two
 * characters swapped (OPR151HU43 → 43R151HUOP). The supplier's number stays
 * in supplierCode, for the office ordering it. Model numbers of the tool
 * makers (Xhorse, KeyDIY, …) are theirs and public, so they stay as they are.
 */
const MAKER_CODES = new Set(['Xhorse', 'KeyDIY', 'Autel', 'Lonsdor', 'OBDSTAR', 'Zed-FULL']);
// Letters and digits only: "KS-9" swapped with its hyphen read as "-9KS".
const swapEnds = (raw) => { const c = raw.replace(/[^A-Za-z0-9]/g, '').toUpperCase(); return c.length >= 4 ? c.slice(-2) + c.slice(2, -2) + c.slice(0, 2) : [...c].reverse().join(''); };
// "KLA04KL" swaps into itself: then the whole code is reversed. ("AAA" stays — a battery size, not a number.)
export const ownCode = (c) => { const sw = swapEnds(c); return sw !== c.replace(/[^A-Za-z0-9]/g, '').toUpperCase() ? sw : [...sw].reverse().join(''); };
const esc = (x) => x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const SUPPLIER_NAME = /\s*\bA[\s-]?Key\b\s*/gi;
for (const p of products) {
  if (IS_SUPPLIER(p.manufacturer)) p.manufacturer = null;
  const from = p.articleCode;
  // A maker's model number (Xhorse XKB526EN) stays; the supplier's own numbering (HYRC119, BZR120, AU-prefix) never does,
  // whichever maker the text mentions.
  const supplierStyle = /^[A-Z]{2,4}(R|RC|K|B)\d{3}|^AU[A-Z]/.test(from ?? '');
  if (from && (!MAKER_CODES.has(p.manufacturer) || supplierStyle)) {
    const to = ownCode(from);
    const re = new RegExp(`(?<![A-Za-z0-9])${esc(from)}(?![A-Za-z0-9])`, 'gi');
    // A blade's number is its profile (HU83): the fit depends on it, so the text keeps it; only the article number changes.
    const flat = (x) => String(x ?? '').toUpperCase().replace(/[^A-Z0-9]/g, '');
    // Tools are sold by their maker's model name (T-300+, AK90+): that name stays, only the article number changes.
    const isProfile = ['sleutelbaarden', 'noodsleutels', 'transponders', 'programmeerapparatuur', 'gereedschap', 'accessoires'].includes(p.category) || (Boolean(p.blade) && flat(from) === flat(p.blade));
    if (!isProfile) for (const k of ['titleNl', 'descriptionNl', 'metaDescriptionNl', 'directAnswer', 'supplierNote']) if (typeof p[k] === 'string') p[k] = p[k].replace(re, to);
    p.specs = p.specs.map(([l, v]) => [l, l === 'Artikelnummer' ? to : isProfile ? v : String(v).replace(re, to)]);
    p.supplierCode = from;
    p.articleCode = to;
    // A Silca or Errebi number identical to the supplier's would give it away.
    if (p.crossReferences) {
      const xs = p.crossReferences.filter((x) => !x.code.toUpperCase().split(/[\s,/]+/).includes(from.toUpperCase()));
      p.crossReferences = xs.length ? xs : null;
    }
  }
  // The id travels as the SKU (structured data, analytics, orders): ours too.
  if (p.id && (!MAKER_CODES.has(p.manufacturer) || supplierStyle)) {
    if (p.id !== from) p.supplierId = p.id;
    // No article number: the id was the supplier's slug, so it becomes a neutral one.
    p.id = !from ? `AS${createHash('sha1').update(p.id).digest('hex').slice(0, 8).toUpperCase()}` : p.id === from ? p.articleCode : ownCode(p.id);
  }
  for (const k of ['titleNl', 'descriptionNl', 'metaDescriptionNl', 'directAnswer', 'supplierNote']) if (typeof p[k] === 'string') p[k] = p[k].replace(SUPPLIER_NAME, ' ').replace(/ {2,}/g, ' ').trim();
}

/*
 * The public URL: Dutch and descriptive, the way a customer searches —
 * "toyota-cruiser-afstandsbediening-2-knoppen-toyr126l", not A-Key's German
 * "funkschluessel-kompatibel-fuer-toyota-toyr126l". `slug` stays the internal
 * key: CRM overrides, baskets and orders are keyed on it.
 */
const urlPart = (t) =>
  t.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const taken = new Set();
for (const p of products) {
  const name = p.titleNl.split('·')[0].replace(/\([^)]*\)/g, ' ');
  const base = [urlPart(name), p.articleCode ? urlPart(p.articleCode) : ''].filter(Boolean).join('-').slice(0, 90).replace(/-+$/, '') || p.slug;
  let candidate = base;
  for (let n = 2; taken.has(candidate); n++) candidate = `${base}-${n}`;
  taken.add(candidate);
  p.urlSlug = candidate;
  // The supplier's German slug named their article number; it stays internal (CRM overrides are keyed on it).
  p.supplierSlug = p.slug;
  p.slug = candidate;
}

/* ── the companion files ─────────────────────────────────────────────── */

const publicProducts = products.filter((p) => p.audience === 'public');

const brandCounts = new Map();
for (const p of publicProducts) {
  for (const make of p.makes) brandCounts.set(make, (brandCounts.get(make) ?? 0) + 1);
}
const brands = [...brandCounts]
  .map(([make, count]) => ({ make, count }))
  .sort((a, b) => b.count - a.count || a.make.localeCompare(b.make));

const facetCount = (key) => {
  const counts = {};
  for (const p of publicProducts) {
    const value = p[key];
    if (value) counts[value] = (counts[value] ?? 0) + 1;
  }
  return counts;
};

/**
 * Every model we stock something for, with the chips, blades and frequencies
 * that turn up on it.
 *
 * The fitment widget shows those three next to the model a visitor picks, so
 * they can check them against the key in their hand before ordering.
 */
const vehicles = {};
for (const p of publicProducts) {
  for (const f of p.fitment) {
    const key = `${f.make} ${f.model}`;
    vehicles[key] ??= {
      make: f.make, model: f.model, from: f.from, to: f.to,
      chips: [], blades: [], frequencies: [], count: 0, categories: {},
    };
    const entry = vehicles[key];
    entry.count++;
    entry.categories[p.category] = (entry.categories[p.category] ?? 0) + 1;
    entry.from = Math.min(entry.from || 9999, f.from || 9999) || 0;
    entry.to = Math.max(entry.to, f.to);
    for (const [field, value] of [['chips', p.chip], ['blades', p.blade], ['frequencies', p.frequency]]) {
      if (value && !entry[field].includes(value)) entry[field].push(value);
    }
  }
}

// A-Key's "10+1 gratis" articles are a pack of eleven; the photo says so, the title must too.
for (const p of products) if (/-101-gratis-/.test(p.supplierSlug)) p.titleNl = `${p.titleNl} – set van 11 (10 + 1 gratis)`;

/* ── photos under neutral names ─────────────────────────────────────────
 * "akey_3263_…" or "asi_…" in a photo URL names the supplier. Every original
 * is published as public/images/products/p-<hash>.<ext> — a hard link, so no
 * extra disk — and products point at those. src/lib/publicImage.ts maps the
 * same way at runtime for photos set in the CRM.
 */
const PUBLIC_IMAGES = path.join(process.cwd(), 'public/images/products');
mkdirSync(PUBLIC_IMAGES, { recursive: true });
const neutralName = (name) => `p-${createHash('sha1').update(name).digest('hex').slice(0, 12)}${path.extname(name)}`;
for (const name of readdirSync(IMAGE_DIR)) {
  const dst = path.join(PUBLIC_IMAGES, neutralName(name));
  if (!existsSync(dst)) {
    try { linkSync(path.join(IMAGE_DIR, name), dst); } catch { copyFileSync(path.join(IMAGE_DIR, name), dst); }
  }
}
const published = (url) =>
  typeof url === 'string' && url.startsWith('/images/products/') ? `/images/products/${neutralName(url.slice('/images/products/'.length))}` : url;
// Photos with the supplier's name or German text that the colour check missed (OCR, src/data/photo-blocklist.json).
const BLOCKED = new Set((existsSync(path.join(process.cwd(), 'src/data/photo-blocklist.json')) ? JSON.parse(readFileSync(path.join(process.cwd(), 'src/data/photo-blocklist.json'), 'utf8')).photos : []).map((n) => `/images/products/${n}`));
for (const p of products) {
  p.images = (p.images ?? []).map(published).filter((u) => !BLOCKED.has(u));
  p.image = p.images[0] ?? null;
  if (!p.image) p.cleanPhoto = false;
}

// Two articles, one name: the article code tells them apart.
{
  const seen = new Map();
  for (const p of products) seen.set(p.titleNl.toLowerCase(), (seen.get(p.titleNl.toLowerCase()) ?? 0) + 1);
  for (const p of products) {
    if (seen.get(p.titleNl.toLowerCase()) > 1 && p.articleCode && !p.titleNl.includes(p.articleCode)) p.titleNl = `${p.titleNl} – ${p.articleCode}`;
  }
}

writeFileSync(
  OUT,
  `${JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      count: products.length,
      facets: { category: facetCount('category'), subcategory: facetCount('subcategory') },
      products,
    },
    null,
    1
  )}\n`
);
// The office's lookup: our code → the supplier's, to order with. Internal; never served.
const csvCell = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
mkdirSync(path.join(process.cwd(), 'reports'), { recursive: true });
writeFileSync(
  path.join(process.cwd(), 'reports/artikelcodes.csv'),
  ['onze_code;leverancier_code;leverancier_slug;titel', ...products.map((p) => [p.articleCode, p.supplierCode ?? p.articleCode, p.supplierSlug, p.titleNl].map(csvCell).join(';'))].join('\n') + '\n'
);
writeFileSync(BRANDS_OUT, `${JSON.stringify(brands, null, 1)}\n`);
writeFileSync(
  NAV_OUT,
  `${JSON.stringify({ categories: facetCount('category'), subcategories: facetCount('subcategory') }, null, 1)}\n`
);
writeFileSync(VEHICLES_OUT, `${JSON.stringify(vehicles, null, 1)}\n`);

/* ── report ──────────────────────────────────────────────────────────── */

const byCategory = facetCount('category');

console.log(`catalog.json — ${products.length} articles\n`);
for (const [category, count] of Object.entries(byCategory).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${String(count).padStart(5)}  ${CATEGORIES[category]?.label ?? category}`);
}

console.log(`\n  public ${publicProducts.length} · trade ${products.length - publicProducts.length} (gated)`);
console.log(`  with a photo      ${products.filter((p) => p.image).length}`);
console.log(`  with a price      ${products.filter((p) => p.costPrice != null).length}`);
console.log(`  with a make       ${products.filter((p) => p.makes.length).length}`);
console.log(`  with models       ${products.filter((p) => p.fitment.length).length}`);
console.log(`  with a spec table ${products.filter((p) => p.specs.length).length}`);
console.log(`  flagged for check ${products.filter((p) => p.needsCheck).length}`);
console.log(`\n  ${brands.length} makes · ${Object.keys(vehicles).length} models`);
console.log(`  ${classification.review.length} articles held back for review (see akey-classified.json)`);

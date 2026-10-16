/**
 * Our own copy for the category and brand pages — written for this shop, not
 * taken from a supplier. Technical facts (blade profiles, chips) are the ones
 * the catalogue itself carries for that make; nothing here promises a price,
 * a delivery time or a fitment the product pages do not.
 */

export interface PageCopy {
  /** Under the h1: what the page is and who it is for. */
  intro: string;
  sections: { h2: string; p: string }[];
  faq: { q: string; a: string }[];
}

const CHECK_FIRST =
  'Twijfelt u welke u nodig heeft? Stuur een foto van uw huidige sleutel via WhatsApp, dan zoeken wij het juiste artikelnummer voor u op.';

export const CATEGORY_COPY: Record<string, PageCopy> = {
  afstandsbedieningen: {
    intro:
      'Een complete afstandsbediening: behuizing, elektronica en sleutelbaard in één. Voor als uw sleutel kwijt of defect is, of als u een reservesleutel wilt.',
    sections: [
      {
        h2: 'Kies op frequentie, knoppen en transponder',
        p: 'Een afstandsbediening werkt alleen als drie dingen kloppen met uw auto: de frequentie (meestal 433 of 434 MHz in Europa), het aantal knoppen en de transponderchip. Die drie staan bij elk artikel vermeld. Op uw huidige sleutel of in het instructieboekje vindt u ze vaak terug.',
      },
      {
        h2: 'Programmeren: zelf, opsturen of monteur aan huis',
        p: 'Een nieuwe afstandsbediening moet op uw auto worden ingeleerd, en de sleutelbaard moet op uw slot worden gefreesd. Kies op de productpagina of u dat zelf laat doen, uw oude sleutel opstuurt, of dat onze monteur naar u toe komt.',
      },
    ],
    faq: [
      { q: 'Werkt de sleutel direct als ik hem ontvang?', a: 'Nee. De baard moet worden gefreesd en de sleutel op uw auto worden ingeleerd. Zonder programmering opent hij misschien het portier, maar start de auto niet.' },
      { q: 'Wat is het verschil met een behuizing?', a: 'Een behuizing is alleen de buitenkant. Een afstandsbediening is de complete sleutel inclusief elektronica.' },
      { q: 'Hoe weet ik welke frequentie mijn auto heeft?', a: CHECK_FIRST },
    ],
  },
  behuizingen: {
    intro:
      'Een nieuwe sleutelbehuizing voor als de knoppen versleten zijn, het klepje is gebroken of de kast gescheurd. U zet uw eigen elektronica erin — de auto hoeft niet opnieuw geprogrammeerd te worden.',
    sections: [
      {
        h2: 'De goedkoopste reparatie van een autosleutel',
        p: 'In de meeste gevallen is alleen de buitenkant kapot, en werkt de printplaat met de transponder gewoon nog. Dan is een nieuwe behuizing genoeg. U haalt de print uit de oude sleutel en klikt hem in de nieuwe. De chip gaat mee, dus de auto herkent de sleutel meteen.',
      },
      {
        h2: 'Let op het aantal knoppen en de sleutelbaard',
        p: 'Kies een behuizing met hetzelfde aantal knoppen en dezelfde vorm (klapsleutel of vaste baard) als uw huidige sleutel. Bij een behuizing met een ongefreesde baard laat u de baard op uw slot frezen; bij een klapsleutel kunt u vaak uw oude baard overzetten.',
      },
    ],
    faq: [
      { q: 'Moet de auto opnieuw worden geprogrammeerd?', a: 'Nee, zolang u de elektronica en transponder uit uw oude sleutel overzet.' },
      { q: 'Kunnen jullie het overzetten voor mij doen?', a: 'Ja. Kies op de productpagina "Opsturen — wij zetten over". U stuurt uw oude sleutel op, wij zetten alles over en frezen de baard.' },
      { q: 'Zit er een batterij bij?', a: 'Nee, alleen de behuizing. Batterijen vindt u in de categorie batterijen.' },
    ],
  },
  'smart-keys': {
    intro:
      'Smart keys voor keyless entry en keyless start: de sleutel blijft in uw zak, de auto opent en start op de knop. Elke smart key moet op uw auto worden ingeleerd.',
    sections: [
      {
        h2: 'Keyless vraagt een exacte match',
        p: 'Bij een smart key moeten frequentie, transponder en printplaat precies overeenkomen met wat uw auto verwacht. Vergelijk ze met de gegevens op de productpagina, of laat ons het controleren voordat u bestelt.',
      },
      {
        h2: 'Inleren',
        p: 'Een smart key wordt via de diagnose-aansluiting op uw auto aangeleerd. Dat vraagt programmeerapparatuur; kies daarom een van de services op de productpagina, of laat het door een specialist doen.',
      },
    ],
    faq: [
      { q: 'Kan ik een smart key zelf inleren?', a: 'Bij de meeste auto’s niet zonder programmeerapparatuur. Kies een service of neem contact met ons op.' },
      { q: 'Zit er een noodsleutel in?', a: 'Bij veel smart keys wel — het staat in de specificaties. Losse noodsleutels vindt u in de categorie noodsleutels.' },
      { q: 'Welke smart key past op mijn auto?', a: CHECK_FIRST },
    ],
  },
  transpondersleutels: {
    intro:
      'Sleutels met een transponderchip in de kop, zonder afstandsbediening. De chip vertelt de startonderbreker dat het de juiste sleutel is — zonder die chip start de auto niet.',
    sections: [
      {
        h2: 'Frezen én aanleren',
        p: 'Een transpondersleutel moet op twee manieren passen: de baard op uw slot en de chip op uw auto. De baard wordt gefreesd op uw sleutel of op code; de chip wordt aangeleerd of gekopieerd van een werkende sleutel.',
      },
      {
        h2: 'Lege sleutels zonder chip',
        p: 'Sommige artikelen zijn een lege behuizing zonder transponder. Die zijn bedoeld om de chip uit uw oude sleutel over te zetten. Dat staat dan in de titel.',
      },
    ],
    faq: [
      { q: 'Kan de chip van mijn oude sleutel worden gekopieerd?', a: 'Bij veel chips wel. Stuur ons de chipgegevens of een foto van de sleutel, dan zeggen wij of dat bij uw auto kan.' },
      { q: 'Wat als ik geen werkende sleutel meer heb?', a: 'Dan moet de nieuwe sleutel via de auto worden aangeleerd. Kies dan voor de monteur aan huis.' },
      { q: 'Welke transponder zit in mijn sleutel?', a: CHECK_FIRST },
    ],
  },
  'sleutels-zonder-chip': {
    intro:
      'Mechanische autosleutels voor auto’s zonder startonderbreker — meestal oudere modellen. Alleen frezen, geen programmering.',
    sections: [
      {
        h2: 'Alleen het profiel telt',
        p: 'Een sleutel zonder chip moet alleen mechanisch passen. Het sleutelprofiel (bijvoorbeeld HU66 of SIP22) bepaalt welke sleutel in uw slot gaat. Wij frezen hem op uw oude sleutel of op de sleutelcode.',
      },
      {
        h2: 'Heeft mijn auto een startonderbreker?',
        p: 'Vrijwel elke auto vanaf eind jaren negentig heeft er een. Twijfelt u, kies dan liever een transpondersleutel — een sleutel zonder chip opent dan wel het portier, maar de auto start niet.',
      },
    ],
    faq: [
      { q: 'Kunnen jullie de sleutel frezen?', a: 'Ja, kies op de productpagina "Frezen op sleutelcode" of stuur uw oude sleutel op.' },
      { q: 'Past dit ook als reservesleutel voor de deur?', a: 'Ja, mits het profiel overeenkomt met uw slot.' },
      { q: 'Welk profiel heeft mijn sleutel?', a: CHECK_FIRST },
    ],
  },
  sleutelbaarden: {
    intro:
      'Ongefreesde sleutelbaarden in het juiste profiel. Voor een klapsleutel waarvan de baard versleten of gebroken is.',
    sections: [
      {
        h2: 'Het profiel is de naam',
        p: 'Sleutelbaarden worden aangeduid met hun profiel: HU66 voor veel Volkswagen-, Audi-, Seat- en Škoda-sleutels, HU100 voor Opel, VA2 voor Renault en Peugeot, HU101 voor Ford. Het profiel van uw sleutel staat vaak in de specificaties van uw huidige sleutel of kunt u bij ons navragen.',
      },
      { h2: 'Frezen', p: 'Een baard wordt ongefreesd geleverd. Wij frezen hem op uw oude baard of op de sleutelcode; kies daarvoor de service op de productpagina.' },
    ],
    faq: [
      { q: 'Kan ik de baard zelf monteren?', a: 'In een klapsleutel meestal wel: met een pennetje haalt u de oude baard eruit en zet u de nieuwe erin.' },
      { q: 'Werkt de auto daarna gewoon?', a: 'Ja, de baard heeft geen elektronica. De transponder zit in de kop van de sleutel.' },
      { q: 'Welk profiel heb ik nodig?', a: CHECK_FIRST },
    ],
  },
  'universal-remotes': {
    intro:
      'Universele sleutels van onder meer Xhorse, KeyDIY en Autel. Ze worden met het programmeerapparaat van dat merk op het gewenste voertuig gezet en werken daarna als een originele sleutel.',
    sections: [
      { h2: 'Voor wie', p: 'Universele sleutels zijn bedoeld voor sleutelspecialisten en garages met het bijbehorende apparaat. Zonder dat apparaat kunt u ze niet op een auto zetten.' },
      { h2: 'Kies op merk van uw apparaat', p: 'Een Xhorse-sleutel werkt met Xhorse-apparatuur, een KeyDIY-sleutel met KeyDIY. Filter daarom eerst op fabrikant, daarna op vorm en aantal knoppen.' },
    ],
    faq: [
      { q: 'Kunnen jullie de universele sleutel voor mij programmeren?', a: 'Ja, kies een service op de productpagina of neem contact met ons op.' },
      { q: 'Werkt een universele sleutel op elke auto?', a: 'Nee, alleen op de voertuigen die het programmeerapparaat ondersteunt.' },
      { q: 'Welke universele sleutel past?', a: CHECK_FIRST },
    ],
  },
  printplaten: {
    intro: 'Losse printplaten (PCB) voor afstandsbedieningen. Voor als de elektronica defect is maar de behuizing nog goed.',
    sections: [
      { h2: 'Let op het printnummer', p: 'Op de printplaat in uw sleutel staat een nummer. Vergelijk dat, samen met de frequentie en het aantal knoppen, met de gegevens op de productpagina.' },
      { h2: 'Na montage inleren', p: 'Een nieuwe printplaat moet op uw auto worden ingeleerd voordat de knoppen werken.' },
    ],
    faq: [
      { q: 'Zit de transponder op de printplaat?', a: 'Dat verschilt per sleutel. Het staat in de specificaties van het artikel.' },
      { q: 'Kan ik mijn oude behuizing houden?', a: 'Ja, daarvoor is een losse printplaat bedoeld.' },
      { q: 'Welke print zit in mijn sleutel?', a: CHECK_FIRST },
    ],
  },
  transponders: {
    intro: 'Losse transponderchips: de chip die de startonderbreker van uw auto herkent.',
    sections: [
      { h2: 'Aanleren of kopiëren', p: 'Een transponder wordt aangeleerd via de auto of gekopieerd van een werkende sleutel met programmeerapparatuur. Het chiptype (bijvoorbeeld ID46, ID48 of 8A) moet overeenkomen met wat uw auto gebruikt.' },
      { h2: 'Voor wie', p: 'Losse chips zijn vooral bedoeld voor sleutelspecialisten en voor wie een lege sleutel van een chip wil voorzien.' },
    ],
    faq: [
      { q: 'Welke chip gebruikt mijn auto?', a: CHECK_FIRST },
      { q: 'Kan ik de chip zelf kopiëren?', a: 'Alleen met een geschikt programmeerapparaat.' },
    ],
  },
  noodsleutels: {
    intro: 'Noodsleutels: het mechanische blad dat in een smart key zit. Opent het portier als de batterij leeg is — de auto start er niet mee.',
    sections: [
      { h2: 'Waarom een noodsleutel', p: 'Is de batterij van uw smart key leeg of is de noodsleutel kwijt, dan komt u zonder dit blad uw auto niet in. Een noodsleutel wordt op uw slot gefreesd.' },
    ],
    faq: [
      { q: 'Start de auto met een noodsleutel?', a: 'Nee, een noodsleutel heeft geen elektronica.' },
      { q: 'Welke noodsleutel past in mijn smart key?', a: CHECK_FIRST },
    ],
  },
  batterijen: {
    intro: 'Knoopcelbatterijen voor autosleutels en afstandsbedieningen, zoals CR2032, CR2025 en CR1620.',
    sections: [
      { h2: 'Welke batterij zit in mijn sleutel?', p: 'Het type staat op de batterij zelf: open de sleutel voorzichtig en lees de code af. Een batterij van hetzelfde type maar een ander merk werkt hetzelfde.' },
    ],
    faq: [
      { q: 'Moet de sleutel opnieuw worden ingeleerd na het wisselen?', a: 'Bij de meeste auto’s niet.' },
      { q: 'Hoe lang gaat een batterij mee?', a: 'Meestal een paar jaar. Werkt de afstandsbediening alleen nog van dichtbij, dan is de batterij vaak bijna leeg.' },
    ],
  },
  accessoires: {
    intro: 'Toebehoren voor sleutels en de werkplaats: sleutelhangers, opbergsystemen, kabels en onderdelen.',
    sections: [{ h2: 'Voor particulier en vakman', p: 'Een deel van deze artikelen is bedoeld voor sleutelspecialisten. Bij twijfel helpen wij u graag verder.' }],
    faq: [{ q: 'Past dit bij mijn apparaat?', a: CHECK_FIRST }],
  },
  programmeerapparatuur: {
    intro: 'Programmeerapparatuur om sleutels uit te lezen, te kopiëren en op het voertuig aan te leren — voor de werkplaats.',
    sections: [{ h2: 'Merk en licentie', p: 'Controleer welke voertuigen en functies het apparaat ondersteunt en of er een abonnement nodig is. Wij denken graag mee.' }],
    faq: [{ q: 'Welk apparaat past bij mijn werk?', a: 'Neem contact met ons op; wij adviseren op basis van de merken waar u het meest aan werkt.' }],
  },
  gereedschap: {
    intro: 'Gereedschap voor de sleutel- en slotenspecialist.',
    sections: [{ h2: 'Voor de vakman', p: 'Deze artikelen zijn bedoeld voor professioneel gebruik. Vraag ons gerust naar de toepassing.' }],
    faq: [],
  },
  motorsleutels: {
    intro: 'Sleutels voor motorfietsen en scooters, ongefreesd geleverd.',
    sections: [{ h2: 'Frezen en eventueel aanleren', p: 'Een motorsleutel wordt op uw slot gefreesd. Heeft uw motor een startonderbreker, dan moet de chip ook worden aangeleerd.' }],
    faq: [{ q: 'Welke sleutel past op mijn motor?', a: CHECK_FIRST }],
  },
};

const brand = (make: string, blades: string, extra: string): PageCopy => ({
  intro: `Autosleutels, behuizingen, afstandsbedieningen en onderdelen voor ${make}. Filter hieronder op type en aantal knoppen, of zoek op het artikelnummer van uw huidige sleutel.`,
  sections: [
    {
      h2: `Welke ${make}-sleutel heb ik?`,
      p: `${make}-sleutels verschillen per model en bouwjaar. ${blades} Kijk bij het artikel naar de frequentie, het aantal knoppen en de transponder, en vergelijk die met uw huidige sleutel.`,
    },
    { h2: 'Repareren of vervangen', p: extra },
  ],
  faq: [
    { q: `Moet een nieuwe ${make}-sleutel worden geprogrammeerd?`, a: 'Een complete sleutel of afstandsbediening wel. Een nieuwe behuizing niet, zolang u de elektronica uit uw oude sleutel overzet.' },
    { q: 'Kunnen jullie de sleutel frezen en inleren?', a: 'Ja. Kies op de productpagina of u uw oude sleutel opstuurt, of dat onze monteur naar u toe komt.' },
    { q: `Welke ${make}-sleutel past op mijn auto?`, a: CHECK_FIRST },
  ],
});

const SHELL =
  'Is alleen de buitenkant versleten of gebroken, dan is een nieuwe behuizing de goedkoopste oplossing: u zet de printplaat over en de auto hoeft niet opnieuw geprogrammeerd te worden. Werkt de sleutel zelf niet meer, of bent u hem kwijt, kies dan een complete afstandsbediening.';

export const BRAND_COPY: Record<string, PageCopy> = {
  Volkswagen: brand('Volkswagen', 'Veel Volkswagen-klapsleutels gebruiken het HU66-profiel; oudere modellen vaak een ID48-transponder.', SHELL),
  Audi: brand('Audi', 'Oudere Audi-klapsleutels gebruiken veelal het HU66-profiel, nieuwere modellen hebben een smart key.', SHELL),
  Seat: brand('Seat', 'Seat deelt veel sleutels met Volkswagen, vaak met het HU66-profiel.', SHELL),
  'Škoda': brand('Škoda', 'Škoda deelt veel sleutels met Volkswagen, vaak met het HU66-profiel en een ID48-transponder.', SHELL),
  Opel: brand('Opel', 'Opel-sleutels gebruiken onder meer de profielen HU100, HU43 en HU46, afhankelijk van model en bouwjaar.', SHELL),
  Renault: brand('Renault', 'Veel Renault-sleutels hebben het VA2-profiel; bij modellen als Clio, Mégane en Scénic komt ook de sleutelkaart voor.', SHELL),
  Dacia: brand('Dacia', 'Dacia deelt veel sleutels met Renault, vaak met het VA2-profiel.', SHELL),
  Peugeot: brand('Peugeot', 'Peugeot-sleutels gebruiken vaak het HU83-, SIP22- of VA2-profiel.', SHELL),
  'Citroën': brand('Citroën', 'Citroën deelt veel sleutels met Peugeot, met de profielen HU83, SIP22 of VA2.', SHELL),
  Ford: brand('Ford', 'Ford-sleutels gebruiken vaak het HU101-profiel; oudere modellen ook FO21.', SHELL),
  Fiat: brand('Fiat', 'Veel Fiat-sleutels gebruiken het SIP22-profiel.', SHELL),
  Toyota: brand('Toyota', 'Toyota gebruikt onder meer de profielen TOY43, TOY48 en TOY49, en bij nieuwere modellen smart keys met noodsleutel.', SHELL),
  Lexus: brand('Lexus', 'Lexus deelt veel sleutels met Toyota, vaak als smart key met noodsleutel.', SHELL),
  BMW: brand('BMW', 'BMW-sleutels gebruiken onder meer de profielen HU92 en HU100R; bij nieuwere modellen hoort een smart key met noodsleutel.', SHELL),
  Mini: brand('Mini', 'Mini-sleutels zijn verwant aan BMW, onder meer met het HU92- of HU100R-profiel.', SHELL),
  'Mercedes-Benz': brand('Mercedes-Benz', 'Mercedes-Benz gebruikt onder meer het HU64-profiel; veel modellen hebben een sleutel met infraroodfunctie.', SHELL),
  Kia: brand('Kia', 'Kia-sleutels verschillen sterk per model, met onder meer de profielen HYN17, TOY48 en KIA8.', SHELL),
  Hyundai: brand('Hyundai', 'Hyundai-sleutels gebruiken onder meer de profielen TOY48 en HYN17; nieuwere modellen hebben een smart key met noodsleutel.', SHELL),
  Nissan: brand('Nissan', 'Veel Nissan-sleutels gebruiken het NSN14-profiel.', SHELL),
  Honda: brand('Honda', 'Veel Honda-sleutels gebruiken het HON66-profiel.', SHELL),
  Mazda: brand('Mazda', 'Mazda-sleutels gebruiken onder meer het MAZ24-profiel; nieuwere modellen hebben een smart key met noodsleutel.', SHELL),
  Suzuki: brand('Suzuki', 'Suzuki-sleutels gebruiken onder meer het HU133R-profiel.', SHELL),
  Volvo: brand('Volvo', 'Volvo-sleutels verschillen sterk per generatie, van klapsleutel tot smart key.', SHELL),
};

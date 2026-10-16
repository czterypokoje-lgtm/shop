/** Toyota, Lexus, Kia, Hyundai — own copy per article. See ../productCopy.ts. */
const SHELL = 'Uw eigen printplaat gaat erin over, dus de auto hoeft niet opnieuw geprogrammeerd te worden.';
const LONSDOR =
  'Universele smart key van Lonsdor met instelbare frequentie, voor Toyota-modellen met ID49- of 4D-transponder. Wordt met een Lonsdor-apparaat (K518 of KH100) voor uw auto aangemaakt en daarna ingeleerd.';
const XHORSE = 'Universele sleutel van Xhorse; wordt met een Xhorse-apparaat (VVDI) voor uw auto aangemaakt en daarna ingeleerd. Wij kunnen dat ook voor u doen.';

export const ASIA1: Record<string, string> = {
  /* ── Toyota & Lexus: complete keys ── */
  'funkschluessel-kompatibel-fuer-toyota-toyr110k':
    'Afstandsbediening met drie knoppen op 433 MHz voor de Toyota Prius (2010–2011), met DST 80-transponder en TOY49-baard. Wordt op uw auto ingeleerd.',
  'funkschluessel-kompatibel-fuer-toyota-toyr111k':
    'Afstandsbediening met drie knoppen op 433 MHz voor de Toyota Land Cruiser en Prado (2007–2016) en verwante Lexus-modellen, met DST 80-transponder en TOY49-baard.',
  'funkschluessel-kompatibel-fuer-toyota-toyr119l':
    'Afstandsbediening met twee knoppen op 433 MHz voor de Toyota Crown vanaf 2022, met 8A-transponder en noodsleutel.',
  'funkschluessel-kompatibel-fuer-toyota-toyr120l':
    'Afstandsbediening met twee knoppen voor de Toyota C-HR (2018–2022), op 433,42/433,58 MHz met 8A-transponder en noodsleutel. Inleren op de auto is nodig.',
  'funkschluessel-kompatibel-fuer-toyota-toyr116l':
    'Afstandsbediening met twee knoppen op 433 MHz voor de Toyota RAV4 van 2019 tot 2023, met 8A-transponder en noodsleutel.',
  'funkschluessel-kompatibel-fuer-toyota-toyr117l':
    'Afstandsbediening met twee knoppen op 433 MHz voor de Toyota RAV4 van 2023–2024, met 8A-transponder en noodsleutel. Voor de RAV4 van 2019–2022 is er een aparte uitvoering.',
  'funkschluessel-kompatibel-fuer-toyota-toyr118l':
    'Afstandsbediening met twee knoppen voor de Toyota Yaris (2018–2021), op 433,30/433,58 MHz met 8A-transponder en noodsleutel.',
  'lonsdor-mz30-27-2-tasten-smart-key-id49-einstellbare-frequenz': `${LONSDOR} Uitvoering met twee knoppen.`,
  'lonsdor-mz30-25-3-tasten-smart-key-id4d-id49-einstellbare-frequenz': `${LONSDOR} Uitvoering met drie knoppen.`,
  'lonsdor-mz30-14-3-tasten-smart-key-id4d-id49-einstellbare-frequenz': `${LONSDOR} Uitvoering met drie knoppen, in een andere behuizing dan de MZ30-25.`,
  'xkto21en-toyt-style-flip-2btn': `Klapsleutel met twee knoppen in Toyota-stijl. ${XHORSE}`,
  'xkto20en-toyt-style-flip-3btn': `Klapsleutel met drie knoppen in Toyota-stijl. ${XHORSE}`,
  'xelex0en-leikss-style-flip-3btn': `Klapsleutel met drie knoppen in Lexus-stijl, met 46-transponder. ${XHORSE}`,
  'funkschluessel-kompatibel-fuer-toyota-toyr106':
    'Afstandsbediening met drie knoppen op 433 MHz voor de Toyota Corolla vanaf 2008, met 4D-transponder en TOY48-baard.',
  'funkschluessel-kompatibel-fuer-toyota-toyr115':
    'Smart key met twee knoppen op 433 MHz voor Toyota, met DST Plus 6F-transponder (TMS37126) en noodsleutel.',
  'funkschluessel-kompatibel-fuer-toyota-toyr113':
    'Afstandsbediening met twee knoppen op 433 MHz voor Toyota, met 4D-transponder en noodsleutel.',
  'funkschluessel-kompatibel-fuer-toyota-toyr112':
    'Afstandsbediening met twee knoppen op 433 MHz voor Toyota, met DST AES 8A-transponder en noodsleutel. De AES-chip hoort bij de nieuwere generatie.',
  'funkschluessel-kompatibel-fuer-toyota-toyr111':
    'Smart key met twee knoppen op 433 MHz voor Toyota en Lexus, met DST 80 Plus-transponder en TOY49-noodsleutel.',
  'funkschluessel-kompatibel-fuer-toyota-toyr110':
    'Smart key met drie knoppen op 433 MHz voor Toyota, met DST 80 Plus-transponder en TOY48-noodsleutel.',
  'funkschluessel-kompatibel-fuer-toyota-toyr108':
    'Smart key met twee knoppen op 433 MHz voor Toyota en Lexus, met DST 80 Plus-transponder en TOY49-noodsleutel. Vergelijk de vorm met uw huidige sleutel.',
  'funkschluessel-kompatibel-fuer-toyota-toyr103':
    'Smart key met twee knoppen op 433 MHz voor Toyota, met 4D-transponder en noodsleutel.',
  'funkschluessel-kompatibel-fuer-toyota-toyr102':
    'Afstandsbediening met twee knoppen op 433 MHz voor Toyota, met DST AES 8A-transponder en noodsleutel.',
  'funkschluessel-kompatibel-fuer-lexus-lexr101':
    'Smart key met twee knoppen op 433 MHz voor Lexus, met TOY49-noodsleutel. Vergelijk de transponder met uw huidige sleutel of vraag het ons.',

  /* ── Toyota & Lexus: housings ── */
  'gehaeuse-fuer-lt20-04-toyota-lexus-smart-key':
    `Behuizing voor de Toyota/Lexus smart key van het type LT20-04. ${SHELL}`,
  'gehaeuse-fuer-lt20-01-toyota-lexus-smart-key':
    `Behuizing voor de Toyota/Lexus smart key van het type LT20-01. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-toyota-toyrc118': `Behuizing met twee knoppen voor Toyota, met TOY48-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-toyota-toyrc117': `Behuizing met twee knoppen voor Toyota, met TOY48-baard, in een andere vorm dan de TOYRC118. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-toyota-toyrc149':
    `Behuizing met twee knoppen voor Toyota en Lexus, met TOY43-baard, het profiel van oudere modellen zoals de Corolla, Yaris en Avensis. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-toyota-toyrc158': `Behuizing voor de Toyota-sleutel. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-toyota-toyrc114': `Behuizing met vijf knoppen voor de smart key van de Toyota Alphard, met noodsleutel. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-toyota-toyrc113': `Behuizing met zes knoppen voor de smart key van de Toyota Alphard, met noodsleutel. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-toyota-toyrc106': `Behuizing met vier knoppen voor Toyota, met TOY40-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-toyota-toyrc151': `Behuizing met drie knoppen voor Toyota, met TOY48-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-toyota-toyrc112': `Behuizing met één knop voor oudere Toyota’s, met TOY43-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-mit-toyota-toyrc109': `Behuizing met drie knoppen voor Toyota, met TOY48-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-toyota-toyrc150': `Behuizing met drie knoppen voor Toyota en Lexus, met TOY43-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-toyota-toyrc104': `Behuizing met vier knoppen voor Toyota, met TOY43-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-toyota-toyrc155': `Behuizing met drie knoppen voor Toyota, met TOY43-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-toyota-toyrc156': `Behuizing met twee knoppen voor Toyota, met TOY47-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-toyota-toyrc153': `Behuizing met drie knoppen voor Toyota, met TOY47-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-toyota-toyrc101': `Behuizing met twee knoppen voor Toyota, met TOY47-baard. Vergelijk de vorm met de andere TOY47-uitvoeringen. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-toyota-toyrc105': `Behuizing met twee knoppen voor Toyota, met TOY43-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-toyota-toyrc152': `Behuizing voor Toyota en Lexus. Leg hem naast uw sleutel of stuur ons een foto. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-toyota-toyrc115':
    `Behuizing met twee knoppen voor Toyota, met een korte TOY48-baard van 38 mm. Meet de baard van uw huidige sleutel: er bestaat ook een uitvoering van 46 mm. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-toyota-toyrc116':
    `Behuizing met twee knoppen voor Toyota, met een TOY48-baard van 46 mm. Er is ook een korte uitvoering van 38 mm. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-toyota-toyrc103': `Behuizing met drie knoppen voor Toyota, met TOY43-baard. ${SHELL}`,
  'tastenfeld-tastengummi-kompatibel-fuer-toyota-2-bzw-3-tasten':
    'Losse rubberen knoppenmat voor Toyota-sleutels met twee of drie knoppen. Voor als alleen de knoppen versleten of gescheurd zijn — de goedkoopste reparatie die er is.',
  'funkschluessel-gehaeuse-kompatibel-fuer-toyota-toyrc102': `Behuizing met twee knoppen voor Toyota, met TOY43-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-toyota-toyrc107': `Behuizing met drie knoppen voor Toyota, met TOY43-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-toyota-toyrc123': `Behuizing met twee knoppen voor oudere Toyota’s, met TOY41-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-toyota-toyrc111': `Behuizing met drie knoppen voor oudere Toyota’s, met TOY41-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-toyota-toyrc110': `Behuizing met twee knoppen voor Toyota, met TOY43-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-toyota-toyrc108': `Behuizing met twee knoppen voor Toyota, met TOY43-baard, in een andere vorm dan de TOYRC110. ${SHELL}`,

  /* ── Kia: complete keys ── */
  'funkschluessel-kompatibel-fuer-kia-kir115x':
    'Smart key met vier knoppen op 433 MHz voor de Kia Niro vanaf 2023, met HITAG AES 4A-transponder en HU134-noodsleutel.',
  'funkschluessel-kompatibel-fuer-kia-kir113x':
    'Smart key met vier knoppen op 433 MHz voor de Kia Sportage vanaf 2019, met HITAG3 ID47-transponder en HU134-noodsleutel.',
  'funkschluessel-kompatibel-fuer-kia-kir114x':
    'Smart key met vier knoppen op 433 MHz voor de Kia Sportage (2019–2022), met HITAG3 ID47-transponder en HU134-noodsleutel. Vergelijk de knopindeling met de KIR113X.',
  'funkschluessel-kompatibel-fuer-kia-kir112':
    'Afstandsbediening met vier knoppen op 433 MHz voor de Kia Sportage (2016–2018), met ID47-transponder en TOY48-baard.',
  'funkschluessel-kompatibel-fuer-kia-kir111':
    'Afstandsbediening met vier knoppen op 433 MHz voor de Kia Sportage (2016–2018), met ID47-transponder en TOY48-baard, in een tweede uitvoering naast de KIR112.',
  'funkschluessel-kompatibel-fuer-kia-kir110':
    'Afstandsbediening met vier knoppen op 433 MHz voor de Kia Sorento, met ID47-transponder en HYN17-baard.',
  'funkschluessel-kompatibel-fuer-kia-kir109':
    'Afstandsbediening met vier knoppen op 433 MHz voor de Kia Niro (2017–2020), met KIA9-baard.',
  'funkschluessel-kompatibel-fuer-kia-kir108':
    'Afstandsbediening met vier knoppen op 433 MHz voor de Kia Sorento (2019–2020), met HITAG3-transponder en HYN17-baard.',
  'funkschluessel-kompatibel-fuer-kia-kir107':
    'Afstandsbediening met drie knoppen voor Kia en Hyundai, met DST 80-transponder en TOY48-baard. Let op: deze uitvoering werkt op 315 MHz, de frequentie van Amerikaanse auto’s.',
  'funkschluessel-kompatibel-fuer-kia-kir106':
    'Afstandsbediening met drie knoppen op 433 MHz voor Kia, met DST 80-transponder en KIA8-baard.',
  'funkschluessel-kompatibel-fuer-kia-kir104':
    'Afstandsbediening met drie knoppen op 433 MHz voor de Kia Cee’d (2015–2018), met HITAG2 46-transponder en KIA8-baard.',
  'funkschluessel-kompatibel-fuer-kia-kir102':
    'Afstandsbediening met drie knoppen op 433 MHz voor de Kia Cee’d en Pro Cee’d (2013–2018), met DST 80-transponder en KIA8-baard.',
  'funkschluessel-kompatibel-fuer-kia-kir101':
    'Afstandsbediening met drie knoppen op 433 MHz voor de Kia Sorento vanaf 2018, met HYN17-baard.',

  /* ── Kia: housings ── */
  'funkschluessel-gehaeuse-kompatibel-fuer-kia-kirc106': `Behuizing met vier knoppen voor de Kia smart key, met noodsleutel. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-kia-kirc105': `Behuizing met drie knoppen voor Kia, met TOY49-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-kia-kirc101': `Behuizing met vier knoppen voor Kia, met HYN14-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-kia-kirc102': `Behuizing met drie knoppen voor oudere Kia’s, met HYN6-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-kia-kirc103': `Behuizing met twee knoppen voor oudere Kia’s, met HYN6-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-kia-kirc104': `Behuizing voor de Kia-sleutel. Leg hem naast uw huidige sleutel om de vorm te vergelijken. ${SHELL}`,

  /* ── Hyundai: complete keys ── */
  'funkschluessel-kompatibel-fuer-hyundai-hyr205x':
    'Smart key met drie knoppen op 433 MHz voor de Hyundai Sonata en Elantra vanaf 2016, met DST AES 8A-transponder en TOY48-noodsleutel.',
  'funkschluessel-kompatibel-fuer-hyundai-hyr206x':
    'Smart key met drie knoppen op 433 MHz voor de Hyundai Tucson vanaf 2017, met HITAG3-transponder en TOY48-noodsleutel.',
  'funkschluessel-kompatibel-fuer-hyundai-hyr207x':
    'Smart key met drie knoppen op 433 MHz voor de oudere Hyundai ix25/Creta (2015–2018), met DST AES 8A-transponder en TOY48-noodsleutel.',
  'funkschluessel-kompatibel-fuer-hyundai-hyr209x':
    'Smart key met drie knoppen op 433 MHz voor Hyundai, met DST AES 8A-transponder en TOY48-noodsleutel.',
  'funkschluessel-kompatibel-fuer-hyundai-hyr210x':
    'Smart key met drie knoppen op 433 MHz voor de Hyundai Tucson (2018–2020), met HITAG3-transponder en TOY48-noodsleutel.',
  'funkschluessel-kompatibel-fuer-hyundai-hyr208x':
    'Smart key met drie knoppen op 433 MHz voor de Hyundai Sonata en Sonata Hybrid (2018–2019), met DST AES 8A-transponder.',
  'funkschluessel-kompatibel-fuer-hyundai-hyr128-org':
    'Afstandsbediening met drie knoppen op 433 MHz voor de Hyundai i10 vanaf 2016, met PCF7938XA-transponder. De baard zit er niet bij en bestelt u apart.',
  'funkschluessel-kompatibel-fuer-hyundai-hyr127':
    'Smart key met drie knoppen op 433 MHz voor de Hyundai Tucson, met HITAG3-transponder en TOY48-noodsleutel.',
  'funkschluessel-kompatibel-fuer-hyundai-hyr126':
    'Afstandsbediening met drie knoppen op 433 MHz voor Hyundai, met DST 80-transponder en HU135-baard.',
  'funkschluessel-kompatibel-fuer-hyundai-hyr125':
    'Smart key met drie knoppen op 433 MHz voor de Hyundai Santa Fe en Tucson, met HITAG3-transponder en TOY48-noodsleutel.',
  'funkschluessel-kompatibel-fuer-hyundai-hyr124':
    'Smart key met drie knoppen op 433 MHz voor Hyundai, met TOY48-noodsleutel. Vergelijk de transponder met uw huidige sleutel.',
  'funkschluessel-kompatibel-fuer-hyundai-hyr122':
    'Afstandsbediening met vier knoppen op 433 MHz voor de Hyundai Palisade (2020–2021), met ID47-transponder en HU135-baard.',
  'funkschluessel-kompatibel-fuer-hyundai-hyr102':
    'Smart key met vier knoppen op 433 MHz voor Hyundai, met PCF7952-transponder en noodsleutel.',
  'funkschluessel-kompatibel-fuer-hyundai-hyr108':
    'Afstandsbediening met drie knoppen op 433 MHz voor de Hyundai Elantra en i20 en verwante Kia’s, met 4D63-transponder en TOY48-noodsleutel.',
  'funkschluessel-kompatibel-fuer-hyundai-hyr118':
    'Afstandsbediening met drie knoppen op 433 MHz voor de Hyundai Tucson vanaf 2019, met noodsleutel.',
  'funkschluessel-kompatibel-fuer-hyundai-hyr117':
    'Afstandsbediening met drie knoppen op 433 MHz voor de Hyundai Kona vanaf 2017, met noodsleutel.',
  'funkschluessel-kompatibel-fuer-hyundai-hyr116k':
    'Afstandsbediening met drie knoppen op 433 MHz voor Hyundai, met DST 80-transponder.',
  'funkschluessel-kompatibel-fuer-hyundai-hyr114':
    'Afstandsbediening met drie knoppen op 433 MHz voor de Hyundai Tucson vanaf 2019, met ID47-transponder en noodsleutel.',
  'funkschluessel-kompatibel-fuer-hyundai-hyr113':
    'Afstandsbediening met drie knoppen op 433 MHz voor de Hyundai Ioniq vanaf 2017, met NCF2952X-transponder en noodsleutel.',
  'funkschluessel-kompatibel-fuer-hyundai-hyr121':
    'Smart key met drie knoppen op 433 MHz voor de Hyundai Santa Fe met keyless start (2012–2015), met 46-transponder en TOY48-noodsleutel.',
  'funkschluessel-kompatibel-fuer-hyundai-hyr112':
    'Afstandsbediening met vier knoppen op 433 MHz voor Hyundai en Kia, met PCF7952A-transponder en noodsleutel.',
  'funkschluessel-kompatibel-fuer-hyundai-hyr111':
    'Afstandsbediening met twee knoppen op 433 MHz voor Hyundai en Kia, met PCF7952-transponder en noodsleutel.',
  'funkschluessel-kompatibel-fuer-hyundai-hyr110':
    'Afstandsbediening met drie knoppen op 433 MHz voor Hyundai en Kia, met PCF7952A-transponder en noodsleutel.',
  'funkschluessel-kompatibel-fuer-hyundai-hyr119-or':
    'Afstandsbediening met vier knoppen op 433 MHz voor de Hyundai i40, met 8A AES-transponder en noodsleutel.',
  'funkschluessel-geeignet-fuer-hyundai-hyr115-keylessgo':
    'Smart key op 434 MHz voor de Hyundai i10 met keyless start, met HITAG2-transponder (PCF7945A).',
  'xkhy04en-hyud-style-separat-31btn': `Afstandsbediening in Hyundai-stijl. ${XHORSE}`,
  'xkhy22en-hyud-style-flip-3btn': `Klapsleutel met drie knoppen in Hyundai-stijl. ${XHORSE}`,
  'funkschluessel-kompatibel-fuer-hyundai-kia-hyr158':
    'Afstandsbediening met drie knoppen op 433 MHz voor de Hyundai Elantra, Santa Fe en Sonata, met PCF7936-transponder en TOY49-baard.',
  'funkschluessel-kompatibel-fuer-hyundai-hyr159':
    'Afstandsbediening met drie knoppen op 433 MHz voor de Hyundai i30, met ID46-transponder en TOY49-baard.',
  'funkschluessel-kompatibel-fuer-hyundai-hyr101':
    'Afstandsbediening met drie knoppen op 433 MHz voor Hyundai, met PCF7936-transponder en TOY48-baard.',
  'funkschluessel-kompatibel-fuer-hyundai-hyr109':
    'Afstandsbediening met drie knoppen op 433 MHz voor de Hyundai i30 (vanaf 2016), Elantra en Tucson (2014–2016), met PCF7945A-transponder en KIA7-noodsleutel.',
  'funkschluessel-kompatibel-fuer-hyundai-hyr103':
    'Afstandsbediening met drie knoppen op 433 MHz voor de Hyundai ix35, met PCF7952A-transponder en HYN14-baard.',
  'funkschluessel-kompatibel-fuer-hyundai-hyr106':
    'Afstandsbediening op 433 MHz voor Hyundai. Stuur ons een foto van uw sleutel, dan bevestigen wij of dit de juiste is.',
  'funkschluessel-kompatibel-fuer-hyundai-hyr105':
    'Afstandsbediening op 433 MHz voor Hyundai. Vergelijk de vorm en het aantal knoppen met uw huidige sleutel.',
  'funkschluessel-kompatibel-fuer-hyundai-hyr104e':
    'Afstandsbediening op 433 MHz voor Hyundai, met PCF7952-transponder.',

  /* ── Hyundai: housings ── */
  'funkschluessel-gehaeuse-kompatibel-fuer-hyundai-hyrc120': `Behuizing met drie knoppen voor Hyundai, met TOY49-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-keydiy-kompatibel-fuer-hyundai-hyrc119':
    'Behuizing met drie knoppen in Hyundai-stijl voor een universele KeyDIY-printplaat, zonder baard. Bedoeld voor wie met KeyDIY-apparatuur werkt.',
  'funkschluessel-gehaeuse-keydiy-kompatibel-fuer-hyundai-hyrc118':
    'Behuizing met drie knoppen in Hyundai-stijl voor een KeyDIY-printplaat, zonder baard, in een andere vorm dan de HYRC119.',
  'funkschluessel-gehaeuse-kompatibel-fuer-hyundai-hyrc117':
    'Behuizing met drie knoppen voor Hyundai en Kia, voor een KeyDIY-printplaat, zonder baard.',
  'funkschluessel-gehaeuse-kompatibel-fuer-hyundai-hyrc116': `Behuizing met drie knoppen voor Hyundai en Kia, met HYN14-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-hyundai-hyrc115': `Behuizing met drie knoppen voor Hyundai, met TOY49-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-hyundai-hyrc114': `Behuizing met drie knoppen voor Hyundai en Kia, met HYN14-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-hyundai-hyrc113': `Behuizing met drie knoppen voor Hyundai, met VA2-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-hyundai-hyrc112': `Behuizing met twee knoppen voor Hyundai en Kia, met TOY49-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-hyundai-hyrc104': `Behuizing met twee knoppen voor Hyundai en Kia, zonder baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-hyundai-hyrc111': `Behuizing met drie knoppen voor Hyundai en Kia, met TOY49-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-hyundai-hyrc101': `Behuizing met twee knoppen voor Hyundai, zonder baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-hyundai-hyrc110': `Behuizing met drie knoppen voor Hyundai, met HYN14-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-hyundai-hyrc105': `Behuizing met drie knoppen voor Hyundai, met TOY48-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-hyundai-hyrc109': `Behuizing met drie knoppen voor Hyundai, met HYN14-baard, in een andere vorm dan de HYRC110. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-hyundai-hyrc108': `Behuizing met drie knoppen voor Hyundai, met TOY49-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-hyundai-hyrc107': `Behuizing met twee knoppen voor oudere Hyundai’s, met HYN6-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-hyundai-hyrc103': `Behuizing met twee knoppen voor Hyundai, zonder baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-hyundai-hyrc106': `Behuizing met één knop voor Hyundai, met HYN12-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-hyundai-hyrc102': `Behuizing met drie knoppen voor Hyundai, zonder baard. ${SHELL}`,
};

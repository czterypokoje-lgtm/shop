/** BMW, Mini, Mercedes-Benz, Nissan, Honda, Mazda, Suzuki, Volvo, Mitsubishi, Land Rover. See ../productCopy.ts. */
const SHELL = 'Uw eigen printplaat gaat erin over, dus de auto hoeft niet opnieuw geprogrammeerd te worden.';
const NO_BLADE = 'Zonder baard: u zet de baard uit uw huidige sleutel over, er hoeft niets gefreesd te worden.';
const US = (make: string) =>
  `Let op: deze uitvoering werkt op 315 MHz, de frequentie van Amerikaanse auto’s. Een ${make} die in Europa is verkocht gebruikt een andere frequentie — controleer uw huidige sleutel.`;
const BMW_FREQ = 'BMW gebruikte in Europa meestal 868 MHz en op sommige markten 433 MHz; kies dezelfde frequentie als uw huidige sleutel.';
const XHORSE = 'Universele sleutel van Xhorse; wordt met een Xhorse-apparaat (VVDI) voor uw auto aangemaakt en ingeleerd. Wij kunnen dat ook voor u doen.';
const MB_TOOL =
  'Sleutel voor Mercedes-Benz die met specialistische apparatuur zoals CGDI MB of Xhorse VVDI MB voor uw auto wordt aangemaakt. Zonder die apparatuur werkt hij niet; wij kunnen het voor u doen.';

export const REST: Record<string, string> = {
  /* ── BMW ── */
  'funkschluessel-kompatibel-fuer-bmw-bmr108-433mhz':
    `Afstandsbediening met drie knoppen op 433 MHz voor de BMW 3-serie, met ID46-transponder (PCF7945A) en HU92R-noodsleutel. ${BMW_FREQ}`,
  'funkschluessel-kompatibel-fuer-bmw-bmr104iea-868mhz':
    'Afstandsbediening met drie knoppen op 868 MHz voor BMW met CAS2, met HITAG2 ID46-transponder en HU92R-baard. Inleren gaat via het CAS-systeem van de auto.',
  'funkschluessel-kompatibel-fuer-bmw-bmr106-315mhz': `Afstandsbediening met drie knoppen voor BMW, met HU92R-baard. ${US('BMW')}`,
  'funkschluessel-kompatibel-fuer-bmw-bmr102iea-433mhz':
    `Afstandsbediening met drie knoppen op 433 MHz voor de BMW 1-, 3- en 5-serie, met HU92R-baard. ${BMW_FREQ}`,
  'funkschluessel-kompatibel-fuer-bmw-bmr132iea-868mhz':
    'Smart key met drie knoppen op 868 MHz voor de BMW 3-serie, met PCF7945A-transponder en noodsleutel.',
  'funkschluessel-kompatibel-fuer-bmw-bmr130-868mhz':
    'Smart key met vier knoppen op 868 MHz voor BMW, met PCF7945A-transponder en HU92R-noodsleutel.',
  'funkschluessel-kompatibel-fuer-bmw-bmr104-868mhz':
    'Afstandsbediening met drie knoppen op 868 MHz voor BMW, met ID46-transponder en HU92R-baard.',
  'funkschluessel-kompatibel-fuer-bmw-bmr109iea-868mhz':
    'Smart key met vier knoppen op 868 MHz voor BMW, met PCF7945P-transponder en HU92R-noodsleutel.',
  'funkschluessel-kompatibel-fuer-bmw-bmr102-433mhz':
    `Afstandsbediening met drie knoppen op 433 MHz voor de BMW 1-, 3- en 5-serie, met HU92R-baard. ${BMW_FREQ}`,
  'funkschluessel-kompatibel-fuer-bmr105-868mhz':
    'Afstandsbediening met drie knoppen op 868 MHz voor BMW, onder meer de 3-serie E46, 5-serie E60, 6-serie E63, 7-serie E65, X3 E83, Z4 E85, X5 en X6, met ID46-transponder en HU92R-noodsleutel.',
  'funkschluessel-kompatibel-fuer-bmw-bmr112-433mhz':
    'Afstandsbediening met drie knoppen op 433 MHz voor oudere BMW’s, met 7935-transponder en HU58-baard.',
  'funkschluessel-gehaeuse-keydiy-kompatibel-fuer-bmw-bmrc110':
    'Behuizing met drie knoppen in BMW-stijl voor een universele KeyDIY-printplaat, zonder baard. Voor wie met KeyDIY-apparatuur werkt.',
  'funkschluessel-gehaeuse-kompatibel-fuer-bmw-bmrc109': `Behuizing met drie knoppen voor de BMW smart key, met HU127-noodsleutel. ${SHELL}`,
  'funkschluessel-gehaeuse-umbausatz-kompatibel-fuer-bmw-bmrc153':
    `Ombouwbehuizing met drie knoppen voor oudere BMW’s met HU58-profiel: van een vaste sleutel naar een klapsleutel. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-bmw-bmrc159': `Behuizing met drie knoppen voor BMW, inclusief baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-bmw-bmrc154': `Behuizing met één knop voor oudere BMW’s, met HU58-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-bmw-bmrc155': `Behuizing met twee knoppen voor BMW, met HU92R-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-bmw-bmrc156': `Behuizing met drie knoppen voor oudere BMW’s, met HU58-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-bmw-bmrc157': `Behuizing met drie knoppen voor BMW, met HU92R-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-bmw-bmrc106': `Behuizing met twee knoppen voor oudere BMW’s, met HU58-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-bmw-bmrc104-hu92': `Behuizing met drie knoppen voor BMW, met HU92R-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-bmw-bmrc103': `Behuizing met drie knoppen voor oudere BMW’s, met HU58-baard, in een andere vorm dan de BMRC156. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-bmw-bmrc102': `Behuizing met drie knoppen voor de BMW 1-serie, met HU92R-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-bmw-bmrc101': `Behuizing met vier knoppen voor BMW, met HU92R-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-bmw-bmrc151': `Behuizing met vier knoppen voor de nieuwere BMW-sleutel, met HU127-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-bmw-bmrc107': `Behuizing met vier knoppen voor de BMW smart key, met HU127-noodsleutel. ${SHELL}`,

  /* ── Mini ── */
  'funkschluessel-gehaeuse-kompatibel-fuer-mini-mcrc151': `Behuizing met drie knoppen voor Mini, inclusief baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-mini-cooper-mcrc104': `Behuizing met twee knoppen voor de Mini Cooper, met HU200RS-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-mini-cooper-mcrc103': `Behuizing met twee knoppen voor de Mini Cooper. ${NO_BLADE}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-mini-cooper-mcrc102': `Behuizing met drie knoppen voor de Mini Cooper, met HU92R-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-mini-cooper-mcrc101': `Behuizing met twee knoppen voor de Mini Cooper, met HU200RS-baard, in een andere vorm dan de MCRC104. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-mini-mcrc150': `Behuizing met drie knoppen voor Mini, inclusief baard. ${SHELL}`,
  'funkschluessel-kompatibel-fuer-bmw-mini-mcr105':
    'Afstandsbediening met twee knoppen op 434 MHz voor BMW en Mini, met PCF7931-transponder en HU200RS-baard.',
  'funkschluessel-kompatibel-fuer-mini-mcr101':
    'Afstandsbediening met twee knoppen op 433 MHz voor Mini, met PCF7930AS-transponder en HU200RS-baard.',

  /* ── Mercedes-Benz ── */
  'bzr120cg-101-gratis-geeignet-fuer-mercedes-benz-cgdi': MB_TOOL,
  'bzr120cg-geeignet-fuer-mercedes-benz-cgdi': MB_TOOL,
  'funkschluessel-kompatibel-fuer-mercedes-benz-bzr120': MB_TOOL,
  'funkschluessel-kompatibel-fuer-mercedes-benz-bzr119iea':
    `Afstandsbediening met drie knoppen op 433 MHz voor Mercedes-Benz, met NEC-processor en HU64-baard. ${MB_TOOL}`,
  'funkschluessel-geeignet-fuer-mercedes-benz-bzr130': `Afstandsbediening voor Mercedes-Benz met PCF7935-transponder. ${US('Mercedes-Benz')}`,
  'funkschluessel-geeignet-fuer-mercedes-benz-bzr129': `Afstandsbediening voor Mercedes-Benz met PCF7936-transponder. ${US('Mercedes-Benz')}`,
  'funkschluessel-geeignet-fuer-mercedes-benz-bzr128':
    'Afstandsbediening op 433 MHz voor oudere Mercedes-Benz-modellen met PCF7935-transponder.',
  'funkschluessel-geeignet-fuer-mercedes-benz_1':
    `Afstandsbediening voor de Mercedes-Benz Sprinter (W901–W905), Vito W638 en Viano, met T5-transponder. ${US('Mercedes-Benz')}`,
  'funkschluessel-geeignet-fuer-mercedes-benz-bzr125':
    'Afstandsbediening op 433 MHz voor de Mercedes-Benz Vito en Viano, met T5-transponder.',
  'funkschluessel-geeignet-fuer-mercedes-benz-163-ml':
    'Afstandsbediening op 433 MHz voor de Mercedes-Benz ML (W163), met PCF7935-transponder.',
  'funkschluessel-geeignet-fuer-mercedes-benz-129-140-461':
    'Afstandsbediening op 433 MHz voor de Mercedes-Benz SL (R129), S-Klasse (W140) en G-Klasse (W461), met PCF7935-transponder.',
  'funkschluessel-geeignet-fuer-mercedes-benz-ml-w163': `Afstandsbediening voor de Mercedes-Benz ML-Klasse (W163). ${US('Mercedes-Benz')}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-mercedes-benz-bzrc116': `Behuizing met drie knoppen voor Mercedes-Benz. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-mercedes-benz-bzrc106-a': `Behuizing met één knop voor oudere Mercedes-Benz-modellen, met HU39-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-mercedes-benz-bzrc110': `Behuizing met drie knoppen voor Mercedes-Benz, met HU64-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-mercedes-benz-bzrc107': `Behuizing met drie knoppen voor Mercedes-Benz, met HU64-baard, in een andere vorm dan de BZRC110. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-mercedes-benz-bzrc101': `Behuizing met twee knoppen voor Mercedes-Benz. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-mercedes-benz-bzrc150': `Behuizing met twee knoppen voor Mercedes-Benz. ${NO_BLADE}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-mercedes-benz-bzrc108': `Behuizing met drie knoppen voor oudere Mercedes-Benz-modellen, met HU39-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-mercedes-benz-bzrc104': `Behuizing met twee knoppen voor Mercedes-Benz, met HU64-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-mercedes-benz-bzrc106': `Behuizing met één knop voor Mercedes-Benz, met HU64-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-mercedes-benz-bzrc115': `Behuizing met drie knoppen voor Mercedes-Benz (geen originele behuizing). ${SHELL}`,

  /* ── Nissan ── */
  'funkschluessel-kompatibel-fuer-nissan-nir116':
    'Smart key met drie knoppen op 433 MHz voor de Nissan X-Trail, Kicks, Rogue en Ariya vanaf 2023, met HITAG AES 4A-transponder en NSN14-noodsleutel.',
  'funkschluessel-kompatibel-fuer-nissan-nir115':
    'Smart key met drie knoppen op 433 MHz voor de nieuwste Nissan X-Trail, Kicks, Rogue en Ariya, met HITAG AES 4A-transponder, in een tweede uitvoering naast de NIR116. Vergelijk de knopindeling.',
  'notschluessel-kompatibel-fuer-nissan-nsn14c': 'Noodsleutel met NSN14-profiel voor de Nissan smart key. Wordt op uw slot gefreesd.',
  'smartkey-kompatibel-fuer-nissan-nsn14b': 'Noodsleutel met NSN14-profiel voor de Nissan smart key, in een andere uitvoering dan de NSN14C.',
  'funkschluessel-gehaeuse-kompatibel-fuer-nissan-nirc105': `Behuizing met twee knoppen voor Nissan, met NSN14-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-nissan-nirc101': `Behuizing met drie knoppen voor Nissan, met NSN14-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-nissan-nirc102': `Behuizing met twee knoppen voor Nissan, met NSN14-baard, in een andere vorm dan de NIRC105. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-nissan-nirc152': `Behuizing met twee knoppen voor Nissan, met NSN14-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-nissan-nirc103': `Behuizing met twee knoppen voor Nissan, met NSN14-baard. ${SHELL}`,
  '2-tasten-funkschluessel-gehaeuse-kompatibel-fuer-nissan-nirc151':
    `Behuizing met twee knoppen voor de Nissan Primera, Micra, Almera, Terrano en X-Trail van oudere generaties, met NSN11-baard. ${SHELL}`,
  'funkschluessel-umbauset-31-tasten-kompatibel-fuer-nissan-nirc150':
    `Ombouwset met drie knoppen voor Nissan, met NSN14-baard: van een vaste sleutel naar een klapsleutel. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-nissan-nirc104': `Behuizing met drie knoppen voor Nissan. ${NO_BLADE}`,
  'funkschluessel-kompatibel-fuer-nissan-nir104':
    'Afstandsbediening met twee knoppen op 433 MHz voor de Nissan Note (vanaf 2014), Micra (vanaf 2010) en Juke (2010–2019), met PCF7961M-transponder en NSN14-baard.',
  'funkschluessel-kompatibel-mit-nissan-nir113e':
    'Afstandsbediening met twee knoppen op 433 MHz voor de Nissan Qashqai (2007–2014), X-Trail, Pathfinder, Micra K12 en Note E11. Let op: afhankelijk van model en jaar zit er een PCF7936- of 4D60-transponder in — controleer welke uw auto heeft.',
  'funkschluessel-kompatibel-fuer-nissan-nir108':
    'Afstandsbediening met drie knoppen op 433 MHz voor Nissan, met PCF7961M-transponder en NSN14-baard.',
  'funkschluessel-kompatibel-fuer-nissan-nir112e': 'Afstandsbediening op 434 MHz voor Nissan, met HITAG2-transponder.',
  'funkschluessel-kompatibel-fuer-nissan-nir150':
    'Afstandsbediening met twee knoppen op 433 MHz voor de Nissan Pathfinder (2015–2018), Murano (2016–2018) en Titan, met PCF7945M-transponder en NSN14-baard.',
  'funkschluessel-kompatibel-fuer-nissan-nir117e':
    'Afstandsbediening met twee knoppen op 433 MHz voor de Nissan Micra, Note en Qashqai, met 4D60-transponder en NSN14-baard.',
  'funkschluessel-kompatibel-fuer-nissan-nir111': 'Afstandsbediening met twee knoppen op 433 MHz voor Nissan, met PCF7946-transponder en NSN14-baard.',
  'funkschluessel-kompatibel-fuer-nissan-nir109':
    'Afstandsbediening met twee knoppen op 433 MHz voor de Nissan Almera N16 en Almera Tino (2003–2005) en Primera P12 (2003–2008), met PCF7946-transponder en NSN14-baard.',
  'funkschluessel-kompatibel-fuer-nissan-nir110': 'Afstandsbediening op 433 MHz voor Nissan, met PCF7946-transponder.',
  'funkschluessel-kompatibel-fuer-nissan-nir105e': 'Afstandsbediening voor Nissan, met PCF7936-transponder.',

  /* ── Honda ── */
  'funkschluessel-gehaeuse-kompatibel-fuer-honda-horc111': `Behuizing met vijf knoppen voor Honda, met HON66-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-honda-horc107': `Behuizing met vier knoppen voor Honda, met HON66-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-honda-horc104': `Behuizing met twee knoppen voor Honda, met HON66-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-honda-horc103': `Behuizing met twee knoppen voor Honda. ${NO_BLADE}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-honda-horc108': `Behuizing met twee knoppen voor Honda, met HON66-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-honda-horc112': `Behuizing met drie knoppen voor Honda, met HON66-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-honda-horc113': `Behuizing met twee knoppen voor Honda, met HON66-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-honda-horc101': `Behuizing met drie knoppen voor Honda, inclusief baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-honda-horc110': `Behuizing met twee knoppen voor Honda. ${NO_BLADE}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-honda-horc109': `Behuizing voor de Honda-sleutel. Leg hem naast uw sleutel of stuur ons een foto. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-honda-horc105': `Behuizing met twee knoppen voor Honda, met HON66-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-honda-horc102': `Behuizing met twee knoppen voor Honda, met HON66-baard, in een andere vorm dan de HORC105. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-honda-horc106': `Behuizing met drie knoppen voor Honda, met HON66-baard. ${SHELL}`,
  'funkschluessel-kompatibel-fuer-honda-hor102': 'Afstandsbediening met drie knoppen op 434 MHz voor de Honda CR-V, met HON66-baard.',
  'funkschluessel-kompatibel-fuer-honda-hor103': 'Afstandsbediening met twee knoppen op 434 MHz voor de Honda Civic, met HITAG2 46-transponder en HON66-baard.',
  'funkschluessel-kompatibel-fuer-honda-hor104': 'Afstandsbediening met drie knoppen op 434 MHz voor Honda en Subaru, met DST 80-transponder en HON66-baard.',
  'funkschluessel-kompatibel-fuer-honda-hor105': 'Afstandsbediening met twee knoppen op 434 MHz voor Honda, met HITAG2 46-transponder en HON66-baard.',
  'funkschluessel-kompatibel-fuer-honda-hor106': 'Smart key met drie knoppen op 433 MHz voor de Honda Civic (2011–2016), met HITAG3-transponder en HON66-noodsleutel.',
  'funkschluessel-kompatibel-fuer-honda-hor107':
    'Smart key met drie knoppen op 433 MHz voor de Honda Civic (2011–2016), met HITAG2 46-transponder en HON66-noodsleutel. Vergelijk de chip met de HOR106.',
  'funkschluessel-kompatibel-fuer-honda-hor110': 'Afstandsbediening met drie knoppen op 433 MHz voor Honda, met ID47-transponder en HON66-baard.',
  '3-tasten-funkschluessel-kompatibel-fuer-honda-hon101': 'Afstandsbediening met drie knoppen op 434 MHz voor Honda, met PCF7941-transponder en HON66-baard.',
  'funkschluessel-kompatibel-fuer-honda-hon100': 'Afstandsbediening op 434 MHz voor Honda, met ID46-transponder.',
  'funkschluessel-kompatibel-fuer-honda-hor113e': 'Afstandsbediening op 433 MHz voor Honda, met ID46-transponder.',
  'funkschluessel-kompatibel-fuer-honda-hon112e': 'Afstandsbediening met drie knoppen op 433 MHz voor Honda, met ID47-transponder en HON66-baard.',
  'funkschluessel-kompatibel-fuer-honda-hor109': 'Afstandsbediening op 434 MHz voor Honda, met PCF7936-transponder.',
  'funkschluessel-kompatibel-fuer-honda-hor108': 'Afstandsbediening met twee knoppen op 434 MHz voor Honda, met PCF7936-transponder en HON66-baard.',
  'xkho02en-hond-style-flip-21btn': `Klapsleutel met twee knoppen plus paniekknop in Honda-stijl. ${XHORSE}`,
  'xkho01en-hond-style-flip-31btn': `Klapsleutel met drie knoppen plus paniekknop in Honda-stijl. ${XHORSE}`,
  'xkho00en-hond-style-flip-3btn': `Klapsleutel met drie knoppen in Honda-stijl. ${XHORSE}`,

  /* ── Mazda ── */
  'funkschluessel-gehaeuse-kompatibel-fuer-mazda-marc103': `Behuizing met drie knoppen voor Mazda, met MAZ24-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-mazda-marc154': `Behuizing met vier knoppen voor de Mazda smart key, met noodsleutel. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-mazda-marc104': `Behuizing met twee knoppen voor Mazda. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-mazda-marc102': `Behuizing met twee knoppen voor Mazda, met MAZ24R-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-mazda-marc153': `Behuizing met drie knoppen voor de Mazda smart key, met noodsleutel. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-mazda-marc100': `Behuizing met twee knoppen voor Mazda, met MAZ24-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-mazda-marc101': `Behuizing met drie knoppen voor Mazda, met MAZ24-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-mazda-marc152': `Behuizing met twee knoppen voor de Mazda-klapsleutel, met MAZ24R-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-mazda-marc150': `Behuizing met drie knoppen voor de Mazda-klapsleutel, met MAZ24R-baard. ${SHELL}`,
  'funkschluessel-kompatibel-fuer-mazda-mzr104': 'Smart key met drie knoppen op 433 MHz voor Mazda, met HITAG Pro-transponder (PCF7953P) en noodsleutel.',
  'funkschluessel-kompatibel-fuer-mazda-mzr106': 'Smart key met vier knoppen op 433 MHz voor Mazda, met HITAG Pro-transponder en noodsleutel.',
  'funkschluessel-kompatibel-fuer-mazda-mzr103': 'Afstandsbediening met drie knoppen op 433 MHz voor Mazda, met 4D63-transponder en MAZ24-baard.',
  'funkschluessel-kompatibel-fuer-mazda-mzr102': 'Afstandsbediening met twee knoppen op 433 MHz voor Mazda, met 4D63-transponder en MAZ24-baard.',
  'funkschluessel-kompatibel-fuer-mazda-mzr105': 'Klapsleutel met twee knoppen op 433 MHz voor Mazda, met HITAG Pro-transponder en MAZ24-baard.',
  'xkma00en-mazd-style-flip-3btn': `Klapsleutel met drie knoppen in Mazda-stijl. ${XHORSE}`,

  /* ── Suzuki ── */
  'funkschluessel-kompatibel-fuer-suzuki-sur149':
    'Afstandsbediening met twee knoppen op 433,92 MHz voor Suzuki, met 47-transponder (ASK) en HU133R-baard.',
  'funkschluessel-kompatibel-fuer-suzuki-sur158': 'Smart key met twee knoppen op 434 MHz voor Suzuki, met ID47-transponder en HU133R-noodsleutel.',
  'funkschluessel-kompatibel-fuer-suzuki-sur157': 'Afstandsbediening met twee knoppen op 434 MHz voor Suzuki, met ID46-transponder en HU133R-baard.',
  'funkschluessel-kompatibel-fuer-suzuki-sur156': 'Afstandsbediening met twee knoppen op 434 MHz voor Suzuki, met ID46 HITAG2-transponder en HU133R-baard.',
  'funkschluessel-kompatibel-fuer-suzuki-sur151': `Afstandsbediening voor Suzuki met ID47-transponder. ${US('Suzuki')}`,
  'tastenfeld-gummi-kompatibel-fuer-suzuki-opel-2-tasten-5-stueck':
    'Vijf rubberen knoppenmatten voor Suzuki- en Opel-sleutels met twee knoppen. Voor als alleen de knoppen zijn versleten.',
  'funkschluessel-gehaeuse-kompatibel-fuer-suzuki-surc104': `Behuizing met één knop voor Suzuki, Chevrolet en Daewoo, met DWO5R-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-suzuki-surc150': `Behuizing met twee knoppen voor Suzuki, inclusief baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-suzuki-surc105': `Behuizing met twee knoppen voor oudere Suzuki’s, met SZ11R-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-suzuki-surc103': `Behuizing met twee knoppen voor Suzuki en Opel, met HU133-baard. ${SHELL}`,

  /* ── Volvo ── */
  'funkschluessel-gehaeuse-kompatibel-fuer-volvo-volrc107': `Behuizing met drie knoppen voor Volvo, met HU101-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-volvo-volrc102': `Behuizing met vijf knoppen voor Volvo, met HU101-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-volvo-volrc104': `Behuizing met drie knoppen voor Volvo. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-volvo-volrc105': `Behuizing met drie knoppen voor Volvo, in een andere vorm dan de VOLRC104. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-volvo-volrc106': `Behuizing met drie knoppen voor Volvo. Vergelijk de knopindeling met uw sleutel. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-volvo-volrc101': `Behuizing met zes knoppen voor de Volvo smart key, met HU101-noodsleutel. ${SHELL}`,
  'funkschluessel-kompatibel-fuer-volvo-vlvr103vol101': 'Afstandsbediening op 433 MHz voor Volvo, met PCF7945A-transponder.',

  /* ── Mitsubishi ── */
  'funkschluessel-kompatibel-mit-mitsubishi-mitr107': 'Afstandsbediening met twee knoppen op 433 MHz voor Mitsubishi, met PCF7961-transponder en MIT11R-baard.',
  'funkschluessel-kompatibel-mit-mitsubishi-mitr103': 'Afstandsbediening met twee knoppen op 433 MHz voor Mitsubishi, met ID46-transponder en MIT8-baard.',
  'funkschluessel-gehaeuse-kompatibel-fuer-mitsubishi-mitrc101': `Behuizing met twee knoppen voor Mitsubishi, met MIT11R-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-mitsubishi-mitrc102': `Behuizing met drie knoppen voor Mitsubishi, met MIT11R-baard. ${SHELL}`,

  /* ── Land Rover ── */
  'funkschluessel-kompatibel-fuer-land-rover-lrr106': `Afstandsbediening met twee knoppen voor de Land Rover Discovery (1998–2004), met PCF7931-transponder en NE38-baard. ${US('Land Rover')}`,
  'funkschluessel-kompatibel-fuer-land-rover-lrr101':
    'Afstandsbediening met twee knoppen op 433 MHz voor de Land Rover Discovery (1998–2004), met PCF7931-transponder en NE38-baard.',
  'funkschluessel-kompatibel-fuer-land-rover-lrr103xe': 'Smart key met vijf knoppen op 434 MHz voor Land Rover, met HITAG Pro-transponder en noodsleutel.',
  'funkschluessel-kompatibel-fuer-land-rover-lrr104': `Afstandsbediening met vijf knoppen voor Land Rover, met PCF7953P-transponder en HU101-baard. ${US('Land Rover')}`,
  'funkschluessel-kompatibel-fuer-land-rover-lrr105':
    'Afstandsbediening met vijf knoppen op 433 MHz voor de Land Rover Freelander 2 (LR2, 2010–2012), Discovery 4 (2009–2011) en Range Rover Sport (2010–2012), met PCF7945P-transponder.',
  'funkschluessel-kompatibel-fuer-land-rover-lrr108': 'Afstandsbediening met vijf knoppen op 434 MHz voor Land Rover, met PCF7945A-transponder en HU101-baard.',
  'funkschluessel-kompatibel-fuer-land-rover-lrr103': 'Afstandsbediening met vijf knoppen op 433 MHz voor Land Rover, met PCF7945P-transponder en HU101-baard.',
  'funkschluessel-kompatibel-fuer-land-rover-lrr102': 'Afstandsbediening met drie knoppen op 433 MHz voor Land Rover, met PCF7941A-transponder en HU101-baard.',
  'funkschluessel-gehaeuse-kompatibel-fuer-land-rover-lrrc108': `Behuizing met vijf knoppen voor Land Rover, met HU101-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-land-rover-lrrc103': `Behuizing met vijf knoppen voor Land Rover. ${NO_BLADE}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-land-rover-lrrc104': `Behuizing met twee knoppen voor Land Rover, met NE64-baard. ${SHELL}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-land-rover-lrrc101': `Behuizing met drie knoppen voor Land Rover, met HU101-baard. ${SHELL}`,
};

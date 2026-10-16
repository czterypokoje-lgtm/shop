/** Renault, Dacia, Opel — own copy per article. See ../productCopy.ts. */
const US = 'Let op: deze uitvoering werkt op 315 MHz, de frequentie van Amerikaanse auto’s. Voor een Europese Opel heeft u vrijwel altijd 433 MHz nodig.';

export const RENAULT_OPEL: Record<string, string> = {
  /* ── Opel: complete keys ── */
  'funkschluessel-kompatibel-fuer-opel-opr151hu43':
    'Opel-klapsleutel met drie knoppen op 433 MHz en HU43-baard, het profiel van oudere Opels zoals de Astra F, Vectra B en Corsa B. Een complete sleutel: frezen op uw slot en inleren op uw auto.',
  'funkschluessel-kompatibel-fuer-opel-opr151hu46':
    'Opel-klapsleutel met drie knoppen op 433 MHz en HU46-baard, het profiel van onder meer de Astra G en H, Zafira A en B en Vectra C. Wordt gefreesd en ingeleerd.',
  'funkschluessel-kompatibel-fuer-opel-opr150hu43':
    'Klapsleutel met twee knoppen op 433 MHz voor oudere Opels, met HU43-baard. Voor modellen met alleen openen en sluiten.',
  'funkschluessel-kompatibel-fuer-opel-opr105hu46':
    'Afstandsbediening met twee knoppen op 433 MHz voor de Opel Corsa C (2001–2007), Meriva, Combo en Tigra (tot 2008), met HU46-baard. Te frezen en in te leren.',
  'funkschluessel-kompatibel-fuer-opel-opr105hu100':
    'Dezelfde sleutel met twee knoppen voor de Corsa C, Meriva, Combo en Tigra, maar met HU100-baard. Kijk naar het profiel van uw huidige sleutel om de juiste uitvoering te kiezen.',
  'funkschluessel-kompatibel-fuer-opel-opr150hu46':
    'Klapsleutel met twee knoppen op 433 MHz voor Opel, met HU46-baard. Wordt op uw slot gefreesd en op uw auto ingeleerd.',
  'funkschluessel-kompatibel-fuer-opel-opr122a':
    'Opel-klapsleutel met twee knoppen op 433 MHz, met PCF7941A-transponder en HU100-baard. Voor Opels van de generatie met het HU100-profiel.',
  'funkschluessel-kompatibel-fuer-opel-opr111':
    'Klapsleutel met twee knoppen op 433 MHz voor de Opel Astra K, met HU100-baard. Te frezen op uw slot en in te leren via de auto.',
  'funkschluessel-kompatibel-fuer-opel-opr115':
    'Opel-klapsleutel met drie knoppen op 433 MHz, met PCF7937E-transponder en HU100-baard. Wordt gefreesd en ingeleerd.',
  'funkschluessel-kompatibel-fuer-opel-opr151':
    'Opel-klapsleutel met drie knoppen op 433 MHz. Kies het baardprofiel dat bij uw slot hoort; bij twijfel stuurt u ons een foto van uw sleutel.',
  'funkschluessel-kompatibel-fuer-opel-opr129':
    'Afstandsbediening met drie knoppen op 433 MHz voor Opel en Chevrolet, waaronder de Aveo en Camaro (2008–2016), met ID46-transponder. Inleren op de auto is nodig.',
  'funkschluessel-kompatibel-fuer-opel-opr130': `Opel-klapsleutel met vier knoppen, met PCF7952-transponder en HU100-baard. ${US}`,
  'funkschluessel-kompatibel-fuer-opel-opr128iea':
    'Opel-klapsleutel met vier knoppen op 433 MHz, met ID46-transponder en HU100-baard. De vierde knop bedient bij veel modellen de achterklep.',
  'funkschluessel-kompatibel-fuer-opel-opr131':
    'Klapsleutel met twee knoppen op 433 MHz voor de Opel Corsa D en Meriva B, met HITAG2 7941-transponder en HU100-baard.',
  'funkschluessel-kompatibel-fuer-opel-opr124iea':
    'Opel-afstandsbediening met twee knoppen op 433 MHz, met PCF7941-transponder. Vergelijk de vorm met uw huidige sleutel.',
  'funkschluessel-kompatibel-fuer-opel-opr127iea': `Opel-klapsleutel met drie knoppen, met ID46-transponder en HU100-baard. ${US}`,
  'funkschluessel-kompatibel-fuer-opel-opr119iea':
    'Smart key met drie knoppen op 433 MHz voor de Opel Insignia, met PCF7952-transponder. Voor keyless openen en starten, na inleren op uw auto.',
  'funkschluessel-kompatibel-fuer-opel-opr110iea':
    'Klapsleutel met twee knoppen op 433 MHz voor de Astra J, Insignia, Adam, Zafira C, Corsa E en Mokka, en de Chevrolet Orlando, met HU100-baard. Breed toepasbaar binnen deze generatie Opels.',

  /* ── Opel: housings ── */
  'hu43at-schluesselkopf-kompatibel-fuer-opel':
    'Sleutelkop met HU43-baard voor oudere Opels. Voor als de kop van uw sleutel is afgebroken; u zet de transponder over en laat de baard frezen.',
  'funkschluessel-gehaeuse-kompatibel-fuer-opel-oprc116':
    'Behuizing met twee knoppen voor de Opel-klapsleutel, met HU100-baard. Zet de printplaat over en laat de baard op uw slot frezen.',
  'funkschluessel-gehaeuse-kompatibel-fuer-opel-oprc109':
    'Behuizing met drie knoppen voor de Opel-klapsleutel met HU100-profiel. Voor een gebroken kast of versleten knoppen.',
  'funkschluessel-gehaeuse-kompatibel-fuer-opel-oprc105':
    'Behuizing met twee knoppen voor Opel, met HU100-baard. De elektronica uit uw oude sleutel past erin.',
  'funkschluessel-gehaeuse-kompatibel-fuer-opel-oprc106':
    'Behuizing met drie knoppen voor Opel, met HU100-baard. Een voordelige reparatie als alleen de buitenkant kapot is.',
  'funkschluessel-gehaeuse-kompatibel-fuer-opel-oprc101':
    'Behuizing met twee knoppen voor Opel, zonder baard: u zet de baard uit uw huidige sleutel over, zodat er niets gefreesd hoeft te worden.',
  'funkschluessel-gehaeuse-kompatibel-fuer-opel-oprc103':
    'Behuizing met drie knoppen voor Opel, zonder baard. Printplaat én baard gaan uit uw oude sleutel over.',
  'funkschluessel-gehaeuse-kompatibel-fuer-opel-oprc114':
    'Behuizing met vijf knoppen voor Opel, met HU100-baard. Voor sleutels met extra functies zoals schuifdeuren of achterklep — vergelijk de indeling met uw sleutel.',
  'funkschluessel-gehaeuse-kompatibel-fuer-opel-oprc156':
    'Behuizing voor de Opel-sleutel. Leg hem naast uw huidige sleutel om vorm en knoppen te vergelijken, of stuur ons een foto.',
  'funkschluessel-gehaeuse-kompatibel-fuer-opel-oprc154':
    'Behuizing voor de Opel-sleutel. Uw eigen elektronica gaat erin over; programmeren is niet nodig.',
  'funkschluessel-gehaeuse-kompatibel-fuer-opel-oprc151':
    'Behuizing met twee knoppen voor de Opel-klapsleutel, met HU100-baard.',
  'funkschluessel-gehaeuse-kompatibel-fuer-opel-oprc150':
    'Behuizing met twee knoppen voor de Opel-klapsleutel met HU46-profiel, zoals bij de Astra G en H en Corsa C.',
  'funkschluessel-gehaeuse-kompatibel-fuer-opel-oprc113':
    'Behuizing met vier knoppen voor de Opel-klapsleutel, met HU100-baard.',
  'funkschluessel-gehaeuse-kompatibel-fuer-opel-oprc152':
    'Behuizing voor de Opel-sleutel. Een nieuwe kast voor een sleutel waarvan de elektronica nog werkt.',
  'funkschluessel-gehaeuse-kompatibel-fuer-opel-oprc108':
    'Behuizing met twee knoppen voor de Opel-klapsleutel met HU100-profiel. Overzetten en laten frezen.',
  'funkschluessel-gehaeuse-kompatibel-fuer-opel-oprc107':
    'Behuizing met twee knoppen voor Opel, met HU100-baard. Vergelijk de vorm van de knoppen met uw huidige sleutel.',

  /* ── Renault & Dacia: complete keys ── */
  'funkschluessel-kompatibel-fuer-renault-rnr101hu179':
    'Renault-klapsleutel met twee knoppen op 433 MHz, met de nieuwe HITAG AES-transponder (7961M) en HU179-baard. Voor de nieuwere Renault- en Dacia-generatie; inleren is nodig.',
  'funkschluessel-kompatibel-fuer-renault-rnr101va2':
    'Renault-klapsleutel met twee knoppen op 433 MHz, met HITAG AES-transponder (7961M) en VA2-baard. Kies deze uitvoering als uw slot het VA2-profiel heeft.',
  'funkschluessel-kompatibel-fuer-renault-rnr101hu136':
    'Renault-klapsleutel met twee knoppen op 433 MHz, met HITAG AES-transponder (7961M) en HU136-baard. Kies het profiel dat overeenkomt met uw huidige sleutel.',
  'funkschluessel-kompatibel-fuer-renault-rnr101vac102':
    'Renault-klapsleutel met twee knoppen op 433 MHz, met HITAG AES-transponder (7961M) en VAC102-baard. Wordt gefreesd en op uw auto ingeleerd.',
  'funkschluessel-kompatibel-fuer-renault-rnr121':
    'Afstandsbediening met drie knoppen op 433 MHz voor de Renault Trafic/Talento-generatie (2014–2016) en verwante Nissan-modellen, met HITAG2 46-transponder. Te frezen en in te leren.',
  'funkschluessel-kompatibel-fuer-renault-rnr120':
    'Afstandsbediening met drie knoppen op 433 MHz met VA2-baard, voor een breed rijtje: Renault Mégane III, Fluence, Scénic, Trafic II, Dacia Sandero, Logan en Duster, Opel Movano en Mercedes-Benz Citan. Wordt gefreesd en ingeleerd.',
  'funkschluessel-kompatibel-fuer-renault-rnr126iea':
    'Afstandsbediening met drie knoppen op 433 MHz voor de Renault Fluence, Mégane 3, Scénic 3 en Latitude, met ID46-transponder (PCF7961) en VA2-baard.',
  'funkschluessel-kompatibel-fuer-renault-rnr117-hu179':
    'Klapsleutel met twee knoppen op 433 MHz voor Renault en Dacia, met HITAG AES-transponder. Het baardprofiel kiest u bij de bestelling; deze uitvoering is voor HU179.',
  'funkschluessel-kompatibel-fuer-renault-rnr117-hu142':
    'Klapsleutel met twee knoppen op 433 MHz voor Renault en Dacia, met HITAG AES-transponder, in de uitvoering voor het HU142-profiel.',
  'funkschluessel-kompatibel-fuer-renault-rnr116-hu179':
    'Klapsleutel met drie knoppen op 433 MHz voor Renault en Dacia, met HITAG AES-transponder (7961M), uitvoering HU179. Te frezen en in te leren.',
  'funkschluessel-kompatibel-fuer-renault-rnr116-hu136-hu142':
    'Klapsleutel met drie knoppen op 433 MHz voor Renault en Dacia, met HITAG AES-transponder, uitvoering voor HU136/HU142.',
  'funkschluessel-kompatibel-fuer-renault-rnr116-vac102':
    'Klapsleutel met drie knoppen op 433 MHz voor Renault en Dacia, met HITAG AES-transponder, uitvoering voor het VAC102-profiel.',
  'funkschluessel-kompatibel-fuer-renault-rnr116-nsn11':
    'Klapsleutel met drie knoppen op 433 MHz voor Renault en Dacia, met HITAG AES-transponder, uitvoering voor het NSN11-profiel.',
  'funkschluessel-kompatibel-fuer-renault-rnr117-hu179_1':
    'Klapsleutel met twee knoppen op 433 MHz voor Renault en Dacia, met HITAG AES-transponder (7961M). Het baardprofiel kiest u passend bij uw slot.',
  'funkschluessel-kompatibel-fuer-renault-rnr111':
    'Renault-klapsleutel met drie knoppen op 433 MHz, met HITAG AES-transponder en HU179-baard, voor de nieuwere modellen.',
  'funkschluessel-kompatibel-fuer-renault-rnr110':
    'Afstandsbediening met één knop op 433 MHz voor Renault en Dacia, met PCF7946-transponder en VAC102-baard. Voor bedrijfswagens en eenvoudige uitvoeringen met alleen centrale vergrendeling.',
  'funkschluessel-kompatibel-fuer-renault-rnr113':
    'Smart key met drie knoppen op 433 MHz voor de Renault Scénic II en Mégane II, met HITAG2-transponder en noodsleutel. Inleren op de auto is nodig.',
  'funkschluessel-kompatibel-fuer-renault-rnr104':
    'Smart key met twee knoppen op 433 MHz voor de Renault Alaskan, met HITAG2 46-transponder. Wordt op uw pick-up ingeleerd.',
  'funkschluessel-kompatibel-fuer-renault-rnr149':
    'Afstandsbediening met drie knoppen op 433 MHz voor de Dacia Logan en Renault Symbol, met HITAG AES-transponder en VA2-baard.',
  'funkschluessel-kompatibel-fuer-renault-rnr155iea':
    'Renault-klapsleutel met drie knoppen op 433 MHz, met HITAG AES-transponder (7961M) en VAC102-baard.',
  'funkschluessel-kompatibel-fuer-renault-rnr154iea':
    'Renault-klapsleutel met drie knoppen op 433 MHz, met HITAG AES-transponder (7961M) en HYN17-baard. Vergelijk het profiel met uw huidige sleutel.',
  'funkschluessel-kompatibel-fuer-renault-rnr144iea':
    'Afstandsbediening met vier knoppen op 433 MHz voor Renault, met HITAG AES-transponder en VA2/VA6-baard. De vierde knop is meestal voor de achterklep.',
  'funkschluessel-kompatibel-fuer-renault-rnr143iea':
    'Afstandsbediening met vier knoppen op 433 MHz voor de Renault Mégane III, Fluence, Scénic III en Latitude, met PCF7961-transponder en VA2/VA6-baard.',
  'funkschluessel-kompatibel-fuer-renault-rnr133iea':
    'Smart key met vier knoppen op 433 MHz voor de Renault Clio 4, Mégane 4, Captur en Trafic, met AES-transponder (PCF7953M) en VA2/VA6-noodsleutel. Inleren via de diagnose-aansluiting.',
  'funkschluessel-kompatibel-fuer-renault-rnr125iea':
    'Renault-afstandsbediening met twee knoppen op 433 MHz, met HITAG2 46-transponder (PCF7947) en VA2/VA6-baard.',
  'funkschluessel-kompatibel-fuer-renault-rnr119':
    'Afstandsbediening met twee knoppen op 433 MHz voor de Renault Laguna II, met PCF7947-transponder en VA2/VA6-baard.',
  'funkschluessel-kompatibel-fuer-renault-rnr126':
    'Afstandsbediening met drie knoppen op 433 MHz voor de Renault Scénic 3 en Latitude, met ID46-transponder en VA2-baard.',
  'funkschluessel-kompatibel-fuer-renault-rnr115e':
    'Smart key met vier knoppen op 433 MHz voor Renault, met PCF7952A-transponder en VA2/VA6-noodsleutel.',
  'funkschluessel-kompatibel-fuer-renault-rnr114':
    'Afstandsbediening met drie knoppen op 433 MHz voor de Renault Mégane II, met PCF7947-transponder en VA2/VA6-baard.',
  'funkschluessel-kompatibel-fuer-renault-rnr108':
    'Afstandsbediening met twee knoppen op 433 MHz voor Renault en Dacia, met PCF7946-transponder en NE73-baard, het profiel van oudere modellen.',
  'funkschluessel-kompatibel-fuer-renault-rnr106':
    'Afstandsbediening met drie knoppen op 433 MHz voor de Renault Clio III, Kangoo III en Modus, met PCF7947-transponder.',
  'funkschluessel-kompatibel-fuer-renault-rnr105':
    'Afstandsbediening met drie knoppen op 433 MHz voor de Dacia Sandero, Logan en Duster en de Opel Movano, met PCF7946-transponder en NE73-baard.',
  'funkschluessel-kompatibel-fuer-renault-rnr101':
    'Renault-klapsleutel met twee knoppen op 433 MHz, met HITAG AES-transponder (7961M), voor de nieuwere modellen. Kies het baardprofiel bij uw slot.',
  'funkschluessel-kompatibel-fuer-renault-rnr103':
    'Afstandsbediening met twee knoppen voor de Renault Master, Trafic en Kangoo. Vergelijk de vorm met uw huidige sleutel.',
  'funkschluessel-kompatibel-fuer-renault-rnr102':
    'Afstandsbediening met één knop op 433 MHz voor Renault en Dacia, met PCF7946-transponder en NE73-baard.',

  /* ── Renault & Dacia: housings ── */
  'funkschluessel-gehaeuse-kompatibel-fuer-renault-dacia-rnrc125':
    'Behuizing met drie knoppen voor Renault en Dacia, ook voor de Opel Vivaro en Renault Master, met HU93-baard. Zet de printplaat over en laat de baard frezen.',
  'funkschluessel-gehaeuse-kompatibel-fuer-renault-rnrc159':
    'Behuizing met vier knoppen voor de Renault-sleutelkaart, inclusief VA2-noodsleutel. Voor een kaart waarvan de kast gescheurd of de knoppen versleten zijn.',
  'funkschluessel-gehaeuse-kompatibel-fuer-renault-dacia-rnrc122':
    'Behuizing met twee knoppen voor Renault en Dacia, ook voor de Vivaro en Master, met VAC102-baard.',
  'funkschluessel-gehaeuse-kompatibel-fuer-renault-dacia-rnrc121':
    'Behuizing met twee knoppen voor Renault en Dacia, met VAC102-baard. Vergelijk de knopvorm met uw huidige sleutel; er zijn meerdere uitvoeringen.',
  'funkschluessel-gehaeuse-kompatibel-fuer-renault-rnrc110':
    'Behuizing met één knop voor Renault, met VAC102-baard. Voor eenvoudige sleutels met alleen centrale vergrendeling.',
  'funkschluessel-gehaeuse-kompatibel-fuer-renault-dacia-rnrc119':
    'Behuizing met twee knoppen voor Renault en Dacia, met ongefreesde VAC102-baard.',
  'funkschluessel-gehaeuse-kompatibel-fuer-renault-dacia-rnrc118':
    'Behuizing met drie knoppen voor Renault en Dacia, met VAC102-baard. Uw printplaat gaat erin over.',
  'funkschluessel-gehaeuse-kompatibel-fuer-renault-rnrc117':
    'Behuizing met vier knoppen voor de Renault Koleos en Scénic, zonder baard: u zet de baard uit uw huidige sleutel over.',
  'funkschluessel-gehaeuse-kompatibel-fuer-renault-dacia-rnrc115':
    'Behuizing met twee knoppen voor Renault en Dacia, zonder baard. Printplaat en baard gaan uit uw oude sleutel over.',
  'funkschluessel-gehaeuse-kompatibel-fuer-renault-dacia-rnrc116':
    'Behuizing met drie knoppen voor Renault en Dacia, zonder baard. U hergebruikt uw eigen baard, dus er hoeft niets gefreesd te worden.',
  'funkschluessel-gehaeuse-kompatibel-fuer-renault-rnrc112':
    'Behuizing met drie knoppen voor Renault, zonder baard. Voor een snelle reparatie van een gebroken kast.',
  'funkschluessel-gehaeuse-kompatibel-fuer-renault-rnrc114':
    'Behuizing met drie knoppen voor Renault, met VA2-baard.',
  'funkschluessel-gehaeuse-kompatibel-fuer-renault-rnrc105':
    'Behuizing met twee knoppen voor oudere Renaults, met NE73-baard.',
  'funkschluessel-gehaeuse-kompatibel-fuer-renault-rnrc107':
    'Behuizing met drie knoppen voor oudere Renaults, met NE73-baard. Zet de printplaat over en laat de baard frezen.',
  'funkschluessel-gehaeuse-kompatibel-fuer-renault-rnrc104':
    'Behuizing met twee knoppen voor Renault, met VA2-baard.',
  'funkschluessel-gehaeuse-kompatibel-fuer-renault-rnrc106':
    'Behuizing met drie knoppen voor Renault, met VA2-baard. Een nieuwe kast voor een sleutel waarvan de elektronica nog werkt.',
  'funkschluessel-gehaeuse-kompatibel-fuer-renault-rnrc102':
    'Behuizing met één knop voor oudere Renaults, met NE73-baard.',
  'funkschluessel-gehaeuse-kompatibel-fuer-renault-rnrc101':
    'Behuizing met één knop voor de Renault Twingo, Mégane, Scénic en Laguna van de eerste generaties, met NE73-baard.',
  'funkschluessel-gehaeuse-kompatibel-fuer-renault-rnrc151':
    'Behuizing met twee knoppen voor Renault, met NE73-baard.',
  'funkschluessel-gehaeuse-kompatibel-fuer-renault-rnrc113':
    'Behuizing met twee knoppen voor Renault, met VA2-baard. Vergelijk de vorm met uw huidige sleutel.',
  'funkschluessel-gehaeuse-kompatibel-fuer-renault-rnrc111':
    'Behuizing met twee knoppen voor Renault, zonder baard. U zet uw eigen baard en printplaat over.',
  'funkschluessel-gehaeuse-kompatibel-fuer-renaut-rnrc152':
    'Behuizing met twee knoppen voor de Renault Clio, Kangoo en Scénic, met NE73-baard.',
  'funkschluessel-gehaeuse-kompatibel-fuer-renault-rnrc109':
    'Behuizing met één knop voor Renault, met NE73-baard.',
  'funkschluessel-gehaeuse-kompatibel-fuer-renault-rnrc103':
    'Behuizing met twee knoppen voor de Renault Trafic, Master en Kangoo en de Opel Movano, zonder baard. Uw eigen baard gaat erin over.',
  'funkschluessel-gehaeuse-kompatibel-fuer-renault-rnrc108':
    'Behuizing met drie knoppen voor de sleutelkaart van de Renault Mégane II, inclusief VA2-noodsleutel. Zet de print over in de nieuwe kaart.',
};

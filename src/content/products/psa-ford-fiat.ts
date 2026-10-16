/** Peugeot, Citroën, Ford, Fiat — own copy per article. See ../productCopy.ts. */
const ASK_FSK =
  'Peugeot en Citroën gebruiken twee soorten signaal, ASK en FSK; de sleutel moet hetzelfde type hebben als uw auto. Weet u het niet, stuur ons een foto van uw sleutel of uw kenteken.';
const US_FORD = 'Let op: dit is een uitvoering voor de Amerikaanse markt. Een Ford die in Europa is verkocht gebruikt vrijwel altijd 433 MHz.';
const NO_BATTERY_BAY =
  'Uitvoering zonder batterijvak in de behuizing: de batterij zit op de printplaat, zoals bij uw originele sleutel van dit type.';
const BATTERY_BAY = 'Uitvoering met batterijvak: de batterij zit in een vakje in de behuizing, niet op de printplaat.';

export const PSA_FORD_FIAT: Record<string, string> = {
  /* ── Peugeot & Citroën: complete keys ── */
  'funkschluessel-3-tasten-kompatibel-fuer-peugeot-citroen-cpr124-fsk':
    `Klapsleutel met drie knoppen op 433 MHz voor Peugeot en Citroën, met HITAG2 46-transponder (PCF7961) en HU83-baard, in FSK-uitvoering. ${ASK_FSK}`,
  'funkschluessel-3-tasten-kompatibel-fuer-peugeot-citroen-cpr124-ask':
    `Klapsleutel voor Peugeot en Citroën op 433 MHz met HITAG2 46-transponder en HU83-baard, in ASK-uitvoering. ${ASK_FSK}`,
  'funkschluessel-2-tasten-kompatibel-fuer-peugeot-citroen-cpr120-mit-fsk':
    `Klapsleutel met twee knoppen voor Peugeot en Citroën, met PCF7961-transponder, in FSK-uitvoering. ${ASK_FSK}`,
  'funkschluessel-2-tasten-kompatibel-fuer-peugeot-citroen-cpr120-mit-ask':
    `Klapsleutel met twee knoppen voor Peugeot en Citroën, met PCF7961-transponder, in ASK-uitvoering. ${ASK_FSK}`,
  'funkschluessel-kompatibel-fuer-peugeot-citroen-pgr102-ask':
    `Klapsleutel met vier knoppen op 433 MHz voor Peugeot en Citroën, met ID46-transponder (PCF7941A) en HU83-baard, ASK-uitvoering. ${ASK_FSK}`,
  'funkschluessel-kompatibel-fuer-peugeot-citroen-pgr102-fsk':
    `Klapsleutel met vier knoppen op 433 MHz voor Peugeot en Citroën, met ID46-transponder en HU83-baard, FSK-uitvoering. ${ASK_FSK}`,
  'funkschluessel-3-tasten-kompatibel-fuer-peugeot-citroen-cpr123-ask':
    `Klapsleutel met drie knoppen voor Peugeot en Citroën, met PCF7961-transponder, ASK-uitvoering. ${ASK_FSK}`,
  'funkschluessel-2-tasten-kompatibel-fuer-peugeot-citroen-cpr119':
    `Afstandsbediening met twee knoppen voor Peugeot en Citroën, met PCF7941-transponder, ASK-uitvoering. ${ASK_FSK}`,
  'funkschluessel-2-tasten-kompatibel-fuer-peugeot-citroen-cpr121iea':
    'Klapsleutel met twee knoppen op 433 MHz voor Peugeot en Citroën, met PCF7941-transponder en VA2-baard, het profiel van onder meer de 206, 307 en Berlingo. Te frezen en in te leren.',
  'funkschluessel-kompatibel-fuer-citroen-ctr151':
    'Afstandsbediening met twee knoppen op 434 MHz voor Citroën en Peugeot, met PCF7961-transponder (Type 8). Vergelijk de vorm met uw huidige sleutel.',

  /* ── Peugeot & Citroën: housings ── */
  'deckel-fuer-peugeot-opel-smartkey-2er-pack':
    'Twee vervangende klepjes voor de smart key van Peugeot en Opel. Voor als het klepje van uw sleutel los of kwijt is — de sleutel zelf blijft gewoon werken.',
  'funkschluessel-gehaeuse-kompatibel-fuer-peugeot-pgrc110':
    'Behuizing met drie knoppen voor Peugeot en verwante Opel-modellen, met VA2-baard. Zet de printplaat over en laat de baard frezen.',
  'funkschluessel-gehaeuse-kompatibel-fuer-peugeot-pgrc109':
    'Behuizing met twee knoppen voor Peugeot en Opel, met VA2-baard.',
  'funkschluessel-gehaeuse-kompatibel-fuer-peugeot-pgrc106':
    'Behuizing met drie knoppen voor Peugeot en Opel, met HU83-baard, het profiel van onder meer de 207 en 308.',
  'funkschluessel-gehaeuse-kompatibel-fuer-peugeot-pgrc105':
    'Behuizing met drie knoppen voor Peugeot en Opel, met HU83-baard. Vergelijk de knopindeling met uw huidige sleutel; er zijn meerdere varianten.',
  'funkschluessel-gehaeuse-kompatibel-fuer-peugeot-pgrc102':
    'Behuizing voor Peugeot en Opel. Leg hem naast uw sleutel of stuur ons een foto, dan bevestigen wij de juiste uitvoering.',
  'funkschluessel-gehaeuse-kompatibel-fuer-peugeot-pgrc112':
    'Behuizing met vier knoppen voor Peugeot, met VA2-baard.',
  'funkschluessel-gehaeuse-kompatibel-fuer-pegueot-pgrc103':
    'Behuizing voor Citroën en Peugeot. Zet de elektronica over uit uw huidige sleutel; programmeren is niet nodig.',
  'gehaeuse-umbausatz-kompatibel-fuer-peugeot-pgrc108-obatteriefach-va2':
    `Ombouwbehuizing met twee knoppen voor Peugeot, met VA2-baard. ${NO_BATTERY_BAY}`,
  'funkschluessel-gehaeuse-kompatibel-fuer-peugeot-pgrc101':
    'Behuizing met twee knoppen voor Peugeot, zonder baard: uw eigen baard gaat erin over.',
  'gehaeuse-kompatibel-fuer-citroen-ctrc117-obatteriefach-va2':
    `Behuizing met twee knoppen voor Citroën, met VA2-baard. ${NO_BATTERY_BAY}`,
  'gehaeuse-kompatibel-fuer-citroen-ctrc114-obatteriefach-hu83':
    `Behuizing met twee knoppen voor Citroën met HU83-profiel. ${NO_BATTERY_BAY}`,
  'gehaeuse-kompatibel-fuer-citroen-ctrc104-mbatteriefach-va2':
    `Behuizing met twee knoppen voor Citroën, met VA2-baard. ${BATTERY_BAY}`,
  'gehaeuse-kompatibel-fuer-citroen-ctrc116-obatteriefach-va2':
    `Behuizing met drie knoppen voor Citroën en Peugeot, met VA2-baard. ${NO_BATTERY_BAY}`,
  'gehaeuse-kompatibel-fuer-citroen-ctrc108-obatteriefach':
    `Behuizing met twee knoppen voor Citroën en Peugeot, zonder baard. ${NO_BATTERY_BAY}`,
  'gehaeuse-kompatibel-fuer-citroen-ctrc112-obatteriefach-va2':
    `Behuizing met twee knoppen voor Citroën en Peugeot, met VA2-baard. ${NO_BATTERY_BAY}`,
  'gehaeuse-kompatibel-fuer-citroen-ctrc109-obatteriefach-sx9':
    `Behuizing met één knop voor oudere Citroëns, met SX9-baard, het profiel van onder meer de Xsara en Berlingo van de eerste generatie. ${NO_BATTERY_BAY}`,
  'gehaeuse-kompatibel-fuer-citroen-ctrc118-mbatteriefach-hu83':
    `Behuizing met drie knoppen voor Citroën, met HU83-baard. ${BATTERY_BAY}`,
  'gehaeuse-kompatibel-fuer-citroen-ctrc101-obatteriefach-ne73':
    `Behuizing met twee knoppen voor oudere Citroëns, met NE73/NE72-baard. ${NO_BATTERY_BAY}`,
  'gehaeuse-kompatibel-fuer-citroen-ctrc102-obatteriefach-hu83':
    `Behuizing met twee knoppen voor Citroën, met HU83-baard. ${NO_BATTERY_BAY}`,
  'gehaeuse-kompatibel-fuer-citroen-ctrc150-obatteriefach-sx9':
    `Behuizing met twee knoppen voor Citroën, met SX9-baard. ${NO_BATTERY_BAY}`,
  'gehaeuse-umbausatz-kompatibel-fuer-citroen-ctrc107-obatteriefach-ne72':
    `Ombouwbehuizing met twee knoppen voor Citroën en Peugeot, met NE72-baard. ${NO_BATTERY_BAY}`,
  'gehaeuse-kompatibel-fuer-citroen-ctrc103-mbatteriefach-hu83':
    `Behuizing met twee knoppen voor Citroën, met HU83-baard. ${BATTERY_BAY}`,
  'gehaeuse-kompatibel-fuer-citroen-ctrc111-mbatteriefach-ne73':
    `Behuizing met twee knoppen voor oudere Citroëns, met NE73-baard. ${BATTERY_BAY}`,
  'gehaeuse-kompatibel-fuer-citroen-ctrc110-obatteriefach-sx9':
    `Behuizing met drie knoppen voor Citroën, met SX9-baard. ${NO_BATTERY_BAY}`,
  'gehaeuse-kompatibel-fuer-citroen-ctrc105-obatteriehalter-sx9':
    'Behuizing met twee knoppen voor Citroën, met SX9-baard, zonder batterijhouder. Kijk in uw huidige sleutel waar de batterij zit voordat u kiest.',
  'gehaeuse-kompatibel-fuer-citroen-ctrc115-mbatteriefach-va2':
    `Behuizing met drie knoppen voor Citroën, met VA2-baard. ${BATTERY_BAY}`,
  'gehaeuse-kompatibel-fuer-citroen-ctrc106-obatteriefach-sx9':
    `Behuizing met twee knoppen voor Citroën en Peugeot, met SX9-baard. ${NO_BATTERY_BAY}`,

  /* ── Ford: complete keys ── */
  'funkschluessel-kompatibel-fuer-ford-for106iea':
    'Afstandsbediening met drie knoppen op 433 MHz voor oudere Fords, met DST Plus 63-transponder en FO21-baard. Te frezen en in te leren.',
  'funkschluessel-kompatibel-fuer-ford-for120-or':
    'Smart key met drie knoppen voor Ford, met HITAG Pro-transponder (PCF7953P). De HU101-noodsleutel zit er niet bij en bestelt u apart.',
  'funkschluessel-kompatibel-fuer-ford-for123':
    'Afstandsbediening met drie knoppen op 433 MHz voor de Ford Transit/Tourneo Custom vanaf 2020, met 47-transponder. Wordt op uw bus ingeleerd.',
  'funkschluessel-kompatibel-fuer-ford-for104-or':
    'Afstandsbediening met drie knoppen op 433 MHz voor Ford. De baard zit er niet bij: u zet uw eigen baard over of bestelt hem los.',
  'funkschluessel-kompatibel-fuer-ford-for122': `Smart key met vier knoppen voor Ford, met HITAG Pro-transponder en HU101-noodsleutel, op 902 MHz. ${US_FORD}`,
  'funkschluessel-kompatibel-fuer-ford-for119': `Smart key met vier knoppen voor de Fusion, Explorer en Mustang (2017–2019), met ID49-transponder, op 315 MHz. ${US_FORD}`,
  'funkschluessel-kompatibel-fuer-ford-for118': `Smart key met vijf knoppen voor de Ford Edge en Fusion, op 902 MHz. ${US_FORD}`,
  'funkschluessel-kompatibel-fuer-ford-for103': `Afstandsbediening met vier knoppen voor de Focus, Taurus en Mustang, met 4D63-transponder en FO40-baard, op 315 MHz. ${US_FORD}`,
  'funkschluessel-kompatibel-fuer-ford-for109':
    'Afstandsbediening met drie knoppen op 433 MHz voor Ford, met DST 80-transponder en HU101-baard. Te frezen en in te leren.',
  'funkschluessel-kompatibel-fuer-ford-for114':
    'Afstandsbediening met drie knoppen op 433 MHz voor Ford, met HITAG Pro-transponder (PCF7945P).',
  'funkschluessel-kompatibel-fuer-ford-for108':
    'Smart key voor Ford-modellen met KeylessGo, op 433,92 MHz. Inleren op uw auto is nodig.',
  'funkschluessel-kompatibel-mit-ford-for117':
    'Smart key met drie knoppen op 433 MHz voor Ford, met HITAG Pro-transponder en HU101-noodsleutel.',
  'funkschluessel-kompatibel-fuer-ford-for102':
    'Afstandsbediening met drie knoppen op 433 MHz voor de Ford Edge, Mondeo, Fusion, Explorer en Mustang, met ID49-transponder (PCF7953P).',
  'funkschluessel-kompatibel-fuer-ford-for121':
    'Afstandsbediening op 433 MHz voor Ford. Vergelijk de vorm en het aantal knoppen met uw huidige sleutel, of stuur ons een foto.',
  'funkschluessel-kompatibel-fuer-ford-for151':
    'Smart key met drie knoppen op 433 MHz voor Ford-modellen met keyless entry, zoals de Mondeo en Focus, met HITAG Pro-transponder en noodsleutel.',
  'funkschluessel-kompatibel-fuer-ford-for115':
    'Afstandsbediening met drie knoppen op 433 MHz voor Ford, met HITAG Pro-transponder (PCF7945P).',
  'funkschluessel-kompatibel-fuer-ford-for101':
    'Afstandsbediening met drie knoppen op 433 MHz voor oudere Fords, met ID60-transponder en FO21-baard.',
  'funkschluessel-kompatibel-fuer-ford-for113':
    'Afstandsbediening met vijf knoppen op 433 MHz voor de Focus, Edge, Escape, Explorer, Taurus en Flex (2011–2016), met HU101-baard.',
  'funkschluessel-kompatibel-fuer-ford-for111':
    'Afstandsbediening met drie knoppen op 433 MHz voor de Ford Transit Custom en Tourneo (2012–2016), met DST 80-transponder en HU101-baard.',
  'funkschluessel-kompatibel-fuer-ford-for105':
    'Afstandsbediening met drie knoppen voor Ford. De HU101-baard zit er niet bij; u gebruikt uw eigen baard of bestelt hem los.',
  'funkschluessel-kompatibel-fuer-ford-for150':
    'Afstandsbediening op 433 MHz voor Ford, met PCF7945P-transponder.',
  'funkschluessel-kompatibel-fuer-ford-for104':
    'Afstandsbediening met drie knoppen op 433 MHz voor de Ford S-Max, Mondeo, Galaxy, Focus en Fiesta, met 4D63-transponder en HU101-baard.',

  /* ── Ford: housings ── */
  'funkschluessel-gehaeuse-kompatibel-fuer-ford-forc103':
    'Behuizing met drie knoppen voor de Ford-klapsleutel, met HU101-baard, het profiel van onder meer de Focus, Fiesta en Kuga.',
  'funkschluessel-gehaeuse-kompatibel-fuer-ford-forc114':
    'Behuizing met twee knoppen voor Ford, met HU101-baard.',
  'funkschluessel-gehaeuse-kompatibel-fuer-ford-forc113':
    'Behuizing met drie knoppen voor Ford, met HU101-baard. Vergelijk de knopvorm met uw sleutel; er zijn meerdere uitvoeringen.',
  'funkschluessel-gehaeuse-kompatibel-fuer-ford-forc112':
    'Behuizing met drie knoppen voor Ford, met HU101-baard.',
  'funkschluessel-gehaeuse-kompatibel-fuer-ford-forc115':
    'Behuizing met drie knoppen voor Ford-modellen met SIP22-profiel, zoals de Ka.',
  'funkschluessel-gehaeuse-kompatibel-fuer-ford-forc111':
    'Behuizing met drie knoppen voor Ford, zonder baard: u zet uw eigen baard over.',
  'funkschluessel-gehaeuse-kompatibel-fuer-ford-forc110':
    'Behuizing met twee knoppen voor Ford, met HU101-baard.',
  'funkschluessel-gehaeuse-kompatibel-fuer-ford-forc109':
    'Behuizing met drie knoppen voor Ford, met HU101-baard.',
  'funkschluessel-gehaeuse-kompatibel-fuer-ford-forc106':
    'Behuizing met drie knoppen voor de Ford-klapsleutel, met HU101-baard. Een gebroken scharnier of versleten knoppen los je hiermee op.',
  'funkschluessel-gehaeuse-kompatibel-fuer-ford-forc108':
    'Behuizing met vier knoppen voor Ford, met HU101-baard.',
  'fork100t-schluesselkopf-kompatibel-fuer-ford':
    'Sleutelkop voor Ford, voor als de kop van uw sleutel is afgebroken. U zet de transponder over.',
  'funkschluessel-gehaeuse-kompatibel-fuer-ford-forc105':
    'Behuizing met drie knoppen voor Ford, met HU101-baard.',
  'funkschluessel-gehaeuse-kompatibel-fuer-ford-forc151':
    'Behuizing met drie knoppen voor Ford, met HU101-baard.',
  'funkschluessel-gehaeuse-kompatibel-fuer-ford-forc152':
    'Behuizing met drie knoppen voor oudere Fords, met FO21-baard, zoals de Focus I, Fiesta en Transit van die generatie.',
  'funkschluessel-gehaeuse-kompatibel-fuer-ford-forc153':
    'Behuizing met drie knoppen voor oudere Fords, met FO21-baard.',
  'funkschluessel-gehaeuse-kompatibel-fuer-ford-forc154':
    'Behuizing met vijf knoppen voor Ford, met FO40R-baard, een profiel van Amerikaanse modellen.',
  'funkschluessel-gehaeuse-kompatibel-fuer-ford-forc104':
    'Behuizing met drie knoppen voor Ford, met FO38R-baard, een profiel van Amerikaanse modellen.',
  'funkschluessel-gehaeuse-kompatibel-fuer-ford-forc102':
    'Behuizing met drie knoppen voor Ford, zonder baard.',
  'funkschluessel-gehaeuse-kompatibel-fuer-ford-forc150':
    'Behuizing met drie knoppen voor Ford, met HU101-baard.',
  'funkschluessel-gehaeuse-kompatibel-fuer-ford-forc101':
    'Behuizing met drie knoppen voor Ford, zonder baard. Uw eigen printplaat en baard gaan erin over.',

  /* ── Fiat: complete keys ── */
  'funkschluessel-kompatibel-fuer-fiat-fir130or':
    'Afstandsbediening met drie knoppen op 433 MHz voor de Fiat Ducato, met HITAG AES-transponder (NCF2960M) en SIP22-baard. Voor de nieuwere Ducato-generatie.',
  'funkschluessel-kompatibel-mit-fiat-fir123x':
    'Smart key met vier knoppen op 433 MHz voor de Jeep Compass (2014–2022) en verwante Fiat- en Chrysler-modellen, met HITAG AES 4A-transponder.',
  'funkschluessel-kompatibel-mit-fiat-fir106':
    'Klapsleutel met drie knoppen op 433 MHz voor Fiat, met HITAG AES-transponder en CY24-baard.',
  'funkschluessel-kompatibel-mit-fiat-fir121':
    'Klapsleutel met drie knoppen op 433 MHz voor Fiat, met PCF7945A-transponder en CY24-baard.',
  'funkschluessel-kompatibel-fuer-fiat-fir134':
    'Klapsleutel met drie knoppen op 433 MHz met ID46-transponder en SIP22-baard, voor een breed rijtje: Fiat Doblò, Fiorino, Grande Punto en MiTo, Peugeot Bipper, Citroën Nemo en Opel Combo.',
  'funkschluessel-kompatibel-fuer-fiat-fir129e':
    'Klapsleutel met drie knoppen op 433 MHz voor de Fiat Tipo, 500X en Jeep Renegade, met Megamos AES-transponder en SIP22-baard.',
  'funkschluessel-kompatibel-fuer-fiat-fir119':
    'Smart key voor Fiat op 433 MHz met HITAG2-transponder. Vergelijk de vorm met uw huidige sleutel.',
  'funkschluessel-kompatibel-mit-fiat-fir118':
    'Smart key voor Fiat op 433 MHz met HITAG2-transponder.',
  'funkschluessel-kompatibel-mit-fiat-fir117e':
    'Afstandsbediening voor Fiat op 433 MHz met HITAG2-transponder.',
  'funkschluessel-kompatibel-fuer-fiat-fir102':
    'Afstandsbediening met drie knoppen op 433 MHz voor de Fiat Fiorino, Peugeot Bipper en Citroën Nemo, met Delphi PCF7946-transponder en SIP22-baard.',
  'funkschluessel-kompatibel-fuer-fiat-fir116e':
    'Afstandsbediening met drie knoppen op 433 MHz voor Fiat, met 48-transponder en SIP22-baard.',
  'funkschluessel-kompatibel-fuer-fiat-fir115e':
    'Afstandsbediening met één knop op 433 MHz voor Fiat, met ID48-transponder en SIP22-baard.',
  'funkschluessel-kompatibel-fuer-fiat-fir114e':
    'Afstandsbediening met één knop op 433 MHz voor Fiat, met ID48-transponder en SIP22-baard. Vergelijk de vorm met uw sleutel; er zijn twee uitvoeringen.',
  'funkschluessel-kompatibel-fuer-fiat-fir107e':
    'Klapsleutel met drie knoppen op 433 MHz voor de Fiat Grande Punto en 500L en verwante modellen, met SIP22-baard.',
  'funkschluessel-kompatibel-fuer-fiat-fir105e':
    'Afstandsbediening met één knop op 433 MHz voor de Fiat Doblò, Albea en Punto, met ID48-transponder en SIP22-baard.',
  'funkschluessel-kompatibel-fuer-fiat-fir108e':
    'Afstandsbediening op 433 MHz voor Fiat, met ID48-transponder.',
  'fir104e-ersetzt-durch-fir134':
    'Klapsleutel met drie knoppen op 433 MHz voor de Fiat Ducato, Peugeot Boxer en Citroën Jumper, met Marelli HITAG2-transponder en SIP22-baard.',
  'funkschluessel-kompatibel-fuer-fiat-fir103e':
    'Klapsleutel met drie knoppen op 433 MHz met Delphi PCF7947-transponder en SIP22-baard, voor de Fiat Doblò, Fiorino, Grande Punto en MiTo, Peugeot Bipper, Citroën Nemo en Opel Combo.',

  /* ── Fiat: housings ── */
  'funkschluessel-gehaeuse-kompatibel-fuer-fiat-firc117':
    'Behuizing met drie knoppen voor Fiat en Citroën, met SIP22-baard.',
  'funkschluessel-gehaeuse-kompatibel-fuer-fiat-firc129':
    'Behuizing met vier knoppen voor Fiat. Vergelijk de knopindeling met uw sleutel.',
  'funkschluessel-gehaeuse-kompatibel-fuer-fiat-firc103':
    'Behuizing met drie knoppen voor Fiat. Uw printplaat gaat erin over.',
  'funkschluessel-gehaeuse-kompatibel-fuer-fiat-firc104':
    'Behuizing met drie knoppen voor Fiat, in een andere uitvoering dan de FIRC103 — leg ze naast uw sleutel.',
  'funkschluessel-gehaeuse-kompatibel-fuer-fiat-umbauset-firc111':
    'Ombouwset met één knop voor Fiat, met SIP22-baard: van een vaste sleutel naar een klapsleutel.',
  'funkschluessel-gehaeuse-kompatibel-fuer-fiat-firc108':
    'Behuizing met drie knoppen voor Fiat.',
  'funkschluessel-gehaeuse-kompatibel-fuer-fiat-firc107':
    'Behuizing met drie knoppen voor Fiat, met SIP22-baard.',
  'funkschluessel-gehaeuse-kompatibel-fuer-fiat-firc102':
    'Behuizing met één knop voor Fiat, met SIP22-baard.',
  'funkschluessel-gehaeuse-kompatibel-fuer-fiat-firc101':
    'Behuizing met één knop voor oudere Fiats, met GT15R-baard.',
  'funkschluessel-gehaeuse-kompatibel-fuer-fiat-firc150':
    'Behuizing met één knop voor oudere Fiats, met GT10-baard.',
  'funkschluessel-gehaeuse-kompatibel-fuer-fiat-alfa-firc110-3t':
    'Behuizing met drie knoppen voor Fiat en Alfa Romeo, met SIP22-baard.',
  'funkschluessel-gehaeuse-kompatibel-fuer-fiat-firc106':
    'Behuizing met twee knoppen voor Fiat en Citroën, met SIP22-baard.',
  'funkschluessel-gehaeuse-kompatibel-fuer-fiat-firc109':
    'Behuizing met drie knoppen voor Fiat, zonder baard: uw eigen baard gaat erin over.',
};

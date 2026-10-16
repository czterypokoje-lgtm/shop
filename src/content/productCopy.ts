/**
 * Our own opening paragraph for the products people look for most — written
 * per article, from its real specification. Keyed on the internal slug.
 * Placed above the generated description; a CRM description_override wins.
 */
import { VAG } from './products/vag';
import { RENAULT_OPEL } from './products/renault-opel';
import { PSA_FORD_FIAT } from './products/psa-ford-fiat';
import { ASIA1 } from './products/asia1';
import { REST } from './products/rest';

const CORE: Record<string, string> = {
  'funkschluessel-kompatibel-fuer-volkswagen-vvr104':
    'Voor de Volkswagen Transporter (2011–2016) en Amarok: een complete klapsleutel met drie knoppen op 434 MHz, met 48-transponder en HU66-baard. Is uw huidige sleutel kwijt of reageert hij niet meer, dan is dit de vervanger. De baard wordt op uw slot gefreesd en de sleutel op uw bus ingeleerd.',
  'funkschluessel-gehaeuse-kompatibel-fuer-volkswagen-vvrc111':
    'Een nieuwe behuizing met twee knoppen voor de klapsleutel van onder meer de Golf, Tiguan en Touareg. Versleten knoppen of een gebroken kast? Zet uw eigen printplaat en baard over — de auto herkent de sleutel daarna gewoon, zonder opnieuw programmeren.',
  'funkschluessel-kompatibel-fuer-volkswagen-vagr110':
    'Complete afstandsbediening met drie knoppen voor de Volkswagen Crafter van 2006 tot 2016, op 433 MHz met Megamos 48-transponder en HU66-baard. Voor bedrijven die een reservesleutel voor de bus willen, of een sleutel kwijt zijn. Te frezen en in te leren, desgewenst door onze monteur op locatie.',
  'funkschluessel-gehaeuse-kompatibel-fuer-opel-oprc153':
    'Behuizing met twee knoppen voor de Opel-klapsleutel van de Astra, Vectra en Zafira. Het knopje dat erdoor drukt of een klep die niet meer dicht blijft: met deze behuizing is de sleutel weer als nieuw. U zet de elektronica uit uw oude sleutel over.',
  'funkschluessel-gehaeuse-kompatibel-fuer-opel-oprc104':
    'Behuizing met twee knoppen voor de Opel Corsa C. Bij deze sleutel slijten vooral de knoppen en breekt de kast bij het scharnier. Een nieuwe behuizing lost dat op zonder dat de sleutel opnieuw ingeleerd hoeft te worden.',
  'funkschluessel-kompatibel-fuer-opel-opr109iea':
    'Complete afstandsbediening met drie knoppen voor de Opel Vectra C, op 433 MHz met een PCF7946-transponder. Voor als de sleutel kwijt is of de elektronica het heeft begeven. Wordt gefreesd en op uw auto ingeleerd.',
  'funkschluessel-gehaeuse-kompatibel-fuer-renault-dacia-rnrc120':
    'Behuizing met drie knoppen die past op sleutels van Renault, Dacia en de verwante Opel Vivaro en Renault Master. Gescheurde kast of versleten rubber? Zet de printplaat en de baard over en u kunt weer verder.',
  'funkschluessel-gehaeuse-kompatibel-fuer-renault-rnrc124':
    'Behuizing met vier knoppen voor de Renault-sleutel van onder meer de Clio, Mégane, Kadjar, Koleos en Espace. De printplaat uit uw huidige sleutel past erin; programmeren is daarna niet nodig.',
  'funkschluessel-gehaeuse-kompatibel-fuer-renault-rnrc123':
    'Behuizing met vier knoppen voor de Renault Clio IV, Mégane III en Fluence. Vaak gaat bij deze sleutels de kast stuk terwijl de elektronica nog werkt — dan is een nieuwe behuizing de voordeligste oplossing.',
  'funkschluessel-2-tasten-kompatibel-fuer-peugeot-pgr101iea':
    'Complete afstandsbediening met twee knoppen voor de Peugeot 206, op 433 MHz met een PCF7961-transponder en NE72-baard. Voor wie een reservesleutel wil of de originele kwijt is. Te frezen en in te leren.',
  'funkschluessel-gehaeuse-kompatibel-fuer-peugeot-pgrc152':
    'Behuizing met vier knoppen voor Peugeot. Vergelijk de vorm en het aantal knoppen met uw huidige sleutel; past het, dan zet u de printplaat over en werkt de sleutel direct weer.',
  'funkschluessel-gehaeuse-kompatibel-fuer-peugeot-pgrc104':
    'Behuizing met drie knoppen voor sleutels van Peugeot en de verwante Opel-modellen. Een nieuwe kast voor een sleutel waarvan de elektronica nog goed is: overzetten en klaar.',
  'funkschluessel-kompatibel-fuer-citroen-ctr107':
    'Complete afstandsbediening met drie knoppen voor de Citroën DS4 en DS5, op 433 MHz met ID46-transponder en VA2-baard. Wordt op uw slot gefreesd en op de auto ingeleerd.',
  'funkschluessel-kompatibel-fuer-citroen-ctr101':
    'Afstandsbediening met twee knoppen voor de Citroën C1, C2, C3 en C5, op 434 MHz met ID46-transponder en VA2-baard.',
  'funkschluessel-kompatibel-fuer-ford-for107':
    'Afstandsbediening met drie knoppen voor de Ford Focus (2011–2013), C-Max en Grand C-Max (2010–2014) en Mondeo (2011–2014), op 433 MHz met HU101-baard. Een complete sleutel: frezen op uw slot en inleren op de auto.',
  'funkschluessel-gehaeuse-kompatibel-fuer-ford-forc155':
    'Behuizing met vijf knoppen voor de Ford Mustang. Is de kast versleten of gebroken, dan zet u de elektronica uit uw huidige sleutel over in deze nieuwe behuizing.',
  'funkschluessel-kompatibel-fuer-ford-for116':
    'Afstandsbediening met vier knoppen voor de Explorer, F-150, F-250 en Mustang (2015–2017). Let op: deze sleutel werkt op 315 MHz, de frequentie van Amerikaanse uitvoeringen. Voor een Europese Ford heeft u vrijwel altijd 433 MHz nodig — twijfelt u, vraag het ons.',
  'funkschluessel-kompatibel-fuer-toyota-toyr101':
    'Afstandsbediening met twee knoppen voor de Toyota Prius, op 433 MHz met DST 80-transponder en een ingebouwde noodsleutel. Voor als de originele sleutel kwijt of defect is.',
  'funkschluessel-kompatibel-fuer-toyota-toyr126l':
    'Afstandsbediening met twee knoppen voor de Toyota Land Cruiser van 2015 tot 2019, op 433,58/434,42 MHz met 8A-transponder en noodsleutel. Printplaat F43FF; vergelijk dit nummer met uw huidige sleutel. Wordt op uw auto ingeleerd.',
  'funkschluessel-kompatibel-fuer-toyota-toyr125l':
    'Afstandsbediening met twee knoppen voor de Toyota Camry (2015–2018). Let op: deze uitvoering werkt op 315 MHz, de frequentie van Amerikaanse auto’s. Rijdt u een Camry uit de Europese markt, neem dan eerst contact met ons op.',
  'funkschluessel-kompatibel-fuer-kia-kir105':
    'Afstandsbediening met drie knoppen voor de Kia Sportage van 2016 tot 2019, op 433 MHz met KIA8-baard. Een complete sleutel voor een reserve of als vervanging; te frezen en in te leren.',
  'funkschluessel-kompatibel-fuer-kia-kir103':
    'Afstandsbediening met drie knoppen voor de Kia Sorento van 2015 tot 2018, op 433 MHz met KIA8-baard. Wordt op uw slot gefreesd en op uw auto ingeleerd.',
  'funkschluessel-kompatibel-fuer-hyundai-hyr123':
    'Smart key met drie knoppen voor de Hyundai Tucson vanaf 2019, op 433 MHz met HITAG3-transponder en TOY48-noodsleutel. Keyless openen en starten zodra hij op uw auto is ingeleerd.',
  'funkschluessel-kompatibel-fuer-hyundai-hyr120':
    'Afstandsbediening met drie knoppen voor de Hyundai Tucson vanaf 2019, op 433 MHz met ID47-transponder en noodsleutel. Kies deze als uw Tucson een gewone sleutel heeft en geen keyless start.',
  'funkschluessel-kompatibel-mit-fiat-fir120':
    'Smart key voor de Chrysler 300 en verwante Fiat-modellen (2011–2018), op 433 MHz met HITAG2-transponder. Moet op uw auto worden ingeleerd.',
  'funkschluessel-kompatibel-mit-fiat-fir122a':
    'Smart key met vier knoppen voor de Jeep Compass (2014–2022) en verwante Fiat- en Chrysler-modellen, op 433 MHz met HITAG AES 4A-transponder. Inleren is nodig voordat keyless start werkt.',
  'funkschluessel-gehaeuse-kompatibel-fuer-bmw-bmrc108':
    'Behuizing met drie knoppen voor de sleutel van de BMW 1-serie. Een gebroken kast of losse knoppen herstelt u door de elektronica over te zetten; de auto blijft de sleutel herkennen.',
  'funkschluessel-gehaeuse-kompatibel-fuer-bmw-bmrc105':
    'Behuizing met drie knoppen voor de BMW 3-, 5- en 7-serie. Bij deze sleutels slijt de kast vaak bij de knoppen; een nieuwe behuizing maakt hem weer als nieuw.',
  'funkschluessel-geeignet-fuer-mercedes-benz-bzr121-slk-w168-crossfire':
    'Afstandsbediening op 433 MHz met PCF7935-transponder voor de Mercedes-Benz SLK, A-Klasse W168 en Chrysler Crossfire. Moet op uw auto worden ingeleerd.',
  'funkschluessel-geeignet-fuer-mercedes-benz-bzr131-geeignet-fuer-w168-w414-slk':
    'Afstandsbediening op 433 MHz met PCF7935-transponder voor de Mercedes-Benz Vaneo (W414), A-Klasse W168 en SLK. Wordt op uw slot gefreesd en ingeleerd.',
  'funkschluessel-kompatibel-fuer-audi-aur114x':
    'Smart key met drie knoppen op 868 MHz voor de Audi A4 (2008–2016), A5, A6, A7 en Q5, met HU66-noodsleutel. Let op de frequentie: Audi gebruikt voor deze modellen 868 én 433 MHz — vergelijk met uw huidige sleutel of de 433 MHz-uitvoering hiernaast.',
  'funkschluessel-kompatibel-fuer-audi-aur118':
    'Smart key met drie knoppen op 433 MHz voor de Audi A4 (2008–2016), A5, A6, A7 en Q5, met HU66-noodsleutel. Er is ook een 868 MHz-uitvoering; welke u nodig heeft hangt af van uw auto.',
  'funkschluessel-kompatibel-mit-nissan-nir107':
    'Smart key met drie knoppen voor de Nissan Micra, Juke, Leaf, Note en Navara, op 433 MHz met HITAG2-transponder en NSN14-noodsleutel. Wordt op uw auto ingeleerd.',
  'funkschluessel-kompatibel-mit-nissan-nir151':
    'Smart key met twee knoppen voor de Nissan Micra, Juke en Note, op 433 MHz met NSN14-noodsleutel. Kies het aantal knoppen dat uw huidige sleutel heeft.',
  'funkschluessel-kompatibel-fuer-volvo-vlvr102':
    'Smart key met zes knoppen voor de Volvo S60, S80, V40 Cross Country, V60 en V70, met noodsleutel. Let op: deze uitvoering werkt op 902 MHz, de frequentie van Amerikaanse Volvo’s. Een Europese Volvo heeft meestal 433 MHz nodig — vraag het ons als u twijfelt.',
  'funkschluessel-gehaeuse-kompatibel-fuer-volvo-volrc103':
    'Behuizing met twee knoppen voor Volvo. Een nieuwe kast voor een sleutel waarvan de elektronica nog werkt: overzetten en klaar, zonder opnieuw programmeren.',
  'funkschluesselblatt-und-platine-kompatibel-fuer-volkswagen-vvr107e':
    'Afstandsbediening met drie knoppen voor Seat en Volkswagen, op 433 MHz met ID88-transponder en HU66-baard. Wordt op uw slot gefreesd en op de auto ingeleerd.',
  'funkschluessel-kompatibel-fuer-mazda-mzr101':
    'Smart key met vier knoppen voor de Mazda 3 van 2009 tot 2013, op 433 MHz met 4D-transponder en noodsleutel. Moet op uw auto worden ingeleerd.',
  'funkschluessel-kompatibel-fuer-mazda-mzr107':
    'Afstandsbediening met drie knoppen voor de Mazda3, met noodsleutel. Vergelijk het aantal knoppen en de vorm met uw huidige sleutel; inleren op de auto is nodig.',
  'funkschluessel-gehaeuse-kompatibel-fuer-suzuki-surc106':
    'Behuizing met twee knoppen voor de Suzuki Swift en SX4. De printplaat uit uw huidige sleutel past erin — een snelle en voordelige reparatie.',
  'funkschluessel-gehaeuse-kompatibel-fuer-suzuki-surc151':
    'Behuizing met twee knoppen voor de Suzuki Swift en SX4, in een andere uitvoering dan de SURC106. Leg ze naast uw huidige sleutel en kies de vorm die overeenkomt.',
};

export const PRODUCT_COPY: Record<string, string> = { ...VAG, ...RENAULT_OPEL, ...PSA_FORD_FIAT, ...ASIA1, ...REST, ...CORE };

---
tags: [autosleutel24, catalogus, fitment]
datum: 2026-10-11
status: klaar-lokaal
---
# Catalogus — uitvoering per model (fitment)

Hoort bij [[Autosleutel24 webshop]] · bronnen: [[A-Key]] (prijs, voorraad), [[autosleutels.info]] (WVO Trading, met toestemming), [[AccessFobs]] (foto + omschrijving).

## Stand
| | aantal |
|---|---|
| Behuizingen + werkende sleutels (publiek) | 649 |
| Met modellijst | **409** (was 169) |
| Gekoppeld aan autosleutels.info | 174 |
| Gekoppeld aan AccessFobs | 71 |
| Gekoppeld aan [[auto-sleutel.nl]] (met toestemming) | 257 |
| Met batterijtype | **327** (was 3) |
| Watermerk-foto vervangen | 47 |
| Titels gecorrigeerd (spelling/merk) | 25 |

## Hoe gecontroleerd (5×)
1. **Visueel**: elke koppeling naast elkaar bekeken (vorm, knoppen, kleur, sleutelblad/chip/frequentie). 3 rondes, 119 vergelijkingsbladen.
2. **Opschonen namen**: onderdeelnummers, datums, chipcodes uit modelnamen — zie `scripts/build-catalog.mjs` en [[model-fixes]].
3. **Merk-correctie**: verkeerd merk (bv. Nissan Micra onder Renault, Opel Vivaro onder Renault) → `src/data/model-fixes.json`.
4. **Automatische check**: lege naam, rommel-token, merk/model onbekend, onmogelijke jaren, dubbel → alle 0.
5. **Concern-check**: modellen van een ander merk alleen binnen dezelfde groep (VAG, PSA, Renault-Nissan, Hyundai-Kia …). Enige uitzondering: Fiat 124 Spider op Mazda-sleutels (= MX-5, klopt).

## Regels
- Geen koppeling zonder zekerheid: een verkeerde lijst kost een retour en vertrouwen.
- Titel en URL volgen A-Key; de lijst op de pagina voegt de tweede bron toe.
- Zonder lijst toont de pagina: _“Controleer met ons via WhatsApp / kenteken”_.

## Nog zonder modellijst (240)
Geen betrouwbare match in drie bronnen (autosleutels.info, AccessFobs, auto-sleutel.nl). Pagina toont kenteken/WhatsApp-check.
- **Universeel (programmeerbaar, geen vaste auto)** (27): , , , , , , , , ,  …
- **Chrysler** (27): , , , , , , , , ,  …
- **Hyundai** (20): , , , , , , , , ,  …
- **Ford** (18): , , , , , , , , ,  …
- **Toyota** (16): , , , , , , , , ,  …
- **Renault** (15): , , , , , , , , ,  …
- **BMW** (12): , , , , , , , , ,  …
- **Volkswagen** (10): , , , , , , , , , 
- **Honda** (10): , , , , , , , , , 
- **Peugeot** (10): , , , , , , , , , 
- **Mercedes-Benz** (10): , , , , , , , , , 
- **Fiat** (9): , , , , , , , , 
- **Nissan** (8): , , , , , , , 
- **Citroën** (7): , , , , , , 
- **Opel** (7): , , , , , , 
- **Kia** (6): , , , , , 
- **Suzuki** (4): , , , 
- **Mazda** (4): , , , 
- **Volvo** (3): , , 
- **Audi** (3): , , 
- **Alfa Romeo** (3): , , 
- **Smart** (3): , , 
- **Porsche** (2): , 
- **Ferrari** (1): 
- **Cadillac** (1): 
- **Jaguar** (1): 
- **Mitsubishi** (1): 
- **Saab** (1): 
- **Rover** (1): 

## Batterij
- Bron 1: bevestigde koppeling met autosleutels.info / AccessFobs / auto-sleutel.nl (zelfde vorm gecontroleerd).
- Bron 2: `src/data/battery-by-family.json` — alleen als ≥2 bevestigde broers (zelfde merk, type, knoppen, sleutelblad) allemaal hetzelfde type hebben.
- Geen batterij bij twijfel.

## Gecorrigeerde titels
- Toyota Cruiser afstandsbediening 2 knoppen · 433.58 / 434.42 MHz (TOYR126L) → **Toyota Land Cruiser afstandsbediening 2 knoppen · 433.58 / 434.42 MHz (TOYR126L)**
- Toyota C-hr afstandsbediening 2 knoppen · 433.42 / 433.58 MHz (TOYR120L) → **Toyota C-HR afstandsbediening 2 knoppen · 433.42 / 433.58 MHz (TOYR120L)**
- Toyota Rav4 afstandsbediening 2 knoppen · 433 MHz (TOYR116L) → **Toyota RAV4 afstandsbediening 2 knoppen · 433 MHz (TOYR116L)**
- Toyota Rav4 afstandsbediening 2 knoppen · 433 MHz (TOYR117L) → **Toyota RAV4 afstandsbediening 2 knoppen · 433 MHz (TOYR117L)**
- Toyota Yaris L afstandsbediening 2 knoppen · 433.30 / 433.58 MHz (TOYR118L) → **Toyota Yaris afstandsbediening 2 knoppen · 433.30 / 433.58 MHz (TOYR118L)**
- Alfa Romeo 159 Brera Spider afstandsbediening 3 knoppen · 433 MHz (ALFR102) → **Afstandsbediening voor Alfa Romeo en Fiat 3 knoppen · 433 MHz (ALFR102)**
- Hyundai Ix25 Creta smart key 3 knoppen · 433 MHz · TOY48 (HYR207X) → **Hyundai Creta smart key 3 knoppen · 433 MHz · TOY48 (HYR207X)**
- Volkswagen 202n smart key 3 knoppen · 434 MHz (VVR116) → **Volkswagen smart key 3 knoppen · 434 MHz (VVR116)**
- Honda Crv afstandsbediening 3 knoppen · 434 MHz · HON66 (HOR102) → **Honda CR-V afstandsbediening 3 knoppen · 434 MHz · HON66 (HOR102)**
- Volkswagen Tuareg smart key 3 knoppen · 434 MHz · HU66 (VVR100) → **Volkswagen Touareg smart key 3 knoppen · 434 MHz · HU66 (VVR100)**
- Mazda3 M3 afstandsbediening 3 knoppen · 433 MHz (MZR107) → **Mazda 3 afstandsbediening 3 knoppen · 433 MHz (MZR107)**
- Ford Edge Fusio smart key 5 knoppen · 902 MHz · HU101 (FOR118) → **Ford smart key 5 knoppen · 902 MHz · HU101 (FOR118)**
- Jeep Renegade Jpr105e afstandsbediening 4 knoppen · 433 MHz · SIP22 (JPR105IEA) → **Jeep Renegade afstandsbediening 4 knoppen · 433 MHz · SIP22 (JPR105IEA)**
- Mercedes-Benz ML-Klasse afstandsbediening 315 MHz (BZR124) → **Mercedes-Benz M-Class afstandsbediening 315 MHz (BZR124)**
- Audi Tt afstandsbediening 3 knoppen · 868 MHz · HU66 (AUR119) → **Audi TT afstandsbediening 3 knoppen · 868 MHz · HU66 (AUR119)**
- Hyundai I40 afstandsbediening 4 knoppen · 433 MHz (HYR119) → **Hyundai i40 afstandsbediening 4 knoppen · 433 MHz (HYR119)**
- Renault Twingo Megane Scenic Laguna sleutelbehuizing 1 knoppen (RNRC101) → **Renault sleutelbehuizing 1 knoppen (RNRC101)**
- Porsche Cayenne Gts sleutelbehuizing 2 knoppen · HU66 (PORC153) → **Porsche Cayenne sleutelbehuizing 2 knoppen · HU66 (PORC153)**
- Hyundai I30 afstandsbediening 3 knoppen · 433 MHz · TOY49 (HYR159) → **Hyundai i30 afstandsbediening 3 knoppen · 433 MHz · TOY49 (HYR159)**
- Hyundai Ix35 afstandsbediening 3 knoppen · 433 MHz · HYN14R (HYR103) → **Hyundai ix35 afstandsbediening 3 knoppen · 433 MHz · HYN14R (HYR103)**
- Renault Megane Ii sleutelbehuizing 3 knoppen (RNRC108) → **Renault Megane II sleutelbehuizing 3 knoppen (RNRC108)**
- Renault Laguna Ii afstandsbediening 2 knoppen · 433 MHz (RNR119) → **Renault Laguna II afstandsbediening 2 knoppen · 433 MHz (RNR119)**
- Renault Megane Ii afstandsbediening 3 knoppen · 433 MHz (RNR114) → **Renault Megane II afstandsbediening 3 knoppen · 433 MHz (RNR114)**
- Opel Corsa D Meriva B afstandsbediening 2 knoppen · 433 MHz · HU100 (OPR131IEA) → **Opel afstandsbediening 2 knoppen · 433 MHz · HU100 (OPR131IEA)**
- Citroën Ds4 & Ds5 afstandsbediening 3 knoppen · 433 MHz · VA2 (CTR107) → **Citroën afstandsbediening 3 knoppen · 433 MHz · VA2 (CTR107)**

## Bestanden
- `src/data/autosleutels-matches.json` — koppelingen + bron-URL
- `src/data/model-fixes.json` — correctietabel
- `reports/autosleutels-rapport.html` — per product oud → nieuw

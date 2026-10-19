# Live chat met de ElevenLabs-agent

De webshop heeft een knop **Chat** (rechtsonder, boven WhatsApp). Pas na een klik
laadt de ElevenLabs-chat; daarvoor wordt er niets van ElevenLabs geladen.

## 1. Agent in de ElevenLabs-console
Maak een **aparte** agent "Webshop chat" (de telefoon-agent gaat over de monteur aan huis;
de webshop verkoopt onderdelen, van CarKey24).

- **Taal:** Nederlands.
- **Text only:** aan (Agent → Advanced / Conversation → text-only), dan vraagt de chat geen microfoon.
- **Eerste bericht:** "Hallo! Zoekt u een autosleutel of onderdeel? Noem merk, model en bouwjaar, of uw artikelcode."
- **Systeemprompt (kern):**
  - Je helpt klanten van de Autosleutel24 webshop (geëxploiteerd door CarKey24) het juiste onderdeel te vinden.
  - Zoek altijd met de tool `zoek_product` voordat je een product of prijs noemt. Noem nooit een prijs of product dat de tool niet gaf.
  - Geef de link uit het resultaat. Weet je het niet zeker welke past: vraag om een foto via WhatsApp 06 11 75 12 31.
  - Inleren/programmeren en monteur aan huis: verwijs naar de productpagina of bel 06 11 75 12 31.
  - Retour: 14 dagen; zelf ingeleerde of gefreesde sleutels kunnen niet retour (zie /verzending-en-retour).
  - Kort antwoorden, u-vorm.
- **Security → Allowlist:** voeg `www.autosleutel24.nl` en `autosleutel24.nl` toe.
- **Authentication:** uit (publieke agent), anders kan de website-chat niet starten.

## 2. Tool `zoek_product` (Webhook tool)
- Methode: **GET**
- URL: `https://www.autosleutel24.nl/webshop/api/agent/search`
- Query parameter: `q` (string) — "Zoekterm: merk + model + soort, of artikelcode. Bijv. 'volkswagen golf behuizing' of 'FH162HU'."
- Antwoord: tot 5 producten met titel, artikelcode, prijs incl. btw, passende modellen en link.

## 3. Vercel (shop-project)
- `NEXT_PUBLIC_ELEVENLABS_AGENT_ID` = de agent-id (begint met `agent_`). Daarna **Redeploy**.
- Zonder deze variabele is de Chat-knop onzichtbaar.

## 4. Gesprekken in de CRM
Zet in de agent dezelfde post-call webhook als de telefoon-agent
(`https://www.autosleutel24.nl/api/elevenlabs/webhook`), dan komen chatgesprekken ook in Gesprekken.

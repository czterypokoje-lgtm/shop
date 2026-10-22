/*
 * Advice articles for the webshop: the questions people ask before they buy
 * a key part. Written for this shop; every claim is general knowledge about
 * car keys, no promises about a specific car. Prices and delivery come from
 * the shop's own constants where they are mentioned.
 */
export type Block =
  | { type: 'p'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'steps'; items: { title: string; text: string }[] }
  | { type: 'tip'; text: string };

export interface AdviceArticle {
  slug: string;
  title: string;
  /** Under 60 characters, for the <title>. */
  seoTitle: string;
  description: string;
  intro: string;
  sections: { h2: string; blocks: Block[] }[];
  faq: { q: string; a: string }[];
  /** Where to go next in the shop. */
  links: { href: string; label: string }[];
  updated: string;
}

export const ADVIES: AdviceArticle[] = [
  {
    slug: 'welke-autosleutel-heb-ik',
    title: 'Welke autosleutel heb ik? Zo herkent u uw sleutel in 4 stappen',
    seoTitle: 'Welke autosleutel heb ik? Herken uw sleutel',
    description: 'Klapsleutel, smart key, transpondersleutel of sleutelkaart? In 4 stappen weet u welke autosleutel u heeft en welk onderdeel u nodig heeft.',
    intro: 'Een nieuwe sleutel of behuizing bestellen begint met één vraag: wat voor sleutel heeft u eigenlijk? Met vier simpele controles weet u het, ook zonder technische kennis.',
    updated: '2026-10-22',
    sections: [
      {
        h2: 'Stap 1: hoe start u de auto?',
        blocks: [
          { type: 'p', text: 'Steekt u de sleutel in het contactslot en draait u hem om, dan heeft u een gewone sleutel met transponder, al dan niet met afstandsbediening. Start u met een knop op het dashboard terwijl de sleutel in uw zak blijft, dan heeft u een smart key (keyless).' },
        ],
      },
      {
        h2: 'Stap 2: welke vorm heeft de sleutel?',
        blocks: [
          { type: 'list', items: [
            'Vaste sleutel: de baard zit vast aan de kop. Soms zitten er knoppen in de kop, soms niet.',
            'Klapsleutel: de baard klapt met een knop uit de behuizing.',
            'Smart key: een platte afstandsbediening zonder zichtbare baard. Er zit bijna altijd een kleine noodsleutel in.',
            'Sleutelkaart: een platte kaart, vooral bij Renault. U steekt hem in een gleuf of houdt hem in uw zak.',
          ] },
        ],
      },
      {
        h2: 'Stap 3: tel de knoppen',
        blocks: [
          { type: 'p', text: 'Twee knoppen (open en dicht) komt het meest voor. Een derde knop is meestal de kofferbak, soms een paniekknop. Neem altijd een behuizing of afstandsbediening met hetzelfde aantal knoppen: de printplaat in uw sleutel heeft vaste plekken voor de knoppen.' },
        ],
      },
      {
        h2: 'Stap 4: bekijk de sleutelbaard',
        blocks: [
          { type: 'p', text: 'De baard is het metalen deel dat in het slot gaat. Er zijn twee hoofdsoorten: een baard met inkepingen aan de zijkant, en een vlakke baard met een golvende groef in het midden (een zogenaamde binnenfrees of laserbaard). Elk profiel heeft een naam, zoals HU66, HU101, VA2 of SIP22. Die naam staat bij al onze artikelen.' },
          { type: 'tip', text: 'Leg uw sleutel naast de foto bij het artikel. Komen vorm, knoppen en baard overeen, dan zit u goed.' },
        ],
      },
      {
        h2: 'Frequentie en transponder: alleen nodig bij een complete sleutel',
        blocks: [
          { type: 'p', text: 'Bestelt u alleen een behuizing, dan neemt u de elektronica uit uw oude sleutel mee en zijn frequentie en transponder al goed. Bestelt u een complete afstandsbediening, dan moeten ook de frequentie (meestal 433 of 434 MHz in Europa) en het type transponder kloppen. Die gegevens vindt u vaak op de printplaat in de sleutel, of wij zoeken ze voor u op via uw kenteken.' },
        ],
      },
    ],
    faq: [
      { q: 'Kan ik zelf zien welke transponder in mijn sleutel zit?', a: 'Soms staat het type op de chip of de printplaat, maar vaak niet. Het eenvoudigst is zoeken op kenteken, of een foto van uw sleutel via WhatsApp sturen.' },
      { q: 'Wat als ik twijfel tussen twee modellen?', a: 'Stuur ons een foto van de voor- en achterkant van uw sleutel. Wij zoeken het juiste artikel voor u op, gratis.' },
    ],
    links: [
      { href: '/categorie/behuizingen', label: 'Sleutelbehuizingen' },
      { href: '/categorie/afstandsbedieningen', label: 'Afstandsbedieningen' },
      { href: '/categorie/smart-keys', label: 'Smart keys' },
    ],
  },
  {
    slug: 'transponder-uitgelegd',
    title: 'Transponder uitgelegd: waarom uw autosleutel een chip heeft',
    seoTitle: 'Transponder in de autosleutel uitgelegd',
    description: 'Wat is een transponder, waarom start de auto niet zonder, en wat betekent dat voor een nieuwe sleutel of behuizing? Uitleg in gewone taal.',
    intro: 'In vrijwel elke autosleutel zit een klein chipje: de transponder. Zonder dat chipje start de auto niet, ook al past de sleutel perfect in het slot. Zo werkt het.',
    updated: '2026-10-22',
    sections: [
      {
        h2: 'Wat doet een transponder?',
        blocks: [
          { type: 'p', text: 'De transponder hoort bij de startonderbreker (immobilizer) van uw auto. Als u het contact aanzet, zendt een spoeltje rond het contactslot een signaal. De chip in uw sleutel antwoordt met een code. Klopt die code, dan mag de motor starten. Sinds eind jaren negentig hebben nieuwe auto\'s in Europa standaard zo\'n startonderbreker.' },
          { type: 'p', text: 'De transponder heeft geen batterij nodig: hij haalt zijn energie uit het signaal van de auto. Daarom start de auto ook met een lege sleutelbatterij, alleen de afstandsbediening werkt dan niet meer.' },
        ],
      },
      {
        h2: 'Soorten transponders',
        blocks: [
          { type: 'list', items: [
            'Vaste code: oudere chips met een vaste code, zoals ID13 en ID33. Te kopiëren.',
            'Versleuteld (crypto): de auto en de sleutel stellen elkaar een vraag die alleen de juiste sleutel kan beantwoorden. Bijvoorbeeld ID46 (Hitag2), ID48 (Megamos Crypto) en de nieuwere Hitag-AES chips.',
            'Ingebouwd op de printplaat: bij veel moderne afstandsbedieningen zit de transponder niet als los glazen chipje in de behuizing, maar op de printplaat zelf.',
          ] },
        ],
      },
      {
        h2: 'Wat betekent dit voor een nieuwe sleutel?',
        blocks: [
          { type: 'p', text: 'Een nieuwe sleutel met een lege transponder moet aan uw auto worden geleerd (inleren). Dat gaat via de diagnose-aansluiting met speciale apparatuur. Alleen een nieuwe baard frezen is dus niet genoeg om te kunnen starten.' },
          { type: 'p', text: 'Vervangt u alleen de behuizing, dan neemt u de transponder uit uw oude sleutel mee. Zit hij als los chipje in de oude behuizing, vergeet hem dan niet over te zetten: zonder chip start de auto niet.' },
          { type: 'tip', text: 'Auto opent wel met de afstandsbediening, maar start niet? Dan ligt het vrijwel altijd aan de transponder: vergeten over te zetten, beschadigd of niet ingeleerd.' },
        ],
      },
    ],
    faq: [
      { q: 'Kan ik een transponder zelf inleren?', a: 'Bij sommige oudere auto\'s kan dat met een procedure en twee werkende sleutels. Bij de meeste auto\'s is diagnoseapparatuur nodig. Kies dan bij het artikel voor "Monteur aan huis".' },
      { q: 'Werkt mijn auto met een sleutel zonder chip?', a: 'U kunt er de deuren mee openen, maar starten lukt niet bij een auto met startonderbreker.' },
    ],
    links: [
      { href: '/categorie/transponders', label: 'Transponders' },
      { href: '/categorie/transpondersleutels', label: 'Transpondersleutels' },
    ],
  },
  {
    slug: 'sleutelbehuizing-vervangen',
    title: 'Sleutelbehuizing vervangen: zo zet u de elektronica over',
    seoTitle: 'Sleutelbehuizing vervangen: stap voor stap',
    description: 'Versleten of kapotte autosleutel? Met een nieuwe behuizing en uw eigen elektronica heeft u weer een sleutel als nieuw. Zo doet u het zelf, stap voor stap.',
    intro: 'Is de buitenkant van uw sleutel kapot maar werkt de elektronica nog, dan is een nieuwe behuizing de voordeligste oplossing. U zet de printplaat, de batterij en zo nodig de transponder over.',
    updated: '2026-10-22',
    sections: [
      {
        h2: 'Wat heeft u nodig?',
        blocks: [
          { type: 'list', items: [
            'De nieuwe behuizing met hetzelfde aantal knoppen en dezelfde baard',
            'Een klein platte schroevendraaier of een plastic wigje',
            'Eventueel een nieuwe batterij (vaak CR2032 of CR2025)',
          ] },
        ],
      },
      {
        h2: 'Stap voor stap',
        blocks: [
          { type: 'steps', items: [
            { title: 'Open de oude sleutel', text: 'Zoek de naad tussen de twee helften. Bij klapsleutels zit vaak een klein schroefje bij het scharnier. Wrik voorzichtig open, zonder de printplaat te raken.' },
            { title: 'Haal de printplaat eruit', text: 'Pak hem aan de zijkanten vast, niet aan de knopjes. Maak een foto zodat u weet hoe alles lag.' },
            { title: 'Zoek de transponder', text: 'Zit er een los glazen of zwart chipje in de oude behuizing? Zet dat op dezelfde plek in de nieuwe behuizing. Zonder chip start de auto niet.' },
            { title: 'Zet alles over', text: 'Leg de printplaat in de nieuwe behuizing, plaats de batterij met de plus-kant zoals in de oude sleutel en klik de helften dicht.' },
            { title: 'De baard', text: 'Een nieuwe behuizing heeft een ongefreesde baard. Laat die frezen op uw sleutelcode, of zet de oude baard over als dat bij uw model kan.' },
            { title: 'Testen', text: 'Probeer openen, sluiten en starten. Werkt starten niet, controleer dan of de transponder is meegegaan.' },
          ] },
          { type: 'tip', text: 'Geen zin om het zelf te doen? Kies bij de behuizing voor "Elektronica overzetten": u stuurt uw oude sleutel op en wij doen het.' },
        ],
      },
    ],
    faq: [
      { q: 'Moet de sleutel opnieuw ingeleerd worden na een nieuwe behuizing?', a: 'Nee. U gebruikt uw eigen elektronica en transponder, dus de auto kent de sleutel al.' },
      { q: 'Kan ik de oude baard overzetten?', a: 'Bij sommige klapsleutels wel, met een klein pinnetje. Bij veel modellen is frezen op sleutelcode de nettere oplossing.' },
    ],
    links: [
      { href: '/categorie/behuizingen', label: 'Alle sleutelbehuizingen' },
      { href: '/categorie/batterijen', label: 'Sleutelbatterijen' },
    ],
  },
  {
    slug: 'batterij-autosleutel-vervangen',
    title: 'Batterij van uw autosleutel vervangen: welke heeft u nodig?',
    seoTitle: 'Batterij autosleutel vervangen: welke type?',
    description: 'Reageert uw afstandsbediening slecht? Vaak is alleen de batterij leeg. Zo vindt u het juiste type (CR2032, CR2025, CR2016) en vervangt u hem zelf.',
    intro: 'Moet u steeds dichter bij de auto staan voordat hij opengaat? Dan is de batterij van uw sleutel waarschijnlijk bijna leeg. Vervangen kost een paar minuten.',
    updated: '2026-10-22',
    sections: [
      {
        h2: 'Welke batterij zit erin?',
        blocks: [
          { type: 'p', text: 'De meeste autosleutels gebruiken een knoopcel. Het type staat op de batterij zelf.' },
          { type: 'list', items: [
            'CR2032: de meest gebruikte, 3,2 mm dik',
            'CR2025: dunner (2,5 mm), vaak in slanke afstandsbedieningen',
            'CR2016: nog dunner (1,6 mm)',
            'CR1620 en CR1616: kleinere cellen in compacte sleutels',
          ] },
          { type: 'tip', text: 'Neem altijd hetzelfde type. Een dikkere batterij past niet; een dunnere kan los zitten en contact verliezen.' },
        ],
      },
      {
        h2: 'Zo vervangt u de batterij',
        blocks: [
          { type: 'steps', items: [
            { title: 'Open de sleutel', text: 'Bij smart keys haalt u eerst de noodsleutel eruit; de opening geeft vaak toegang tot de naad.' },
            { title: 'Let op de plus-kant', text: 'Kijk hoe de oude batterij ligt voordat u hem eruit haalt.' },
            { title: 'Plaats de nieuwe', text: 'Raak de batterij zo min mogelijk met uw vingers aan en klik de sleutel dicht.' },
          ] },
        ],
      },
      {
        h2: 'Batterij leeg en u wilt nu starten?',
        blocks: [
          { type: 'p', text: 'Bij een sleutel die u in het contactslot draait, start de auto ook met een lege batterij: de transponder heeft geen batterij nodig. Bij veel auto\'s met startknop houdt u de sleutel tegen de startknop of tegen een gemarkeerde plek; zie het instructieboekje van uw auto.' },
        ],
      },
    ],
    faq: [
      { q: 'Moet de sleutel opnieuw ingeleerd worden na een nieuwe batterij?', a: 'Bij de meeste auto\'s niet. Een enkel model vraagt om de knoppen even in te drukken naast de auto; het instructieboekje zegt het als dat nodig is.' },
      { q: 'Hoe lang gaat een sleutelbatterij mee?', a: 'Meestal enkele jaren. Bij smart keys gaat hij sneller leeg, omdat de sleutel steeds met de auto communiceert.' },
    ],
    links: [
      { href: '/categorie/batterijen', label: 'Sleutelbatterijen' },
    ],
  },
  {
    slug: 'frequentie-433-of-315-mhz',
    title: '433 of 315 MHz? De frequentie van uw autosleutel uitgelegd',
    seoTitle: 'Autosleutel frequentie: 433 of 315 MHz?',
    description: 'Waarom de frequentie van een afstandsbediening moet kloppen, wat 433 en 315 MHz betekenen en hoe u de frequentie van uw sleutel vindt.',
    intro: 'Een afstandsbediening stuurt een radiosignaal naar de auto. Werkt de nieuwe sleutel niet op dezelfde frequentie als uw auto, dan reageert de auto niet, hoe goed de sleutel verder ook past.',
    updated: '2026-10-22',
    sections: [
      {
        h2: 'Welke frequenties zijn er?',
        blocks: [
          { type: 'list', items: [
            '433 MHz (ook wel 433,92 of 434 MHz): de standaard voor auto\'s die in Europa zijn verkocht',
            '315 MHz: gebruikelijk bij auto\'s voor de Amerikaanse en sommige Aziatische markten, en dus bij sommige importauto\'s',
            '868 MHz: bij een klein aantal nieuwere modellen',
          ] },
        ],
      },
      {
        h2: 'Hoe vindt u de frequentie?',
        blocks: [
          { type: 'list', items: [
            'Op de printplaat in de sleutel staat soms 433 of 315, of op het kristal 433.92',
            'Bij al onze afstandsbedieningen staat de frequentie in de titel en de specificaties',
            'Twijfelt u, zoek dan op kenteken of stuur ons een foto van de printplaat',
          ] },
          { type: 'tip', text: 'Niet alleen de frequentie moet kloppen, ook de modulatie (ASK of FSK). Bij twee sleutels met dezelfde frequentie kan de ene wel werken en de andere niet. Kies daarom het artikel voor uw model, niet alleen op frequentie.' },
        ],
      },
    ],
    faq: [
      { q: 'Werkt een 434 MHz sleutel op een auto met 433 MHz?', a: 'Ja, dat is in de praktijk dezelfde band (433,92 MHz). Fabrikanten schrijven het verschillend op.' },
      { q: 'Mijn auto is een import uit de VS. Welke frequentie heb ik nodig?', a: 'Waarschijnlijk 315 MHz. Controleer het op de printplaat van uw huidige sleutel of vraag het ons.' },
    ],
    links: [
      { href: '/categorie/afstandsbedieningen', label: 'Afstandsbedieningen' },
      { href: '/categorie/universal-remotes', label: 'Universele sleutels' },
    ],
  },
];

export const adviceBySlug = (slug: string) => ADVIES.find((a) => a.slug === slug);

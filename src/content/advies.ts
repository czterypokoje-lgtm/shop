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
      { href: '/categorie/afstandsbedieningen', label: 'Autosleutels met afstandsbediening' },
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
      { href: '/categorie/transpondersleutels', label: 'Transpondersleutels' },
      { href: '/categorie/transponders', label: 'Losse transponders' },
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
      { href: '/categorie/afstandsbedieningen', label: 'Autosleutels met afstandsbediening' },
      { href: '/categorie/universal-remotes', label: 'Universele sleutels' },
    ],
  },
  {
    slug: 'autosleutel-kwijt-wat-nu',
    title: 'Autosleutel kwijt: wat nu? Stappenplan en kosten',
    seoTitle: 'Autosleutel kwijt? Stappenplan en kosten',
    description: 'Alle sleutels van uw auto kwijt, of nog één over? Wat u direct doet, wat een nieuwe sleutel kost en waarom u de oude sleutel laat wissen.',
    intro: 'Een kwijtgeraakte autosleutel is vervelend, maar bijna altijd op te lossen zonder de auto naar de dealer te slepen. Wat u moet doen hangt af van één vraag: heeft u nog een werkende sleutel?',
    updated: '2026-10-22',
    sections: [
      { h2: 'Nog één werkende sleutel over', blocks: [
        { type: 'p', text: 'Dan is het eenvoudig en het goedkoopst: er wordt een extra sleutel bijgemaakt. De nieuwe sleutel wordt gefreesd en aan de auto geleerd, terwijl de bestaande sleutel blijft werken. Wacht hier niet mee: als ook de laatste sleutel kwijtraakt, wordt het duurder.' },
      ] },
      { h2: 'Alle sleutels kwijt', blocks: [
        { type: 'steps', items: [
          { title: 'Zoek gericht', text: 'Jaszakken, tassen, de auto zelf (als die open is), werk en de plek waar u het laatst reed. Een smart key ligt vaak nog in de auto.' },
          { title: 'Gestolen? Doe aangifte', text: 'Bij diefstal samen met papieren of adres: doe aangifte en laat de verloren sleutel uit de auto wissen, zodat hij de auto niet meer opent of start.' },
          { title: 'Laat een nieuwe sleutel maken', text: 'De monteur leest de sleutelcode uit het slot of via het kenteken, freest een nieuwe sleutel en leert hem aan de auto. Dit kan meestal ter plekke, de auto hoeft niet weg.' },
          { title: 'Laat meteen een reservesleutel maken', text: 'Een tweede sleutel tegelijk maken kost veel minder dan later opnieuw beginnen.' },
        ] },
      ] },
      { h2: 'Wat kost een nieuwe autosleutel?', blocks: [
        { type: 'p', text: 'Dat hangt af van het type sleutel en of er nog een werkende sleutel is. Een sleutel zonder chip is goedkoop; een transpondersleutel of afstandsbediening moet ook worden ingeleerd; een smart key is het duurst. Bij de dealer betaalt u vaak meerdere honderden euro\'s en wacht u dagen. In onze webshop koopt u het onderdeel en kiest u zelf: frezen, elektronica overzetten of een monteur aan huis.' },
        { type: 'tip', text: 'Zet uw sleutel niet bij uw adres aan een sleutelbos met naamlabel. Een losse sleutel zonder adres is voor een vinder waardeloos.' },
      ] },
    ],
    faq: [
      { q: 'Kan een nieuwe sleutel worden gemaakt zonder de oude?', a: 'Ja. De sleutelcode wordt uit het slot of via het kenteken bepaald en de nieuwe sleutel wordt aan de auto geleerd.' },
      { q: 'Werkt de verloren sleutel daarna nog?', a: 'Bij het inleren kunnen alle oude sleutels uit de auto worden gewist. Dan opent en start de verloren sleutel de auto niet meer.' },
      { q: 'Moet de auto naar de dealer?', a: 'Meestal niet. Een mobiele monteur met diagnoseapparatuur kan de sleutel ter plekke maken en inleren.' },
    ],
    links: [
      { href: '/categorie/afstandsbedieningen', label: 'Autosleutels met afstandsbediening' },
      { href: '/categorie/smart-keys', label: 'Smart keys' },
      { href: '/categorie/transpondersleutels', label: 'Transpondersleutels' },
    ],
  },
  {
    slug: 'autosleutel-inleren-programmeren',
    title: 'Autosleutel inleren of programmeren: hoe werkt het?',
    seoTitle: 'Autosleutel inleren of programmeren uitgelegd',
    description: 'Waarom een nieuwe autosleutel moet worden ingeleerd, hoe dat gaat, hoe lang het duurt en wanneer het niet nodig is.',
    intro: 'Een nieuwe afstandsbediening of transpondersleutel past misschien in het slot, maar de auto kent hem nog niet. Inleren (programmeren) is de stap waarmee de auto de sleutel accepteert.',
    updated: '2026-10-22',
    sections: [
      { h2: 'Wat gebeurt er bij inleren?', blocks: [
        { type: 'p', text: 'Via de diagnose-aansluiting (OBD) onder het dashboard wordt de code van de nieuwe sleutel opgeslagen in de startonderbreker en, bij een afstandsbediening, in de centrale vergrendeling. Bij sommige auto\'s moet daarvoor eerst een pincode of beveiligingscode worden uitgelezen.' },
        { type: 'p', text: 'Het duurt meestal tussen tien minuten en een uur, afhankelijk van merk en model.' },
      ] },
      { h2: 'Wanneer is inleren nodig?', blocks: [
        { type: 'list', items: [
          'Nieuwe complete afstandsbediening: ja',
          'Nieuwe smart key: ja',
          'Nieuwe transpondersleutel of losse transponder: ja',
          'Nieuwe printplaat: ja',
          'Alleen een nieuwe behuizing met uw eigen elektronica: nee',
          'Alleen een nieuwe batterij: bij vrijwel alle auto\'s nee',
          'Sleutel zonder chip: nee, alleen frezen',
        ] },
      ] },
      { h2: 'Kan ik het zelf?', blocks: [
        { type: 'p', text: 'Bij een beperkt aantal oudere auto\'s bestaat een procedure met het contactslot en een of twee werkende sleutels. Bij de meeste auto\'s is professionele apparatuur nodig. Kies bij een sleutel in onze webshop voor "Monteur aan huis": die freest en leert de sleutel bij u in.' },
      ] },
    ],
    faq: [
      { q: 'Kan elke sleutel worden ingeleerd?', a: 'Alleen een sleutel met de juiste transponder en frequentie voor uw auto. Daarom staan chip en frequentie bij elk artikel.' },
      { q: 'Blijven mijn andere sleutels werken?', a: 'Meestal wel, tenzij u ze bewust laat wissen, bijvoorbeeld omdat er één is gestolen.' },
    ],
    links: [
      { href: '/categorie/afstandsbedieningen', label: 'Autosleutels met afstandsbediening' },
      { href: '/categorie/smart-keys', label: 'Smart keys' },
    ],
  },
  {
    slug: 'afstandsbediening-auto-werkt-niet',
    title: 'Afstandsbediening van de auto werkt niet: 6 oorzaken',
    seoTitle: 'Afstandsbediening auto werkt niet? 6 oorzaken',
    description: 'Gaat de auto niet meer open met de afstandsbediening? Van lege batterij tot kapotte microschakelaar: zo vindt u de oorzaak en de oplossing.',
    intro: 'Een afstandsbediening die het niet meer doet, is in de meeste gevallen met een klein onderdeel te repareren. Loop deze oorzaken van boven naar beneden af.',
    updated: '2026-10-22',
    sections: [
      { h2: 'De oorzaken, van vaak naar zelden', blocks: [
        { type: 'steps', items: [
          { title: 'Lege batterij', text: 'Bereik wordt steeds kleiner, of een lampje knippert zwak. Vervang de knoopcel (meestal CR2032 of CR2025).' },
          { title: 'Versleten knopjes of microschakelaar', text: 'Eén knop werkt niet of alleen als u hard drukt. Een nieuwe behuizing met nieuwe rubbers lost het vaak op.' },
          { title: 'Losgeraakte batterijcontacten', text: 'Na een val werkt de sleutel soms wel, soms niet. Contacten of soldeerpunten op de printplaat zijn los.' },
          { title: 'Waterschade', text: 'Na de wasmachine: batterij eruit, laten drogen. Corrosie op de printplaat betekent vaak een nieuwe printplaat of sleutel.' },
          { title: 'Sleutel is uit de auto gevallen', text: 'Na een batterijwissel bij sommige merken: de knoppen moeten opnieuw worden gesynchroniseerd (zie instructieboekje).' },
          { title: 'Probleem in de auto', text: 'Werkt ook de reservesleutel niet? Dan ligt het aan de auto (accu, ontvanger of vergrendeling), niet aan de sleutel.' },
        ] },
        { type: 'tip', text: 'Test altijd eerst de reservesleutel. Werkt die wel, dan zit het probleem in uw sleutel; werkt die ook niet, dan in de auto.' },
      ] },
    ],
    faq: [
      { q: 'De auto gaat open maar start niet. Wat nu?', a: 'Dan ligt het meestal aan de transponder: los, beschadigd of na een nieuwe behuizing vergeten over te zetten.' },
      { q: 'Is repareren goedkoper dan een nieuwe sleutel?', a: 'Vaak wel. Een batterij of behuizing kost een fractie van een nieuwe afstandsbediening die ook ingeleerd moet worden.' },
    ],
    links: [
      { href: '/categorie/batterijen', label: 'Sleutelbatterijen' },
      { href: '/categorie/behuizingen', label: 'Sleutelbehuizingen' },
      { href: '/categorie/printplaten', label: 'Printplaten' },
    ],
  },
  {
    slug: 'reservesleutel-laten-maken',
    title: 'Reservesleutel voor de auto laten maken: zo werkt het',
    seoTitle: 'Reservesleutel auto laten maken',
    description: 'Waarom een tweede autosleutel slim is, wat het kost ten opzichte van alle sleutels kwijt, en hoe u er een laat maken.',
    intro: 'Veel tweedehands auto\'s worden met maar één sleutel verkocht. Zolang die werkt merkt u niets, maar raakt hij kwijt, dan wordt een nieuwe sleutel ineens een stuk ingewikkelder.',
    updated: '2026-10-22',
    sections: [
      { h2: 'Waarom nu, en niet pas als hij kwijt is', blocks: [
        { type: 'p', text: 'Met een werkende sleutel kan een nieuwe sleutel eenvoudig worden bijgeleerd. Zijn alle sleutels kwijt, dan moet de sleutelcode eerst worden bepaald en moet de auto soms worden geopend zonder schade. Dat kost meer tijd en geld.' },
      ] },
      { h2: 'Zo laat u een reservesleutel maken', blocks: [
        { type: 'steps', items: [
          { title: 'Kies het juiste onderdeel', text: 'Zoek op kenteken, of vergelijk vorm, knoppen en baard met uw huidige sleutel.' },
          { title: 'Kies de dienst', text: 'Frezen op sleutelcode, of een monteur aan huis die freest en inleert.' },
          { title: 'Inleren', text: 'De nieuwe sleutel wordt aan de auto geleerd. Uw bestaande sleutel blijft werken.' },
        ] },
      ] },
    ],
    faq: [
      { q: 'Kan ik een reservesleutel zonder chip laten maken?', a: 'Alleen voor auto\'s zonder startonderbreker. Bij een auto met startonderbreker opent zo\'n sleutel het portier maar start hij de motor niet.' },
    ],
    links: [
      { href: '/categorie/afstandsbedieningen', label: 'Autosleutels met afstandsbediening' },
      { href: '/categorie/transpondersleutels', label: 'Transpondersleutels' },
    ],
  },
  {
    slug: 'smart-key-keyless-uitgelegd',
    title: 'Smart key en keyless entry: hoe het werkt en wat u moet weten',
    seoTitle: 'Smart key en keyless entry uitgelegd',
    description: 'Hoe een smart key werkt, wat u doet bij een lege batterij, hoe u zich beschermt tegen diefstal met een relay-aanval en wat een nieuwe kost.',
    intro: 'Met een smart key blijft de sleutel in uw zak: de auto merkt dat hij dichtbij is, opent de deur en start met een knop. Handig, maar er zijn een paar dingen om te weten.',
    updated: '2026-10-22',
    sections: [
      { h2: 'Hoe werkt het?', blocks: [
        { type: 'p', text: 'De auto zendt via antennes in deuren en interieur een zwak signaal uit. De smart key antwoordt met een versleutelde code. Klopt die en is de sleutel dichtbij genoeg, dan gaat de deur open of start de auto.' },
      ] },
      { h2: 'Batterij leeg', blocks: [
        { type: 'p', text: 'In bijna elke smart key zit een noodsleutel waarmee u het portier opent. Starten lukt meestal door de sleutel tegen de startknop of tegen een gemarkeerde plek te houden. Het instructieboekje noemt de juiste plek.' },
      ] },
      { h2: 'Diefstal met een relay-aanval', blocks: [
        { type: 'p', text: 'Dieven kunnen het signaal van een smart key in huis doorgeven aan de auto op de oprit. Bescherm u door de sleutel niet bij de voordeur te bewaren, een afschermend etui (Faraday-zakje) te gebruiken, of keyless entry uit te zetten als uw auto dat toestaat.' },
      ] },
    ],
    faq: [
      { q: 'Moet een nieuwe smart key worden ingeleerd?', a: 'Ja, altijd, met diagnoseapparatuur. De noodsleutel erin wordt op uw sleutelcode gefreesd.' },
      { q: 'Kan ik alleen de behuizing van mijn smart key vervangen?', a: 'Bij veel modellen wel. U zet de printplaat over en de auto hoeft de sleutel niet opnieuw te leren.' },
    ],
    links: [
      { href: '/categorie/smart-keys', label: 'Smart keys' },
      { href: '/categorie/noodsleutels', label: 'Noodsleutels' },
      { href: '/categorie/behuizingen', label: 'Behuizingen' },
    ],
  },
  {
    slug: 'klapsleutel-kapot-repareren',
    title: 'Klapsleutel kapot: scharnier, baard of knoppen repareren',
    seoTitle: 'Klapsleutel kapot? Zo repareert u hem',
    description: 'Klapt de baard niet meer uit, zit hij los of is de behuizing gebroken? Welke onderdelen u nodig heeft om een klapsleutel te repareren.',
    intro: 'Bij een klapsleutel gaat vooral het scharnier stuk: de baard klapt niet meer uit of zit los. Meestal is de elektronica nog prima en is alleen de behuizing of de baard aan vervanging toe.',
    updated: '2026-10-22',
    sections: [
      { h2: 'Wat is er kapot?', blocks: [
        { type: 'list', items: [
          'Baard klapt niet uit of blijft niet staan: veer of scharnierpen versleten. Oplossing: nieuwe behuizing.',
          'Baard afgebroken: nieuwe ongefreesde baard, gefreesd op uw sleutelcode.',
          'Knoppen versleten of gescheurd: nieuwe behuizing met nieuwe rubbers.',
          'Behuizing gebroken: nieuwe behuizing, elektronica overzetten.',
        ] },
      ] },
      { h2: 'Zelf doen of laten doen', blocks: [
        { type: 'p', text: 'De elektronica overzetten kunt u met een klein schroevendraaiertje zelf (zie ons stappenplan). De baard moet worden gefreesd op uw sleutelcode; dat doen wij als u "Frezen op sleutelcode" kiest. Liever alles laten doen? Kies "Elektronica overzetten" en stuur uw oude sleutel op.' },
      ] },
    ],
    faq: [
      { q: 'Kan ik de oude baard in de nieuwe behuizing zetten?', a: 'Bij sommige modellen wel, met een pinnetje. Vaak is frezen op sleutelcode netter, omdat de oude baard ook versleten is.' },
    ],
    links: [
      { href: '/categorie/behuizingen', label: 'Behuizingen' },
      { href: '/categorie/sleutelbaarden', label: 'Sleutelbaarden' },
    ],
  },
  {
    slug: 'kosten-nieuwe-autosleutel',
    title: 'Wat kost een nieuwe autosleutel? Prijzen per type',
    seoTitle: 'Wat kost een nieuwe autosleutel?',
    description: 'Van sleutel zonder chip tot smart key: waar de prijs van een nieuwe autosleutel van afhangt en waar u op kunt besparen.',
    intro: 'De prijs van een nieuwe autosleutel loopt sterk uiteen. Drie dingen bepalen hem: het type sleutel, of hij moet worden ingeleerd, en of u nog een werkende sleutel heeft.',
    updated: '2026-10-22',
    sections: [
      { h2: 'Waar de prijs van afhangt', blocks: [
        { type: 'list', items: [
          'Type: sleutel zonder chip < transpondersleutel < afstandsbediening < smart key',
          'Werk: alleen frezen, of ook inleren met diagnoseapparatuur',
          'Situatie: bijmaken met een werkende sleutel is goedkoper dan alle sleutels kwijt',
          'Origineel of vervangend: een dealersleutel kost meestal een veelvoud van een vervangende sleutel met dezelfde functies',
        ] },
      ] },
      { h2: 'Besparen', blocks: [
        { type: 'p', text: 'Werkt de elektronica nog en is alleen de buitenkant kapot? Dan is een nieuwe behuizing veruit de goedkoopste oplossing. Bij een lege batterij is een knoopcel genoeg. In onze webshop ziet u bij elk artikel de prijs inclusief btw, en de prijs van frezen, overzetten of een monteur aan huis staat erbij.' },
      ] },
    ],
    faq: [
      { q: 'Is een vervangende sleutel even goed als een originele?', a: 'Functioneel doet hij hetzelfde: openen, sluiten en starten. Het verschil zit vooral in prijs en soms in de afwerking.' },
    ],
    links: [
      { href: '/categorie/behuizingen', label: 'Behuizingen' },
      { href: '/categorie/afstandsbedieningen', label: 'Autosleutels met afstandsbediening' },
      { href: '/categorie/smart-keys', label: 'Smart keys' },
    ],
  },
];

export const adviceBySlug = (slug: string) => ADVIES.find((a) => a.slug === slug);

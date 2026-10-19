import { withBase } from '@/lib/base';
import Link from 'next/link';
import { WHATSAPP_URL } from '@/config/site.config';

export default function NotFound() {
  return (
    <div className="shop-status-page">
      <h1>Deze pagina bestaat niet (meer)</h1>
      <p>Het artikel is misschien uit het assortiment. Zoek op artikelcode of automerk, of vraag het ons.</p>
      <form action={withBase("/zoeken")} className="shop-status-search">
        <input name="q" type="search" placeholder="Artikelcode, merk of omschrijving" aria-label="Zoeken" />
        <button type="submit">Zoeken</button>
      </form>
      <p>
        <Link href="/catalogus">Alle producten</Link> · <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">WhatsApp ons</a>
      </p>
    </div>
  );
}

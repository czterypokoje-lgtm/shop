import React from 'react';
import WebshopHero from '@/components/webshop/WebshopHero';
import CategoryGrid from '@/components/webshop/CategoryGrid';
import PromoBanner from '@/components/webshop/PromoBanner';
import ProductRow from '@/components/webshop/ProductRow';
import { HomeBrands, HomeFavorites, HomeGuides } from '@/components/webshop/HomeSections';
import { getShopProducts } from '@/lib/shopCatalog';
import { HomeWhyUs, HomeServiceBanners } from '@/components/webshop/HomeService';
import { HomeWhyBand, HomeReviewsBand } from '@/components/webshop/HomeTrustBands';

/*
 * The home page reads the merged catalogue — prices, hidden products and
 * featured flags all come from the CRM — so it cannot be baked once at build
 * time. Product and category pages are already rendered per request; this one
 * was static, which meant a price corrected in the CRM showed everywhere
 * except the first page a customer sees. Five minutes is short enough to feel
 * immediate and long enough to keep the page fast.
 */
export const revalidate = 300;

export const metadata = {
  // Not "OEM": this catalogue is aftermarket throughout, and the title is
  // the first place a customer is told what they are buying.
  title: 'Autosleutel24 Webshop — autosleutels, behuizingen & printplaten',
  description:
    'Vind de juiste autosleutel, behuizing of printplaat voor uw auto. Filter op frequentie, ' +
    'transponder en sleutelbaard. Bestel online voor minder dan de dealerprijs.',
};

export default async function WebshopPage() {
  /*
   * Through the merged catalogue, not the raw feed: a product the office took
   * offline was still on this carousel, and a corrected price was not.
   * Products marked featured in the CRM lead; the rest fills up the row.
   */
  const all = await getShopProducts('public');
  // "10+1 gratis" packs carry a promo banner as their photo: not a headline product.
  const withPhoto = all.filter((p) => p.image && !p.image.includes('placeholder') && p.cleanPhoto && !/10 \+ 1 gratis/.test(p.titleNl));
  // Featured in the CRM first; then keys and housings, which is what people
  // come for — not the first rows of the feed (key rings by the hundred).
  const HEADLINE = ['afstandsbedieningen', 'behuizingen', 'smart-keys'];
  const featuredProducts = [
    ...withPhoto.filter((p) => p.featured),
    ...withPhoto.filter((p) => !p.featured && HEADLINE.includes(p.category ?? '') && p.inStock),
  ]
    // One per car make, so the row is not eight Toyotas.
    .filter((p, i, arr) => p.featured || arr.findIndex((q) => q.makes[0] === p.makes[0]) === i)
    .slice(0, 8);

  return (
    <div>
      <WebshopHero count={all.length} />
      <HomeWhyUs />

      <HomeBrands products={all} />

      <section className="section" id="categorieen" style={{ background: 'var(--webshop-bg)' }}>
        <div className="container">
          <h2 className="section-title">Meest gezochte <span>categorieën</span></h2>
          <CategoryGrid />
        </div>
      </section>

      <HomeServiceBanners />

      <HomeFavorites products={featuredProducts} />

      {/*
        Shelves, the way a shop has shelves. One row of eight products and
        three blocks that were empty or editorial made a catalogue of 924
        articles read as though it had eight.
      */}
      <ProductRow category="afstandsbedieningen" title="Autosleutels met afstandsbediening" cover="/images/brand/cover-afstandsbedieningen.webp" tagline="Complete sleutel: behuizing, elektronica en baard." />

      <ProductRow category="behuizingen" title="Sleutelbehuizingen" cover="/images/brand/cover-behuizingen.webp" tagline="Versleten of kapot? Uw elektronica in een nieuwe behuizing." />

      <HomeWhyBand />

      <section className="section">
        <div className="container">
          <PromoBanner />
        </div>
      </section>

      <ProductRow category="printplaten" title="Printplaten (PCB)" cover="/images/brand/cover-printplaten.webp" tagline="Nieuwe elektronica voor uw afstandsbediening." />

      <ProductRow category="smart-keys" title="Smart keys (keyless)" cover="/images/brand/cover-universele-sleutels.webp" tagline="Instappen en starten zonder de sleutel te pakken." />

      <HomeReviewsBand />

      <HomeGuides />
    </div>
  );
}

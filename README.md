# Autosleutel24 Shop

Webshop op een eigen domein. Bestellingen komen in dezelfde Supabase als de CRM
(`~/Documents/autoslutel`, `/admin/orders`). Next 16 — lees `AGENTS.md`.

```bash
cp .env.example .env.local   # vul in
npm run dev                  # localhost:3000
npm run build                # bouwt eerst de catalogus (scripts/build-catalog.mjs)
node scripts/audit-catalog.mjs
node --experimental-strip-types scripts/check-fitment.mjs
```

Prijs: A-Key-prijs ÷ 1,19 (Duitse btw eraf) = inkoop → marge + 21% btw (`src/lib/catalog.ts`).
Overrides uit de CRM (`product_overrides`) gaan voor. AccessFobs levert alleen foto's.

Vóór livegang: `noindex` in `src/app/layout.tsx` en `Disallow` in `src/app/robots.ts`
samen weghalen, `NEXT_PUBLIC_SITE_URL` zetten, live Mollie-key.

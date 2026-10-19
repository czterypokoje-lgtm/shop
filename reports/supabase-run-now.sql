-- Run in Supabase → SQL Editor, in this order. Before running, replace VUL-HIER-HET-GEHEIM-IN
-- (part 3) with the same value as ORDER_WEBHOOK_SECRET in the Vercel shop project.

-- ===== 1/3 =====
-- ============================================================================
-- 0076: product_overrides is no longer readable with the anon key.
--
-- Run after 0075_openai_qualified.sql (main project). Idempotent.
--
-- 0010 granted anon select because the webshop read overrides without a
-- session. That table also holds cost_override (our purchase price) and
-- internal_note, which the anon key exposed to anyone. The webshop now reads
-- server-side with the service role (src/lib/shopCatalog.ts), and the CRM
-- admin reads as an authenticated office user, so anon needs nothing here.
-- ============================================================================

revoke select on public.product_overrides from anon;

drop policy if exists product_overrides_read on public.product_overrides;
create policy product_overrides_read on public.product_overrides
  for select to authenticated
  using (public.crm_role() in ('owner', 'kantoor'));

notify pgrst, 'reload schema';

-- ===== 2/3 =====
-- Product reviews with photos, only from customers with a paid order.
-- Run once in Supabase (SQL editor). Idempotent.
--
-- 0002 defined product_reviews but it never reached the live database. Same
-- rules as there: one review per product per order, the public reads only what
-- is published. The shop writes with the service role after checking the
-- customer's personal link (src/lib/reviewToken.ts).

create table if not exists public.product_reviews (
  id           uuid primary key default gen_random_uuid(),
  product_slug text not null,
  order_id     uuid not null references public.orders(id) on delete cascade,
  rating       int  not null check (rating between 1 and 5),
  title        text,
  body         text not null,
  author_name  text not null,
  photos       text[] not null default '{}',
  published_at timestamptz,
  created_at   timestamptz not null default now(),
  unique (product_slug, order_id)
);
alter table public.product_reviews add column if not exists photos text[] not null default '{}';

create index if not exists product_reviews_slug_idx on public.product_reviews (product_slug, published_at desc);

alter table public.product_reviews enable row level security;
revoke all on public.product_reviews from anon, authenticated;
drop policy if exists product_reviews_public_read on public.product_reviews;
create policy product_reviews_public_read on public.product_reviews
  for select to anon, authenticated using (published_at is not null);
grant select on public.product_reviews to anon, authenticated;

-- The office can take a review down from the CRM (published_at = null).
drop policy if exists product_reviews_office on public.product_reviews;
create policy product_reviews_office on public.product_reviews
  for all to authenticated
  using (public.crm_role() in ('owner', 'kantoor'))
  with check (public.crm_role() in ('owner', 'kantoor'));
grant update, delete on public.product_reviews to authenticated;

-- Customer photos: public to read, written only by the shop (service role).
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('review-photos', 'review-photos', true, 2097152, array['image/webp'])
on conflict (id) do update set public = true, file_size_limit = 2097152, allowed_mime_types = array['image/webp'];

notify pgrst, 'reload schema';

-- ===== 3/3 =====
-- Shipped e-mail: when the office sets a webshop order to 'shipped' in the CRM,
-- the database asks the shop to e-mail the customer their track & trace.
--
-- Run once, AFTER the shop is live on its own domain. Replace the two
-- placeholders first:
--   https://SHOP-DOMEIN.nl   → the shop's public address
--   VUL-HIER-HET-GEHEIM-IN   → the same value as ORDER_WEBHOOK_SECRET in Vercel
-- Needs the pg_net extension (Database → Extensions → pg_net).

create extension if not exists pg_net;

create or replace function public.notify_order_shipped()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  perform net.http_post(
    url     := 'https://www.autosleutel24.nl/webshop/api/orders/shipped',
    headers := jsonb_build_object('Content-Type', 'application/json', 'x-webhook-secret', 'VUL-HIER-HET-GEHEIM-IN'),
    body    := jsonb_build_object('record', jsonb_build_object('id', new.id, 'status', new.status),
                                  'old_record', jsonb_build_object('status', old.status))
  );
  return new;
end $$;

drop trigger if exists orders_notify_shipped on public.orders;
create trigger orders_notify_shipped
  after update of status on public.orders
  for each row
  when (new.status = 'shipped' and old.status is distinct from 'shipped')
  execute function public.notify_order_shipped();

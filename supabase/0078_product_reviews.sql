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

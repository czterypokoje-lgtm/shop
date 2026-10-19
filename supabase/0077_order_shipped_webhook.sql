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
    url     := 'https://SHOP-DOMEIN.nl/api/orders/shipped',
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

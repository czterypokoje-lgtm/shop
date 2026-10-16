-- ============================================================================
-- 0064: product_overrides is no longer readable with the anon key.
--
-- Run after 0063_call_click_whatsapp_ref.sql. Idempotent.
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

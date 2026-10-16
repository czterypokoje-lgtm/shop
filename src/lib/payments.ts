/**
 * The payment methods checkout offers at Mollie — and therefore the only ones
 * the shop may show. Klarna and Riverty are left out: they need order lines
 * and an authorise-then-capture flow this shop does not run.
 */
export const PAYMENT_METHODS: { id: string; label: string }[] = [
  { id: 'ideal', label: 'iDEAL' },
  { id: 'bancontact', label: 'Bancontact' },
  { id: 'creditcard', label: 'Creditcard' },
  // PayPal: add back once it is activated in the Mollie dashboard.
];

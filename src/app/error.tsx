'use client';

import { SITE_CONFIG } from '@/config/site.config';

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="shop-status-page">
      <h1>Er ging iets mis</h1>
      <p>Probeer het opnieuw. Lukt het niet, bel ons op {SITE_CONFIG.phone}.</p>
      <button type="button" onClick={reset} className="shop-status-button">Opnieuw proberen</button>
    </div>
  );
}

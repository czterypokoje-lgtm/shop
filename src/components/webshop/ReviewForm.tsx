'use client';

import React, { useActionState, useState, startTransition } from 'react';
import { submitReview, type ReviewState } from '@/app/review/actions';
import s from './Reviews.module.css';

/** Phone photos are 3–8 MB: shrink to 1600px JPEG here so the upload stays small and fast. */
async function shrink(file: File): Promise<Blob> {
  try {
    const bmp = await createImageBitmap(file);
    const scale = Math.min(1, 1600 / Math.max(bmp.width, bmp.height));
    const c = document.createElement('canvas');
    c.width = Math.round(bmp.width * scale); c.height = Math.round(bmp.height * scale);
    c.getContext('2d')!.drawImage(bmp, 0, 0, c.width, c.height);
    return await new Promise((r) => c.toBlob((b) => r(b ?? file), 'image/jpeg', 0.85));
  } catch { return file; }
}

export default function ReviewForm({ orderId, token, slug, title, image, defaultName, done }: {
  orderId: string; token: string; slug: string; title: string; image: string | null; defaultName: string; done: boolean;
}) {
  const [state, action, pending] = useActionState<ReviewState, FormData>(submitReview, { ok: false });
  const [rating, setRating] = useState(0);
  const [files, setFiles] = useState<File[]>([]);

  if (done || state.ok) {
    return (
      <div className={s.formCard}>
        <div className={s.formHead}>{image && <img src={image} alt="" width={64} height={64} />}<strong>{title}</strong></div>
        <p className={s.thanks}>✓ Bedankt voor uw review! Hij staat op de productpagina.</p>
      </div>
    );
  }

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    fd.delete('photos');
    for (const f of files.slice(0, 3)) fd.append('photos', new File([await shrink(f)], 'foto.jpg', { type: 'image/jpeg' }));
    startTransition(() => action(fd));
  };

  return (
    <form className={s.formCard} onSubmit={submit}>
      <div className={s.formHead}>{image && <img src={image} alt="" width={64} height={64} />}<strong>{title}</strong></div>
      <input type="hidden" name="order" value={orderId} />
      <input type="hidden" name="token" value={token} />
      <input type="hidden" name="slug" value={slug} />
      <input type="hidden" name="rating" value={rating || ''} />
      <fieldset className={s.stars} aria-label="Uw beoordeling">
        {[1, 2, 3, 4, 5].map((n) => (
          <button key={n} type="button" className={n <= rating ? s.on : ''} onClick={() => setRating(n)} aria-label={`${n} ster${n > 1 ? 'ren' : ''}`} aria-pressed={n === rating}>★</button>
        ))}
      </fieldset>
      <label>Titel (optioneel)<input name="title" maxLength={120} placeholder="Bijv. Past perfect op mijn Golf" /></label>
      <label>Uw ervaring *<textarea name="body" required minLength={10} maxLength={2000} rows={4} placeholder="Wat vond u van het product, de levering en het passen?" /></label>
      <label>Naam (zo zichtbaar) *<input name="name" required maxLength={40} defaultValue={defaultName} /></label>
      <label>Foto&apos;s (optioneel, max. 3)
        <input type="file" accept="image/*" multiple onChange={(e) => setFiles([...(e.target.files ?? [])].slice(0, 3))} />
      </label>
      {files.length > 0 && <p className={s.small}>{files.length} foto{files.length > 1 ? "'s" : ''} gekozen</p>}
      {state.error && <p className={s.error} role="alert">{state.error}</p>}
      <button className={s.send} disabled={pending || !rating}>{pending ? 'Versturen…' : rating ? 'Review plaatsen' : 'Kies eerst sterren'}</button>
    </form>
  );
}

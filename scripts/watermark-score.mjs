import { createRequire } from 'module';
const sharp = createRequire(import.meta.url)('sharp');
// Share of pixels in the central area tinted the A-Key watermark green (muted, G clearly above R and B).
export async function greenScore(file) {
  const { data, info } = await sharp(file).resize(200, 200, { fit: 'contain', background: '#fff' }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  let n = 0, g = 0;
  for (let y = 30; y < 170; y++) for (let x = 30; x < 170; x++) {
    const i = (y * info.width + x) * 3, r = data[i], gr = data[i + 1], b = data[i + 2];
    n++; if (gr - r > 12 && gr - b > 4 && gr < 215 && gr > 60) g++;
  }
  return g / n;
}
if (process.argv[2]) for (const f of process.argv.slice(2)) console.log((await greenScore(f)).toFixed(4), f);

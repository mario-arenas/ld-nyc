// Pulls project content and photos out of the legacy static site (one folder up)
// into src/data and src/assets, trimming the black letterbox bars the old slider added.
import { readFile, writeFile, mkdir, copyFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const LEGACY = path.resolve(import.meta.dirname, '../..');
const OUT = path.resolve(import.meta.dirname, '..');
const ASSETS = path.join(OUT, 'src/assets');

const decode = (s) =>
  s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&#8217;|’/g, '’').replace(/\s+/g, ' ').trim();

// Average brightness of the outer columns: the old 900x450 frames padded narrow shots with black.
async function hasBars(file) {
  const { data, info } = await sharp(file).greyscale().raw().toBuffer({ resolveWithObject: true });
  let sum = 0, n = 0;
  for (const x of [2, info.width - 3]) for (let y = 0; y < info.height; y += 10) { sum += data[y * info.width + x]; n++; }
  return sum / n < 12;
}

async function importImage(src, dest) {
  await mkdir(path.dirname(dest), { recursive: true });
  if (await hasBars(src)) {
    await sharp(src).trim({ background: '#000000', threshold: 18 }).jpeg({ quality: 92 }).toFile(dest);
    return true;
  }
  await copyFile(src, dest);
  return false;
}

const index = await readFile(path.join(LEGACY, 'work/index.html'), 'utf8');
const order = [...index.matchAll(/<a href="\/work\/([a-z-]+)\.html" class="hover"/g)].map((m) => m[1]);

const projects = [];
let trimmed = 0, total = 0;
for (const slug of order) {
  const html = await readFile(path.join(LEGACY, `work/${slug}.html`), 'utf8');
  const h1 = html.match(/<div id="work_header">\s*<h1>(.*?)<span>(.*?)<\/span><\/h1>/s);
  const name = decode(h1[1]);
  const type = decode(h1[2]).toLowerCase();
  const description = decode(html.match(/Project Description<\/h1>\s*<p>(.*?)<\/p>/s)?.[1] ?? '');
  const srcs = [...html.matchAll(/<img src="(\/assets\/images\/work\/\d+\/img-\d+\.jpg)"/g)].map((m) => m[1]);
  const images = [];
  for (const [i, src] of srcs.entries()) {
    const file = `work/${slug}/${String(i + 1).padStart(2, '0')}.jpg`;
    if (await importImage(path.join(LEGACY, src), path.join(ASSETS, file))) trimmed++;
    total++;
    images.push(file);
  }
  projects.push({ slug, name, type, description, images });
}

await mkdir(path.join(OUT, 'src/data'), { recursive: true });
await writeFile(path.join(OUT, 'src/data/projects.json'), JSON.stringify(projects, null, 2) + '\n');

// Home slider, portrait and press covers.
const copies = [
  ...(await readdir(path.join(LEGACY, 'assets/images/intro'))).filter((f) => f.endsWith('.jpg')).map((f) => [`intro/${f}`, `intro/${f}`]),
  ['about/thumb_bio.jpg', 'about/doris.jpg'],
  ['about/thumb_about.jpg', 'about/stones.jpg'],
  ['service/planting_trees.jpg', 'service/planting-trees.jpg'],
  ['contact/columns.jpg', 'contact/loft.jpg'],
  ...(await readdir(path.join(LEGACY, 'assets/images/press'))).filter((f) => f.startsWith('thumb-')).map((f) => [`press/${f}`, `press/${f}`]),
];
for (const [from, to] of copies) {
  if (await importImage(path.join(LEGACY, 'assets/images', from), path.join(ASSETS, to))) trimmed++;
  total++;
}

console.log(`${projects.length} projects, ${total} images (${trimmed} letterboxed photos trimmed)`);

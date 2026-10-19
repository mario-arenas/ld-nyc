import type { ImageMetadata } from 'astro';
import data from '../data/projects.json';

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/**/*.jpg', { eager: true });

export function img(path: string): ImageMetadata {
  const mod = files[`../assets/${path}`];
  if (!mod) throw new Error(`Missing image: src/assets/${path}`);
  return mod.default;
}

/** Responsive widths up to the source width; the legacy photos top out at 900px. */
export function widthsFor(image: ImageMetadata, wanted = [480, 720, 960, 1400]) {
  return [...new Set([...wanted.filter((w) => w < image.width), image.width])];
}

const TYPE_LABEL: Record<string, string> = {
  loft: 'Loft',
  duplex: 'Duplex',
  apartment: 'Apartment',
  penthouse: 'Penthouse',
  tower: 'Tower',
  work: 'Work',
};

const CATEGORY: Record<string, string> = {
  loft: 'Lofts',
  duplex: 'Penthouses & duplexes',
  penthouse: 'Penthouses & duplexes',
  apartment: 'Apartments',
  tower: 'Apartments',
  work: 'Craft & details',
};

// Some projects open with a floor plan or a demolition shot; use a finished room as the cover.
const COVER_INDEX: Record<string, number> = {
  'danny-victor': 1,
  friemann: 1,
  kitchen: 3,
  myerberg: 1,
  richardson: 5,
  various: 5,
};

export type Project = (typeof projects)[number];

export const projects = data.map((p) => {
  const images = p.images.map(img);
  return {
    ...p,
    title: p.slug === 'various' ? 'Craft & Details' : `${p.name} ${TYPE_LABEL[p.type] ?? p.type}`,
    typeLabel: TYPE_LABEL[p.type] ?? p.type,
    category: CATEGORY[p.type] ?? 'Other',
    cover: images[COVER_INDEX[p.slug] ?? 0],
    photos: images,
  };
});

export const categories = [...new Set(projects.map((p) => p.category))];

export const FEATURED = ['feldschuh', 'biggio', 'friedman', 'richardson', 'swinehart', 'stanwick'];

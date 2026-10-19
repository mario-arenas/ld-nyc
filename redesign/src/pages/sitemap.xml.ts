import type { APIRoute } from 'astro';
import { projects } from '../lib/projects';

export const GET: APIRoute = ({ site }) => {
  const paths = ['/', '/work/', ...projects.map((p) => `/work/${p.slug}/`)];
  const urls = paths.map((p) => `  <url><loc>${new URL(p, site)}</loc></url>`).join('\n');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml' } },
  );
};

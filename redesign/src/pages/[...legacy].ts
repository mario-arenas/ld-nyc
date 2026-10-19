// Redirect pages for the old site's URLs, so existing links and search results still land somewhere useful.
// GitHub Pages has no server-side redirects, so each one is a tiny HTML page with a meta refresh.
import type { APIRoute, GetStaticPaths } from 'astro';
import { projects } from '../lib/projects';

const LEGACY: Record<string, string> = {
  'about/index.html': '/#about',
  'about/us.html': '/#about',
  'about/bio-doris.html': '/#about',
  'about/mission.html': '/#sustainability',
  'service/index.html': '/#sustainability',
  'press/index.html': '/#press',
  'contact/index.html': '/#contact',
  ...Object.fromEntries(projects.map((p) => [`work/${p.slug}.html`, `/work/${p.slug}/`])),
};

export const getStaticPaths = (() =>
  Object.entries(LEGACY).map(([legacy, target]) => ({ params: { legacy }, props: { target } }))) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props, site }) => {
  const target = new URL(props.target as string, site).href;
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Moved | LD Creative Renovations</title>
<meta name="robots" content="noindex">
<link rel="canonical" href="${target}">
<meta http-equiv="refresh" content="0; url=${target}">
</head>
<body><p>This page has moved to <a href="${target}">${target}</a>.</p></body>
</html>
`;
  return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
};

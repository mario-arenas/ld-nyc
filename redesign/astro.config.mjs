import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.ld-nyc.com',
  // GitHub Pages serves the `redesign` branch's /docs folder, so the build goes there and is committed.
  outDir: '../docs',
  build: { format: 'directory' },
});

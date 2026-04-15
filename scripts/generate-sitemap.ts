/**
 * Generate sitemap.xml at build time.
 *
 * Usage: npx tsx scripts/generate-sitemap.ts
 * Produces: public/sitemap.xml
 */

import { writeFileSync } from 'fs';
import { join } from 'path';

// Import case study slugs from core content
import { caseStudies, metaCaseStudy } from '../core/content/case-studies.js';

const SITE_URL = process.env.VITE_SITE_URL ?? 'https://justinh.design';
const OUT_PATH = join(import.meta.dirname ?? '.', '..', 'public', 'sitemap.xml');

const now = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

const staticRoutes = ['/', '/about', '/work', '/resume'];

const caseStudyRoutes = [...caseStudies, metaCaseStudy].map(
  (study) => `/work/${study.slug}`
);

const allRoutes = [...staticRoutes, ...caseStudyRoutes];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (route) => `  <url>
    <loc>${SITE_URL}${route}</loc>
    <lastmod>${now}</lastmod>
  </url>`
  )
  .join('\n')}
</urlset>
`;

writeFileSync(OUT_PATH, xml, 'utf-8');
console.log(`Generated: ${OUT_PATH} (${allRoutes.length} URLs)`);

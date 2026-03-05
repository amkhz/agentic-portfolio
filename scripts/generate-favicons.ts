/**
 * Generate favicon.ico and apple-touch-icon.png using sharp.
 *
 * Usage: npx tsx scripts/generate-favicons.ts
 * Produces:
 *   public/favicon.ico  (32x32)
 *   public/apple-touch-icon.png (180x180)
 *
 * Requires: sharp (dev dependency)
 */

import sharp from 'sharp';
import { join } from 'path';

const PUBLIC_DIR = join(import.meta.dirname ?? '.', '..', 'public');

// Design tokens
const BG = '#0A0A0B';
const BRASS = '#C8956A';

async function generateFavicon() {
  // Create a 32x32 SVG with "JH" text
  const svg = `<svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="6" fill="${BG}"/>
    <text x="16" y="22" font-family="Arial, sans-serif" font-size="18" font-weight="700"
          fill="${BRASS}" text-anchor="middle" letter-spacing="-0.5"
    >JH</text>
  </svg>`;

  await sharp(Buffer.from(svg)).png().toFile(join(PUBLIC_DIR, 'favicon.png'));

  // Also create ICO-compatible PNG (browsers accept PNG favicons)
  await sharp(Buffer.from(svg)).png().toFile(join(PUBLIC_DIR, 'favicon.ico'));

  console.log('Generated: public/favicon.ico (32x32)');
}

async function generateAppleIcon() {
  const svg = `<svg width="180" height="180" xmlns="http://www.w3.org/2000/svg">
    <rect width="180" height="180" rx="36" fill="${BG}"/>
    <text x="90" y="115" font-family="Arial, sans-serif" font-size="90" font-weight="700"
          fill="${BRASS}" text-anchor="middle" letter-spacing="-2"
    >JH</text>
  </svg>`;

  await sharp(Buffer.from(svg)).png().toFile(join(PUBLIC_DIR, 'apple-touch-icon.png'));
  console.log('Generated: public/apple-touch-icon.png (180x180)');
}

Promise.all([generateFavicon(), generateAppleIcon()]).catch((err) => {
  console.error('Failed to generate favicons:', err);
  process.exit(1);
});

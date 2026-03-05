/**
 * Generate OG images as static PNGs at build time using Satori + sharp.
 *
 * Usage: npx tsx scripts/generate-og-images.ts
 *
 * Produces:
 *   public/og/default.png  (1200x630)
 *
 * Requires dev dependencies: satori, sharp, @types/sharp
 * (install separately — not needed for the main app build)
 */

import satori from 'satori';
import sharp from 'sharp';
import { readFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;
const OUT_DIR = join(import.meta.dirname ?? '.', '..', 'public', 'og');

// Design tokens (hardcoded to avoid import path issues in scripts)
const colors = {
  bgDeep: '#0A0A0B',
  textPrimary: '#F0EDE8',
  textSecondary: '#B8B2A8',
  brass: '#C8956A',
  magenta: '#C278A0',
};

async function generateDefaultOG() {
  // Use a system font or load a font file
  let fontData: ArrayBuffer;
  try {
    // Try to load Inter or a bundled font
    const fontPath = join(
      import.meta.dirname ?? '.',
      '..',
      'node_modules',
      '@fontsource',
      'didact-gothic',
      'files',
      'didact-gothic-latin-400-normal.woff'
    );
    fontData = readFileSync(fontPath).buffer as ArrayBuffer;
  } catch {
    console.warn('Font file not found, using fallback. OG image text may use default font.');
    // Create a minimal fallback — satori requires at least one font
    fontData = new ArrayBuffer(0);
  }

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.bgDeep,
          position: 'relative',
        },
        children: [
          // Brass glow
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                width: '600px',
                height: '600px',
                borderRadius: '50%',
                background: `radial-gradient(ellipse at center, rgba(200,149,106,0.15) 0%, rgba(200,149,106,0.04) 50%, transparent 70%)`,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              },
            },
          },
          // Content
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
              },
              children: [
                {
                  type: 'span',
                  props: {
                    style: {
                      fontSize: '64px',
                      fontWeight: 700,
                      color: colors.textPrimary,
                      letterSpacing: '-0.02em',
                      lineHeight: 1.1,
                    },
                    children: 'Justin Hernandez',
                  },
                },
                // Brass accent line
                {
                  type: 'div',
                  props: {
                    style: {
                      width: '80px',
                      height: '3px',
                      backgroundColor: colors.brass,
                      borderRadius: '2px',
                      marginTop: '24px',
                      marginBottom: '24px',
                    },
                  },
                },
                {
                  type: 'span',
                  props: {
                    style: {
                      fontSize: '24px',
                      fontWeight: 400,
                      color: colors.textSecondary,
                      maxWidth: '700px',
                      textAlign: 'center',
                      lineHeight: 1.4,
                    },
                    children: 'Product design leader for complex, human-centered systems',
                  },
                },
              ],
            },
          },
          // Bottom gradient bar
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: `linear-gradient(90deg, transparent 0%, ${colors.brass} 30%, ${colors.magenta} 70%, transparent 100%)`,
              },
            },
          },
        ],
      },
    },
    {
      width: OG_WIDTH,
      height: OG_HEIGHT,
      fonts: [
        {
          name: 'Didact Gothic',
          data: fontData,
          weight: 400,
          style: 'normal',
        },
      ],
    }
  );

  mkdirSync(OUT_DIR, { recursive: true });

  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
  const outPath = join(OUT_DIR, 'default.png');
  await sharp(pngBuffer).toFile(outPath);

  console.log(`Generated: ${outPath} (${OG_WIDTH}x${OG_HEIGHT})`);
}

generateDefaultOG().catch((err) => {
  console.error('Failed to generate OG image:', err);
  process.exit(1);
});

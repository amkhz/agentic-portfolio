import { describe, it, expect } from 'vitest';
import { imageManifest } from '../images/manifest.generated';

// Guard against a recurring failure mode: editing case-study markdown through a
// WYSIWYG / live-preview editor that re-serializes the document can silently
// strip `![alt](src)` image embeds (and HTML comments) on save, leaving the alt
// text as orphan body copy. This test reads every case-study markdown and
// asserts each local image reference is registered in the generated image
// manifest (i.e. the source exists in public/images and has responsive
// variants), so a dropped or mistyped image fails the build instead of
// shipping broken.

const markdownModules = import.meta.glob('./*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const LOCAL_IMAGE_RE = /!\[[^\]]*\]\((\/images\/[^)]+)\)/g;

describe('case study image references', () => {
  it('finds case study markdown to check', () => {
    expect(Object.keys(markdownModules).length).toBeGreaterThan(0);
  });

  for (const [path, markdown] of Object.entries(markdownModules)) {
    const file = path.replace(/^\.\//, '');
    it(`every local image in ${file} is registered in the manifest`, () => {
      const missing: string[] = [];

      for (const match of markdown.matchAll(LOCAL_IMAGE_RE)) {
        const ref = match[1];
        if (!(ref in imageManifest)) {
          missing.push(ref);
        }
      }

      expect(
        missing,
        `Images referenced in ${file} but absent from the manifest ` +
          `(stripped embed, typo, or missing source?): ${missing.join(', ')}`
      ).toEqual([]);
    });
  }
});

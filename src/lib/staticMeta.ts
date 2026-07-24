/**
 * The entry HTML files ship a static <meta name="description"> for crawlers
 * and social scrapers, which never execute the app (there is no prerender
 * step). React 19 hoists per-page <Helmet> metas into <head> without touching
 * pre-existing static tags, so once a page renders its own description the
 * document would carry two. Each entry calls this before mounting React so
 * the per-page tag is the only one in the live DOM; every route renders one.
 */
export function removeStaticDescription(): void {
  document.head.querySelector('meta[name="description"]')?.remove();
}

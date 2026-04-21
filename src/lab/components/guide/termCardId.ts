// Shared slug helper so GuideTerm (aria-controls) and
// GuideDefinitionCard (id) agree on the same id without
// crossing the react-refresh component-only export rule.
export function termCardId(term: string): string {
  const slug = term
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `guide-term-${slug || "term"}`;
}

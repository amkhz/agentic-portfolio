# Button: destructive variant (parked)

> Captured 2026-04-29 during a Paper MCP design experiment. Deferred until there is a real destructive action in the UI to attach it to. Re-introduce when needed; otherwise unused variants drift out of sync with the design system.

## Why this exists

We were exploring the Paper MCP design loop and prototyped a `destructive` variant for `Button` to test the round-trip between Paper and code. The variant is sound, but the live portfolio has no destructive actions yet. Rather than ship dead code, we are parking the variant here so it can be re-applied verbatim when a real use case lands.

## Reapply when

- A surface needs a clearly destructive action (delete, discard, irreversible reset).
- That surface treats the action as a primary affordance (not a tertiary "are you sure" link).
- The action is paired with a confirmation pattern, not a bare button.

## The diff

When the time comes, apply this to `src/components/interactive/Button.tsx`:

```ts
// 1. Extend the variant union
type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive";

// 2. Add the variant style entry
const variantStyles: Record<ButtonVariant, string> = {
  // ...existing entries
  destructive:
    "border border-error text-error bg-transparent hover:bg-error hover:text-text-inverse",
};
```

The pattern mirrors `secondary`: outlined at rest, filled on hover, using `--color-error` from the token set. WCAG contrast is satisfied in both rest and hover states against the dark-mode background.

## Notes

- If the destructive surface lives on the lab side and we have moved to a shadcn-themed Works arm by then, prefer the shadcn `destructive` Button primitive themed against our tokens rather than re-extending this component.
- If we add this back to the portfolio component, also add a Vitest case covering the variant render and the disabled state.

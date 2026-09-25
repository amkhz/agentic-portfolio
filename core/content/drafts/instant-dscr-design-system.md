> **Unrouted draft. Not published, not registered, not routed.**
> Imported 2026-09-03 with the Instant DSCR case study as context for a
> later round. Cut from the published study for length (interview ruling 2); banked
> here as material for a Notes mini-study.
> Prose is the source's, unedited: the voice pass has not run on it.

## The design system underneath

Briefly, because it is the reason any of the above moves quickly.

I maintain the brand as a versioned system with its own specification page, and the app
consumes it rather than reimplementing it. Components get extracted into a repo-native
registry so the next screen composes instead of inventing. Decisions that have
consequences get written down — thirty architecture decision records now govern a
*design* repository.


The discipline that pays off most: the specification page is held to the same rules it
documents. It recently failed its own accessibility floor in eleven places and displayed
twelve instances of a pattern it explicitly bans. Fixing it surfaced a structural gap the
doctrine had missed. A spec page that does not obey itself is not a spec.

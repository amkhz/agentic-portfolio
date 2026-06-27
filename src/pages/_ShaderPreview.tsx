// TEMPORARY — spike T4d preview harness. NOT for commit/ship. Delete after the
// GO/NO-GO call. Route: /_shader-preview (wired in App.tsx, also temporary).
import { ShaderCover } from "@/components/effects/ShaderCover";
import { Container } from "@/components/layout/Container";

export function ShaderPreviewPage() {
  return (
    <section className="py-16">
      <Container>
        <p className="font-mono text-xs uppercase tracking-wider text-accent-primary">
          Spike T4d — temporary preview
        </p>
        <h1 className="mt-3 font-display text-3xl tracking-tight text-text-primary">
          ShaderCover — GO/NO-GO
        </h1>
        <p className="mt-3 max-w-[60ch] font-body text-text-secondary">
          Flip night/day with the header toggle to confirm it re-tints. Judge:
          inhabited atmosphere vs. generic effect demo; real depth vs. flat
          panel; brass/sage/humus fidelity.
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-wider text-text-muted">
              Atmosphere only
            </p>
            <ShaderCover className="aspect-[4/3] w-full rounded-md border border-border-strong" />
          </div>

          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-wider text-text-muted">
              Behind a render (cover plate)
            </p>
            <ShaderCover className="aspect-[4/3] w-full rounded-md border border-border-strong">
              <div className="flex h-full items-center justify-center p-8">
                <img
                  src="/images/idr-hero.png"
                  alt="Sample Wallace render composited over the shader atmosphere"
                  className="max-h-full max-w-full rounded-sm shadow-lg"
                />
              </div>
            </ShaderCover>
          </div>
        </div>
      </Container>
    </section>
  );
}

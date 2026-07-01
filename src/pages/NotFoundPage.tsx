import { Helmet } from "react-helmet-async";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/interactive/Button";

export function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>404 | Justin Hernandez</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <section className="relative flex min-h-[70vh] items-center overflow-hidden py-20">

        <Container className="relative z-10 text-center">
          <h1 className="font-display text-5xl tracking-tight text-text-primary sm:text-[6rem]">
            404
          </h1>

          <p className="mx-auto mt-4 max-w-md font-body text-lg text-text-secondary leading-normal">
            This page drifted into the void. Whatever you were looking for isn&apos;t here, but the rest of the site is.
          </p>

          <div className="mt-10">
            <Button href="/" variant="primary">
              Back to Home
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}

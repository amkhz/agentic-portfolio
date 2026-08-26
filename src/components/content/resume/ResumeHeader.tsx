import type { ResumeContactItem } from "@core/content/resume";
import { SITE_TAB } from "@/lib/tabOrder";

/* The contact row is the highest-intent thing on the site's highest-intent
 * page, and every item in it rendered pixel-identical to the plain-text items
 * beside it: same size, same colour, no underline, nothing to say which ones
 * you could act on until you happened to hover (R2a P0 10). A hairline
 * underline is the quietest affordance that still is one, and it suits the
 * Field Notebook register better than a colour change would. */
const CONTACT_LINK =
  "underline decoration-border-strong underline-offset-4 transition-colors duration-normal hover:text-accent-primary hover:decoration-accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep";

interface ResumeHeaderProps {
  name: string;
  title: string;
  contacts: ResumeContactItem[];
}

export function ResumeHeader({ name, title, contacts }: ResumeHeaderProps) {
  return (
    <header>
      <h1 className="font-display text-4xl leading-tight tracking-tight text-text-primary sm:text-5xl">
        {name}
      </h1>
      <p className="mt-3 font-heading text-base font-medium tracking-wide text-text-secondary sm:text-lg">
        {title}
      </p>

      <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm text-text-secondary">
        {contacts.map((contact) => (
          <li key={`${contact.label}-${contact.href ?? "text"}`}>
            {contact.href ? (
              contact.href.startsWith("http") ? (
                <a
                  tabIndex={SITE_TAB}
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={CONTACT_LINK}
                >
                  {contact.label}
                </a>
              ) : (
                <a
                  tabIndex={SITE_TAB}
                  href={contact.href}
                  className={CONTACT_LINK}
                >
                  {contact.label}
                </a>
              )
            ) : (
              <span>{contact.label}</span>
            )}
          </li>
        ))}
      </ul>
    </header>
  );
}

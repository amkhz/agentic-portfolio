import type { ResumeContactItem } from "@core/content/resume";

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
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-normal hover:text-accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep"
                >
                  {contact.label}
                </a>
              ) : (
                <a
                  href={contact.href}
                  className="transition-colors duration-normal hover:text-accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep"
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

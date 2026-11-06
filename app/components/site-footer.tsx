import { ArrowDisc, Container, buttonClass } from "./primitives";
import { capabilities, links, meta, nav, profile } from "@/app/lib/site";
import { projects } from "@/app/lib/work";

type Column = {
  title: string;
  items: Array<{ label: string; href?: string; external?: boolean }>;
};

/**
 * Footer.
 *
 * The reference closes on a wall of link columns - product, company,
 * resources, legal. A portfolio has fewer destinations and more facts, so the
 * columns are split between the two: where to go (elsewhere, the work, the
 * page itself) and what the work is built with. The stack lives here in full
 * rather than as its own section, where it would be a list of nouns with a
 * heading on it.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  const columns: Column[] = [
    {
      title: "Elsewhere",
      items: links.map((link) => ({ label: link.label, href: link.href, external: link.external })),
    },
    {
      title: "Work",
      items: projects.map((project) => ({ label: project.name, href: `/#${project.slug}` })),
    },
    {
      title: "Page",
      items: nav.map((item) => ({ label: item.label, href: `/${item.href}` })),
    },
    ...capabilities.map((group) => ({
      title: group.title,
      items: group.items.map((item) => ({ label: item })),
    })),
  ];

  const badges = links.filter((link) => link.external);

  return (
    <footer className="mt-16">
      <Container>
        <div className="grid grid-cols-1 gap-14 border-t border-line pt-16 pb-20 sm:pt-20 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-24">
          {/* Identity */}
          <div>
            <p className="text-[1.0625rem] font-medium tracking-tight text-primary">
              {profile.name}
            </p>
            <p className="mt-4 max-w-[34ch] text-caption text-secondary">{meta.description}</p>
            <p className="mt-4 text-micro text-tertiary">
              {profile.role}
              <br />
              {profile.location} · {profile.timezone}
            </p>

            {/* Profile links as the same hairline pills used everywhere else,
                rather than imitation app-store badges - they are links, and
                should look like the site's other links. */}
            <ul className="mt-7 flex flex-wrap gap-2">
              {badges.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonClass("secondary", "sm", "group pr-1")}
                  >
                    {link.label}
                    <ArrowDisc direction="up-right" tone="ink" size="sm" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Columns */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 xl:grid-cols-6">
            {columns.map((column) => (
              <div key={column.title}>
                <p className="text-caption font-medium text-primary">{column.title}</p>
                <ul className="mt-3 space-y-2">
                  {column.items.map((item) => (
                    <li key={item.label} className="text-caption">
                      {item.href ? (
                        <a
                          href={item.href}
                          {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          className="text-tertiary transition-colors duration-fast hover:text-primary"
                        >
                          {item.label}
                        </a>
                      ) : (
                        <span className="text-tertiary">{item.label}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 pb-8 text-micro text-tertiary sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {profile.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            <li>{meta.colophon.typefaces}</li>
            <li>{meta.colophon.built}</li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}

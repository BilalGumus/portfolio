import { Arrow, ButtonLink, Container, Meta, TitleBlock } from "@/app/components/primitives";
import { nav } from "@/app/lib/site";

export const metadata = {
  title: "Not found",
};

/**
 * 404.
 *
 * A dead end is a navigation failure, so this page does navigation rather than
 * apologising: it lists the sections that exist, which is the only thing
 * anyone wants from a page like this.
 */
export default function NotFound() {
  return (
    <Container>
      <div className="grid grid-cols-1 pt-16 pb-24 lg:grid-cols-12 lg:pt-24 lg:pb-32">
        <div className="grid-air lg:col-span-8">
          <Meta as="p" tone="accent">
            Error 404
          </Meta>

          <h1 className="mt-6 text-display text-primary text-balance">
            This page does not exist.
          </h1>

          <p className="mt-7 measure text-lead text-secondary">
            The address is wrong, or something that used to be here has moved.
            Everything on the site lives on one page — the sections are below.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/" variant="primary" className="group">
              Back home <Arrow />
            </ButtonLink>
          </div>

          <div className="mt-14">
            <Meta as="p" className="mb-3">
              Sections
            </Meta>
            <ul className="space-y-1 sm:max-w-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={`/${item.href}`}
                    className="group flex items-baseline justify-between gap-4 py-3"
                  >
                    <span className="text-small text-secondary transition-colors duration-fast group-hover:text-accent">
                      {item.label}
                    </span>
                    <Arrow />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid-air mt-14 lg:col-span-3 lg:col-start-10 lg:mt-3">
          <TitleBlock
            rows={[
              { term: "Status", detail: "404" },
              { term: "Meaning", detail: "No such route" },
            ]}
          />
        </div>
      </div>
    </Container>
  );
}

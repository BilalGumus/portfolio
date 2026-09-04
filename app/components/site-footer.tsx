import { Container, Meta } from "./primitives";
import { links, meta, profile } from "@/app/lib/site";

/**
 * Footer, laid out as a drawing's title block: who, what, when, and the
 * colophon. The colophon is the one piece of self-indulgence on the site and
 * it earns its place by being true and checkable.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <Container>
        <div className="grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-0 lg:py-16">
          <div className="pl-0.5 lg:col-span-2 lg:pr-6">
            <p className="text-h3 text-primary">{profile.name}</p>
            <p className="mt-1 text-small text-secondary">{profile.role}</p>
            <p className="mt-6 measure-tight text-small text-tertiary">
              {profile.location} · {profile.timezone}
            </p>
          </div>

          <div className="pl-0.5 lg:pr-6">
            <Meta as="p" className="mb-3">
              Elsewhere
            </Meta>
            <ul className="space-y-1.5">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...(link.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="link-underline text-small text-secondary hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="pl-0.5 lg:pr-6">
            <Meta as="p" className="mb-3">
              Colophon
            </Meta>
            <ul className="space-y-1.5 text-small text-tertiary">
              <li>{meta.colophon.typefaces}</li>
              <li>{meta.colophon.built}</li>
              <li>{meta.colophon.motion}</li>
            </ul>
          </div>
        </div>

        <div className="grid-air flex flex-wrap items-baseline justify-between gap-3 pb-8">
          <Meta as="p">
            © {year} {profile.name}
          </Meta>
          <Meta as="p">Built and maintained in the open</Meta>
        </div>
      </Container>
    </footer>
  );
}

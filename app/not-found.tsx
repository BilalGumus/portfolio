import { ArrowDisc, Container, buttonClass } from "@/app/components/primitives";
import { nav } from "@/app/lib/site";
import Link from "next/link";

export const metadata = {
  title: "Not found",
};

/**
 * 404.
 *
 * A dead end is a navigation failure, so this page does navigation rather
 * than apologising: it lists the sections that exist, which is the only thing
 * anyone wants from a page like this.
 */
export default function NotFound() {
  return (
    <Container size="narrow" className="text-center">
      <div className="flex min-h-[calc(80svh-3.5rem)] flex-col items-center justify-center py-20">
        <p className="text-caption text-tertiary">Error 404</p>

        <h1 className="font-voice mt-3 text-display text-primary text-balance">
          This page does not exist.
        </h1>

        <p className="mt-5 max-w-[46ch] text-body text-secondary">
          The address is wrong, or something that used to be here has moved.
          Everything on the site lives on one page.
        </p>

        <Link
          href="/"
          className={buttonClass("primary", "md", "group mt-8 py-1 pr-1.5 pl-4.5")}
        >
          Back home <ArrowDisc />
        </Link>

        <ul className="mt-10 flex flex-wrap justify-center gap-2">
          {nav.map((item) => (
            <li key={item.href}>
              <a href={`/${item.href}`} className={buttonClass("secondary", "sm")}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}

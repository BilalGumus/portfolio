import type { CSSProperties } from "react";
import type { StackItem } from "@/app/lib/site";

/**
 * The stack marquee.
 *
 * Two identical tracks side by side, each translating by its own full width
 * on a loop. When the first has scrolled out, the second sits exactly where
 * the first began, so the seam is invisible. Pure CSS - no script, nothing to
 * hydrate - and it runs continuously, hover included.
 *
 * The first track is the real list; the second is a visual copy and is hidden
 * from assistive technology, so the stack is announced once.
 *
 * Logos are drawn as masks filled with `currentColor` rather than as <img>,
 * so they take the text colour of the theme instead of shipping their own -
 * the same muted monochrome as the reference's customer-logo row, in light
 * and dark alike.
 *
 * Under reduced motion there is no marquee at all: the copy is removed and
 * the first track wraps into a static, centred row (see `.marquee` in
 * globals.css).
 */
function Track({ items, copy = false }: { items: StackItem[]; copy?: boolean }) {
  return (
    <ul
      aria-hidden={copy || undefined}
      data-copy={copy || undefined}
      className="marquee-track flex shrink-0 items-center gap-x-12 pr-12 sm:gap-x-14 sm:pr-14"
    >
      {items.map((item) => (
        <li key={item.name} className="flex shrink-0 items-center gap-2.5 text-tertiary">
          <span
            aria-hidden
            className="logo-mask size-5 shrink-0 bg-current"
            style={{ "--logo": `url(/logos/${item.logo}.svg)` } as CSSProperties}
          />
          {/* Regular weight: the icon already carries the emphasis, and a
              bolder name beside it made the row read heavier than the hero. */}
          <span className="text-[0.9375rem] font-normal tracking-[-0.01em] whitespace-nowrap">
            {item.name}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function StackMarquee({
  items,
  label,
  labelId,
}: {
  items: StackItem[];
  label: string;
  labelId: string;
}) {
  return (
    <div>
      <p id={labelId} className="text-center text-micro text-tertiary">
        {label}
      </p>
      <div className="marquee mt-8 flex overflow-hidden">
        <Track items={items} />
        <Track items={items} copy />
      </div>
    </div>
  );
}

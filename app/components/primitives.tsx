import Link from "next/link";
import type { ComponentProps, CSSProperties, ReactNode } from "react";

/**
 * Layout and voice primitives.
 *
 * These know about the grid and the type scale and nothing else - no content,
 * no product concepts. Every page is assembled from this file plus the
 * components that compose it.
 *
 * None of these carry a `dark:` variant. Colour utilities resolve through
 * theme-aware custom properties, so a component never knows which theme it
 * is rendering in.
 */

export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/* -------------------------------------------------------------------------- */
/*  Grid                                                                      */
/* -------------------------------------------------------------------------- */

/**
 * The measure. One value for the outer bound and one padding ramp, used by
 * every section so nothing has to re-derive the margins.
 */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cx(
        "mx-auto w-full max-w-352 px-5 sm:px-8 lg:px-12 xl:px-20",
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * The visible grid.
 *
 * Draws a hairline at the start of each of the twelve columns the content
 * aligns to. Fixed rather than per-section, so there is one instance and it can
 * never fall out of alignment. Suppressed below 1024px, where the layout is a
 * single column and the rules would describe a grid that is not being used.
 *
 * This is the one element on the site with no function beyond explaining the
 * layout. It is here because the subject is the system.
 */
export function GridLines() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 hidden lg:block">
      <Container className="h-full">
        {/* Drawn inside the same Container the content uses, so the rules stay
            aligned at every width - including past the 88rem bound, where the
            container is centred and the page padding no longer marks the edge.

            The grid carries no gutter. That is what lets all three of these be
            true at once, which a gutter makes impossible:

              - every interval is identical
              - the first line sits on the content's left edge
              - the last line sits on the content's right edge

            With a 24px gutter, lines on column starts left the final interval
            one gutter short, and lines on column ends left the right-hand
            content floating 24px inside the last line. Twelve columns tiling
            the width edge to edge have neither problem: separation between
            adjacent blocks comes from their own padding instead. */}
        <div className="grid h-full grid-cols-12">
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={i}
              className={cx("border-l border-grid", i === 11 && "border-r")}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}

/**
 * A section with a numbered rail.
 *
 * Desktop puts the number and label in the left three columns and the content
 * in the remaining nine - asymmetric, and the rail stays with you while you
 * read, which is orientation rather than decoration. Below 1024px the rail
 * becomes a heading above the content; the hierarchy is preserved instead of
 * the desktop composition being shrunk.
 */
export function Section({
  id,
  index,
  label,
  children,
  wide = false,
  className,
}: {
  id: string;
  index: string;
  label: string;
  children: ReactNode;
  /** Content spans all twelve columns, with the rail above it. */
  wide?: boolean;
  className?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-label`}
      // No scroll-margin here: `scroll-padding-top` on <html> already offsets
      // anchor landings for the sticky header. Setting both makes them add up,
      // which lands the section a header's height too far down the page.
      className={cx("border-t border-line", className)}
    >
      <Container>
        <div
          className={cx(
            "py-16 sm:py-20 lg:py-28",
            !wide && "lg:grid lg:grid-cols-12",
          )}
        >
          <header
            className={cx(
              "grid-air mb-10 flex items-baseline gap-3",
              wide ? "lg:mb-14" : "lg:col-span-3 lg:mb-0 lg:sticky lg:top-28 lg:self-start",
            )}
          >
            <span aria-hidden className="meta text-tertiary">
              {index}
            </span>
            <h2 id={`${id}-label`} className="meta text-secondary">
              {label}
            </h2>
          </header>
          {/* No grid-air on this wrapper. Section content routinely holds its
              own nine-column grid, and padding the wrapper would make that
              grid 4px narrower than the nine page columns it is supposed to
              map onto - pulling everything inside it a pixel or so off the
              drawn lines. The air is added by the leaf blocks instead, where
              it insets text without resizing any grid. */}
          <div className={cx(!wide && "lg:col-span-9")}>{children}</div>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Voice                                                                     */
/* -------------------------------------------------------------------------- */

/** Metadata voice: mono, uppercase, tracked open. Data, not prose. */
export function Meta({
  children,
  className,
  as: As = "span",
  tone = "secondary",
}: {
  children: ReactNode;
  className?: string;
  as?: "span" | "p" | "div" | "dt";
  /**
   * Colour is a prop rather than something the caller overrides with a
   * className. Two colour utilities on one element are resolved by the order
   * Tailwind emits them, not by the order they are written - so a baked-in
   * default silently beat every `className="text-accent"` override.
   */
  tone?: "primary" | "secondary" | "tertiary" | "accent";
}) {
  // Secondary by default rather than tertiary: Instrument Serif is a
  // high-contrast face with thin hairlines, so at label size it needs the
  // extra tonal weight to hold its own against the sans around it.
  const toneClass = {
    primary: "text-primary",
    secondary: "text-secondary",
    tertiary: "text-tertiary",
    accent: "text-accent",
  }[tone];

  return <As className={cx("meta", toneClass, className)}>{children}</As>;
}

/** Body prose at a capped measure. */
export function Prose({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cx("measure space-y-5 text-body text-secondary", className)}>
      {children}
    </div>
  );
}

/**
 * A hairline.
 *
 * Container-width, so it is deliberately not used on the landing page - the
 * only rules there are the full-bleed ones between sections and above the
 * footer. Kept for the deferred pages, which still rule their content.
 */
export function Rule({
  className,
  strong = false,
}: {
  className?: string;
  strong?: boolean;
}) {
  return (
    <hr
      className={cx("border-t", strong ? "border-line-strong" : "border-line", className)}
    />
  );
}

/**
 * The title block: a short table of facts sitting beside the thing it
 * describes. Alignment carries it rather than rules - label left, value
 * right, one fact per line.
 */
export function TitleBlock({
  rows,
  className,
}: {
  rows: Array<{ term: string; detail: ReactNode }>;
  className?: string;
}) {
  return (
    <dl className={cx("space-y-3.5", className)}>
      {rows.map((row) => (
        <div
          key={row.term}
          className="flex items-baseline justify-between gap-6"
        >
          <dt className="meta shrink-0 text-tertiary">{row.term}</dt>
          <dd className="min-w-0 text-right text-small text-primary">{row.detail}</dd>
        </div>
      ))}
    </dl>
  );
}

/** A small bordered label. Not a pill - the radius is 2px. */
export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "accent";
}) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-xs border px-1.5 py-0.5 text-[0.6875rem] leading-4 tracking-wide",
        tone === "accent"
          ? "border-accent/40 bg-accent-wash text-accent"
          : "border-line text-tertiary",
      )}
    >
      {children}
    </span>
  );
}

/**
 * An unfinished slot.
 *
 * Rendered wherever the honest content is "only the owner knows this".
 * Deliberately conspicuous: a fabricated metric would look better here, which
 * is exactly why this exists.
 */
export function Placeholder({
  children,
  label = "Placeholder",
}: {
  children: ReactNode;
  label?: string;
}) {
  return (
    <div className="rounded-sm border border-dashed border-line-control bg-surface-sunken/60 p-4 sm:p-5">
      <p className="meta mb-2 text-accent">{label} — content required</p>
      <p className="measure text-small text-secondary">{children}</p>
    </div>
  );
}

/**
 * A margin note explaining a decision. In a case study these carry the
 * reasoning that a screenshot cannot.
 */
export function Annotation({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <aside className="border-l-2 border-accent pl-4 sm:pl-5">
      <p className="meta-italic mb-1.5 text-accent">{label}</p>
      <p className="measure-tight text-small text-secondary">{children}</p>
    </aside>
  );
}

/** A term/detail list. The workhorse for architecture and decision lists. */
export function DefinitionList({
  items,
}: {
  items: Array<{ term: string; detail: string }>;
}) {
  return (
    <dl className="space-y-6">
      {items.map((item) => (
        <div
          key={item.term}
          className="grid grid-cols-1 gap-1 sm:grid-cols-[minmax(0,11rem)_1fr] sm:gap-6"
        >
          <dt className="text-h3 text-primary">{item.term}</dt>
          <dd className="measure text-body text-secondary">{item.detail}</dd>
        </div>
      ))}
    </dl>
  );
}

/* -------------------------------------------------------------------------- */
/*  Controls                                                                  */
/* -------------------------------------------------------------------------- */

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-sm text-small font-medium " +
  "transition-[background-color,border-color,color,transform] duration-fast ease-standard " +
  "active:scale-[0.985] disabled:pointer-events-none disabled:opacity-50";

const buttonVariants = {
  primary: "bg-accent text-accent-contrast hover:bg-accent-hover",
  secondary:
    "border border-line-control text-primary hover:border-primary hover:bg-surface-sunken",
  ghost: "text-secondary hover:bg-surface-sunken hover:text-primary",
} as const;

const buttonSizes = {
  sm: "h-8 px-2.5",
  md: "h-10 px-4",
} as const;

export type ButtonVariant = keyof typeof buttonVariants;

export function buttonClass(
  variant: ButtonVariant = "secondary",
  size: keyof typeof buttonSizes = "md",
  className?: string,
) {
  return cx(buttonBase, buttonVariants[variant], buttonSizes[size], className);
}

export function Button({
  variant = "secondary",
  size = "md",
  className,
  ...props
}: ComponentProps<"button"> & {
  variant?: ButtonVariant;
  size?: keyof typeof buttonSizes;
}) {
  return <button className={buttonClass(variant, size, className)} {...props} />;
}

/** A button-shaped link. Uses next/link for internal hrefs. */
export function ButtonLink({
  href,
  variant = "secondary",
  size = "md",
  className,
  external,
  children,
  ...props
}: {
  href: string;
  variant?: ButtonVariant;
  size?: keyof typeof buttonSizes;
  className?: string;
  external?: boolean;
  children: ReactNode;
} & Omit<ComponentProps<"a">, "href">) {
  const cls = buttonClass(variant, size, className);
  const isInternal = href.startsWith("/") && !external;

  if (isInternal) {
    return (
      <Link href={href} className={cls} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      className={cls}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      {children}
    </a>
  );
}

/**
 * The status indicator. The ring animates only where motion is allowed; the
 * dot and its label carry the meaning on their own, so the animation is
 * genuinely optional.
 */
export function StatusDot({ active = true }: { active?: boolean }) {
  return (
    <span aria-hidden className="relative inline-flex size-2 shrink-0 items-center justify-center">
      <span
        className={cx(
          "absolute inline-flex size-2 rounded-full",
          active ? "bg-accent" : "bg-tertiary",
        )}
      />
      {active && (
        <span
          className="absolute inline-flex size-2 rounded-full bg-accent motion-safe:animate-[pulse-ring_2.8s_var(--ease-out)_infinite]"
        />
      )}
    </span>
  );
}

/**
 * An arrow that leans into the direction of travel on hover. Set on the
 * parent with `group`; CSS does the rest.
 */
export function Arrow({
  direction = "right",
  className,
}: {
  direction?: "right" | "up-right" | "left";
  className?: string;
}) {
  const glyph = direction === "up-right" ? "↗" : direction === "left" ? "←" : "→";
  const travel =
    direction === "left"
      ? "group-hover:-translate-x-0.5"
      : direction === "up-right"
        ? "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        : "group-hover:translate-x-0.5";

  return (
    <span
      aria-hidden
      className={cx(
        "inline-block transition-transform duration-base ease-out",
        travel,
        className,
      )}
    >
      {glyph}
    </span>
  );
}

/** Visible only to assistive technology. */
export function ScreenReaderOnly({ children }: { children: ReactNode }) {
  return <span className="sr-only">{children}</span>;
}

/**
 * Stagger helper for entrance motion.
 *
 * Lives here rather than beside the observer that consumes it, because it is
 * a pure function called during server rendering - a "use client" module
 * cannot export something a Server Component calls directly.
 *
 * Capped so a long list never leaves its last item waiting.
 */
export function revealDelay(index: number, step = 70, max = 420) {
  return { "--reveal-delay": `${Math.min(index * step, max)}ms` } as CSSProperties;
}

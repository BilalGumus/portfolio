import Link from "next/link";
import type { ComponentProps, CSSProperties, ReactNode } from "react";

/**
 * Layout and voice primitives.
 *
 * These know about the layout and the type scale and nothing else - no
 * content, no product concepts. Every page is assembled from this file plus
 * the components that compose it.
 *
 * None of these carry a `dark:` variant for colour. Colour utilities resolve
 * through theme-aware custom properties, so a component never knows which
 * theme it is rendering in.
 */

export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/* -------------------------------------------------------------------------- */
/*  Layout                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * The measure. Three widths, one padding ramp.
 *
 *   wide    - header, footer, the outer frame of the page
 *   default - the studio cards and most sections
 *   narrow  - the hero prompt and anything set as a single column of prose
 */
export function Container({
  className,
  children,
  size = "wide",
}: {
  className?: string;
  children: ReactNode;
  size?: "wide" | "default" | "narrow";
}) {
  const max = {
    wide: "max-w-[90rem]",
    default: "max-w-[76rem]",
    narrow: "max-w-[46rem]",
  }[size];

  return (
    <div className={cx("mx-auto w-full px-5 sm:px-8 lg:px-12", max, className)}>
      {children}
    </div>
  );
}

/**
 * A page section: generous vertical space and an optional heading row with
 * the title on the left and an action on the right.
 */
export function Section({
  id,
  title,
  action,
  children,
  size = "default",
  className,
}: {
  id: string;
  title?: string;
  action?: ReactNode;
  children: ReactNode;
  size?: "wide" | "default" | "narrow";
  className?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={title ? `${id}-title` : undefined}
      className={cx("py-24 sm:py-32 lg:py-40", className)}
    >
      <Container size={size}>
        {title && (
          <header className="mb-12 flex items-center justify-between gap-4 sm:mb-16">
            <h2 id={`${id}-title`} className="text-h2 text-primary">
              {title}
            </h2>
            {action}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Voice                                                                     */
/* -------------------------------------------------------------------------- */

/** Metadata voice: small and quiet. Data, not prose. */
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
   * Tailwind emits them, not by the order they are written.
   */
  tone?: "primary" | "secondary" | "tertiary" | "accent";
}) {
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

/** A hairline. */
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

/** A short table of facts: label left, value right, one fact per line. */
export function TitleBlock({
  rows,
  className,
}: {
  rows: Array<{ term: string; detail: ReactNode }>;
  className?: string;
}) {
  return (
    <dl className={cx("space-y-3", className)}>
      {rows.map((row) => (
        <div key={row.term} className="flex items-baseline justify-between gap-6">
          <dt className="meta shrink-0 text-tertiary">{row.term}</dt>
          <dd className="min-w-0 text-right text-small text-primary">{row.detail}</dd>
        </div>
      ))}
    </dl>
  );
}

/** A small rounded chip. */
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
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-micro",
        tone === "accent"
          ? "border-transparent bg-lavender-soft text-primary"
          : "border-line bg-surface text-secondary",
      )}
    >
      {children}
    </span>
  );
}

/**
 * An unfinished slot. Rendered wherever the honest content is "only the owner
 * knows this" - a fabricated metric would look better here, which is exactly
 * why this exists.
 */
export function Placeholder({
  children,
  label = "Placeholder",
}: {
  children: ReactNode;
  label?: string;
}) {
  return (
    <div className="rounded-lg border border-dashed border-line-control bg-surface-sunken p-4 sm:p-5">
      <p className="meta mb-2 text-accent">{label}: content required</p>
      <p className="measure text-small text-secondary">{children}</p>
    </div>
  );
}

/** A margin note explaining a decision. */
export function Annotation({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <aside className="rounded-lg bg-lavender-soft p-4 sm:p-5">
      <p className="meta-italic mb-1.5 text-primary">{label}</p>
      <p className="measure-tight text-small text-secondary">{children}</p>
    </aside>
  );
}

/** A term/detail list. */
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
  "inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap " +
  "transition-[background-color,border-color,color,transform,box-shadow] duration-fast ease-standard " +
  "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

/**
 * Four variants: an ink pill for the main action, a lavender pill for the
 * friendly one, a hairline pill for the rest, and a bare ghost.
 *
 * Text on lavender is always the light-theme ink, in both themes - the fill
 * stays light in dark mode, so it needs dark text either way.
 */
const buttonVariants = {
  primary: "bg-ink text-ink-contrast hover:bg-ink-hover",
  accent: "bg-lavender text-[oklch(19%_0.006_286)] hover:bg-lavender-hover",
  secondary:
    "border border-line-strong bg-surface text-primary shadow-xs hover:border-line-control",
  ghost: "text-secondary hover:bg-surface-sunken hover:text-primary",
} as const;

const buttonSizes = {
  sm: "h-8 px-3.5 text-caption",
  md: "h-10 px-4.5 text-small",
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
 * dot and its label carry the meaning on their own.
 */
const STATUS_GREEN = "bg-[oklch(68%_0.16_150)]";

export function StatusDot({ active = true }: { active?: boolean }) {
  return (
    <span aria-hidden className="relative inline-flex size-2 shrink-0 items-center justify-center">
      <span
        className={cx(
          "absolute inline-flex size-2 rounded-full",
          active ? STATUS_GREEN : "bg-tertiary",
        )}
      />
      {active && (
        <span
          className={cx(
            "absolute inline-flex size-2 rounded-full motion-safe:animate-[pulse-ring_2.8s_var(--ease-out)_infinite]",
            STATUS_GREEN,
          )}
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
      className={cx("inline-block transition-transform duration-base ease-out", travel, className)}
    >
      {glyph}
    </span>
  );
}

/**
 * The round arrow that ends a pill - the disc inside the "View source" and
 * "Visit" buttons on the studio cards, and every outbound pill since.
 *
 *   tone "light" - a light disc, for ink (primary) buttons
 *   tone "ink"   - an ink disc, for hairline (secondary) buttons, where a
 *                  light disc would vanish into the button's own fill
 *
 * The disc sits flush with the pill's end, so a button that ends in one
 * takes less right padding: pr-1.5 at md, pr-1 at sm.
 *
 * Direction "up-right" leaves the site; "right" stays on it. Hover nudges it
 * the way it points.
 */
export function ArrowDisc({
  className,
  direction = "right",
  tone = "light",
  size = "md",
}: {
  className?: string;
  direction?: "right" | "up-right";
  tone?: "light" | "ink";
  size?: "sm" | "md";
}) {
  return (
    <span
      aria-hidden
      className={cx(
        "inline-flex shrink-0 items-center justify-center rounded-full",
        size === "md" ? "size-6" : "size-5",
        tone === "light" ? "bg-ink-contrast text-ink" : "bg-ink text-ink-contrast",
        "transition-transform duration-base ease-out",
        direction === "up-right"
          ? "group-hover:translate-x-px group-hover:-translate-y-px"
          : "group-hover:translate-x-0.5",
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cx(
          size === "md" ? "size-3.5" : "size-3",
          direction === "up-right" && "-rotate-45",
        )}
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </span>
  );
}

/** Visible only to assistive technology. */
export function ScreenReaderOnly({ children }: { children: ReactNode }) {
  return <span className="sr-only">{children}</span>;
}

/**
 * Stagger helper for entrance motion. A pure function called during server
 * rendering, which is why it lives here and not beside the observer.
 */
export function revealDelay(index: number, step = 70, max = 420) {
  return { "--reveal-delay": `${Math.min(index * step, max)}ms` } as CSSProperties;
}

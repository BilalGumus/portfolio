import type { CSSProperties, ReactNode } from "react";
import {
  Activity,
  Code,
  Gauge,
  Palette,
  Sparkles,
  AppWindow,
  Bot,
  Calculator,
  CalendarDays,
  Camera,
  ChartLine,
  Cpu,
  Download,
  ScanFace,
  Scale,
  ShieldCheck,
  Smartphone,
  Timer,
  Trash2,
  Users,
  type LucideIcon,
} from "lucide-react";
import { PlateFigure } from "./plate";
import { ArrowDisc, cx, revealDelay } from "./primitives";
import type { DeviceVariant, HighlightIcon, Project } from "@/app/lib/work";

/**
 * Studio cards.
 *
 * The reference photographs its product on a table: a phone on a tray, a
 * laptop on a stand, a seamless paper sweep behind. There are no photographs
 * of this work, and most of it lives behind a login - so the card builds the
 * same composition from tokens instead. A soft gradient sweep in the
 * project's own hue, a device drawn in CSS, and on its screen the project's
 * diagram from plate.tsx.
 *
 * The screen deliberately shows the diagram rather than an imitation of the
 * product's interface. A fake screenshot would be a claim about the product;
 * a diagram is plainly a diagram.
 *
 * The whole card is one link target: the pill's anchor carries an ::after
 * that covers the card, so the click area is large without the card's text
 * being read out as one long link label.
 */

const ICONS: Record<HighlightIcon, LucideIcon> = {
  calendar: CalendarDays,
  users: Users,
  timer: Timer,
  calculator: Calculator,
  bot: Bot,
  chart: ChartLine,
  scale: Scale,
  phone: Smartphone,
  app: AppWindow,
  activity: Activity,
  shield: ShieldCheck,
  download: Download,
  cpu: Cpu,
  camera: Camera,
  scan: ScanFace,
  trash: Trash2,
  sparkles: Sparkles,
  palette: Palette,
  gauge: Gauge,
  code: Code,
};

/** The screen ground, the same in both themes - screens are dark. */
const SCREEN = "bg-[oklch(17%_0.008_286)]";

/** Where the project lives, as a browser would print it. */
function displayUrl(url: string) {
  const { host, pathname } = new URL(url);
  const path = pathname.replace(/\/$/, "");
  return `${host}${path}`;
}

/* -------------------------------------------------------------------------- */
/*  Screen content                                                            */
/* -------------------------------------------------------------------------- */

function AppBar({ project }: { project: Project }) {
  return (
    <div className="flex items-center justify-between gap-[2cqw] px-[4cqw] pt-[3.2cqw]">
      <div className="flex min-w-0 items-center gap-[1.6cqw]">
        <span className="size-[3.4cqw] shrink-0 rounded-[0.9cqw] bg-lavender" />
        <span className="truncate text-[3.1cqw] font-medium tracking-tight text-white/85">
          {project.name}
        </span>
      </div>
      <span className="shrink-0 rounded-full bg-white/10 px-[2cqw] py-[0.5cqw] text-[2.3cqw] text-white/55">
        {project.category}
      </span>
    </div>
  );
}

function Figure({ project, className }: { project: Project; className?: string }) {
  return (
    <div
      // Lines in a muted white; the diagram's highlight in lavender; and the
      // screen colour, for marks that need to hide what is behind them.
      style={
        {
          "--color-accent": "var(--color-lavender)",
          "--plate-ground": "oklch(17% 0.008 286)",
        } as CSSProperties
      }
      className={cx("text-white/35", className)}
    >
      <PlateFigure variant={project.plate} label={`${project.name} diagram`} />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Devices                                                                   */
/* -------------------------------------------------------------------------- */

function Browser({ project }: { project: Project }) {
  const url = project.href ?? project.repo;
  return (
    <div className="@container">
      <div className="overflow-hidden rounded-[1.6cqw] bg-[oklch(24%_0.008_286)] shadow-device ring-1 ring-black/10">
        {/* Toolbar */}
        <div className="flex items-center gap-[1.2cqw] px-[2.4cqw] py-[1.8cqw]">
          <span className="size-[1.4cqw] rounded-full bg-white/20" />
          <span className="size-[1.4cqw] rounded-full bg-white/20" />
          <span className="size-[1.4cqw] rounded-full bg-white/20" />
          {url && (
            <span className="mx-auto max-w-[60%] truncate rounded-full bg-white/8 px-[3cqw] py-[0.6cqw] text-[2.1cqw] text-white/50">
              {displayUrl(url)}
            </span>
          )}
        </div>
        <div className={cx(SCREEN, "aspect-16/9.5")}>
          <AppBar project={project} />
          <Figure project={project} className="mx-auto h-[82%] w-[88%]" />
        </div>
      </div>
    </div>
  );
}

function Window({ project }: { project: Project }) {
  return (
    <div className="@container">
      <div className="overflow-hidden rounded-[1.8cqw] bg-[oklch(24%_0.008_286)] shadow-device ring-1 ring-black/10">
        {/* Title bar */}
        <div className="relative flex items-center gap-[1.2cqw] px-[2.4cqw] py-[1.8cqw]">
          <span className="size-[1.4cqw] rounded-full bg-[oklch(68%_0.17_25)]/80" />
          <span className="size-[1.4cqw] rounded-full bg-[oklch(82%_0.15_85)]/80" />
          <span className="size-[1.4cqw] rounded-full bg-[oklch(72%_0.15_150)]/80" />
          <span className="absolute inset-x-0 text-center text-[2.2cqw] text-white/55">
            {project.name}
          </span>
        </div>
        <div className={cx(SCREEN, "flex aspect-16/9.5")}>
          {/* Sidebar: the run configuration */}
          <div className="flex w-[24%] flex-col gap-[1.6cqw] border-r border-white/8 p-[2.6cqw]">
            {[70, 52, 84, 46, 64].map((w, i) => (
              <span
                key={i}
                className={cx("h-[1.6cqw] rounded-full", i === 0 ? "bg-lavender/80" : "bg-white/12")}
                style={{ width: `${w}%` }}
              />
            ))}
          </div>
          <div className="flex min-w-0 flex-1 flex-col">
            <Figure project={project} className="mx-auto h-[80%] w-[90%]" />
            {/* Progress */}
            <div className="mx-[3cqw] h-[1cqw] overflow-hidden rounded-full bg-white/10">
              <span className="block h-full w-[64%] rounded-full bg-lavender" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Phone({ project }: { project: Project }) {
  return (
    <div className="@container aspect-9/19 h-full">
      <div className="size-full rounded-[13cqw] bg-[oklch(14%_0.006_286)] p-[3.2cqw] shadow-device ring-1 ring-white/10">
        <div className={cx(SCREEN, "relative flex h-full flex-col overflow-hidden rounded-[10cqw]")}>
          {/* Island */}
          <span className="absolute top-[2.4cqw] left-1/2 h-[6cqw] w-[28cqw] -translate-x-1/2 rounded-full bg-black" />
          <div className="flex items-center justify-between px-[8cqw] pt-[3.4cqw] text-[4.2cqw] font-medium text-white/80">
            <span>9:41</span>
            <span className="flex gap-[1.2cqw]">
              <span className="h-[2.6cqw] w-[5cqw] rounded-[0.8cqw] bg-white/70" />
            </span>
          </div>
  
          <div className="mt-[10cqw] px-[7cqw]">
            <p className="text-[4.4cqw] text-white/50">{project.category}</p>
            <p className="mt-[1cqw] text-[8.5cqw] font-medium leading-none tracking-tight text-white">
              {project.name}
            </p>
          </div>
  
          <div className="mx-[5cqw] mt-[7cqw] rounded-[6cqw] bg-white/6 p-[3cqw]">
            <Figure project={project} className="aspect-4/3 w-full" />
          </div>
  
          {/* A list of records, which is what the comparison is made of */}
          <div className="mx-[5cqw] mt-[4cqw] space-y-[2.6cqw] rounded-[6cqw] bg-white/6 p-[5cqw]">
            {[78, 64, 88].map((w, i) => (
              <div key={i} className="flex items-center gap-[3cqw]">
                <span className={cx("size-[5cqw] rounded-full", i === 0 ? "bg-lavender" : "bg-white/15")} />
                <span className="h-[2.4cqw] rounded-full bg-white/15" style={{ width: `${w - 30}%` }} />
                <span className="ml-auto h-[2.4cqw] w-[12%] rounded-full bg-white/25" />
              </div>
            ))}
          </div>
  
          <span className="mx-auto mt-auto mb-[3cqw] h-[1.4cqw] w-[34%] rounded-full bg-white/50" />
        </div>
      </div>
    </div>
  );
}

/**
 * The device, posed on the card.
 *
 * Phones lie on a tray, turned a little, the way the reference shoots its
 * handset. Browsers and app windows float with a contact shadow beneath.
 */
function Stage({
  device,
  project,
  compact,
}: {
  device: DeviceVariant;
  project: Project;
  compact: boolean;
}) {
  const hover =
    "transition-transform duration-slower ease-out group-hover:-translate-y-1.5 group-hover:scale-[1.01]";

  if (device === "phone") {
    return (
      <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          className="studio-tray absolute h-[58%] w-[58%] rounded-[clamp(1rem,3vw,2.25rem)] sm:w-[40%]"
          style={{ "--studio-h": project.showcase.hue } as CSSProperties}
        />
        <div
          className={cx(
            "relative h-[78%] rotate-[-14deg]",
            compact ? "sm:h-[76%]" : "sm:h-[82%]",
            hover,
          )}
        >
          <Phone project={project} />
        </div>
      </div>
    );
  }

  const Device = device === "window" ? Window : Browser;
  return (
    <div
      aria-hidden
      className={cx(
        "pointer-events-none absolute inset-0 flex items-center justify-center",
        // Compact cards are short, so the device is pushed down and narrowed
        // to clear the action pill and the facts chip along the top edge -
        // centred like the featured card, its toolbar ran under both.
        compact ? "pt-[13%] pb-[15%]" : "pb-[10%]",
      )}
    >
      <div className={cx("relative", compact ? "w-[74%]" : "w-[86%] sm:w-[64%]", hover)}>
        <Device project={project} />
        {/* Contact shadow */}
        <span className="absolute bottom-[-8%] left-[10%] -z-10 h-[14%] w-[80%] rounded-[50%] bg-black/25 blur-2xl" />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Card                                                                      */
/* -------------------------------------------------------------------------- */

export function StudioCard({
  project,
  compact = false,
  className,
}: {
  project: Project;
  compact?: boolean;
  className?: string;
}) {
  const primary = project.href ?? project.repo;
  const isRepoOnly = !project.href && Boolean(project.repo);
  const action = isRepoOnly ? "View source" : `Visit ${project.name}`;

  return (
    <div
      className={cx(
        "studio group relative isolate overflow-hidden rounded-3xl",
        compact ? "aspect-4/5 sm:aspect-5/4" : "aspect-4/5 sm:aspect-16/10",
        className,
      )}
      style={{ "--studio-h": project.showcase.hue } as CSSProperties}
    >
      <Stage device={project.showcase.device} project={project} compact={compact} />

      <div aria-hidden className="studio-shade pointer-events-none absolute inset-0" />

      {/* Top row: the action, and the facts */}
      <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-3 sm:inset-x-4 sm:top-4">
        {primary ? (
          <a
            href={primary}
            target="_blank"
            rel="noopener noreferrer"
            className={cx(
              "inline-flex h-10 items-center gap-2.5 rounded-full bg-ink py-1 pr-1.5 pl-4 text-small font-medium text-ink-contrast",
              "shadow-md transition-colors duration-fast hover:bg-ink-hover",
              // The whole card is the target.
              "after:absolute after:inset-0 after:-z-10 after:content-['']",
            )}
          >
            {action}
            <ArrowDisc direction={isRepoOnly ? "up-right" : "right"} />
          </a>
        ) : (
          <span />
        )}
        <span className="rounded-full bg-surface/75 px-3 py-1 text-micro text-secondary backdrop-blur-md">
          {project.year} · {project.category}
        </span>
      </div>

      {/* Caption */}
      <div className="pointer-events-none absolute inset-x-4 bottom-4 sm:inset-x-5 sm:bottom-5">
        <h3
          className={cx(
            "font-medium tracking-tight text-white",
            compact ? "text-[1.375rem] leading-tight" : "text-[1.625rem] leading-tight sm:text-[1.875rem]",
          )}
        >
          {project.name}
        </h3>
        <p className="mt-1 max-w-[46ch] text-small text-white/85">{project.tagline}</p>
      </div>
    </div>
  );
}

/** The icon row under a featured card. */
export function HighlightRow({ project }: { project: Project }) {
  return (
    <ul className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-x-6 gap-y-8 sm:mt-12 sm:grid-cols-4">
      {project.showcase.highlights.map((item, i) => {
        const Icon = ICONS[item.icon];
        return (
          <li
            key={item.title}
            className="reveal flex flex-col items-center text-center"
            style={revealDelay(i, 60, 240)}
          >
            <span className="inline-flex size-8 items-center justify-center rounded-lg border border-line bg-surface text-primary shadow-xs">
              <Icon aria-hidden className="size-4" strokeWidth={1.75} />
            </span>
            <p className="mt-2.5 text-caption font-medium text-primary">{item.title}</p>
            <p className="mt-0.5 text-micro text-tertiary">{item.detail}</p>
          </li>
        );
      })}
    </ul>
  );
}

/** Small print under a compact card. */
export function CompactMeta({ project }: { project: Project }): ReactNode {
  return (
    <div className="mt-4 px-1">
      <p className="text-small text-secondary">{project.description}</p>
      <ul className="mt-3 flex flex-wrap gap-1.5">
        {project.stack.map((item) => (
          <li
            key={item}
            className="rounded-full border border-line bg-surface px-2.5 py-0.5 text-micro text-secondary"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

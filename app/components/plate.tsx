import type { PlateVariant } from "@/app/lib/work";
import { cx } from "./primitives";

/**
 * Project plates.
 *
 * There are no product screenshots to show for most of this work - it is
 * behind a login - and stock imagery or gradient blobs would be worse than
 * nothing.
 *
 * So each project gets a diagram instead: a constructed figure, drawn from
 * the same tokens as the rest of the site, describing the shape of the
 * problem the project solves. A calendar day feeding a filling cost meter for
 * the meeting-cost tracker, a modular grid for structured extraction,
 * opposed bars for the comparison tool, a detection frame for the camera
 * experiment.
 *
 * They are plainly diagrams rather than fake interface previews, which is the
 * honest option. Marks inherit currentColor so they follow the theme; accents
 * reference the token directly.
 */

const STROKE = 1.25;

/** The surface the figure is drawn on, for marks that must hide what is
 *  behind them. Set by whoever places the figure; transparent otherwise. */
const GROUND = "var(--plate-ground, transparent)";

function Burn() {
  // A day in the calendar and the meeting happening now. The current-time
  // line crosses the live meeting, its attendees sit inside it, and a dashed
  // lead carries it to a meter that is filling - the running cost, shown as
  // a gauge with a flame rather than as a number, because any number here
  // would be invented.
  const hours = Array.from({ length: 8 }, (_, i) => 48 + i * 30);
  const live = { x: 64, y: 104, w: 132, h: 78 };
  const attendees = [86, 104, 122, 140];
  const nowY = 146;
  const gauge = { cx: 306, cy: 150, r: 54 };
  // 250 degrees of 360, starting at 12 o'clock and running clockwise.
  const end = (160 * Math.PI) / 180;
  const arcEnd = {
    x: (gauge.cx + gauge.r * Math.cos(end)).toFixed(2),
    y: (gauge.cy + gauge.r * Math.sin(end)).toFixed(2),
  };

  return (
    <>
      {/* Hour grid */}
      {hours.map((y) => (
        <line
          key={y}
          x1={44}
          y1={y}
          x2={214}
          y2={y}
          stroke="currentColor"
          strokeWidth={STROKE}
          opacity={0.3}
        />
      ))}

      {/* Earlier and later meetings */}
      {[
        { y: 56, h: 34 },
        { y: 198, h: 44 },
      ].map((m) => (
        <rect
          key={m.y}
          x={live.x}
          y={m.y}
          width={live.w}
          height={m.h}
          rx={4}
          fill={GROUND}
          stroke="currentColor"
          strokeWidth={STROKE}
          opacity={0.75}
        />
      ))}

      {/* The meeting happening now */}
      <rect
        x={live.x}
        y={live.y}
        width={live.w}
        height={live.h}
        rx={4}
        fill="var(--color-accent)"
        fillOpacity={0.14}
        stroke="var(--color-accent)"
        strokeWidth={STROKE * 1.3}
      />
      <line
        x1={78}
        y1={120}
        x2={150}
        y2={120}
        stroke="var(--color-accent)"
        strokeWidth={3}
        strokeLinecap="round"
      />
      <line
        x1={78}
        y1={131}
        x2={118}
        y2={131}
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        opacity={0.6}
      />
      {/* Attendees - the people the cost is made of */}
      {attendees.map((x, i) => (
        <circle
          key={x}
          cx={x}
          cy={167}
          r={9}
          fill={i === 0 ? "var(--color-accent)" : GROUND}
          stroke={i === 0 ? "var(--color-accent)" : "currentColor"}
          strokeWidth={STROKE}
        />
      ))}

      {/* Current time, across the day and into the live meeting */}
      <line
        x1={44}
        y1={nowY}
        x2={214}
        y2={nowY}
        stroke="var(--color-accent)"
        strokeWidth={STROKE}
      />
      <circle cx={44} cy={nowY} r={3.5} fill="var(--color-accent)" />

      {/* Lead to the meter */}
      <path
        d={`M214 ${nowY} L${gauge.cx - gauge.r - 8} ${gauge.cy}`}
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth={STROKE}
        strokeDasharray="2 5"
      />

      {/* The running cost: a meter partway full */}
      <circle
        cx={gauge.cx}
        cy={gauge.cy}
        r={gauge.r}
        fill="none"
        stroke="currentColor"
        strokeWidth={5}
        opacity={0.3}
      />
      <path
        d={`M${gauge.cx} ${gauge.cy - gauge.r} A${gauge.r} ${gauge.r} 0 1 1 ${arcEnd.x} ${arcEnd.y}`}
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth={5}
        strokeLinecap="round"
      />
      <circle cx={arcEnd.x} cy={arcEnd.y} r={5} fill="var(--color-accent)" />

      {/* The burn. Lucide's flame (24x24, the same set as every other icon
          on the site) rather than a hand-drawn one, so its proportions are
          the drawn ones. Scaled about its own centre, which sits a little
          below the box middle because the body of the flame is its base. */}
      <g
        transform={`translate(${gauge.cx - 12 * FLAME_SCALE} ${gauge.cy - 13 * FLAME_SCALE}) scale(${FLAME_SCALE})`}
      >
        <path
          d={FLAME}
          fill="var(--color-accent)"
          stroke="var(--color-accent)"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </>
  );
}

/** lucide-react's `flame` icon, in its own 24x24 space. */
const FLAME =
  "M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4";
const FLAME_SCALE = 2.2;

function System() {
  // A modular grid: alternating square and circle, one cell in the accent -
  // rows and fields, the shape of structured extraction.
  const cols = 6;
  const rows = 4;
  const size = 40;
  const step = 56;
  const originX = 46;
  const originY = 40;
  const accent = { row: 2, col: 3 };

  return (
    <>
      {Array.from({ length: rows }, (_, row) =>
        Array.from({ length: cols }, (_, col) => {
          const x = originX + col * step;
          const y = originY + row * step;
          const isAccent = row === accent.row && col === accent.col;
          const isCircle = (row + col) % 2 === 0;
          const stroke = isAccent ? "var(--color-accent)" : "currentColor";
          return isCircle ? (
            <circle
              key={`${row}-${col}`}
              cx={x + size / 2}
              cy={y + size / 2}
              r={size / 2}
              fill={isAccent ? "var(--color-accent)" : "none"}
              stroke={stroke}
              strokeWidth={STROKE}
            />
          ) : (
            <rect
              key={`${row}-${col}`}
              x={x}
              y={y}
              width={size}
              height={size}
              fill={isAccent ? "var(--color-accent)" : "none"}
              stroke={stroke}
              strokeWidth={STROKE}
            />
          );
        }),
      )}
    </>
  );
}

function Compare() {
  // Opposed bars against a shared axis, plus the derived figure as a line.
  const rows = [
    { left: 96, right: 58 },
    { left: 62, right: 104 },
    { left: 128, right: 44 },
    { left: 48, right: 82 },
    { left: 84, right: 66 },
  ];
  const axis = 200;
  const barHeight = 16;

  return (
    <>
      {rows.map((row, i) => {
        const y = 52 + i * 34;
        const isAccent = i === 2;
        return (
          <g key={i}>
            <rect
              x={axis - 6 - row.left}
              y={y}
              width={row.left}
              height={barHeight}
              fill={isAccent ? "var(--color-accent)" : "none"}
              stroke={isAccent ? "var(--color-accent)" : "currentColor"}
              strokeWidth={STROKE}
            />
            <rect
              x={axis + 6}
              y={y}
              width={row.right}
              height={barHeight}
              fill="none"
              stroke="currentColor"
              strokeWidth={STROKE}
              opacity={0.55}
            />
          </g>
        );
      })}
      <line x1={axis} y1={34} x2={axis} y2={236} stroke="currentColor" strokeWidth={STROKE} />
      {/* Price history: the figure that only exists once you keep the record. */}
      <polyline
        points="44,268 96,258 148,262 200,248 252,252 304,236 356,240"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth={STROKE}
      />
    </>
  );
}

function Field() {
  // The detection frame: the system showing you what it can see.
  return (
    <>
      <rect
        x={40}
        y={34}
        width={320}
        height={232}
        fill="none"
        stroke="currentColor"
        strokeWidth={STROKE}
        opacity={0.5}
      />
      {/* Corner brackets */}
      {[
        [130, 92, 1, 1],
        [270, 92, -1, 1],
        [130, 208, 1, -1],
        [270, 208, -1, -1],
      ].map(([x, y, sx, sy], i) => (
        <path
          key={i}
          d={`M ${x} ${y + sy * 26} L ${x} ${y} L ${x + sx * 26} ${y}`}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth={STROKE * 1.4}
        />
      ))}
      <circle
        cx={200}
        cy={150}
        r={44}
        fill="none"
        stroke="currentColor"
        strokeWidth={STROKE}
      />
      <line x1={200} y1={80} x2={200} y2={220} stroke="currentColor" strokeWidth={STROKE} strokeDasharray="2 6" />
      <line x1={122} y1={150} x2={278} y2={150} stroke="currentColor" strokeWidth={STROKE} strokeDasharray="2 6" />
      <text
        x={130}
        y={82}
        className="fill-current text-[9px] tracking-widest opacity-60"
      >
        DETECTED
      </text>
    </>
  );
}

function Rods() {
  // This site: the person it is about, standing in the hero's glass rods -
  // parallel lines at 45 degrees, two of them lit. The figure sits on a disc
  // of the screen's own ground, so the rods pass behind it, not through it.
  const step = 34;
  const rods = Array.from({ length: 14 }, (_, i) => -160 + i * step);
  const lit = new Set([6, 7]);
  const person = { x: 200, y: 150 };

  return (
    <>
      <defs>
        <clipPath id="rods-frame">
          <rect x={40} y={34} width={320} height={232} />
        </clipPath>
      </defs>
      <rect
        x={40}
        y={34}
        width={320}
        height={232}
        fill="none"
        stroke="currentColor"
        strokeWidth={STROKE}
        opacity={0.5}
      />
      <g clipPath="url(#rods-frame)">
        {rods.map((offset, i) => (
          <line
            key={i}
            x1={offset}
            y1={300}
            x2={offset + 300}
            y2={0}
            stroke={lit.has(i) ? "var(--color-accent)" : "currentColor"}
            strokeWidth={lit.has(i) ? STROKE * 2.4 : STROKE}
            opacity={lit.has(i) ? 1 : 0.6}
          />
        ))}
      </g>
      {/* The person, on a disc that masks the rods behind */}
      <circle
        cx={person.x}
        cy={person.y}
        r={34}
        fill={GROUND}
        stroke="var(--color-accent)"
        strokeWidth={STROKE}
      />
      <circle
        cx={person.x}
        cy={person.y - 9}
        r={9.5}
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth={STROKE * 1.7}
      />
      <path
        d={`M${person.x - 18} ${person.y + 21} C${person.x - 18} ${person.y + 7} ${person.x + 18} ${person.y + 7} ${person.x + 18} ${person.y + 21}`}
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth={STROKE * 1.7}
        strokeLinecap="round"
      />
    </>
  );
}

const VARIANTS: Record<PlateVariant, () => React.ReactElement> = {
  burn: Burn,
  system: System,
  compare: Compare,
  field: Field,
  rods: Rods,
};

/**
 * The bare figure, without the frame or caption - for drawing a diagram onto
 * a device screen. Marks take `currentColor`, the highlight takes whatever
 * --color-accent resolves to where it is placed.
 */
export function PlateFigure({
  variant,
  label,
  className,
}: {
  variant: PlateVariant;
  label: string;
  className?: string;
}) {
  const Figure = VARIANTS[variant];
  return (
    <svg
      viewBox="0 0 400 300"
      role="img"
      aria-label={label}
      preserveAspectRatio="xMidYMid meet"
      className={cx("block size-full", className)}
    >
      <Figure />
    </svg>
  );
}

export function Plate({
  variant,
  caption,
  className,
}: {
  variant: PlateVariant;
  /** Describes the figure. Also the accessible name. */
  caption: string;
  className?: string;
}) {
  const Figure = VARIANTS[variant];

  return (
    <figure
      className={cx(
        "group/plate relative overflow-hidden rounded-sm border border-line bg-surface",
        className,
      )}
    >
      <svg
        viewBox="0 0 400 300"
        role="img"
        aria-label={caption}
        // `meet` centres and letterboxes the figure inside whatever box the
        // caller gives it. Paired with size-full rather than h-auto: h-auto
        // would size the element by the viewBox's own 4:3 ratio and overflow
        // the figure's aspect box, cropping the diagram instead of fitting it.
        preserveAspectRatio="xMidYMid meet"
        // Marks sit at the strong-line value: present, never competing with
        // the type. The whole figure lifts very slightly on row hover.
        className={cx(
          "block size-full text-line-strong",
          "transition-transform duration-slow ease-out group-hover:scale-[1.015]",
        )}
      >
        <Figure />
      </svg>
      <figcaption className="meta-italic absolute bottom-2.5 left-3 text-tertiary">
        Fig. {caption}
      </figcaption>
    </figure>
  );
}

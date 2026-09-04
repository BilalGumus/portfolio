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
 * problem the project solves. Irregular bars under a climbing cumulative line
 * for the meeting-cost tracker, a modular grid for structured extraction,
 * opposed bars for the comparison tool, a detection frame for the camera
 * experiment.
 *
 * They are plainly diagrams rather than fake interface previews, which is the
 * honest option. Marks inherit currentColor so they follow the theme; accents
 * reference the token directly.
 */

const STROKE = 1.25;

function Burn() {
  // Individual meetings, each with its own cost, against a cumulative total
  // that only ever climbs. The bars are irregular because meetings are; the
  // accent line is the figure the product exists to make visible.
  const meetings = [30, 62, 44, 90, 52, 76, 38, 68];
  const baseline = 250;
  const barWidth = 28;
  const step = 44;
  const originX = 40;

  const total = meetings.reduce((sum, value) => sum + value, 0);
  const headroom = 190;

  let running = 0;
  const cumulative = meetings.map((value, i) => {
    running += value;
    return {
      x: originX + i * step + barWidth / 2,
      y: baseline - (running / total) * headroom,
    };
  });

  return (
    <>
      {meetings.map((height, i) => (
        <rect
          key={i}
          x={originX + i * step}
          y={baseline - height}
          width={barWidth}
          height={height}
          fill="none"
          stroke="currentColor"
          strokeWidth={STROKE}
          opacity={0.7}
        />
      ))}

      <line
        x1={28}
        y1={baseline + 1}
        x2={378}
        y2={baseline + 1}
        stroke="currentColor"
        strokeWidth={STROKE}
      />

      <polyline
        points={cumulative.map((p) => `${p.x},${p.y.toFixed(1)}`).join(" ")}
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth={STROKE * 1.4}
      />
      {/* Where the total has got to. */}
      <circle
        cx={cumulative[cumulative.length - 1].x}
        cy={cumulative[cumulative.length - 1].y}
        r={5}
        fill="var(--color-accent)"
      />
    </>
  );
}

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

const VARIANTS: Record<PlateVariant, () => React.ReactElement> = {
  burn: Burn,
  system: System,
  compare: Compare,
  field: Field,
};

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
        Fig. — {caption}
      </figcaption>
    </figure>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cx } from "./primitives";

/**
 * Copy-to-clipboard.
 *
 * The button reports its own result in place rather than throwing a toast
 * across the screen: the confirmation belongs where the attention already is.
 * The label change is announced politely for screen readers, and a failure
 * says so instead of silently pretending to have worked.
 */
export function CopyButton({
  value,
  label = "Copy",
  className,
}: {
  value: string;
  label?: string;
  className?: string;
}) {
  const [state, setState] = useState<"idle" | "copied" | "error">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const copy = useCallback(async () => {
    if (timer.current) clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(value);
      setState("copied");
    } catch {
      setState("error");
    }
    timer.current = setTimeout(() => setState("idle"), 2000);
  }, [value]);

  const text =
    state === "copied" ? "Copied" : state === "error" ? "Press ⌘C" : label;

  return (
    <button
      type="button"
      onClick={copy}
      className={cx(
        // h-10 and px-4 to match the `md` Button size, so it sits level with
        // the button it is always paired with rather than a notch shorter.
        "group inline-flex h-10 items-center gap-1.5 rounded-sm border border-line px-4",
        "meta text-tertiary transition-colors duration-fast ease-standard",
        "hover:border-line-control hover:text-secondary",
        state === "copied" && "border-accent/50 text-accent",
        className,
      )}
      aria-label={`${label} ${value}`}
    >
      <span
        aria-hidden
        className="inline-flex size-3 items-center justify-center"
      >
        {state === "copied" ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-3">
            <path d="m4 12.5 5 5L20 6.5" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="size-3">
            <rect x="9" y="9" width="11" height="11" rx="1.5" />
            <path d="M15 5.5A1.5 1.5 0 0 0 13.5 4H5.5A1.5 1.5 0 0 0 4 5.5v8A1.5 1.5 0 0 0 5.5 15" />
          </svg>
        )}
      </span>
      <span>{text}</span>
      {/* Announced only when it changes, so navigating past the button is quiet. */}
      <span aria-live="polite" className="sr-only">
        {state === "copied"
          ? `${value} copied to clipboard`
          : state === "error"
            ? "Could not copy automatically"
            : ""}
      </span>
    </button>
  );
}

/* -------------------------------------------------------------------------- */

/**
 * Toast.
 *
 * Part of the system, used sparingly: only for confirming something that
 * happened away from the pointer. role="status" rather than "alert", because
 * a confirmation should not interrupt what is being read.
 */
export function Toast({
  open,
  title,
  detail,
  onDismiss,
}: {
  open: boolean;
  title: string;
  detail?: string;
  onDismiss?: () => void;
}) {
  if (!open) return null;

  return (
    <div
      role="status"
      className={cx(
        "pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-sm border border-line",
        "bg-surface-elevated px-3.5 py-3 shadow-md",
        "motion-safe:animate-[overlay-in_var(--duration-base)_var(--ease-out)]",
      )}
    >
      <span aria-hidden className="mt-0.5 inline-flex size-4 items-center justify-center text-accent">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5">
          <path d="m4 12.5 5 5L20 6.5" />
        </svg>
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-small font-medium text-primary">{title}</p>
        {detail && <p className="mt-0.5 text-caption text-secondary">{detail}</p>}
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss notification"
          className="-mr-1 -mt-1 inline-flex size-7 items-center justify-center rounded-sm text-tertiary transition-colors duration-fast hover:bg-surface-sunken hover:text-primary"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" className="size-3.5" aria-hidden>
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      )}
    </div>
  );
}

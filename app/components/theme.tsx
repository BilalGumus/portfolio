"use client";

import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useSyncExternalStore,
} from "react";
import { cx } from "./primitives";

export type Theme = "light" | "dark";

export const THEME_KEY = "theme";

/**
 * Boot script.
 *
 * Runs synchronously in <head> while the browser is still parsing the
 * document, so both attributes are on <html> before anything paints. That is
 * what removes the theme flash and the entrance-motion flash without a
 * hydration mismatch - React never renders either attribute, so there is
 * nothing for it to disagree with.
 *
 * Two attributes are written:
 *   data-theme  - "light" | "dark". Resolved from a stored choice, falling
 *                 back to the OS setting. Always explicit, which is what lets
 *                 the CSS and the Tailwind dark variant test one attribute.
 *   data-motion - "armed" only when the visitor has not asked for reduced
 *                 motion. Entrance transitions are gated on it, so opting out
 *                 means they never exist rather than being cancelled.
 *
 * Both are wrapped in try/catch: localStorage throws in some privacy modes,
 * and a theme is not worth a broken page.
 */
const BOOT_SCRIPT = `(function(){try{
var d=document.documentElement,s=null;
try{s=localStorage.getItem("${THEME_KEY}")}catch(e){}
d.setAttribute("data-theme",s==="light"||s==="dark"?s:(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"));
if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches)d.setAttribute("data-motion","armed");
}catch(e){}})()`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />;
}

/* -------------------------------------------------------------------------- */

function readTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;

  // Suppress transitions for the duration of the swap so the new palette
  // appears at once instead of every colour easing into place. Two nested
  // frames: the first lets the browser paint with the attribute applied, the
  // second removes it - dropping it in a single frame is too early and the
  // transitions still run.
  root.setAttribute("data-theme-switching", "");
  root.setAttribute("data-theme", theme);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => root.removeAttribute("data-theme-switching"));
  });
}

function storedTheme(): Theme | null {
  try {
    const value = localStorage.getItem(THEME_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null; /* storage unavailable in some privacy modes */
  }
}

function resolveTheme(): Theme {
  return (
    storedTheme() ??
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
  );
}

/**
 * Subscribes to the theme.
 *
 * The `data-theme` attribute on <html> is the single source of truth, which
 * makes the theme an external store rather than React state - so it is read
 * with useSyncExternalStore rather than mirrored into useState.
 *
 * That matters for more than tidiness: the header toggle and the palette's
 * "Toggle theme" command are separate component instances. Mirroring into
 * state would let them disagree, because writing the attribute from one would
 * not update the other. Observing the attribute means every consumer sees the
 * same value, whoever changed it.
 */
function subscribeToTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });

  const query = window.matchMedia("(prefers-color-scheme: dark)");
  query.addEventListener("change", onChange);

  return () => {
    observer.disconnect();
    query.removeEventListener("change", onChange);
  };
}

/** Null during server render and hydration, when the DOM cannot be read. */
const themeServerSnapshot = (): Theme | null => null;

export function useTheme() {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    readTheme,
    themeServerSnapshot,
  );

  // React's Strict Mode remount in development resets <html> to the attributes
  // it manages from JSX, discarding the one the boot script wrote. Re-applying
  // here restores it. Writes to the DOM only - no state to fall out of sync.
  useLayoutEffect(() => {
    applyTheme(resolveTheme());
  }, []);

  // Follow the OS for as long as the visitor has expressed no preference.
  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (event: MediaQueryListEvent) => {
      if (storedTheme()) return;
      applyTheme(event.matches ? "dark" : "light");
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const toggle = useCallback(() => {
    const next: Theme = readTheme() === "dark" ? "light" : "dark";
    applyTheme(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* storage unavailable - the choice just will not persist */
    }
  }, []);

  return { theme, toggle };
}

/* -------------------------------------------------------------------------- */

/**
 * Icons are 14px on a 24px grid, 1.25px strokes, drawn to sit optically level
 * with 11px mono metadata beside them.
 */
function SunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className="size-3.5"
      aria-hidden
    >
      <circle cx="12" cy="12" r="4.25" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.4 5.4l1.4 1.4M17.2 17.2l1.4 1.4M18.6 5.4l-1.4 1.4M6.8 17.2l-1.4 1.4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-3.5"
      aria-hidden
    >
      <path d="M20 14.2A8.5 8.5 0 1 1 9.8 4a6.8 6.8 0 0 0 10.2 10.2Z" />
    </svg>
  );
}

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme();

  // Generic until the effect resolves, so server and client agree on the
  // first render. After that it names the destination, which is what a
  // screen-reader user needs from a toggle.
  const label = theme
    ? `Switch to ${theme === "dark" ? "light" : "dark"} theme`
    : "Toggle colour theme";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={cx(
        "inline-flex size-9 items-center justify-center rounded-sm text-secondary",
        "transition-colors duration-fast ease-standard hover:bg-surface-sunken hover:text-primary",
        className,
      )}
    >
      {/* Swapped by CSS, not by state, so the correct glyph is in the very
          first paint and never flickers on hydration. */}
      <span className="dark:hidden">
        <SunIcon />
      </span>
      <span className="hidden dark:block">
        <MoonIcon />
      </span>
    </button>
  );
}

/* -------------------------------------------------------------------------- */

/**
 * Entrance motion controller.
 *
 * One observer for the whole document instead of a client component per
 * animated element - the page stays server-rendered and this ships a few
 * hundred bytes of behaviour.
 *
 * Elements are released once and then unobserved: re-animating on scroll-back
 * is exactly the kind of motion that has nothing to report.
 */
export function RevealController() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    if (root.getAttribute("data-motion") !== "armed") return;

    const targets = document.querySelectorAll<HTMLElement>(
      ".reveal:not([data-revealed])",
    );
    if (targets.length === 0) return;

    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.setAttribute("data-revealed", ""));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-revealed", "");
          observer.unobserve(entry.target);
        }
      },
      // Released a little before the element is fully on screen, so the
      // transition finishes about when it arrives rather than starting then.
      { rootMargin: "0px 0px -8% 0px", threshold: 0.01 },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // Re-scans after a client-side navigation, when the new route's .reveal
    // elements have rendered but have never been observed.
  }, [pathname]);

  return null;
}

"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Container, cx } from "./primitives";
import { ThemeToggle } from "./theme";
import { nav, profile } from "@/app/lib/site";

/** Section ids the nav points at, in document order. */
const SPY_SECTIONS = ["work", "about", "approach", "experience", "capabilities", "contact"];

/**
 * Highlights the nav item for the section currently being read.
 *
 * Uses an observer rather than a scroll handler, so nothing runs on every
 * frame.
 */
function useActiveSection() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const nodes = SPY_SECTIONS.map((id) => document.getElementById(id)).filter(
      (node): node is HTMLElement => node !== null,
    );
    if (nodes.length === 0) return;

    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        // The section occupying the most of the reading band wins, which is
        // stabler than "first one intersecting" on short sections.
        let best: string | null = null;
        let bestRatio = 0;
        for (const [id, ratio] of visible) {
          if (ratio > bestRatio) {
            best = id;
            bestRatio = ratio;
          }
        }
        setActive(best);
      },
      // A band across the middle of the viewport, so the highlight tracks
      // what is being read rather than what has just appeared.
      { rootMargin: "-25% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return active;
}

/**
 * Detects whether the header has left the top of the document.
 *
 * A zero-height sentinel above the header is observed instead of listening to
 * scroll, so the hairline appears without running a handler on every frame.
 */
function useStuck() {
  const sentinel = useRef<HTMLDivElement>(null);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const node = sentinel.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setStuck(!entry.isIntersecting),
      { threshold: 1 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { sentinel, stuck };
}

/**
 * Site header.
 *
 * One page, so the nav is a set of in-page anchors with the current section
 * highlighted.
 *
 * Below 640px the anchors are dropped rather than folded into a menu. There
 * are six sections on a single scrolling page, and the hero already carries
 * the two things a visitor arrives wanting - the work and the email address -
 * as buttons. A drawer would be machinery in place of a scroll.
 */
export function SiteHeader() {
  const { sentinel, stuck } = useStuck();
  const activeSection = useActiveSection();

  return (
    <>
      <div ref={sentinel} aria-hidden className="h-px" />

      <header
        data-stuck={stuck || undefined}
        className={cx(
          "sticky top-0 z-40 bg-bg",
          // The rule only exists once there is content beneath it to separate.
          "border-b border-transparent transition-colors duration-base ease-standard",
          "data-stuck:border-line",
        )}
      >
        <Container>
          <div className="grid-air flex h-16 items-center justify-between gap-4">
            {/* Identity. Doubles as the link back to the top. */}
            <Link
              href="/"
              className="flex items-baseline gap-2.5 rounded-sm"
              aria-label={`${profile.name} — home`}
            >
              <span className="text-h3 text-primary">{profile.name}</span>
              <span className="meta hidden text-tertiary md:inline">
                {profile.shortRole}
              </span>
            </Link>

            <div className="flex items-center gap-1 sm:gap-2">
              <nav aria-label="Primary" className="hidden sm:block">
                <ul className="flex items-center gap-0.5 lg:gap-1">
                  {nav.map((item) => {
                    const current = activeSection === item.section;
                    return (
                      <li key={item.href}>
                        <a
                          href={item.href}
                          aria-current={current ? "true" : undefined}
                          className={cx(
                            "relative inline-flex h-9 items-center rounded-sm px-2 text-small lg:px-2.5",
                            "transition-colors duration-fast ease-standard",
                            current ? "text-primary" : "text-secondary hover:text-primary",
                          )}
                        >
                          {item.label}
                          {/* Colour already carries the state; the rule is
                              reinforcement, never the only channel. */}
                          <span
                            aria-hidden
                            className={cx(
                              "absolute inset-x-2 bottom-1 h-px origin-left bg-accent lg:inset-x-2.5",
                              "transition-transform duration-base ease-out",
                              current ? "scale-x-100" : "scale-x-0",
                            )}
                          />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <span aria-hidden className="mx-1 hidden h-5 w-px bg-line sm:block" />

              <ThemeToggle />
            </div>
          </div>
        </Container>
      </header>
    </>
  );
}

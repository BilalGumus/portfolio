"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ButtonLink, Container, cx } from "./primitives";
import { ThemeToggle } from "./theme";
import { links, nav, profile } from "@/app/lib/site";
import { projects } from "@/app/lib/work";

/** Section ids the nav points at, in document order. */
const SPY_SECTIONS = nav.map((item) => item.section);

/**
 * Highlights the nav item for the section currently being read. An observer
 * rather than a scroll handler, so nothing runs on every frame.
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
      { rootMargin: "-25% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return active;
}

/** Whether the header has left the top of the document. */
function useStuck() {
  const sentinel = useRef<HTMLDivElement>(null);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const node = sentinel.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setStuck(!entry.isIntersecting), {
      threshold: 1,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { sentinel, stuck };
}

const navLink =
  "inline-flex h-8 items-center gap-1 rounded-full px-3 text-caption transition-colors duration-fast ease-standard";

/**
 * The Work menu. Opens on hover and on keyboard focus - focus-within keeps it
 * open while tabbing through the projects, so it needs no script and no
 * disclosure state. The "Work" link itself still jumps to the section, so the
 * menu is a shortcut, never the only way in.
 */
function WorkMenu({ current }: { current: boolean }) {
  return (
    <div className="group/menu relative">
      <a
        href="#work"
        aria-current={current ? "true" : undefined}
        className={cx(navLink, current ? "text-primary" : "text-secondary hover:text-primary")}
      >
        Work
        <ChevronDown
          aria-hidden
          className="size-3 opacity-60 transition-transform duration-base group-hover/menu:rotate-180 group-focus-within/menu:rotate-180"
          strokeWidth={2}
        />
      </a>

      <div
        className={cx(
          "invisible absolute top-full left-0 pt-2 opacity-0",
          "translate-y-1 transition-[opacity,transform,visibility] duration-base ease-out",
          "group-hover/menu:visible group-hover/menu:translate-y-0 group-hover/menu:opacity-100",
          "group-focus-within/menu:visible group-focus-within/menu:translate-y-0 group-focus-within/menu:opacity-100",
        )}
      >
        <ul className="w-80 rounded-2xl border border-line bg-surface-elevated p-1.5 shadow-overlay">
          {projects.map((project) => (
            <li key={project.slug}>
              <a
                href={`#${project.slug}`}
                className="block rounded-xl px-3 py-2.5 transition-colors duration-fast hover:bg-surface-sunken"
              >
                <span className="block text-caption font-medium text-primary">{project.name}</span>
                <span className="block truncate text-micro text-tertiary">{project.tagline}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/**
 * Site header.
 *
 * Below 768px the section links are dropped rather than folded into a menu:
 * it is one scrolling page, and the hero already carries the two things a
 * visitor arrives wanting - the work and a way to get in touch.
 */
export function SiteHeader() {
  const { sentinel, stuck } = useStuck();
  const activeSection = useActiveSection();
  const github = links.find((link) => link.label === "GitHub");

  return (
    <>
      <div ref={sentinel} aria-hidden className="h-px" />

      <header
        data-stuck={stuck || undefined}
        className={cx(
          "sticky top-0 z-40 border-b border-transparent bg-bg/80 backdrop-blur-xl",
          "transition-colors duration-base ease-standard data-stuck:border-line",
        )}
      >
        <Container>
          <div className="flex h-14 items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <Link
                href="/"
                className="rounded-full"
                aria-label={`${profile.name}, home`}
              >
                <span className="text-[0.9375rem] font-medium tracking-tight text-primary">
                  {profile.name}
                </span>
              </Link>

              <nav aria-label="Primary" className="hidden md:block">
                <ul className="flex items-center">
                  {nav.map((item) => {
                    const current = activeSection === item.section;
                    return (
                      <li key={item.href}>
                        {item.section === "work" ? (
                          <WorkMenu current={current} />
                        ) : (
                          <a
                            href={item.href}
                            aria-current={current ? "true" : undefined}
                            className={cx(
                              navLink,
                              current ? "text-primary" : "text-secondary hover:text-primary",
                            )}
                          >
                            {item.label}
                          </a>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>

            <div className="flex items-center gap-1.5">
              <ThemeToggle />
              {github && (
                <a
                  href={github.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cx(navLink, "text-secondary hover:text-primary max-sm:hidden")}
                >
                  GitHub
                </a>
              )}
              <ButtonLink
                href={`mailto:${profile.email}`}
                variant="primary"
                size="sm"
                className="max-sm:hidden"
              >
                Email me
              </ButtonLink>
              <ButtonLink href="#contact" variant="accent" size="sm">
                Let&apos;s talk
              </ButtonLink>
            </div>
          </div>
        </Container>
      </header>
    </>
  );
}

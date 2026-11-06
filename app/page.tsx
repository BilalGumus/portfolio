import Image from "next/image";
import type { CSSProperties } from "react";
import { CopyButton } from "@/app/components/copy";
import { HeroBackdrop } from "@/app/components/hero-backdrop";
import {
  ArrowDisc,
  ButtonLink,
  buttonClass,
  Container,
  Section,
  StatusDot,
  cx,
  revealDelay,
} from "@/app/components/primitives";
import { StackMarquee } from "@/app/components/stack-marquee";
import { CompactMeta, HighlightRow, StudioCard } from "@/app/components/studio-card";
import {
  capabilities,
  education,
  experience,
  links,
  meta,
  profile,
  stackStrip,
} from "@/app/lib/site";
import { projects } from "@/app/lib/work";

/**
 * Structured data.
 *
 * A `Person` rather than a `WebSite`, because the subject of the page is a
 * person. Everything here is already stated in the visible content -
 * structured data that claims more than the page shows is how a site earns a
 * manual action.
 */
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  description: meta.description,
  url: meta.url,
  image: `${meta.url}${profile.avatar}`,
  email: `mailto:${profile.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kastamonu",
    addressCountry: "TR",
  },
  // The current role from the experience record, which the page shows as the
  // "Now" card - so this states nothing the visible content does not.
  ...(experience[0]?.period.includes("Present") && {
    worksFor: { "@type": "Organization", name: experience[0].org },
  }),
  alumniOf: education.map((item) => ({
    "@type": "CollegeOrUniversity",
    name: item.school,
  })),
  knowsAbout: capabilities.flatMap((group) => group.items),
  sameAs: links.filter((link) => link.external).map((link) => link.href),
};

/**
 * The first project gets the full studio treatment; the rest follow in pairs,
 * in array order - this site beside Netuygun, then HKS Scraper beside Face
 * Auth. Keep the remainder an even count so no row has a card on its own.
 */
const featured = projects.slice(0, 1);
const more = projects.slice(1);

/**
 * Experience and education as one run of cards - the reference's news row.
 * The record is unchanged; this only decides how each entry is labelled.
 */
const record = [
  ...experience.map((position, i) => ({
    key: `${position.org}-${position.period}`,
    years: position.years,
    org: position.org,
    title: position.title,
    period: `${position.period} · ${position.location}`,
    detail: position.detail,
    current: i === 0 && position.period.includes("Present"),
  })),
  ...education.map((item) => ({
    key: item.school,
    years: item.period.replace(/\s/g, ""),
    org: item.school,
    title: item.degree,
    period: `${item.period} · ${item.location}`,
    detail: item.note,
    current: false,
  })),
];

const linkedin = links.find((link) => link.label === "LinkedIn");

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      {/* ================================================================== */}
      {/*  Hero                                                              */}
      {/*  One centred column over the glass-rod shader: the mark, one       */}
      {/*  spoken line, a lead, two actions. Everything else is below the    */}
      {/*  fold on purpose.                                                  */}
      {/* ================================================================== */}
      <section
        aria-labelledby="intro"
        className="relative isolate flex min-h-[min(calc(90svh-3.5rem),56rem)] items-center overflow-hidden bg-bg py-20 sm:py-24"
      >
        {/* Isolated, on an opaque ground in the page colour, so the shader's
            blend mode has a real backdrop to work against inside the group -
            blending through to the root canvas is not reliable everywhere,
            and an isolated group with no ground shows the render's black/white
            base as a box. Same colour as the page, so there is no seam.

            Two layers behind the content: a static lavender bloom that
            is always there, and the shader, which only mounts on wide screens
            with motion allowed. Without the shader the bloom alone carries
            the hero, so nothing is missing on a phone. */}
        <div aria-hidden className="hero-glow pointer-events-none absolute inset-0 z-0" />
        <HeroBackdrop />

        <Container size="narrow" className="relative z-10 text-center">
          <p className="rise text-caption text-secondary" style={revealDelay(1)}>
            {profile.name} · {profile.shortRole} · {profile.location}
          </p>

          <h1
            id="intro"
            className="rise font-voice mt-3 text-display text-primary text-balance"
            style={revealDelay(2)}
          >
            {profile.display}
          </h1>

          <p
            className="rise mx-auto mt-7 max-w-[56ch] text-lead text-secondary text-pretty"
            style={revealDelay(3)}
          >
            {profile.lead}
          </p>

          <div
            className="rise mt-10 flex flex-wrap items-center justify-center gap-3"
            style={revealDelay(4)}
          >
            <a
              href="#work"
              className={buttonClass("primary", "md", "group py-1 pr-1.5 pl-4.5")}
            >
              Selected work <ArrowDisc />
            </a>
            <ButtonLink href={`mailto:${profile.email}`} variant="secondary">
              Email me
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* ================================================================== */}
      {/*  Stack marquee - the reference's customer logos, as the tools.     */}
      {/* ================================================================== */}
      <section aria-labelledby="stack-label" className="pt-12 pb-16 sm:pt-20 sm:pb-24">
        <Container size="default">
          <StackMarquee
            items={stackStrip}
            label="Built with the tools behind every project below"
            labelId="stack-label"
          />
        </Container>
      </section>

      {/* ================================================================== */}
      {/*  Work                                                              */}
      {/* ================================================================== */}
      <section id="work" aria-labelledby="work-title" className="pt-10 pb-24 sm:pb-32">
        <h2 id="work-title" className="sr-only">
          Selected work
        </h2>
        <Container size="default">
          <div className="space-y-28 sm:space-y-40">
            {featured.map((project) => (
              <article key={project.slug} id={project.slug} className="reveal">
                <StudioCard project={project} />
                <HighlightRow project={project} />
              </article>
            ))}
          </div>

          <div className="mt-28 grid grid-cols-1 gap-x-8 gap-y-20 sm:mt-40 sm:grid-cols-2 lg:gap-x-10">
            {more.map((project, i) => (
              <article
                key={project.slug}
                id={project.slug}
                className="reveal"
                style={revealDelay(i, 90, 180)}
              >
                <StudioCard project={project} compact />
                <CompactMeta project={project} />
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ================================================================== */}
      {/*  About                                                             */}
      {/* ================================================================== */}
      <Section id="about" title="About">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[minmax(0,24rem)_1fr] md:gap-16 lg:gap-24">
          {/* The photograph as it is - no tint, no blend, and no ground of its
              own. A background colour here (it was white) shows through the
              anti-aliased edge of the rounded clip as a pale halo, which is
              loud in dark mode. The edge is an inset ring drawn *over* the
              photo instead of a border around it, so nothing can sit between
              the picture and its frame. */}
          <figure className="reveal relative aspect-4/5 overflow-hidden rounded-3xl after:pointer-events-none after:absolute after:inset-0 after:rounded-3xl after:ring-1 after:ring-black/8 after:ring-inset after:content-['']">
            <Image
              src={profile.avatar}
              alt={`${profile.name}, ${profile.role}`}
              fill
              sizes="(min-width: 768px) 24rem, 100vw"
              className="object-cover object-bottom"
            />
            <figcaption className="absolute bottom-3 left-3 rounded-full bg-[oklch(100%_0_0/0.75)] px-3 py-1 text-micro text-[oklch(30%_0.006_286)] backdrop-blur-md">
              {profile.location} · {profile.timezone}
            </figcaption>
          </figure>

          <div className="reveal" style={revealDelay(1)}>
            <p className="font-voice text-[1.375rem] leading-[1.45] tracking-[-0.01em] text-primary sm:text-[1.5rem]">
              {profile.about[0]}
            </p>
            <div className="mt-6 space-y-4 text-body text-secondary">
              {profile.about.slice(1).map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>

            <dl className="mt-10 grid grid-cols-1 gap-3 xs:grid-cols-3">
              {[
                { term: "Building since", detail: profile.since },
                { term: "Based in", detail: profile.location },
                { term: "Education", detail: education[0].degree.replace("BSc, ", "BSc ") },
              ].map((fact) => (
                <div key={fact.term} className="rounded-2xl border border-line bg-surface p-4">
                  <dt className="text-micro text-tertiary">{fact.term}</dt>
                  <dd className="mt-1 text-small font-medium text-primary">{fact.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      {/* ================================================================== */}
      {/*  Experience - the reference's news row.                            */}
      {/* ================================================================== */}
      <Section
        id="experience"
        title="Experience"
        action={
          linkedin && (
            <ButtonLink href={linkedin.href} external size="sm" className="group pr-1">
              Full record on LinkedIn
              <ArrowDisc direction="up-right" tone="ink" size="sm" />
            </ButtonLink>
          )
        }
      >
        <ol className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10">
          {record.map((entry, i) => (
            <li key={entry.key} className="reveal" style={revealDelay(i, 60, 300)}>
              <div
                className={cx(
                  "relative flex aspect-16/10 flex-col justify-between overflow-hidden rounded-2xl p-5",
                  entry.current ? "bg-lavender-soft" : "border border-line bg-surface-sunken",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-caption text-secondary">{entry.org}</p>
                  {entry.current && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-surface px-2.5 py-0.5 text-micro text-primary">
                      <StatusDot /> Now
                    </span>
                  )}
                </div>
                <p className="font-voice text-[2.5rem] leading-none tracking-[-0.02em] text-primary">
                  {entry.years}
                </p>
              </div>
              <h3 className="mt-4 text-small font-medium text-primary">{entry.title}</h3>
              <p className="mt-1 text-micro text-tertiary">{entry.period}</p>
              <p className="mt-3 text-caption text-secondary">{entry.detail}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* ================================================================== */}
      {/*  Contact                                                           */}
      {/* ================================================================== */}
      <section id="contact" aria-labelledby="contact-title" className="py-24 sm:py-32 lg:py-40">
        <Container size="default">
          <div className="studio reveal relative overflow-hidden rounded-3xl px-6 py-20 text-center sm:px-16 sm:py-28" style={{ "--studio-h": 295 } as CSSProperties}>
            <h2
              id="contact-title"
              className="font-voice mx-auto max-w-[20ch] text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-[-0.02em] text-primary text-balance"
            >
              Building something on the web? Let&apos;s talk.
            </h2>
            {/* Primary, not secondary: the grey drops under 4.5:1 where the
                sweep darkens toward the edges. */}
            <p className="mx-auto mt-5 measure-tight text-body text-primary">
              Best by email. Tell me what you are making, what stage it is at,
              and what is currently in the way. That is enough for me to be
              useful in a first reply.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
              <ButtonLink href={`mailto:${profile.email}`} variant="primary">
                {profile.email}
              </ButtonLink>
              <CopyButton value={profile.email} label="Copy address" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

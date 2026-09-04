import Image from "next/image";
import { CopyButton } from "@/app/components/copy";
import { HeroBackdrop } from "@/app/components/hero-backdrop";
import {
  Arrow,
  ButtonLink,
  Container,
  cx,
  Meta,
  Section,
  StatusDot,
  TitleBlock,
  revealDelay,
} from "@/app/components/primitives";
import { WorkRow } from "@/app/components/work-row";
import {
  capabilities,
  education,
  experience,
  links,
  meta,
  profile,
} from "@/app/lib/site";
import { projects } from "@/app/lib/work";

/**
 * Structured data.
 *
 * A `Person` rather than a `WebSite`, because the subject of the page is a
 * person: it lets a search engine tie the name, the role, the location and the
 * profile links into one entity instead of inferring them from prose.
 *
 * Everything here is already stated in the visible content - `sameAs` is the
 * same link list the contact section renders, `alumniOf` the same school as
 * the education block. Structured data that claims more than the page shows is
 * how a site earns a manual action.
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
  alumniOf: education.map((item) => ({
    "@type": "CollegeOrUniversity",
    name: item.school,
  })),
  knowsAbout: capabilities.flatMap((group) => group.items),
  sameAs: links.filter((link) => link.external).map((link) => link.href),
};

export default function HomePage() {
  return (
    <>
      {/* Rendered as a script tag per the framework's recommendation. The
          escape guards against a `<` in any content string closing the tag
          early, which is the injection vector JSON.stringify does not cover. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      {/* ================================================================== */}
      {/*  Hero                                                              */}
      {/*  Typography and structure carry it. The right-hand rail is a title */}
      {/*  block borrowed from technical drawing - the facts, aligned, beside */}
      {/*  the statement rather than beneath it.                             */}
      {/* ================================================================== */}
      <section aria-labelledby="intro" className="relative overflow-hidden">
        {/* Sits behind the content but in front of the page ground. The grid
            hairlines are further back still and read through it, because the
            backdrop is masked and never fully opaque. */}
        <HeroBackdrop />

        <Container className="relative z-10">
          <div className="grid grid-cols-1 pt-12 pb-16 sm:pt-16 lg:grid-cols-12 lg:pt-24 lg:pb-24">
            <div className="grid-air lg:col-span-8">
              <Meta as="p" className="reveal">
                {profile.location} · {profile.timezone} · Building since {profile.since}
              </Meta>

              <h1
                id="intro"
                className="reveal mt-7 text-display text-primary text-balance"
                style={revealDelay(1)}
              >
                {profile.display}
              </h1>

              <p
                className="reveal mt-8 measure text-lead text-secondary"
                style={revealDelay(2)}
              >
                {profile.lead}
              </p>

              <p
                className="reveal mt-4 measure text-body text-tertiary"
                style={revealDelay(3)}
              >
                {profile.support}
              </p>

              <div
                className="reveal mt-10 flex flex-wrap items-center gap-3"
                style={revealDelay(4)}
              >
                <ButtonLink href="#work" variant="primary" className="group">
                  Selected work <Arrow />
                </ButtonLink>
                <ButtonLink href={`mailto:${profile.email}`} variant="secondary">
                  Email me
                </ButtonLink>
              </div>
            </div>

            <div
              className="reveal grid-air mt-14 lg:col-span-3 lg:col-start-10 lg:mt-3"
              style={revealDelay(5)}
            >
              <div className="flex items-center gap-2.5 pb-4">
                <StatusDot active={profile.status.available} />
                <p className="meta text-primary">{profile.status.label}</p>
              </div>

              {/* No employer row and no location row. The employer belongs in
                  the experience record, not in the masthead, and the place is
                  already stated in the eyebrow above and again in the footer -
                  a third time would just be repetition. */}
              <TitleBlock
                rows={[
                  { term: "Role", detail: profile.role },
                  { term: "Focus", detail: "Web applications" },
                  { term: "Stack", detail: "TypeScript · Node · Postgres" },
                ]}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================== */}
      {/*  01 — Selected work                                                */}
      {/* ================================================================== */}
      <Section id="work" index="01" label="Selected Work" wide>
        <div className="grid-air mb-2 flex flex-wrap items-baseline justify-between gap-4">
          <p className="measure text-lead text-secondary">
            A product I am building, and three tools that started as something
            I wanted to exist and could not find.
          </p>
          <Meta as="p">{projects.length} projects</Meta>
        </div>

        <div className="mt-8">
          {projects.map((project, i) => (
            <WorkRow key={project.slug} project={project} position={i} />
          ))}
        </div>
      </Section>

      {/* ================================================================== */}
      {/*  02 — About                                                        */}
      {/* ================================================================== */}
      <Section id="about" index="02" label="About">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-9 lg:gap-x-0">
          {/* Two columns, filling them exactly. No grid-air on this block and
              no max-width on the frame, so its borders land on the hairlines
              either side and the portrait reads as occupying those two columns
              rather than floating inside them. The caption takes the 2px on its
              own, since a glyph should still never sit on a line. */}
          <div className="lg:col-span-2">
            <div className="reveal relative w-40 border border-line bg-surface p-1.5 lg:w-full">
              <Image
                src={profile.avatar}
                alt={`${profile.name}, ${profile.role}`}
                width={416}
                height={416}
                sizes="(min-width: 1024px) 18vw, 160px"
                className="aspect-square w-full object-cover grayscale"
              />
            </div>
            <p className="meta-italic mt-3 pl-0.5 text-tertiary">Fig. — the author</p>
          </div>

          {/* Starts at the fourth inner column, leaving the third empty, so the
              prose keeps its distance from the portrait now that the grid has
              no gutter to provide it. */}
          <div
            className="reveal grid-air lg:col-span-6 lg:col-start-4"
            style={revealDelay(1)}
          >
            <div className="measure space-y-5 text-body text-secondary">
              {profile.about.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-10">
              <Meta as="p" className="mb-3">
                Education
              </Meta>
              {education.map((item) => (
                <div key={item.school}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <p className="text-h3 text-primary">{item.school}</p>
                    <Meta>{item.period}</Meta>
                  </div>
                  <p className="mt-1 text-small text-secondary">
                    {item.degree} · {item.location}
                  </p>
                  <p className="mt-0.5 text-caption text-tertiary">{item.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ================================================================== */}
      {/*  03 — How I work                                                   */}
      {/* ================================================================== */}
      <Section id="approach" index="03" label="How I Work">
        <p className="grid-air measure text-lead text-secondary">
          Four positions I actually work from. Each one I arrived at by getting
          it wrong first, which is the only reason it is here.
        </p>

        <ol className="mt-10 space-y-11 sm:space-y-14">
          {profile.principles.map((principle, i) => (
            <li
              key={principle.id}
              // Nine columns rather than a fixed 3rem rail: the section
              // content spans nine of the page's twelve columns, so a
              // nine-column child grid maps one-to-one onto them and the
              // numeral and the title both start on a real grid line.
              className="reveal grid grid-cols-1 gap-3 sm:grid-cols-9 sm:gap-x-0"
              style={revealDelay(i, 80, 320)}
            >
              <Meta as="p" tone="accent" className="grid-air sm:col-span-1 sm:pt-1.5">
                {principle.id}
              </Meta>
              <div className="grid-air sm:col-span-8">
                <h3 className="text-h2 text-primary">{principle.title}</h3>
                <p className="mt-2.5 measure text-body text-secondary">
                  {principle.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* ================================================================== */}
      {/*  04 — Experience                                                   */}
      {/*  Genuinely tabular data, so it is a table. With the row rules gone, */}
      {/*  generous row padding does the separating.                          */}
      {/*                                                                     */}
      {/*  Column widths mirror the page grid rather than being picked by     */}
      {/*  eye. The section content spans nine of twelve columns, so one      */}
      {/*  column is (100% - 8 gaps) / 9; Years takes one column plus its     */}
      {/*  gap and Role takes three, which lands Detail on a real grid line   */}
      {/*  at every viewport width instead of only at one.                    */}
      {/* ================================================================== */}
      <Section id="experience" index="04" label="Experience">
        <table className="w-full table-fixed border-collapse text-left">
          <caption className="sr-only">
            Professional experience, most recent first
          </caption>
          <thead>
            <tr>
              <th
                scope="col"
                style={{ width: "var(--tcol-1)" }}
                className="meta pb-4 pl-0.5 pr-4 font-normal text-tertiary"
              >
                Years
              </th>
              <th
                scope="col"
                style={{ width: "var(--tcol-3)" }}
                className="meta pb-4 pl-0.5 pr-4 font-normal text-tertiary"
              >
                Role
              </th>
              <th
                scope="col"
                className="meta hidden pb-4 pl-0.5 font-normal text-tertiary sm:table-cell"
              >
                Detail
              </th>
            </tr>
          </thead>
          <tbody>
            {experience.map((position, i) => (
              <tr
                key={`${position.org}-${position.period}`}
                className="reveal align-top"
                style={revealDelay(i, 50, 250)}
              >
                <td className="py-7 pl-0.5 pr-4">
                  <span className="meta whitespace-nowrap text-secondary">{position.years}</span>
                </td>
                <td className="py-7 pl-0.5 pr-4">
                  <p className="text-h3 text-primary">{position.title}</p>
                  {/* The employer is printed once per run of consecutive roles
                      rather than on every row - four identical lines read as
                      branding, and one line above a run of roles reads as
                      progression, which is what it is. It stays in the row for
                      assistive technology either way, so no row loses the fact
                      of who it was for. */}
                  <p
                    className={cx(
                      "mt-1 text-caption text-secondary",
                      i > 0 && experience[i - 1].org === position.org && "sr-only",
                    )}
                  >
                    {position.org}
                  </p>
                  <p className="mt-0.5 text-caption text-tertiary">
                    {position.period}
                  </p>
                  {/* Detail folds under the role below 640px instead of the
                      table scrolling sideways. */}
                  <p className="mt-3 text-small text-secondary sm:hidden">
                    {position.detail}
                  </p>
                </td>
                <td className="hidden py-7 pl-0.5 sm:table-cell">
                  <p className="measure text-small text-secondary">
                    {position.detail}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      {/* ================================================================== */}
      {/*  05 — Stack                                                        */}
      {/* ================================================================== */}
      <Section id="capabilities" index="05" label="Stack">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-x-0">
          {capabilities.map((group, i) => (
            <div
              key={group.title}
              className="reveal pl-0.5 sm:pr-6"
              style={revealDelay(i, 80, 240)}
            >
              <Meta as="p" tone="accent">
                {group.title}
              </Meta>
              <ul className="mt-4 space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="text-small text-secondary">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* ================================================================== */}
      {/*  06 — Contact                                                      */}
      {/* ================================================================== */}
      <Section id="contact" index="06" label="Contact">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-9 lg:gap-x-0">
          <div className="grid-air lg:col-span-5">
            <p className="text-h1 text-primary text-balance">
              If you are building something on the web and want it built
              properly, I would like to hear about it.
            </p>
            <p className="mt-6 measure text-body text-secondary">
              Best by email. Tell me what you are making, what stage it is at,
              and what is currently in the way — that is enough for me to be
              useful in a first reply.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink href={`mailto:${profile.email}`} variant="primary">
                {profile.email}
              </ButtonLink>
              <CopyButton value={profile.email} label="Copy address" />
            </div>

            <div className="mt-8 flex items-center gap-2.5">
              <StatusDot active={profile.status.available} />
              <p className="text-caption text-secondary">{profile.status.label}</p>
            </div>
          </div>

          <div className="grid-air lg:col-span-3 lg:col-start-7">
            <Meta as="p" className="mb-3">
              Elsewhere
            </Meta>
            <ul className="space-y-1">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...(link.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group flex items-baseline justify-between gap-4 py-3"
                  >
                    <span className="meta text-tertiary">{link.label}</span>
                    <span className="flex items-baseline gap-2 text-caption text-secondary transition-colors duration-fast group-hover:text-accent">
                      <span className="truncate">{link.value}</span>
                      <Arrow direction={link.external ? "up-right" : "right"} />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
}

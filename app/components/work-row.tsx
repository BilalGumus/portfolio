import { Plate } from "./plate";
import { Arrow, Badge, Meta, cx, revealDelay } from "./primitives";
import type { Project } from "@/app/lib/work";

/**
 * One project on the index.
 *
 * Not a card, and no separator rule. Each entry is an editorial record whose
 * figure alternates side, so the column of projects reads as a sequence from
 * the alternation and the space between entries rather than from a divider.
 *
 * The heading links to wherever the project actually lives - the running
 * product, or the repository - and carries a pseudo-element that extends the
 * pointer target across the whole record. That gives a large target without
 * announcing the entire block of text as one link label, and without nesting
 * interactive elements. A project with nothing public to link to renders its
 * heading as plain text rather than a dead link.
 */
export function WorkRow({ project, position }: { project: Project; position: number }) {
  const figureFirst = position % 2 === 1;

  const primary = project.href ?? project.repo;
  const isRepoOnly = !project.href && Boolean(project.repo);
  const actionLabel = isRepoOnly ? "View the source" : "Visit the project";

  return (
    <article
      className="group reveal relative"
      style={revealDelay(position, 60, 240)}
    >
      <div className="grid grid-cols-1 items-center gap-8 py-12 sm:gap-10 sm:py-14 lg:grid-cols-12 lg:gap-x-0 lg:py-16">
        {/* grid-air here too, for the same reason the text blocks have it: the
            figure has a visible frame, and without the 2px its left border
            landed exactly on a grid hairline - two lines superimposed, so the
            frame read as the grid rather than as a frame sitting on it. With
            the air it follows the same rule as every other block on the page,
            2px inside its columns. */}
        <div
          className={cx(
            "grid-air lg:col-span-5",
            figureFirst ? "lg:order-1 lg:col-start-1" : "lg:order-2 lg:col-start-8",
          )}
        >
          <Plate
            variant={project.plate}
            caption={project.category}
            className="aspect-[4/3]"
          />
        </div>

        <div
          className={cx(
            "lg:col-span-6",
            "grid-air",
            figureFirst ? "lg:order-2 lg:col-start-7" : "lg:order-1 lg:col-start-1",
          )}
        >
          <div className="flex items-baseline gap-4">
            <Meta tone="accent">{project.index}</Meta>
            <Meta>{project.category}</Meta>
            <Meta className="ml-auto">{project.year}</Meta>
          </div>

          <h3 className="mt-5 text-h1 text-primary">
            {primary ? (
              <a
                href={primary}
                target="_blank"
                rel="noopener noreferrer"
                className={cx(
                  "rounded-sm transition-colors duration-fast ease-standard",
                  "group-hover:text-accent",
                  // Extends the pointer target to the whole record.
                  "after:absolute after:inset-0 after:content-['']",
                )}
              >
                {project.name}
              </a>
            ) : (
              project.name
            )}
          </h3>

          <p className="mt-3 measure text-lead text-secondary">{project.tagline}</p>
          <p className="mt-4 measure text-body text-tertiary">{project.description}</p>

          <dl className="mt-6 flex flex-wrap items-baseline gap-x-8 gap-y-2">
            <div className="flex items-baseline gap-2">
              <dt className="meta text-tertiary">Role</dt>
              <dd className="text-caption text-secondary">{project.role}</dd>
            </div>
          </dl>

          <ul className="mt-4 flex flex-wrap gap-1.5">
            {project.stack.map((item) => (
              <li key={item}>
                <Badge>{item}</Badge>
              </li>
            ))}
          </ul>

          {project.outcome ? (
            <div className="mt-6 border-l-2 border-accent pl-4">
              <Meta tone="accent">Outcome</Meta>
              <p className="mt-1 measure-tight text-small text-secondary">
                {project.outcome}
              </p>
            </div>
          ) : (
            <p className="mt-6 measure-tight text-caption text-tertiary">
              <span className="meta text-accent">Outcome</span>{" "}
              <span className="ml-1">
                — placeholder, pending figures that can be shared publicly.
              </span>
            </p>
          )}

          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2">
            {primary && (
              // Decorative: the heading above is already the link covering this
              // record, so announcing the same destination twice adds only noise.
              <p
                aria-hidden
                className="inline-flex items-center gap-2 text-small text-secondary transition-colors duration-fast group-hover:text-accent"
              >
                {actionLabel} <Arrow direction="up-right" />
              </p>
            )}
            {/* A second, real link for when the source lives elsewhere. The
                record-wide target belongs to the heading, so this needs its own
                stacking context to stay clickable above it. */}
            {project.href && project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline relative z-10 text-small text-tertiary hover:text-primary"
              >
                Source
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

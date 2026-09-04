"use client";

import { useEffect, useRef, useState } from "react";
import { openCommandPalette, useShortcutHint } from "./command-palette";
import { Toast } from "./copy";
import { Button, ButtonLink, Meta, cx } from "./primitives";

/**
 * The interactive half of the design system specimen.
 *
 * Everything here renders from the same tokens and the same components the
 * rest of the site uses, so the specimen cannot drift out of date - there is
 * no second copy of anything.
 */

/* -------------------------------------------------------------------------- */
/*  Buttons                                                                   */
/* -------------------------------------------------------------------------- */

export function ButtonSpecimen() {
  return (
    <div className="space-y-8">
      <div>
        <Meta as="p" className="mb-3">
          Variants
        </Meta>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="secondary" disabled>
            Disabled
          </Button>
        </div>
      </div>

      <div>
        <Meta as="p" className="mb-3">
          Sizes
        </Meta>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="secondary" size="sm">
            Small — 32px
          </Button>
          <Button variant="secondary" size="md">
            Medium — 40px
          </Button>
        </div>
      </div>

      <div>
        <Meta as="p" className="mb-3">
          As a link
        </Meta>
        <div className="flex flex-wrap items-center gap-3">
          <ButtonLink href="/#work" variant="secondary">
            Internal route
          </ButtonLink>
          <ButtonLink href="https://github.com/BilalGumus/" variant="ghost" external>
            External
          </ButtonLink>
        </div>
      </div>

      <p className="measure text-caption text-tertiary">
        Every control is at least 32px tall and gains a 2px accent focus ring
        offset from its edge. Try reaching these with Tab rather than the
        pointer — the focus state is designed, not inherited.
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Inputs                                                                    */
/* -------------------------------------------------------------------------- */

const fieldClass =
  "h-10 w-full rounded-sm border bg-surface px-3 text-small text-primary " +
  "transition-colors duration-fast ease-standard placeholder:text-tertiary " +
  "hover:border-primary focus:border-accent";

export function InputSpecimen() {
  const [email, setEmail] = useState("not-an-address");
  const invalid = email.length > 0 && !email.includes("@");

  return (
    <form className="space-y-7" onSubmit={(event) => event.preventDefault()} noValidate>
      <div>
        <label htmlFor="spec-name" className="mb-1.5 block text-small text-primary">
          Name
        </label>
        <input
          id="spec-name"
          name="name"
          type="text"
          placeholder="Ada Lovelace"
          aria-describedby="spec-name-help"
          className={cx(fieldClass, "border-line-control")}
        />
        <p id="spec-name-help" className="mt-1.5 text-caption text-tertiary">
          Help text sits below the control and is wired up with
          aria-describedby.
        </p>
      </div>

      <div>
        <label htmlFor="spec-email" className="mb-1.5 block text-small text-primary">
          Email
        </label>
        <input
          id="spec-email"
          name="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-invalid={invalid}
          aria-describedby={invalid ? "spec-email-error" : undefined}
          className={cx(fieldClass, invalid ? "border-accent" : "border-line-control")}
        />
        {invalid && (
          // Errors are text, not colour. The accent border reinforces it.
          <p
            id="spec-email-error"
            className="mt-1.5 flex items-start gap-1.5 text-caption text-accent"
          >
            <span aria-hidden>▲</span> Needs an @ to be an address.
          </p>
        )}
      </div>

      <div>
        <label htmlFor="spec-note" className="mb-1.5 block text-small text-primary">
          Message
        </label>
        <textarea
          id="spec-note"
          name="note"
          rows={3}
          placeholder="What are you building?"
          className={cx(
            fieldClass,
            "h-auto resize-y border-line-control py-2.5 leading-relaxed",
          )}
        />
      </div>

      <p className="measure text-caption text-tertiary">
        Control borders use a dedicated token at 3.2:1 against the page, which
        is what WCAG 1.4.11 requires of a boundary that identifies a component.
        The decorative hairline used elsewhere would fail that test.
      </p>
    </form>
  );
}

/* -------------------------------------------------------------------------- */
/*  Overlays                                                                  */
/* -------------------------------------------------------------------------- */

export function DialogSpecimen() {
  const ref = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const sync = () => setOpen(false);
    dialog.addEventListener("close", sync);
    return () => dialog.removeEventListener("close", sync);
  }, []);

  const shortcut = useShortcutHint();

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <Button variant="secondary" onClick={() => setOpen(true)}>
          Open dialog
        </Button>
        <Button variant="secondary" onClick={openCommandPalette}>
          Open command palette
          <kbd className="meta ml-1 rounded-xs border border-line px-1 py-0.5 tabular">
            {shortcut}
          </kbd>
        </Button>
      </div>

      <p className="measure text-caption text-tertiary">
        Both are native <code className="font-mono text-[0.8em]">&lt;dialog&gt;</code>{" "}
        elements opened with <code className="font-mono text-[0.8em]">showModal()</code>.
        The focus trap, Escape handling, background inerting and focus
        restoration come from the platform rather than from application code —
        which is why they are correct.
      </p>

      <dialog
        ref={ref}
        onClick={(event) => {
          if (event.target === ref.current) setOpen(false);
        }}
        aria-labelledby="spec-dialog-title"
        className="m-0 w-full max-w-108 bg-transparent p-0 text-primary fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="mx-4 rounded-lg border border-line bg-surface-elevated p-5 shadow-overlay motion-safe:animate-[overlay-in_var(--duration-base)_var(--ease-out)] sm:mx-0 sm:p-6">
          <h2 id="spec-dialog-title" className="text-h2 text-primary">
            Confirm removal
          </h2>
          <p className="mt-2.5 measure text-body text-secondary">
            A destructive action names what it will affect and how many, and the
            confirming button carries the verb rather than the word “OK”.
          </p>
          <div className="mt-6 flex flex-wrap justify-end gap-3">
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setOpen(false)}>
              Remove 3 records
            </Button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Feedback                                                                  */
/* -------------------------------------------------------------------------- */

export function ToastSpecimen() {
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const show = () => {
    if (timer.current) clearTimeout(timer.current);
    setOpen(true);
    timer.current = setTimeout(() => setOpen(false), 4000);
  };

  return (
    <div className="space-y-4">
      <Button variant="secondary" onClick={show}>
        Show toast
      </Button>

      <div className="min-h-20">
        <Toast
          open={open}
          title="Candidate moved to Interview"
          detail="Undo is available for 10 seconds."
          onDismiss={() => setOpen(false)}
        />
      </div>

      <p className="measure text-caption text-tertiary">
        role=&quot;status&quot; rather than role=&quot;alert&quot;: a confirmation should be
        announced without interrupting what is being read. Reserved for results
        that happen away from the pointer — anything confirmable in place is
        confirmed in place.
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Motion                                                                    */
/* -------------------------------------------------------------------------- */

export function MotionSpecimen() {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="space-y-4">
      <Button
        variant="secondary"
        onClick={() => {
          setPlaying(false);
          requestAnimationFrame(() => setPlaying(true));
        }}
      >
        Replay
      </Button>

      <div className="flex flex-wrap gap-3">
        {[
          { label: "instant", ms: 90 },
          { label: "fast", ms: 150 },
          { label: "base", ms: 240 },
          { label: "slow", ms: 420 },
        ].map((step, i) => (
          <div key={step.label} className="w-28">
            <div className="h-16 rounded-sm border border-line bg-surface p-2">
              <div
                className={cx(
                  "h-full w-2 bg-accent transition-transform ease-out",
                  playing ? "translate-x-[calc(6rem-1.5rem)]" : "translate-x-0",
                )}
                style={{
                  transitionDuration: `${step.ms}ms`,
                  transitionDelay: `${i * 60}ms`,
                }}
              />
            </div>
            <Meta as="p" className="mt-2">
              {step.label} · {step.ms}ms
            </Meta>
          </div>
        ))}
      </div>

      <p className="measure text-caption text-tertiary">
        One easing family, four durations. If your system is set to reduce
        motion, every transition on this site collapses to 1ms at the
        stylesheet level — including these.
      </p>
    </div>
  );
}

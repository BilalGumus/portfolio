"use client";

import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { cx } from "./primitives";
import { useTheme } from "./theme";
import { profile, resumeHref } from "@/app/lib/site";
import { projects } from "@/app/lib/work";

/**
 * Command palette.
 *
 * Built on a native <dialog> opened with showModal(). That decision buys the
 * focus trap, Escape handling, the inert background, focus restoration on
 * close and the top-layer stacking from the platform rather than from a few
 * hundred lines of my own - and those are exactly the parts of a modal that
 * are usually subtly wrong.
 *
 * The list implements the ARIA combobox/listbox pattern: focus stays in the
 * input while aria-activedescendant moves the assistive-technology cursor, so
 * typing and navigating never fight over focus.
 */

type Command = {
  id: string;
  label: string;
  /** Extra terms that should match this command but need not be displayed. */
  keywords?: string;
  hint?: string;
  run: () => void;
};

type Group = { id: string; label: string; commands: Command[] };

const EXTERNAL = { target: "_blank", rel: "noopener noreferrer" } as const;

export function CommandPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { toggle: toggleTheme } = useTheme();
  const baseId = useId();

  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const go = useCallback(
    (href: string) => {
      onClose();
      router.push(href);
    },
    [onClose, router],
  );

  const groups = useMemo<Group[]>(() => {
    const navigate: Command[] = [
      {
        id: "work",
        label: "Go to Work",
        keywords: "projects case studies selected",
        run: () => go("/#work"),
      },
      { id: "about", label: "Go to About", keywords: "bio who", run: () => go("/#about") },
      {
        id: "notes",
        label: "Go to Notes",
        keywords: "writing essays articles",
        run: () => go("/notes"),
      },
      {
        id: "contact",
        label: "Go to Contact",
        keywords: "email hire get in touch",
        run: () => go("/#contact"),
      },
      {
        id: "system",
        label: "Go to Design System",
        keywords: "tokens colour typography specimen",
        run: () => go("/system"),
      },
    ];

    const work: Command[] = projects.map((project) => ({
      id: `work-${project.slug}`,
      label: project.name,
      keywords: `${project.category} ${project.tagline} ${project.stack.join(" ")}`,
      hint: project.category,
      run: () => go(`/work/${project.slug}`),
    }));

    // Only offered when there is actually a file to open. Captured locally so
    // the narrowing survives into the closure.
    const resume = resumeHref;
    const resumeAction: Command[] = resume
      ? [
          {
            id: "resume",
            label: "View resume",
            keywords: "cv curriculum vitae",
            run: () => {
              onClose();
              window.open(resume, EXTERNAL.target, "noopener");
            },
          },
        ]
      : [];

    // Built by composition rather than by splicing an array into shape - the
    // list is derived data, so nothing here needs to be mutable.
    const actions: Command[] = [
      {
        id: "theme",
        label: "Toggle theme",
        keywords: "dark light appearance colour mode",
        run: () => {
          toggleTheme();
          onClose();
        },
      },
      {
        id: "email",
        label: "Email me",
        keywords: `contact mail ${profile.email}`,
        hint: profile.email,
        run: () => {
          onClose();
          window.location.href = `mailto:${profile.email}`;
        },
      },
      {
        id: "copy-email",
        label: "Copy email address",
        keywords: "clipboard mail",
        run: () => {
          void navigator.clipboard?.writeText(profile.email);
          onClose();
        },
      },
      {
        id: "github",
        label: "Open GitHub",
        keywords: "code repository source",
        run: () => {
          onClose();
          window.open("https://github.com/BilalGumus/", EXTERNAL.target, "noopener");
        },
      },
    ];

    return [
      { id: "navigate", label: "Navigate", commands: navigate },
      { id: "work-group", label: "Selected work", commands: work },
      {
        id: "actions",
        label: "Actions",
        commands: [actions[0], ...resumeAction, ...actions.slice(1)],
      },
    ];
  }, [go, onClose, toggleTheme]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return groups;
    return groups
      .map((group) => ({
        ...group,
        commands: group.commands.filter((command) =>
          `${command.label} ${command.keywords ?? ""}`.toLowerCase().includes(q),
        ),
      }))
      .filter((group) => group.commands.length > 0);
  }, [groups, query]);

  /** Flattened, because keyboard navigation crosses group boundaries. */
  const flat = useMemo(() => filtered.flatMap((group) => group.commands), [filtered]);

  const optionId = (id: string) => `${baseId}-option-${id}`;
  const activeCommand = flat[active];

  /* --- open / close ------------------------------------------------------ */

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    // Opening and closing the element is an external-system update, so it
    // belongs in an effect. The query and cursor are reset on close instead
    // (see below), which keeps state changes out of this effect body.
    if (open && !dialog.open) {
      dialog.showModal();
      inputRef.current?.focus();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  // Escape and the browser's own dismissal both surface as `close`, so the
  // parent's state is reconciled from the element rather than guessed. Also
  // where the palette is reset, so it always reopens empty.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onNativeClose = () => {
      setQuery("");
      setActive(0);
      onClose();
    };
    dialog.addEventListener("close", onNativeClose);
    return () => dialog.removeEventListener("close", onNativeClose);
  }, [onClose]);

  // Keep the active option in view without moving focus off the input.
  useEffect(() => {
    if (!activeCommand) return;
    const node = document.getElementById(optionId(activeCommand.id));
    node?.scrollIntoView({ block: "nearest" });
    // optionId is derived from a stable useId.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, activeCommand]);

  /* --- keyboard ---------------------------------------------------------- */

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (flat.length === 0 && event.key !== "Escape") return;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActive((i) => (i + 1) % flat.length);
        break;
      case "ArrowUp":
        event.preventDefault();
        setActive((i) => (i - 1 + flat.length) % flat.length);
        break;
      case "Home":
        event.preventDefault();
        setActive(0);
        break;
      case "End":
        event.preventDefault();
        setActive(flat.length - 1);
        break;
      case "Enter":
        event.preventDefault();
        flat[active]?.run();
        break;
      default:
        break;
    }
  };

  /* --- render ------------------------------------------------------------ */

  return (
    <dialog
      ref={dialogRef}
      // The backdrop is part of the dialog's own box, so a click that lands on
      // the element itself rather than the panel is a click outside.
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
      aria-label="Command palette"
      className={cx(
        "m-0 w-full max-w-136 bg-transparent p-0 text-primary backdrop:bg-transparent",
        // Positioned rather than centred: a palette that sits high stays put
        // as the result count changes, instead of drifting up and down.
        "fixed top-[12vh] left-1/2 -translate-x-1/2 sm:top-[16vh]",
      )}
    >
      <div
        className={cx(
          "mx-3 overflow-hidden rounded-lg border border-line bg-surface-elevated shadow-overlay sm:mx-0",
          "motion-safe:animate-[overlay-in_var(--duration-base)_var(--ease-out)]",
        )}
      >
        {/* --- input --- */}
        <div className="flex items-center gap-3 border-b border-line px-4">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="size-4 shrink-0 text-tertiary"
            aria-hidden
          >
            <circle cx="11" cy="11" r="6.5" />
            <path d="m16 16 4 4" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              // The result set changes under the cursor, so the cursor goes
              // back to the top. Handled here rather than in an effect - it is
              // a direct consequence of the keystroke, not derived state.
              setActive(0);
            }}
            onKeyDown={onKeyDown}
            type="text"
            role="combobox"
            aria-expanded
            aria-controls={`${baseId}-list`}
            aria-autocomplete="list"
            aria-activedescendant={activeCommand ? optionId(activeCommand.id) : undefined}
            aria-label="Search commands"
            placeholder="Search commands…"
            autoComplete="off"
            spellCheck={false}
            className="h-12 w-full bg-transparent text-small text-primary outline-none placeholder:text-tertiary"
          />
          <kbd className="meta shrink-0 rounded-xs border border-line px-1.5 py-0.5 text-tertiary">
            Esc
          </kbd>
        </div>

        {/* --- results --- */}
        <div ref={listRef} className="max-h-[min(24rem,52vh)] overflow-y-auto overscroll-contain p-1.5">
          <div id={`${baseId}-list`} role="listbox" aria-label="Commands">
            {filtered.map((group) => (
              <div key={group.id} role="group" aria-labelledby={`${baseId}-${group.id}`}>
                <div
                  id={`${baseId}-${group.id}`}
                  role="presentation"
                  className="meta px-2.5 pt-3 pb-1.5 text-tertiary"
                >
                  {group.label}
                </div>
                {group.commands.map((command) => {
                  const index = flat.indexOf(command);
                  const isActive = index === active;
                  return (
                    <div
                      key={command.id}
                      id={optionId(command.id)}
                      role="option"
                      aria-selected={isActive}
                      // Pointer selection mirrors the keyboard cursor so the
                      // two never disagree about what Enter would run.
                      onMouseMove={() => index !== active && setActive(index)}
                      onClick={command.run}
                      className={cx(
                        "flex cursor-pointer items-center justify-between gap-3 rounded-sm px-2.5 py-2 text-small",
                        isActive ? "bg-accent-wash text-primary" : "text-secondary",
                      )}
                    >
                      <span className="flex min-w-0 items-center gap-2.5">
                        <span
                          aria-hidden
                          className={cx(
                            "h-3.5 w-px shrink-0 transition-colors duration-fast",
                            isActive ? "bg-accent" : "bg-transparent",
                          )}
                        />
                        <span className="truncate">{command.label}</span>
                      </span>
                      {command.hint && (
                        <span className="meta shrink-0 truncate text-tertiary">
                          {command.hint}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}

            {flat.length === 0 && (
              <p className="px-2.5 py-8 text-center text-small text-tertiary">
                No commands match “{query}”.
              </p>
            )}
          </div>
        </div>

        {/* --- footer --- */}
        <div className="flex items-center justify-between gap-4 border-t border-line bg-surface px-4 py-2.5">
          <p className="meta text-tertiary">
            {flat.length} {flat.length === 1 ? "command" : "commands"}
          </p>
          <p className="meta flex items-center gap-3 text-tertiary">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
          </p>
        </div>
      </div>

      {/* Result counts are announced without stealing focus from the input. */}
      <p aria-live="polite" className="sr-only">
        {flat.length} {flat.length === 1 ? "command" : "commands"} available
      </p>
    </dialog>
  );
}

/**
 * Reports the keyboard hint for this platform, complete: "⌘K" or "Ctrl K".
 * The whole label rather than the modifier alone, because the two need
 * different spacing - the Apple glyph sits tight against the key, a word does
 * not - and callers should not have to know that.
 *
 * The platform is a read-only external value, so it is read through
 * useSyncExternalStore with a subscription that never fires, rather than being
 * copied into state by an effect. The server snapshot is the Apple form, so
 * hydration agrees; the real value is substituted immediately afterwards.
 */
const subscribeToNothing = () => () => {};
const readShortcut = () =>
  /mac|iphone|ipad|ipod/i.test(navigator.userAgent) ? "⌘K" : "Ctrl K";
const shortcutServerSnapshot = () => "⌘K";

export function useShortcutHint() {
  return useSyncExternalStore(
    subscribeToNothing,
    readShortcut,
    shortcutServerSnapshot,
  );
}

/**
 * Event any component can dispatch to open the palette, so a trigger does not
 * have to be a descendant of the component that owns the open state.
 */
export const OPEN_PALETTE_EVENT = "portfolio:open-palette";

export function openCommandPalette() {
  window.dispatchEvent(new CustomEvent(OPEN_PALETTE_EVENT));
}

/** Owns the open state, the global ⌘K / Ctrl+K binding, and the open event. */
export function useCommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    const onOpenRequest = () => setOpen(true);

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener(OPEN_PALETTE_EVENT, onOpenRequest);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(OPEN_PALETTE_EVENT, onOpenRequest);
    };
  }, []);

  const close = useCallback(() => setOpen(false), []);
  const show = useCallback(() => setOpen(true), []);

  return { open, close, show };
}

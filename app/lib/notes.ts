/**
 * Notes.
 *
 * Short written pieces. These are positions, not articles - the point of the
 * section is to show how the thinking sounds when it is not attached to a
 * deliverable. Each note is a real argument with a real conclusion.
 */

export type Note = {
  slug: string;
  index: string;
  title: string;
  /** ISO date. Rendered with a <time> element. */
  date: string;
  readingMinutes: number;
  summary: string;
  /** Paragraphs. A string beginning with "> " renders as a pull quote. */
  body: string[];
};

export const notes: Note[] = [
  {
    slug: "the-grid-is-for-you",
    index: "01",
    title: "The grid is for you, not for the reader",
    date: "2026-07-18",
    readingMinutes: 3,
    summary:
      "Nobody notices a grid. That is not an argument against having one - it is the entire argument for it.",
    body: [
      "Every so often someone points out that users do not perceive a twelve-column grid, and offers this as evidence that grid discipline is designer self-indulgence. The observation is correct and the conclusion is backwards.",
      "A grid is not a thing the reader sees. It is a thing that removes a category of decision from the person making the layout. Without one, every element's position is an open question answered by taste, at the moment of placement, under time pressure - and taste applied a hundred separate times does not converge. It drifts. Six pixels here, eight there, and the accumulated result is a page that feels slightly unresolved for reasons nobody can point at.",
      "> What the reader perceives is not the grid. It is the absence of noise the grid prevented.",
      "This is why the grid belongs to the maker. It converts a hundred small judgements into one decision made once, deliberately, while you still have the attention to make it well. The payoff is not that the layout is mathematically correct; it is that you get to spend your remaining attention on the things that actually need judgement - the optical adjustment on a large heading, the one element that should deliberately break alignment.",
      "Which is the other half of it: you cannot break a rule you never set. An element that sits outside the grid reads as intentional only when everything around it clearly is not. Asymmetry needs a structure to be asymmetric against, or it is just a mess with good intentions.",
      "On this site I drew the column boundaries as faint hairlines above 1024px. That is a deliberate exception to my own position - the grid is normally invisible and should be. Here the subject is the system itself, so showing the instrument is part of the argument. Everywhere else, the right amount of grid to show the reader is none of it.",
    ],
  },
  {
    slug: "tokens-are-a-naming-problem",
    index: "02",
    title: "Tokens are a naming problem",
    date: "2026-05-02",
    readingMinutes: 4,
    summary:
      "The hard part of a design system was never the values. It is that gray-600 tells you nothing about whether you may use it.",
    body: [
      "The first version of every design system is a palette with numbers on it. gray-100 through gray-900, blue-500, a set of spacing steps. It feels like a system because it is organised, and it fails for a reason that takes about six months to become obvious.",
      "gray-600 answers the question what colour is this. It does not answer the only question that matters at the moment of use: am I allowed to put this here. So the decision falls back to the person writing the component, who picks the grey that looks right, which is a different grey from the one the last person picked for the same purpose. The palette was consistent; the product is not.",
      "> A scale is a set of values. A system is a set of permissions.",
      "Semantic naming fixes this by making the token describe its role instead of its appearance. text-secondary, surface-elevated, border-control. Now the name carries the intent, and two people reaching for body prose in different components arrive at the same token because they were asking the same question.",
      "It also relocates the design decisions to where they can be reasoned about. When a token is called border-control you can state a rule about it - this one is used for interactive boundaries, so it must clear 3:1 against every background it appears on - and then verify it. You cannot state that rule about gray-400, because gray-400 has no purpose to be measured against.",
      "The second-order benefit is the one I did not expect. Once tokens are roles, they can resolve per theme rather than be selected per theme. The component asks for text-secondary and the cascade decides what that means in the current context. There is no dark-mode branch in the markup at all, because no component knows which theme it is in - and an entire class of bug, the one where light mode was updated and dark mode was not, simply has nowhere to live.",
      "So the rule I keep: if a component needs a value the system does not have, the system is missing a token. Do not write the value into the component. Decide it once, name it for what it does, and let everything downstream inherit the decision.",
    ],
  },
  {
    slug: "focus-order-is-a-deliverable",
    index: "03",
    title: "Focus order is a deliverable",
    date: "2026-03-11",
    readingMinutes: 3,
    summary:
      "Nobody signs off on tab order, so it is decided by DOM accident. It is a design decision either way.",
    body: [
      "Interface reviews cover states, spacing, copy, empty cases, and increasingly motion. They almost never cover the order in which the keyboard reaches things. So that order gets decided by whatever sequence the markup happened to end up in - which is to say, by a build artefact.",
      "This is a strange gap, because focus order is a sequence through an interface, and sequencing is unambiguously design work. It is the same skill as deciding what someone reads first. We just do not draw it, so it does not get reviewed.",
      "> If a flow has a designed reading order and an accidental focus order, one of the two is wrong.",
      "The failures are specific and predictable. A dialog opens and focus stays on the page behind it. A filter panel puts the reset button before the filters. A record row exposes six actions to the keyboard before the one action that is the point of the row. Closing a modal drops focus back to the top of the document, so clearing a queue of ten items means ten trips back down. Each of these is a layout decision that nobody made.",
      "The fix is not technical, and mostly it is not aria. It is deciding the sequence at the same time as the layout, and writing it down: what receives focus when this opens, where focus goes when it closes, what the order is through this group, and what happens to focus when the item that holds it disappears. That last one is the one that gets missed, and it is the one that makes a list feel either professional or broken.",
      "The reward is disproportionate. An interface with deliberate focus order is faster for the people who use it every day, usable for people who cannot use a pointer, and - this is the part that surprises teams - noticeably more finished-feeling to everyone else, because tab order and reading order agreeing is something people register without being able to name.",
    ],
  },
  {
    slug: "motion-should-report",
    index: "04",
    title: "Motion should report, not perform",
    date: "2026-01-24",
    readingMinutes: 3,
    summary:
      "A useful test: if the animation were removed, would anything become harder to understand? Usually not.",
    body: [
      "Motion is the easiest thing in an interface to add and the hardest to justify. It is immediately impressive in a review and immediately tiresome in daily use, and those two facts are usually discovered in that order.",
      "The test I apply is narrow: remove the animation and ask whether anything became harder to understand. If the answer is no, the animation was decoration. That eliminates most of what gets built - the staggered reveal on a marketing section, the counter that ticks up, the element that slides in because sliding in is what elements do now.",
      "> Motion earns its place by explaining a change of state. Everything else is a cost paid by whoever uses the thing more than once.",
      "What survives the test is a short list. Something appearing or leaving, where the movement shows where it came from and where it went. Something moving between two positions, where the path is the explanation. A change too small to notice, where a brief highlight is the only thing that will make it register. In each case the motion is carrying information that would otherwise be missing.",
      "It follows that duration should be set by legibility rather than by feel. Long enough that the relationship is perceptible, short enough that the interface does not make you wait for it - which in practice means most of it belongs between 120 and 250 milliseconds, and anything past 400 needs to argue for itself.",
      "And it has to be optional. prefers-reduced-motion is not an accessibility checkbox; it is a real request from people for whom animation causes real discomfort. Honouring it globally - collapsing every transition at the stylesheet level rather than remembering it in each component - takes one media query and means you cannot forget.",
      "The entrance animations on this site do not pass my own test. They are decoration, and I kept them, because a portfolio is partly a demonstration of craft and a still page demonstrates less. That is a defensible reason but it is not a functional one, and it is worth being clear about which of the two you are working from.",
    ],
  },
];

export const noteBySlug = (slug: string): Note | undefined =>
  notes.find((n) => n.slug === slug);

export const noteSlugs = notes.map((n) => n.slug);

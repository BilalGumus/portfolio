/**
 * Selected work.
 *
 * Four real projects, ordered newest first. Array order is display order and
 * the `index` values follow it, so adding a project means inserting it at the
 * right point by date and renumbering from there.
 *
 * No invented clients, no invented metrics.
 *
 * The landing page renders the summary fields. The `sections` below are a
 * thirteen-part write-up per project, kept for the detail pages in
 * `app/_deferred/work` - they are not linked from the landing page yet.
 *
 * Sections describe decisions that are verifiable from the product or the
 * repository. Sections that would require research notes or business numbers
 * carry a `gap` instead, which renders as a visibly unfinished slot: a blank
 * is honest, a fabricated statistic is not.
 */

export type PlateVariant = "burn" | "system" | "compare" | "field";

export type SectionList = { term: string; detail: string };

export type Annotation = {
  label: string;
  text: string;
};

export type CaseSection = {
  id: string;
  title: string;
  body?: string[];
  list?: SectionList[];
  annotation?: Annotation;
  /** What the owner still needs to supply. Rendered as a marked placeholder. */
  gap?: string;
};

export type Project = {
  slug: string;
  index: string;
  name: string;
  tagline: string;
  /** One-line summary used on the index. */
  description: string;
  role: string;
  year: string;
  category: string;
  stack: string[];
  plate: PlateVariant;
  /** Live product. Omitted when there is nothing public to visit. */
  href?: string;
  repo?: string;
  /** Null renders a marked placeholder rather than a plausible number. */
  outcome: string | null;
  sections: CaseSection[];
};

/* -------------------------------------------------------------------------- */

export const projects: Project[] = [
  {
    slug: "burnmeter",
    index: "01",
    name: "Burnmeter",
    tagline: "Every meeting has a price. Now you can see it.",
    description:
      "Prices calendar invitations from real salary data and runs a live cost counter during the call, so a recurring meeting can be argued about with a number attached.",
    role: "Design & engineering",
    /** TODO: correct the year if the project started before 2026. */
    year: "2026",
    category: "SaaS product",
    /**
     * TODO: extend with the actual stack. Only the integrations are verifiable
     * from the public site, so only those are listed here.
     */
    stack: ["Chrome Extension", "Google Calendar API", "Microsoft Graph"],
    href: "https://burnmeter.app",
    plate: "burn",
    outcome: null,
    sections: [
      {
        id: "01",
        title: "Overview",
        body: [
          "Burnmeter puts a price on meetings. It reads a team's salary data, costs every calendar invitation from the people actually in it, and shows a running total while the call is happening.",
          "It connects to Google Calendar and Outlook for the invitations, and to Google Meet and Teams for who genuinely attended - because the cost of a meeting is the people in the room, not the people on the invite.",
        ],
      },
      {
        id: "02",
        title: "Context",
        body: [
          "Meeting load is one of the few large, recurring costs in a company that nobody has a figure for. Everyone has an opinion about the weekly sync; nobody can say what it costs per year.",
          "Salary data also gives the product an unusually sharp privacy edge. It is the most sensitive data an employer holds, and a tool that surfaces per-person costs can very easily become a tool for pointing at people.",
        ],
        annotation: {
          label: "Constraint",
          text: "Salary data raises the stakes on every design decision. The product has to make meetings accountable without making individuals exposed.",
        },
      },
      {
        id: "03",
        title: "Problem",
        list: [
          {
            term: "Cost is invisible at the decision point",
            detail:
              "The moment a recurring meeting gets created is the moment its cost should be visible - not in a report a quarter later.",
          },
          {
            term: "Invited is not attended",
            detail:
              "Costing an invitation over-counts. The real figure needs verified attendance from the conferencing platform.",
          },
          {
            term: "A number invites blame",
            detail:
              "Per-attendee costs are necessary for the arithmetic and dangerous as a headline. The framing has to stay on the meeting.",
          },
        ],
      },
      {
        id: "04",
        title: "Research",
        gap: "Summarise what you learned from early users - which meetings they went looking for first, and whether the live counter changed behaviour or just got noticed.",
      },
      {
        id: "05",
        title: "Strategy",
        body: [
          "Put the number where the decision is. The extension shows cost inside the calendar, at the point where a meeting is created or accepted, and the live counter shows it accruing while the call runs. Both are the same figure, in the two places it can actually change someone's mind.",
          "Then keep the unit of judgement the meeting, not the person. Per-attendee numbers exist because the calculation needs them, but the interface leads with the meeting, the series, and the team budget.",
        ],
      },
      {
        id: "06",
        title: "Architecture",
        list: [
          {
            term: "Calendar sync",
            detail:
              "Google Calendar and Outlook, pulling events and attendees over a persistent connection for Pro accounts.",
          },
          {
            term: "Attendance",
            detail:
              "Verified participation from Google Meet and Microsoft Teams, so cost is based on who was actually there.",
          },
          {
            term: "Cost model",
            detail:
              "Salary data mapped to an hourly rate per person, applied to verified attendance for the duration of the event.",
          },
          {
            term: "Extension",
            detail:
              "Cost surfaced in the calendar interface, and as a live counter during a Meet call.",
          },
          {
            term: "Free calculator",
            detail:
              "A standalone tool needing no account, so the core idea can be tried before anything is connected.",
          },
        ],
      },
      {
        id: "07",
        title: "Interaction design",
        body: [
          "The live counter is the whole argument in one element: a number that goes up while you sit there. It has to be legible at a glance inside a video call and easy to ignore once seen, which rules out anything that animates continuously or demands attention.",
          "Everything else is retrospective and calm: series totals, monthly budget alerts per team, and recommendations about which meetings to cut.",
        ],
        list: [
          {
            term: "Cost before commitment",
            detail:
              "The figure appears while the invitation is still being written, which is the only point at which acting on it is cheap.",
          },
          {
            term: "Recommendations are suggestions",
            detail:
              "The generated cut-list is a draft with its reasoning attached, not a verdict - the same rule as any other model output in a product with consequences.",
          },
          {
            term: "Free path first",
            detail:
              "The calculator works with no account and no connection, so nobody has to hand over salary data to find out whether the idea is useful.",
          },
        ],
      },
      {
        id: "08",
        title: "Visual system",
        body: [
          "Money has to be unambiguous, so figures are set large, in tabular numerals, with the currency and the period always attached. A number with no unit is the fastest way to lose trust in a costing tool.",
          "The accent is reserved for the running total and for budget breaches. Everything else stays neutral, because a dashboard where several things are urgent has nothing urgent in it.",
        ],
      },
      {
        id: "09",
        title: "Injected UI",
        body: [
          "The extension renders inside Google Calendar and Google Meet - pages whose markup and CSS it does not control, and which change without notice. The overlay is style-isolated and degrades to nothing rather than breaking the host page.",
        ],
        annotation: {
          label: "Detail",
          text: "An extension that breaks someone's calendar is worse than one that shows no number. Fail invisible.",
        },
      },
      {
        id: "10",
        title: "Prototype",
        gap: "Add a short recording of the live counter during a call, and of the cost appearing on an invitation in the calendar.",
      },
      {
        id: "11",
        title: "Implementation",
        gap: "Fill in the stack and the hosting model. Worth covering how salary data is stored and scoped, since that is the question every prospective customer asks first.",
      },
      {
        id: "12",
        title: "Outcome",
        gap: "Add whichever figures you can share - accounts, connected calendars, or meeting hours actually cut. Leave blank rather than estimating.",
      },
      {
        id: "13",
        title: "Learnings",
        gap: "Worth writing once the product has been in front of teams for a while: whether a visible number changes meeting behaviour, or whether people simply get used to it.",
      },
    ],
  },

  {
    slug: "netuygun-tariff-comparison",
    index: "02",
    name: "Netuygun",
    tagline: "Comparing 300+ internet tariffs with real price history",
    description:
      "Scheduled scrapers collect Turkish provider tariffs into an append-only price history, so a plan can be judged over its term rather than at its headline rate.",
    role: "Design & engineering",
    year: "2024",
    category: "Data aggregation",
    stack: ["Next.js", "TypeScript", "Puppeteer"],
    href: "https://netuygun.bilalgumus.net/",
    plate: "compare",
    outcome: null,
    sections: [
      {
        id: "01",
        title: "Overview",
        body: [
          "Netuygun collects internet tariffs from Turkish providers into one place and keeps their price history, so you can see what a plan actually costs across its commitment rather than what it costs in its first month.",
          "It started because I wanted to change provider and could not answer a simple question without opening nine tabs.",
        ],
      },
      {
        id: "02",
        title: "Context",
        body: [
          "Provider pricing is built to resist comparison. Promotional rates expire, commitment lengths differ, setup fees are disclosed at different depths, and the same package is named differently by each vendor.",
        ],
      },
      {
        id: "03",
        title: "Problem",
        list: [
          {
            term: "The headline price is misleading",
            detail:
              "The number every provider leads with is the one that changes. The comparable figure has to be derived.",
          },
          {
            term: "Volatile sources",
            detail:
              "Prices and page structures change without notice, so collection has to tolerate individual failures.",
          },
          {
            term: "Comparison on one column",
            detail:
              "Three hundred tariffs and six meaningful attributes on a 390px screen, without a horizontal scroll.",
          },
        ],
      },
      {
        id: "04",
        title: "Research",
        body: [
          "The useful finding came out of the data rather than from users: once several months of history had accumulated, the cheapest headline rate was frequently not the cheapest plan over its own commitment period. That gap is why the site exists, so the derived figure became the primary one.",
        ],
      },
      {
        id: "05",
        title: "Strategy",
        body: [
          "Store observations, never current prices. Each scrape appends a dated price point, which means the effective-cost calculation can be re-derived when the rules change without losing the record - and the history itself becomes the asset.",
          "Then lead with the derived number. Effective monthly cost across the full commitment is set largest; the headline rate is secondary context, because people arrive looking for it.",
        ],
        annotation: {
          label: "Decision",
          text: "Append observations, never overwrite. It made the history a feature instead of a side effect.",
        },
      },
      {
        id: "06",
        title: "Data model",
        list: [
          {
            term: "Provider",
            detail: "Grouping and attribution, plus the source URL for every figure.",
          },
          {
            term: "Tariff",
            detail: "Speed, commitment length, fees, and the identity that survives a price change.",
          },
          {
            term: "Price point",
            detail: "A dated observation of one tariff. Append-only; the real asset.",
          },
        ],
      },
      {
        id: "07",
        title: "Collection",
        body: [
          "Puppeteer scrapers run on a schedule, one per provider, each independently tolerant of failure so one site changing its markup does not take the dataset down.",
          "Every figure keeps the URL and timestamp it came from. An observation older than the refresh window is labelled stale rather than quietly presented as current.",
        ],
      },
      {
        id: "08",
        title: "Interface",
        body: [
          "Filtering is the whole interaction, so it is immediate and reversible: speed, commitment and provider narrow the set as you touch them, with active filters visible as removable items and the result count updating live.",
          "Figures are set in tabular numerals so columns of prices align and scan vertically, and price history is a small inline sparkline - the smallest mark that answers whether a price is rising, falling or flat.",
        ],
      },
      {
        id: "09",
        title: "Components",
        body: [
          "Five: filter control, record row, sparkline, source link, staleness badge. Each used everywhere.",
        ],
      },
      {
        id: "10",
        title: "Prototype",
        body: [
          "Built against real scraped data from the start, because the layout question was entirely about how the worst real records behave - the provider with a forty-character package name and three footnotes.",
        ],
      },
      {
        id: "11",
        title: "Implementation",
        body: [
          "Next.js for the site, Puppeteer for collection, scheduled runs writing dated observations. Designed at 390px and widened, so the desktop layout is the mobile one with more air rather than a table that folded.",
        ],
      },
      {
        id: "12",
        title: "Outcome",
        gap: "Add traffic or usage if you want it here. There is no business metric - it is a personal project, and saying so is better than inventing one.",
      },
      {
        id: "13",
        title: "Learnings",
        body: [
          "The append-only decision was the one that mattered. Everything interesting about the site - trends, staleness, re-derived costs - only exists because nothing was ever overwritten.",
          "Designing the one-column layout first produced a better desktop layout than starting wide would have. The constraint did the editing.",
        ],
      },
    ],
  },

  {
    slug: "turkey-hks-scraper",
    index: "03",
    name: "HKS Scraper",
    tagline: "A desktop app that wraps a scraper in a real interface",
    description:
      "Puppeteer behind a native desktop UI, so extracting a dataset does not mean writing a one-off script and babysitting it in a terminal.",
    role: "Design & engineering",
    year: "2023",
    category: "Desktop application",
    stack: ["Tauri", "React", "Node.js", "Puppeteer"],
    repo: "https://github.com/BilalGumus/turkey-hks-scraper",
    plate: "system",
    outcome:
      "Ships as a single desktop binary; a run that was a bespoke script became a form and a progress view.",
    sections: [
      {
        id: "01",
        title: "Overview",
        body: [
          "A desktop application for extracting structured data from a public records site. Puppeteer does the work; the app gives it a configuration form, a live progress view, and an export - so a run does not require editing a script.",
        ],
      },
      {
        id: "02",
        title: "Context",
        body: [
          "Every scraping task I had written before this ended up as a throwaway file with hard-coded selectors and parameters, run from a terminal, producing a CSV somewhere. Repeating it a month later meant reading my own code again to remember what the arguments were.",
        ],
      },
      {
        id: "03",
        title: "Problem",
        list: [
          {
            term: "Long-running and opaque",
            detail:
              "A scrape takes minutes and can fail at record four hundred. Without progress it is indistinguishable from a hang.",
          },
          {
            term: "Partial results are valuable",
            detail:
              "Losing four hundred good records because the four hundred and first failed is the wrong behaviour.",
          },
          {
            term: "Distribution",
            detail:
              "It had to run for someone who does not have Node installed and should not have to.",
          },
        ],
      },
      {
        id: "04",
        title: "Research",
        gap: "No user research - a personal tool. Stated rather than filled with a plausible study.",
      },
      {
        id: "05",
        title: "Strategy",
        body: [
          "Make the run inspectable and resumable. Stream every record to the UI as it lands and append to the output as it goes, so the result on disk is always valid and progress is always visible.",
          "Then package it as a desktop binary rather than a script, because the whole point was to stop needing a development environment to run it.",
        ],
        annotation: {
          label: "Decision",
          text: "Tauri over Electron: the binary is a fraction of the size, and the app is a form and a table - it does not need a bundled browser for its own UI.",
        },
      },
      {
        id: "06",
        title: "Architecture",
        list: [
          {
            term: "Tauri shell",
            detail: "Native window, filesystem access, and packaging into one binary.",
          },
          {
            term: "React UI",
            detail: "Configuration form, live record table, progress and error log.",
          },
          {
            term: "Puppeteer worker",
            detail:
              "Drives a headless browser, emits one event per record rather than returning a batch at the end.",
          },
        ],
      },
      {
        id: "07",
        title: "Interface",
        body: [
          "One screen: what to fetch, what has arrived, and what went wrong. Records stream into a table as they are extracted, so the app is legible at any point during a run.",
          "Errors are per record and non-fatal. A failed row is logged with its reason and the run continues, because one malformed page should not discard the rest.",
        ],
      },
      {
        id: "08",
        title: "Visual system",
        body: [
          "Dense tabular data with almost no chrome: hairline rules, tabular figures so columns of numbers align, and one accent used only for errors.",
        ],
      },
      {
        id: "09",
        title: "Components",
        body: [
          "Four: the configuration form, the streaming table, the progress bar, and the error log. Small enough that a design system would have been overhead - worth noting, because knowing when not to build one is part of the skill.",
        ],
      },
      {
        id: "10",
        title: "Prototype",
        body: [
          "The first version was the Puppeteer script it replaced. The app grew around it once it was clear the script was correct and the ergonomics were the actual problem.",
        ],
      },
      {
        id: "11",
        title: "Implementation",
        body: [
          "Tauri for the shell and packaging, React for the interface, Node and Puppeteer for extraction. Output is appended as the run proceeds rather than written once at the end, so a crash costs the current record and nothing else.",
        ],
      },
      {
        id: "12",
        title: "Outcome",
        body: [
          "It ships as one desktop binary and a run is now a form plus a progress view. That was the entire goal; there is no business metric to report, and saying so is better than inventing one.",
        ],
      },
      {
        id: "13",
        title: "Learnings",
        body: [
          "Streaming results changed the tool more than any feature did. Once a run is visible while it happens, you stop writing defensive logging to find out what it is doing.",
          "Append-as-you-go is the cheapest possible resilience. It cost a few lines and removed the worst failure mode entirely.",
        ],
      },
    ],
  },

  {
    slug: "browser-face-authentication",
    index: "04",
    name: "Face Auth",
    tagline: "On-device facial recognition, no server round trip",
    description:
      "An experiment in browser-side biometrics: the camera stream, the descriptor extraction and the match all happen locally, and nothing is transmitted.",
    role: "Design & engineering",
    year: "2023",
    category: "Browser experiment",
    stack: ["React", "face-api.js", "WebRTC"],
    repo: "https://github.com/BilalGumus/react-face-auth",
    plate: "field",
    outcome:
      "Fully client-side - no image or descriptor leaves the device. Built as an experiment, and it concluded against using this for real accounts.",
    sections: [
      {
        id: "01",
        title: "Overview",
        body: [
          "Sign in with your face, entirely in the browser. The video stream, the descriptor extraction and the comparison all run on the device; there is no backend.",
          "The recognition is a library call. The interesting part was building an interface for something probabilistic that asks for camera access in its first two seconds.",
        ],
      },
      {
        id: "02",
        title: "Context",
        body: [
          "Biometric interfaces on the web carry an unusual burden. A password field is understood; a request for your camera in order to identify you is not, and the browser's own permission prompt arrives before the page has had a chance to explain itself.",
        ],
      },
      {
        id: "03",
        title: "Problem",
        list: [
          {
            term: "Consent before the prompt",
            detail:
              "The page has to say what happens to the video before the browser asks for the camera, not after.",
          },
          {
            term: "Probabilistic outcomes",
            detail: "Recognition returns a distance, not a yes. Near-misses need a state of their own.",
          },
          {
            term: "Model weights are large",
            detail:
              "They take real time to load, and a generic spinner next to a live camera light reads as a hang.",
          },
        ],
      },
      {
        id: "04",
        title: "Research",
        gap: "No user testing - a personal experiment. Stated rather than filled with a plausible study.",
      },
      {
        id: "05",
        title: "Strategy",
        body: [
          "Make the privacy claim structural rather than stated. With no backend, the property comes from the architecture, and the network panel is the proof - which is the only kind of privacy claim worth making.",
          "Then design the uncertainty honestly: three outcomes, not two. Matched, not matched, and not sure - with the last offering a retry rather than a refusal.",
        ],
        annotation: {
          label: "Position",
          text: "Explain, then ask. A browser permission prompt is not the place to introduce yourself.",
        },
      },
      {
        id: "06",
        title: "Architecture",
        list: [
          {
            term: "Enrolment",
            detail:
              "Capture a reference descriptor. Stored in local storage, deletable in one confirmed action.",
          },
          {
            term: "Attempt",
            detail: "A live frame compared against the reference. Never persisted.",
          },
          {
            term: "Result",
            detail: "Matched, not matched, or uncertain, with the distance shown.",
          },
        ],
      },
      {
        id: "07",
        title: "Interface",
        body: [
          "Loading is described rather than spun: the model weights report what is being fetched, because a silent delay with the camera on is alarming in a way a labelled one is not.",
          "The detection overlay tracks the face continuously, so the system's view is always visible. When it cannot see a face it says so, which turns a failure into an instruction - move into the light, come closer.",
        ],
        list: [
          {
            term: "Camera state is explicit",
            detail:
              "Whether the stream is live is shown in the interface, not left to the hardware indicator.",
          },
          {
            term: "Uncertain is a real outcome",
            detail:
              "Between the thresholds the interface says it is unsure and offers another attempt.",
          },
          {
            term: "Deletion is immediate",
            detail:
              "One confirmed action removes the stored descriptor, with no recovery path - because there should not be one.",
          },
        ],
      },
      {
        id: "08",
        title: "Visual system",
        body: [
          "The camera feed is the interface, so there is almost no chrome: a hairline frame, a mono status line, and one accent used only for the detection box.",
          "That box is the most important element on the screen. It is the system showing you what it sees, which is what makes the whole thing feel inspectable rather than magical.",
        ],
      },
      {
        id: "09",
        title: "Components",
        body: [
          "Three: the camera surface with its overlay, a status line, and a destructive confirmation.",
        ],
      },
      {
        id: "10",
        title: "Prototype",
        body: [
          "The prototype was the product. Thresholds, frame rate and the feel of the detection box can only be judged live, on a real camera, in bad lighting.",
        ],
      },
      {
        id: "11",
        title: "Implementation",
        body: [
          "React with face-api.js in the browser. Model weights are served as static assets, the stream comes from getUserMedia and is never recorded, descriptors stay in local storage. No server, which is the point.",
        ],
      },
      {
        id: "12",
        title: "Outcome",
        body: [
          "It works on-device with nothing transmitted - and it made clear why browser face authentication is a bad idea for real accounts. A photograph defeats it. The honest conclusion of an experiment is allowed to be negative.",
        ],
      },
      {
        id: "13",
        title: "Learnings",
        body: [
          "Showing the system's own view - the detection box, the live distance - did more for trust than any amount of copy about privacy.",
          "Designing the uncertain state first improved the other two. Once the middle case has somewhere to go, the thresholds stop being a compromise.",
        ],
      },
    ],
  },
];

export const projectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);

export const projectSlugs = projects.map((p) => p.slug);

/** Adjacent-project navigation, used by the deferred detail pages. */
export function projectNeighbours(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) return { prev: undefined, next: undefined };
  return {
    prev: i > 0 ? projects[i - 1] : undefined,
    next: i < projects.length - 1 ? projects[i + 1] : undefined,
  };
}

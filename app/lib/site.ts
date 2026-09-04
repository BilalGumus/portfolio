/**
 * Site content.
 *
 * Everything the landing page renders comes from this file. Nothing here is
 * invented: the roles, dates, schools and links are the real record. Anywhere
 * a claim would need information only Bilal has - a metric, a business
 * outcome - the content carries an explicit placeholder instead of a
 * plausible-sounding number.
 *
 * Search for TODO to find every decision left to the owner.
 */

export const profile = {
  name: "Bilal Gümüş",
  role: "Computer Engineer",
  shortRole: "Full Stack Developer",
  location: "Kastamonu, TR",
  timezone: "UTC+03",
  email: "bilal.gumus@yahoo.com",
  avatar: "/images/me_filter.png",
  since: "2021",

  /** TODO: confirm before publishing - this states availability publicly. */
  status: {
    available: true,
    label: "Available for selected projects",
  },

  /** Hero. Who I am, what I do, how I work - in that order. */
  display: "I build web applications, from the schema to the screen.",
  lead: "Computer engineer and full stack developer. I build web products end to end - the data model, the API, and the interface people actually use.",
  support:
    "I work across the whole stack because most of the interesting problems live at the seams: the query that turns out to be the bottleneck, the permission check that has to hold in four places, the state that two clients disagree about.",

  about: [
    "I am a computer engineer who builds web products end to end - data model, API, and the interface people actually click. Mostly TypeScript: Next.js and React on the front, Node services and PostgreSQL behind them, with detours into Vue, Tauri and whatever else a problem calls for.",
    "Most of my time goes to an applicant tracking system: multi-tenant data modelling, role-based access control, hiring pipelines, AI-assisted screening, and a browser extension that assembles candidate profiles from public sources. It is a dense, permission-heavy product, which is the kind that punishes you for shortcuts.",
    "Before that I built WebRTC video calling into a live-classroom product, real-time spreadsheet sync over sockets, and a SCADA integration for a motorway tunnel. Different domains, same lesson: the hard part is rarely the feature, it is everything the feature touches.",
    "Side projects are how I stay current with tools I do not reach for at work. They are usually something I wanted to exist and could not find.",
  ],

  /**
   * How I work. Four positions, each one argued rather than asserted, and
   * each one arrived at from having got it wrong first.
   */
  principles: [
    {
      id: "01",
      title: "Model the data before the screens",
      body: "Almost every interface problem I have had to unpick later started as a data-modelling shortcut. Get the entities and their relationships right and the screens mostly fall out; get them wrong and you spend a year papering over it in the UI.",
    },
    {
      id: "02",
      title: "Correctness belongs on the server",
      body: "Client-side validation is a courtesy to the user. Permissions, invariants and money are enforced where they cannot be bypassed, and mirrored in the type layer so the mistake is caught at compile time rather than in production.",
    },
    {
      id: "03",
      title: "Boring, until it needs not to be",
      body: "Default to the obvious solution and the standard library. Reach for the clever one only when there is a measurement saying the obvious one is too slow - which is much less often than it feels.",
    },
    {
      id: "04",
      title: "Code is read far more than written",
      body: "The next person to open the file is often me, six months later, with no context. Naming, boundaries and a short comment explaining why - not what - cost minutes now and save hours then.",
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/*  Navigation                                                                */
/*  Single page, so every item is an in-page anchor.                          */
/* -------------------------------------------------------------------------- */

export type NavItem = { label: string; href: string; section: string };

export const nav: NavItem[] = [
  { label: "Work", href: "#work", section: "work" },
  { label: "About", href: "#about", section: "about" },
  { label: "Experience", href: "#experience", section: "experience" },
  { label: "Contact", href: "#contact", section: "contact" },
];

/* -------------------------------------------------------------------------- */
/*  Experience - the real record                                              */
/* -------------------------------------------------------------------------- */

export type Position = {
  title: string;
  org: string;
  location: string;
  period: string;
  /** Display key, kept separate so the table can align figures. */
  years: string;
  detail: string;
};

export const experience: Position[] = [
  {
    title: "Computer Engineer, Full Stack Developer",
    org: "Univenn Startup Studio",
    location: "Izmir, TR",
    period: "Aug 2023 — Present",
    years: "2023–",
    detail:
      "HrPanda: applicant tracking, job distribution, role-based access control, AI-assisted screening, and a candidate-sourcing browser extension. Full stack, from schema to interface.",
  },
  {
    title: "Computer Engineer Intern (long term)",
    org: "Univenn Startup Studio",
    location: "Izmir, TR",
    period: "Oct 2022 — Jun 2023",
    years: "2022–23",
    detail:
      "Built Magny, a dashboard for a Command Bar integration; added socket-based real-time Google Sheets sync to Dovl; wrote a chat application from scratch.",
  },
  {
    title: "Frontend Developer (part time)",
    org: "Univenn Startup Studio",
    location: "Izmir, TR",
    period: "Sep 2022 — Nov 2022",
    years: "2022",
    detail:
      "Added WebRTC video calling to Univerlive with PeerJS and cleared a standing frontend backlog.",
  },
  {
    title: "Computer Engineer Intern",
    org: "Univenn Startup Studio",
    location: "Izmir, TR",
    period: "Jul 2022 — Aug 2022",
    years: "2022",
    detail:
      "Feature work and defect fixes across the Univerlive client, dashboard and backend.",
  },
  {
    title: "Computer Engineer Intern",
    org: "General Directorate of Highways",
    location: "Kastamonu, TR",
    period: "Jul 2021 — Aug 2021",
    years: "2021",
    detail:
      "SCADA integration for the Ilgaz 15 July Independence Tunnel monitoring and control system, a MERN authentication microservice on Docker, and in-house hardware troubleshooting.",
  },
];

export const education = [
  {
    school: "Selçuk University",
    degree: "BSc, Computer Engineering",
    location: "Konya, TR",
    period: "2019 — 2023",
    note: "Cumulative GPA 3.77 / 4.00",
  },
];

/* -------------------------------------------------------------------------- */
/*  Stack                                                                     */
/* -------------------------------------------------------------------------- */

export type CapabilityGroup = { title: string; items: string[] };

export const capabilities: CapabilityGroup[] = [
  {
    title: "Frontend",
    items: [
      "TypeScript",
      "React",
      "Next.js",
      "Vue",
      "Tailwind CSS",
      "WebRTC & WebSockets",
    ],
  },
  {
    title: "Backend & data",
    items: [
      "Node.js",
      "REST API design",
      "GraphQL",
      "PostgreSQL",
      "MongoDB",
      "Data modelling",
      "Authentication & RBAC",
    ],
  },
  {
    title: "Tooling & practice",
    items: [
      "Docker",
      "Git & code review",
      "Puppeteer & scraping",
      "Browser extensions",
      "Tauri / desktop",
      "Testing & debugging",
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Links                                                                     */
/* -------------------------------------------------------------------------- */

export type Link = {
  label: string;
  value: string;
  href: string;
  external?: boolean;
};

export const links: Link[] = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  {
    label: "GitHub",
    value: "BilalGumus",
    href: "https://github.com/BilalGumus/",
    external: true,
  },
  {
    label: "LinkedIn",
    value: "bilalgumus",
    href: "https://www.linkedin.com/in/bilalgumus/",
    external: true,
  },
];

/** TODO: add a résumé PDF to /public and point this at it. */
export const resumeHref: string | null = null;

export const meta = {
  url: "https://bilalgumus.net",

  /**
   * The share card. A static file rather than a generated one, so the
   * dimensions are declared here from the file itself - crawlers use them to
   * lay out the preview before the image has loaded, and a wrong pair gives a
   * cropped or letterboxed card. Measured 1200x630, the size Open Graph and
   * Twitter both size their large cards to.
   */
  ogImage: {
    url: "/images/og.jpg",
    width: 1200,
    height: 630,
    type: "image/jpeg",
  },
  title: `${profile.name} — ${profile.role}`,
  description:
    "Computer engineer and full stack developer in Kastamonu. TypeScript, React, Next.js and Node - web applications built end to end.",
  keywords: [
    "Bilal Gümüş",
    "Computer Engineer",
    "Full Stack Developer",
    "Web Developer",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Portfolio",
  ],
  /** Shown in the footer colophon. Self-documenting, and true. */
  colophon: {
    typefaces: "Inter · PT Serif",
    built: "Next.js 16 · React 19 · Tailwind CSS 4",
    motion: "CSS transitions, no animation library",
  },
};

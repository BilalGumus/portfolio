import type { Metadata, Viewport } from "next";
import { Inter, Newsreader } from "next/font/google";
import { Analytics } from "@/app/components/analytics";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import { RevealController, ThemeScript } from "@/app/components/theme";
import { meta, profile } from "@/app/lib/site";
import "./globals.css";

/**
 * Two typefaces, each with a job.
 *
 * Inter carries everything that is read: navigation, cards, prose, labels.
 *
 * Newsreader carries the spoken voice - the hero line, the about lead, the
 * contact line, the years on the record cards. A text serif with an optical
 * size axis, so the same family is delicate at display size and still sturdy
 * at 20px, which is the range it is used across here.
 *
 * `latin-ext` is not optional: "Gümüş" needs U+015F, which the plain latin
 * subset does not carry.
 */
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-newsreader",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(meta.url),
  title: {
    default: meta.title,
    template: `%s | ${profile.name}`,
  },
  description: meta.description,
  authors: [{ name: profile.name, url: "https://github.com/BilalGumus/" }],
  creator: profile.name,
  keywords: meta.keywords,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: profile.name,
    title: meta.title,
    description: meta.description,
    // Open Graph wants a language_TERRITORY tag, not a bare language code.
    locale: "en_US",
    // Declared explicitly because the card is a static file in public/ rather
    // than the opengraph-image file convention, which would have emitted these
    // tags on its own. The alt text lives here rather than in the constant so
    // it stays tied to the title it describes.
    images: [{ ...meta.ogImage, alt: meta.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: meta.title,
    description: meta.description,
    // Twitter does fall back to og:image, but stating it removes the guess.
    images: [{ ...meta.ogImage, alt: meta.title }],
    // No `creator`: it would have to be an @handle, and inventing one would
    // attribute the site to whoever actually owns it. Add it here when there
    // is a real account to point at.
  },
  robots: {
    index: true,
    follow: true,
    // Let Google use full-length previews rather than a truncated snippet, and
    // large image previews rather than a thumbnail.
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  category: "technology",
  // Declared here rather than as /app file conventions so the files can keep
  // names that say their size. The convention only matches `icon` plus one
  // optional digit (icon.png, icon1.png ... icon9.png), so icon16.png or
  // favicon-16x16.png in /app would be silently ignored. favicon.ico stays in
  // /app, where the convention picks it up on its own.
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Matches --color-bg in each theme so the browser chrome does not fight the
  // page. These are the resolved sRGB values of the OKLCH tokens.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f7f8" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0c0e" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      // Opts back into Next 16's scroll override, so route changes land at the
      // top instantly while in-page anchors still glide.
      data-scroll-behavior="smooth"
      // The boot script writes data-theme and data-motion before React runs.
      suppressHydrationWarning
      className={`${inter.variable} ${newsreader.variable}`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-dvh bg-bg text-primary antialiased">
        <a
          href="#main"
          className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-3 focus-visible:left-3 focus-visible:z-50 focus-visible:rounded-full focus-visible:bg-ink focus-visible:px-4 focus-visible:py-2 focus-visible:text-small focus-visible:text-ink-contrast"
        >
          Skip to content
        </a>

        {/* Page views only, and only when the OpenPanel env vars are set. */}
        <Analytics />

        <SiteHeader />

        <main id="main" tabIndex={-1}>
          {children}
        </main>

        <SiteFooter />
        <RevealController />
      </body>
    </html>
  );
}

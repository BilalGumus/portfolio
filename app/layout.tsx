import type { Metadata, Viewport } from "next";
import { Inter, PT_Serif, Geist } from "next/font/google";
import { GridLines } from "@/app/components/primitives";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import { RevealController, ThemeScript } from "@/app/components/theme";
import { meta, profile } from "@/app/lib/site";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

/**
 * Two typefaces, each with a job.
 *
 * Inter carries everything that is read - the most optically settled neutral
 * grotesque available self-hosted, and its variable axis covers the whole
 * weight range from one file.
 *
 * PT Serif carries the labelling voice: section numbers, section names,
 * captions, figure titles. It replaced a monospace in that role, which changed
 * the register from technical to editorial - a serif beside a neutral
 * grotesque is the oldest pairing in publishing, and it lets a label read as a
 * label without shouting in uppercase.
 *
 * PT Serif is a low-contrast transitional face designed for screen text, so
 * unlike a display serif it stays sturdy at label size, and it ships a real
 * 700 alongside the italic.
 *
 * `latin-ext` is not optional: "Gümüş" needs U+015F, which the plain latin
 * subset does not carry.
 */
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const ptSerif = PT_Serif({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-pt-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(meta.url),
  title: {
    default: meta.title,
    template: `%s — ${profile.name}`,
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
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Matches --color-bg in each theme so the browser chrome does not fight the
  // page. These are the resolved sRGB values of the OKLCH tokens.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f9f7f4" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0e11" },
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
      className={cn(inter.variable, ptSerif.variable, "font-sans", geist.variable)}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-dvh bg-bg text-primary antialiased">
        <a
          href="#main"
          className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-3 focus-visible:left-3 focus-visible:z-50 focus-visible:rounded-sm focus-visible:bg-accent focus-visible:px-3 focus-visible:py-2 focus-visible:text-small focus-visible:text-accent-contrast"
        >
          Skip to content
        </a>

        <GridLines />
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

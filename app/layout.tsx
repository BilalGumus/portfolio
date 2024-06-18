import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata, Viewport } from "next";
import { Oswald } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-oswald",
});

export const metadata: Metadata = {
  title: "Bilal Gümüş - Web Developer Personal Website",
  description:
    "Discover the portfolio, resume, and web development services of Bilal Gümüş, a talented and experienced web developer. Explore his work and get in touch today.",
  robots: "index, follow",
  keywords: "Bilal Gümüş, Personal website, Portfolio, Resume, Web development",
  authors: [
    {
      name: "Bilal Gümüş",
      url: "https://github.com/BilalGumus/",
    },
  ],
  openGraph: {
    title: "Bilal Gümüş - Web Developer Personal Website & Resume",
    description:
      "Discover the portfolio, resume, and web development services of Bilal Gümüş, a talented and experienced web developer. Explore his work and get in touch today.",
    type: "website",
    url: "https://bilalgumus.co/",
    siteName: "Bilal Gümüş - Web Developer Personal Website & Resume",
  },
  alternates: {
    canonical: "https://bilalgumus.co/",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  initialScale: 1,
  width: "device-width",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}

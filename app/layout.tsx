import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/data/siteConfig";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  metadataBase: new URL(siteConfig.siteUrl),
  openGraph: {
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    url: siteConfig.siteUrl,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.seo.ogImage, width: 1200, height: 630 }],
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    creator: siteConfig.seo.twitterHandle,
    images: [siteConfig.seo.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.tagline,
    url: siteConfig.siteUrl,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    sameAs: [
      siteConfig.social.instagram,
      siteConfig.social.youtube,
      siteConfig.social.linkedin,
    ],
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakarta.variable}`}
    >
      <body className="antialiased">
        {/* Skip to content (accessibility) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-[var(--color-accent)] focus:text-white focus:rounded-lg focus:text-sm focus:font-semibold"
        >
          Skip to main content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}

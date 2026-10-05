import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { VideoManagerProvider } from "@/components/VideoManager";
import { Hero } from "@/components/sections/Hero";
import { MarketingWork } from "@/components/sections/MarketingWork";
import { CinematicReels } from "@/components/sections/CinematicReels";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { About } from "@/components/sections/About";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import type { Metadata } from "next";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  alternates: {
    canonical: siteConfig.siteUrl,
  },
};

export default function Home() {
  return (
    <VideoManagerProvider>
      <Navbar />
      <main id="main-content">
        <Hero />
        <MarketingWork />
        <CinematicReels />
        <Services />
        <Process />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </VideoManagerProvider>
  );
}

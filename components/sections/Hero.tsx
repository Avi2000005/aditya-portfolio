"use client";

import { useState } from "react";
import Image from "next/image";
import { Phone, MessageCircle, ChevronDown, Camera } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const fadeIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero() {
  const [imgError, setImgError] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 pb-16"
      aria-labelledby="hero-heading"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* ── Left: Text ── */}
          <div className="order-2 lg:order-1">
            {/* Pill tag */}
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              <Badge variant="accent" className="mb-6 text-xs py-1 px-3">
                {siteConfig.tagline}
              </Badge>
            </motion.div>

            {/* Headline */}
            <motion.h1
              id="hero-heading"
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--color-text)] leading-[1.1] mb-5"
            >
              {siteConfig.headline}
            </motion.h1>

            {/* Subtext */}
            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-lg text-[var(--color-muted)] leading-relaxed mb-8 max-w-lg"
            >
              {siteConfig.subtext}
            </motion.p>

            {/* CTAs */}
            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex flex-wrap gap-3"
            >
              <Button
                size="lg"
                onClick={() => scrollTo("work")}
                id="hero-view-work-btn"
              >
                View My Work
                <ChevronDown size={16} className="ml-1" />
              </Button>
              <a
                href={siteConfig.contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-whatsapp-btn"
              >
                <Button size="lg" variant="outline">
                  <MessageCircle size={18} />
                  WhatsApp Me
                </Button>
              </a>
            </motion.div>
          </div>

          {/* ── Right: Photo ── */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Accent shape behind photo */}
              <div
                className="absolute -inset-4 rounded-[2rem] bg-[var(--color-accent-light)] rotate-3 -z-10"
                aria-hidden="true"
              />
              <div
                className="absolute -inset-2 rounded-[1.75rem] border-2 border-[var(--color-accent)]/20 -rotate-1 -z-10"
                aria-hidden="true"
              />

              {/* Photo */}
              <div className="relative w-72 h-80 sm:w-80 sm:h-96 lg:w-96 lg:h-[28rem] rounded-[1.5rem] overflow-hidden shadow-2xl border border-[var(--color-border)] bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-accent-light)]/40 flex items-center justify-center">
                {!imgError ? (
                  <Image
                    src="/aditya.jpg"
                    alt="Aditya Khedkar — Cinematic Videographer & Digital Marketer"
                    fill
                    priority
                    sizes="(max-width: 640px) 288px, (max-width: 1024px) 320px, 384px"
                    className="object-cover"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="text-center p-6 flex flex-col items-center justify-center space-y-3">
                    <div className="w-16 h-16 rounded-2xl bg-[var(--color-accent)]/10 text-[var(--color-accent)] flex items-center justify-center shadow-inner">
                      <Camera size={32} />
                    </div>
                    <div>
                      <p className="font-semibold text-lg font-[var(--font-heading)] text-[var(--color-text)]">
                        Aditya Khedkar
                      </p>
                      <p className="text-xs text-[var(--color-muted)] mt-1">
                        Cinematic Videographer & Digital Marketer
                      </p>
                    </div>
                    <span className="inline-flex items-center text-[11px] font-medium px-3 py-1 rounded-full bg-white/90 border border-[var(--color-border)] text-[var(--color-muted)] shadow-xs">
                      Photo: /public/aditya.jpg
                    </span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

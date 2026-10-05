"use client";

import { Quote } from "lucide-react";
import { motion } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-20 lg:py-28 bg-[var(--color-surface)]"
      aria-labelledby="testimonials-heading"
    >
      <Container>
        <SectionHeading
          eyebrow="Social Proof"
          title="What clients say"
          centered
          id="testimonials-heading"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {siteConfig.testimonials.map((t, i) => (
            <motion.figure
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="relative flex flex-col p-6 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-bg)] hover:shadow-[var(--shadow-card-hover)] transition-shadow duration-300"
            >
              <Quote
                size={24}
                className="text-[var(--color-accent)]/40 mb-4 shrink-0"
              />
              <blockquote className="flex-1">
                <p className="text-sm text-[var(--color-text)] leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </blockquote>
              <figcaption className="mt-5 pt-5 border-t border-[var(--color-border)]">
                <p className="text-sm font-semibold text-[var(--color-text)]">
                  {t.author}
                </p>
                <p className="text-xs text-[var(--color-muted)] mt-0.5">{t.role}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </Container>
    </section>
  );
}

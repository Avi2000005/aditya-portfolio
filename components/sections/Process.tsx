"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";

export function Process() {
  return (
    <section
      id="process"
      className="py-20 lg:py-28 bg-[var(--color-surface)]"
      aria-labelledby="process-heading"
    >
      <Container>
        <SectionHeading
          eyebrow="How I Work"
          title="The Process"
          subtitle="A clear, proven workflow from the first conversation to final results."
          centered
          id="process-heading"
        />

        {/* Desktop: horizontal timeline */}
        <div className="hidden md:block relative">
          {/* Connector line */}
          <div
            className="absolute top-8 left-[calc(10%+1.5rem)] right-[calc(10%+1.5rem)] h-px bg-[var(--color-border)]"
            aria-hidden="true"
          />

          <div className="grid grid-cols-5 gap-4">
            {siteConfig.process.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                {/* Step circle */}
                <div className="relative z-10 w-16 h-16 rounded-full bg-[var(--color-bg)] border-2 border-[var(--color-accent)]/30 flex flex-col items-center justify-center mb-4 shadow-sm">
                  <span className="text-xs font-bold text-[var(--color-accent)]">0{step.step}</span>
                </div>
                <h3 className="text-sm font-bold text-[var(--color-text)] mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="md:hidden relative pl-8">
          {/* Vertical line */}
          <div
            className="absolute left-3.5 top-0 bottom-0 w-px bg-[var(--color-border)]"
            aria-hidden="true"
          />

          <div className="flex flex-col gap-8">
            {siteConfig.process.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="relative"
              >
                {/* Dot */}
                <div
                  className="absolute -left-8 top-1.5 w-4 h-4 rounded-full bg-[var(--color-accent)] border-2 border-[var(--color-bg)] shadow"
                  aria-hidden="true"
                />
                <p className="text-xs font-bold text-[var(--color-accent)] mb-1">
                  Step 0{step.step}
                </p>
                <h3 className="font-bold text-[var(--color-text)] mb-1">
                  {step.title}
                </h3>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

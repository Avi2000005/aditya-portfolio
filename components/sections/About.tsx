"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";

export function About() {
  return (
    <section
      id="about"
      className="py-20 lg:py-28"
      aria-labelledby="about-heading"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
          >
            <SectionHeading
              eyebrow="About Me"
              title="The person behind the lens."
              id="about-heading"
            />
            <div className="space-y-4">
              {siteConfig.about.story.split("\n\n").map((para, i) => (
                <p key={i} className="text-[var(--color-muted)] leading-relaxed">
                  {para.trim()}
                </p>
              ))}
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <p className="text-sm font-semibold text-[var(--color-text)] uppercase tracking-wider mb-6">
              Tools &amp; Skills
            </p>
            <div className="flex flex-wrap gap-2.5">
              {siteConfig.about.skills.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="px-4 py-2 rounded-xl text-sm font-medium bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-accent)]/40 hover:bg-[var(--color-accent-light)] hover:text-[var(--color-accent)] transition-all duration-200 cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>

            {/* Accent block */}
            <div className="mt-10 p-6 rounded-[var(--radius-card)] bg-[var(--color-accent-light)] border border-[var(--color-accent)]/20">
              <p className="text-sm font-semibold text-[var(--color-accent)] mb-1">
                Open to new projects
              </p>
              <p className="text-sm text-[var(--color-text)]">
                Currently accepting brand films, SEO retainers, and frontend builds.{" "}
                <a
                  href={siteConfig.contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 font-medium hover:text-[var(--color-accent)] transition-colors"
                >
                  Let&apos;s talk.
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

"use client";

import { Film, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";

const icons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  film: Film,
  "trending-up": TrendingUp,
};

export function Services() {
  return (
    <section
      id="services"
      className="py-20 lg:py-28"
      aria-labelledby="services-heading"
    >
      <Container>
        <SectionHeading
          eyebrow="What I Do"
          title="Services"
          subtitle="End-to-end creative and marketing solutions — from lens to launch."
          centered
          id="services-heading"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {siteConfig.services.map((service, i) => {
            const Icon = icons[service.icon] ?? Film;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-8 hover:shadow-[var(--shadow-card-hover)] hover:border-[var(--color-accent)]/30 transition-all duration-300"
              >
                {/* Icon badge */}
                <div className="w-12 h-12 rounded-xl bg-[var(--color-accent-light)] flex items-center justify-center mb-5">
                  <Icon size={22} className="text-[var(--color-accent)]" />
                </div>

                <h3 className="text-xl font-bold text-[var(--color-text)] mb-5">
                  {service.category}
                </h3>

                <ul className="flex flex-col gap-3" role="list">
                  {service.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-[var(--color-muted)]"
                    >
                      <span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] shrink-0"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

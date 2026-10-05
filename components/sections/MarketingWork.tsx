"use client";

import { useState, useCallback, lazy, Suspense } from "react";
import { motion, type Variants } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { LazyVideo } from "@/components/LazyVideo";
import type { LightboxItem } from "@/components/Lightbox";

const Lightbox = lazy(() =>
  import("@/components/Lightbox").then((m) => ({ default: m.Lightbox }))
);

const sectionVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 shrink-0">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

export function MarketingWork() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const lightboxItems: LightboxItem[] = siteConfig.marketingVideos.map((v) => ({
    id: v.id,
    src: `${siteConfig.marketingBasePath}${v.file}`,
    externalUrl: v.externalUrl || undefined,
    poster: v.poster
      ? `${siteConfig.marketingBasePath}${v.poster}`
      : undefined,
    title: v.title,
    aspectClass: "aspect-9/16",
  }));

  const openLightbox = useCallback((idx: number) => setLightboxIndex(idx), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const next = useCallback(
    () => setLightboxIndex((i) => (i !== null ? Math.min(i + 1, lightboxItems.length - 1) : 0)),
    [lightboxItems.length]
  );
  const prev = useCallback(
    () => setLightboxIndex((i) => (i !== null ? Math.max(i - 1, 0) : 0)),
    []
  );

  return (
    <section
      id="work"
      className="py-20 lg:py-28"
      aria-labelledby="work-heading"
    >
      <Container>
        <SectionHeading
          eyebrow="Portfolio"
          title="Digital Marketing Work"
          subtitle="Video campaigns and content I've created for brands across India."
          id="work-heading"
        />

        {/* Video Grid (9:16 vertical ratio) */}
        {siteConfig.marketingVideos.length > 0 ? (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.08 } },
              hidden: {},
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {siteConfig.marketingVideos.map((video, idx) => {
              const videoSrc = video.externalUrl || `${siteConfig.marketingBasePath}${video.file}`;
              const posterSrc = video.poster
                ? `${siteConfig.marketingBasePath}${video.poster}`
                : undefined;

              return (
                <motion.article
                  key={video.id}
                  variants={sectionVariant}
                  className="group rounded-[var(--radius-card)] overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow duration-300"
                >
                  <LazyVideo
                    src={videoSrc}
                    externalUrl={video.externalUrl || undefined}
                    poster={posterSrc ? video.poster : undefined}
                    aspectClass="aspect-9/16"
                    title={video.title}
                    openLightbox
                    onOpen={() => openLightbox(idx)}
                    enableHoverPreview
                    className="rounded-none w-full"
                  />
                  <div className="p-4 flex flex-col justify-between">
                    <p className="font-semibold text-[var(--color-text)] text-sm leading-snug">
                      {video.title}
                    </p>
                    {video.instagramUrl ? (
                      <a
                        href={video.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-lg border border-[var(--color-border)] text-xs font-medium text-[var(--color-text)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] bg-[var(--color-bg)] hover:bg-[var(--color-surface)] transition-all shadow-2xs cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <InstagramIcon />
                        <span>See video on Instagram</span>
                      </a>
                    ) : null}
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        ) : (
          <div className="rounded-[var(--radius-card)] border border-dashed border-[var(--color-border)] p-12 text-center text-[var(--color-muted)]">
            <p className="text-lg font-medium mb-2">No marketing videos yet</p>
            <p className="text-sm">Add .mp4 files to /public/adMarketing/ and update siteConfig.ts</p>
          </div>
        )}
      </Container>

      {/* Lightbox (dynamically loaded) */}
      {lightboxIndex !== null && (
        <Suspense fallback={null}>
          <Lightbox
            items={lightboxItems}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onNext={next}
            onPrev={prev}
          />
        </Suspense>
      )}
    </section>
  );
}

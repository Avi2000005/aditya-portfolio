"use client";

import { useState, useCallback, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { LazyVideo } from "@/components/LazyVideo";
import type { LightboxItem } from "@/components/Lightbox";

const Lightbox = lazy(() =>
  import("@/components/Lightbox").then((m) => ({ default: m.Lightbox }))
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 shrink-0">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

export function CinematicReels() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const lightboxItems: LightboxItem[] = siteConfig.cinematicVideos.map((v) => ({
    id: v.id,
    src: `${siteConfig.cinematicBasePath}${v.file}`,
    externalUrl: v.externalUrl || undefined,
    poster: v.poster
      ? `${siteConfig.cinematicBasePath}${v.poster}`
      : undefined,
    title: v.title,
    caption: v.client,
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
      id="reels"
      className="py-20 lg:py-28 bg-[var(--color-surface)]"
      aria-labelledby="reels-heading"
    >
      <Container>
        <SectionHeading
          eyebrow="Cinematic"
          title="Reels & Films"
          subtitle="Some reels shot and edited by Aditya. Tap any reel to watch."
          id="reels-heading"
        />

        {siteConfig.cinematicVideos.length > 0 ? (
          <>
            {/* Mobile: horizontal scroll-snap */}
            <div className="flex lg:hidden gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-pl-4 -mx-4 px-4">
              {siteConfig.cinematicVideos.map((video, idx) => {
                const videoSrc = video.externalUrl || `${siteConfig.cinematicBasePath}${video.file}`;
                return (
                  <article
                    key={video.id}
                    className="snap-start shrink-0 w-44 flex flex-col justify-between"
                  >
                    <LazyVideo
                      src={videoSrc}
                      externalUrl={video.externalUrl || undefined}
                      poster={video.poster || undefined}
                      aspectClass="aspect-9/16"
                      title={video.title}
                      openLightbox
                      onOpen={() => openLightbox(idx)}
                      enableHoverPreview={false}
                      className="w-full"
                    />
                    {video.instagramUrl ? (
                      <a
                        href={video.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2.5 inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-lg border border-[var(--color-border)] text-xs font-medium text-[var(--color-text)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] bg-[var(--color-bg)] hover:bg-[var(--color-surface)] transition-all shadow-2xs cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <InstagramIcon />
                        <span>See video on Instagram</span>
                      </a>
                    ) : null}
                  </article>
                );
              })}
            </div>

            {/* Desktop: grid */}
            <div className="hidden lg:grid grid-cols-2 xl:grid-cols-4 gap-6">
              {siteConfig.cinematicVideos.map((video, idx) => {
                const videoSrc = video.externalUrl || `${siteConfig.cinematicBasePath}${video.file}`;
                return (
                  <motion.article
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.45, delay: idx * 0.07 }}
                    className="group flex flex-col justify-between"
                  >
                    <LazyVideo
                      src={videoSrc}
                      externalUrl={video.externalUrl || undefined}
                      poster={video.poster || undefined}
                      aspectClass="aspect-9/16"
                      title={video.title}
                      openLightbox
                      onOpen={() => openLightbox(idx)}
                      enableHoverPreview
                      className="w-full"
                    />
                    {video.instagramUrl ? (
                      <a
                        href={video.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2.5 inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-lg border border-[var(--color-border)] text-xs font-medium text-[var(--color-text)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] bg-[var(--color-bg)] hover:bg-[var(--color-surface)] transition-all shadow-2xs cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <InstagramIcon />
                        <span>See video on Instagram</span>
                      </a>
                    ) : null}
                  </motion.article>
                );
              })}
            </div>
          </>
        ) : (
          <div className="rounded-[var(--radius-card)] border border-dashed border-[var(--color-border)] p-12 text-center text-[var(--color-muted)]">
            <p className="text-lg font-medium mb-2">No cinematic reels yet</p>
            <p className="text-sm">
              Add .mp4 files to /public/cinematic/ and update siteConfig.ts
            </p>
          </div>
        )}
      </Container>

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

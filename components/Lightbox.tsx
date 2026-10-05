"use client";

/**
 * Lightbox — Accessible modal video player.
 *
 * - Creates <video> only when opened, destroys on close (frees memory)
 * - Keyboard: Esc to close, ArrowLeft/ArrowRight for prev/next
 * - Focus trap inside modal
 * - ARIA: role="dialog", aria-modal, labelled by title
 * - Dynamically imported — not in initial bundle
 */

import {
  useEffect,
  useRef,
  useCallback,
  type KeyboardEvent,
} from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useVideoManager } from "@/components/VideoManager";
import { cn } from "@/lib/utils";

export interface LightboxItem {
  id: string;
  src: string;
  externalUrl?: string;
  poster?: string;
  title?: string;
  caption?: string;
}

interface LightboxProps {
  items: LightboxItem[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export function Lightbox({
  items,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: LightboxProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const { pauseAll } = useVideoManager();

  const current = items[currentIndex];
  const videoSrc = current?.externalUrl || current?.src;

  // Pause all inline videos when lightbox opens
  useEffect(() => {
    pauseAll();
  }, [pauseAll]);

  // Load video when lightbox opens or current item changes
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid || !videoSrc) return;

    vid.src = videoSrc;
    if (current?.poster) vid.poster = current.poster;
    vid.load();
    vid.play().catch(() => {});

    return () => {
      // Destroy video on unmount / item change
      vid.pause();
      vid.removeAttribute("src");
      vid.load();
    };
  }, [videoSrc, current?.poster]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Keyboard handling
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    },
    [onClose, onNext, onPrev]
  );

  // Focus trap
  const handleFocusTrap = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key !== "Tab") return;
      const focusable = backdropRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    []
  );

  if (!current) return null;

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={current.title ? `Video: ${current.title}` : "Video player"}
      onKeyDown={(e) => {
        handleKeyDown(e);
        handleFocusTrap(e);
      }}
    >
      {/* Close */}
      <button
        ref={closeBtnRef}
        onClick={onClose}
        aria-label="Close video"
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        id="lightbox-close-btn"
      >
        <X size={22} />
      </button>

      {/* Backdrop click to close */}
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Video container */}
      <div className="relative z-10 w-full max-w-4xl mx-4 flex flex-col gap-3">
        <div className="relative aspect-video rounded-xl overflow-hidden bg-black shadow-2xl">
          <video
            ref={videoRef}
            className="w-full h-full object-contain"
            controls
            playsInline
            aria-label={current.title ?? "Video"}
          />
        </div>

        {/* Caption */}
        {(current.title || current.caption) && (
          <div className="text-center">
            {current.title && (
              <p className="text-white font-semibold">{current.title}</p>
            )}
            {current.caption && (
              <p className="text-white/60 text-sm mt-0.5">{current.caption}</p>
            )}
          </div>
        )}
      </div>

      {/* Prev / Next */}
      {items.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            aria-label="Previous video"
            disabled={currentIndex === 0}
            className={cn(
              "absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors",
              currentIndex === 0 && "opacity-30 pointer-events-none"
            )}
            id="lightbox-prev-btn"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            aria-label="Next video"
            disabled={currentIndex === items.length - 1}
            className={cn(
              "absolute right-14 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors",
              currentIndex === items.length - 1 && "opacity-30 pointer-events-none"
            )}
            id="lightbox-next-btn"
          >
            <ChevronRight size={28} />
          </button>
        </>
      )}
    </div>
  );
}

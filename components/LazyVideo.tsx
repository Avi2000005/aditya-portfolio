"use client";

/**
 * LazyVideo — The one video component used everywhere on the site.
 *
 * Features:
 *  - IntersectionObserver: attaches `src` only when ~200px from viewport
 *  - preload="none" → "metadata" once in view, full load only on play
 *  - Poster image (WebP/JPG). Auto-captures first frame via canvas if no poster file.
 *  - Skeleton shimmer while poster/video loads
 *  - Error fallback: hides card without breaking layout
 *  - Desktop hover preview (muted, no sound) — disabled on touch devices
 *  - Registers with VideoManager so only one plays at once
 *  - playsInline, muted for autoplay policies
 *  - Calls requestIdleCallback for deferred initialisation
 *  - Supports external URL override (YouTube/Vimeo/CDN)
 */

import {
  useRef,
  useState,
  useEffect,
  useId,
  useCallback,
  type ReactNode,
} from "react";
import { Play } from "lucide-react";
import { Skeleton } from "@/components/ui/Skeleton";
import { useVideoManager } from "@/components/VideoManager";
import { cn } from "@/lib/utils";

interface LazyVideoProps {
  /** Path to video file in /public (e.g. "/adMarketing/marketing1.mp4") */
  src: string;
  /** Optional external URL — overrides `src` if provided */
  externalUrl?: string;
  /** Path to poster image in /public */
  poster?: string;
  /** Aspect ratio class — "aspect-16/9" or "aspect-9/16" */
  aspectClass?: string;
  /** Card title (for aria) */
  title?: string;
  /** Called when user taps/clicks the video card (for lightbox) */
  onOpen?: () => void;
  /** If true, clicking opens fullscreen player instead of inline play */
  openLightbox?: boolean;
  /** CSS class for the outer wrapper */
  className?: string;
  /** Whether to show hover-preview on desktop */
  enableHoverPreview?: boolean;
  /** Children overlaid on top of the poster */
  children?: ReactNode;
}

export function LazyVideo({
  src,
  externalUrl,
  poster,
  aspectClass = "aspect-16/9",
  title,
  onOpen,
  openLightbox = false,
  className,
  enableHoverPreview = true,
  children,
}: LazyVideoProps) {
  const uid = useId();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [state, setState] = useState<"skeleton" | "poster" | "playing" | "error">("skeleton");
  const [posterSrc, setPosterSrc] = useState<string | undefined>(poster ? src.replace(/\.mp4$/, ".jpg").replace(/\/[^/]+$/, (m) => m.replace(/[^/]+\.mp4$/, poster.includes("/") ? poster : poster)) : undefined);
  const [srcLoaded, setSrcLoaded] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const videoSrc = externalUrl || src;
  const { registerVideo, unregisterVideo, requestPlay } = useVideoManager();

  // Detect touch device once
  useEffect(() => {
    setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  // Compute poster URL: same directory, same basename, .jpg extension
  const resolvedPoster = poster
    ? src.substring(0, src.lastIndexOf("/") + 1) + poster
    : undefined;

  // IntersectionObserver: attach src only near viewport
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const attach = () => {
      if (srcLoaded) return;
      const vid = videoRef.current;
      if (!vid) return;

      vid.preload = "metadata";
      vid.src = videoSrc;
      setSrcLoaded(true);

      vid.load();
      vid.addEventListener("loadedmetadata", () => {
        // Auto-capture poster if no poster file
        if (!resolvedPoster && !posterSrc) {
          try {
            const canvas = document.createElement("canvas");
            canvas.width = vid.videoWidth;
            canvas.height = vid.videoHeight;
            canvas.getContext("2d")?.drawImage(vid, 0, 0);
            setPosterSrc(canvas.toDataURL("image/jpeg", 0.7));
          } catch {
            // cross-origin or codec issue — that's fine
          }
        }
        setState("poster");
      }, { once: true });

      vid.addEventListener("error", () => setState("error"), { once: true });
    };

    // Use requestIdleCallback for deferred init
    const schedule = () => {
      if ("requestIdleCallback" in window) {
        (window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => void }).requestIdleCallback(attach, { timeout: 2000 });
      } else {
        setTimeout(attach, 200);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          schedule();
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [videoSrc, resolvedPoster, posterSrc, srcLoaded]);

  // Register/unregister with global video manager
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    registerVideo(uid, vid);
    return () => unregisterVideo(uid);
  }, [uid, registerVideo, unregisterVideo]);

  // Pause when leaving viewport
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) {
          videoRef.current?.pause();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Desktop hover preview
  const handleMouseEnter = useCallback(() => {
    if (isTouchDevice || !enableHoverPreview || openLightbox) return;
    const vid = videoRef.current;
    if (!vid || !srcLoaded) return;
    setIsHovering(true);
    requestPlay(uid);
    vid.muted = true;
    vid.play().catch(() => {});
    setState("playing");
  }, [isTouchDevice, enableHoverPreview, openLightbox, srcLoaded, uid, requestPlay]);

  const handleMouseLeave = useCallback(() => {
    if (isTouchDevice) return;
    setIsHovering(false);
    const vid = videoRef.current;
    if (!vid) return;
    vid.pause();
    vid.currentTime = 0;
    setState("poster");
  }, [isTouchDevice]);

  // Click to play / open lightbox
  const handleClick = useCallback(() => {
    if (openLightbox && onOpen) {
      onOpen();
      return;
    }
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) {
      requestPlay(uid);
      vid.muted = false;
      vid.play().catch(() => {});
      setState("playing");
    } else {
      vid.pause();
      setState("poster");
    }
  }, [openLightbox, onOpen, uid, requestPlay]);

  if (state === "error") return null;

  return (
    <div
      ref={wrapperRef}
      className={cn(
        "relative overflow-hidden rounded-[var(--radius-card)] bg-[var(--color-border)] cursor-pointer group",
        aspectClass,
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={title ? `Play: ${title}` : "Play video"}
      onKeyDown={(e) => e.key === "Enter" || e.key === " " ? handleClick() : undefined}
    >
      {/* Skeleton while loading */}
      {state === "skeleton" && (
        <Skeleton className="absolute inset-0 rounded-none" />
      )}

      {/* Poster image */}
      {resolvedPoster && state !== "skeleton" && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={resolvedPoster}
          alt={title ? `${title} poster` : "Video poster"}
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-300",
            state === "playing" ? "opacity-0" : "opacity-100"
          )}
          loading="lazy"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      )}

      {/* Canvas-captured poster */}
      {posterSrc && !resolvedPoster && state !== "skeleton" && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={posterSrc}
          alt=""
          aria-hidden="true"
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-300",
            state === "playing" ? "opacity-0" : "opacity-100"
          )}
        />
      )}

      {/* Video element */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        muted
        preload="none"
        aria-label={title ?? "Video"}
      />

      {/* Play icon overlay */}
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center transition-opacity duration-200",
          state === "playing" ? "opacity-0" : "opacity-100"
        )}
        aria-hidden="true"
      >
        <div className="w-14 h-14 rounded-full bg-[var(--color-surface)]/90 backdrop-blur flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
          <Play size={22} className="text-[var(--color-accent)] ml-1" fill="currentColor" />
        </div>
      </div>

      {/* Custom overlay children (e.g. card info) */}
      {children}
    </div>
  );
}

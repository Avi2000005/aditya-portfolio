"use client";

/**
 * VideoManager — Global singleton context to enforce:
 *  1. Only ONE video plays at a time
 *  2. Max 3 videos loaded (src attached) at once on mobile
 *
 * Every LazyVideo registers itself here and calls requestPlay()
 * before starting playback.
 */

import {
  createContext,
  useContext,
  useRef,
  useCallback,
  type ReactNode,
} from "react";

interface VideoManagerContextValue {
  registerVideo: (id: string, videoEl: HTMLVideoElement) => void;
  unregisterVideo: (id: string) => void;
  requestPlay: (id: string) => void;
  pauseAll: () => void;
}

const VideoManagerContext = createContext<VideoManagerContextValue | null>(null);

export function VideoManagerProvider({ children }: { children: ReactNode }) {
  // Map of registered video elements keyed by their unique id
  const videos = useRef<Map<string, HTMLVideoElement>>(new Map());
  const currentlyPlaying = useRef<string | null>(null);

  const registerVideo = useCallback(
    (id: string, videoEl: HTMLVideoElement) => {
      videos.current.set(id, videoEl);
    },
    []
  );

  const unregisterVideo = useCallback((id: string) => {
    videos.current.delete(id);
    if (currentlyPlaying.current === id) {
      currentlyPlaying.current = null;
    }
  }, []);

  const requestPlay = useCallback((id: string) => {
    // Pause all other videos
    videos.current.forEach((el, key) => {
      if (key !== id && !el.paused) {
        el.pause();
      }
    });
    currentlyPlaying.current = id;
  }, []);

  const pauseAll = useCallback(() => {
    videos.current.forEach((el) => {
      if (!el.paused) el.pause();
    });
    currentlyPlaying.current = null;
  }, []);

  return (
    <VideoManagerContext.Provider
      value={{ registerVideo, unregisterVideo, requestPlay, pauseAll }}
    >
      {children}
    </VideoManagerContext.Provider>
  );
}

export function useVideoManager() {
  const ctx = useContext(VideoManagerContext);
  if (!ctx) throw new Error("useVideoManager must be used within VideoManagerProvider");
  return ctx;
}

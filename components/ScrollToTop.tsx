"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      onClick={scrollUp}
      aria-label="Scroll to top"
      className={cn(
        "fixed bottom-6 right-6 z-40 p-3 rounded-full bg-[var(--color-accent)] text-white shadow-lg transition-all duration-300 hover:brightness-110 focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      )}
      id="scroll-to-top-btn"
    >
      <ArrowUp size={18} />
    </button>
  );
}

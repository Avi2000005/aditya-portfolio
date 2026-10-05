"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Detect scroll for navbar background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section detection via IntersectionObserver
  useEffect(() => {
    const sectionIds = siteConfig.navLinks
      .map((l) => l.href.replace("#", ""))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = useCallback((href: string) => {
    setIsOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[var(--color-surface)]/90 backdrop-blur-md shadow-[var(--shadow-nav)]"
          : "bg-transparent"
      )}
      role="banner"
    >
      <Container>
        <nav
          className="flex items-center justify-between h-16 md:h-18"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <button
            onClick={() => scrollTo("#home")}
            className="text-lg font-bold font-[var(--font-heading)] text-[var(--color-text)] tracking-tight focus-visible:outline-[var(--color-accent)]"
            aria-label="Go to home"
          >
            Aditya<span className="text-[var(--color-accent)]">.</span>
          </button>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {siteConfig.navLinks.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150",
                      isActive
                        ? "text-[var(--color-accent)] bg-[var(--color-accent-light)]"
                        : "text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-border)]"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Hire Me CTA */}
          <div className="hidden md:block">
            <Button
              size="sm"
              onClick={() => scrollTo("#contact")}
              id="navbar-hire-me-btn"
            >
              Hire Me
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-[var(--color-text)] hover:bg-[var(--color-border)] transition-colors"
            onClick={() => setIsOpen((v) => !v)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </Container>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
        aria-hidden={!isOpen}
      >
        <div className="bg-[var(--color-surface)]/95 backdrop-blur-md border-t border-[var(--color-border)]">
          <Container>
            <ul className="py-3 flex flex-col gap-1" role="list">
              {siteConfig.navLinks.map((link) => {
                const id = link.href.replace("#", "");
                const isActive = activeSection === id;
                return (
                  <li key={link.href}>
                    <button
                      onClick={() => scrollTo(link.href)}
                      className={cn(
                        "w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                        isActive
                          ? "text-[var(--color-accent)] bg-[var(--color-accent-light)]"
                          : "text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-border)]"
                      )}
                    >
                      {link.label}
                    </button>
                  </li>
                );
              })}
              <li className="pt-2 pb-1">
                <Button
                  className="w-full"
                  onClick={() => scrollTo("#contact")}
                  id="mobile-hire-me-btn"
                >
                  Hire Me
                </Button>
              </li>
            </ul>
          </Container>
        </div>
      </div>
    </header>
  );
}

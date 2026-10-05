import { Phone, Mail, MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="bg-[var(--color-surface)] border-t border-[var(--color-border)] pt-16 pb-8"
      role="contentinfo"
    >
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <p className="text-xl font-bold font-[var(--font-heading)] text-[var(--color-text)] mb-2">
              Aditya<span className="text-[var(--color-accent)]">.</span>
            </p>
            <p className="text-sm text-[var(--color-muted)] leading-relaxed max-w-xs">
              {siteConfig.tagline} — helping brands grow through visual
              storytelling and smart marketing.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-sm font-semibold text-[var(--color-text)] mb-4 uppercase tracking-wider">
              Quick Links
            </p>
            <ul className="flex flex-col gap-2" role="list">
              {siteConfig.navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-sm font-semibold text-[var(--color-text)] mb-4 uppercase tracking-wider">
              Contact
            </p>
            <ul className="flex flex-col gap-3" role="list">
              <li>
                <a
                  href={siteConfig.contact.phoneTel}
                  className="flex items-center gap-2.5 text-sm text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors"
                  aria-label={`Call ${siteConfig.contact.phone}`}
                >
                  <Phone size={15} className="shrink-0" />
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors"
                  aria-label="Chat on WhatsApp"
                >
                  <MessageCircle size={15} className="shrink-0" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.contact.emailLink}
                  className="flex items-center gap-2.5 text-sm text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors"
                  aria-label={`Email ${siteConfig.contact.email}`}
                >
                  <Mail size={15} className="shrink-0" />
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[var(--color-border)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[var(--color-muted)]">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-xs text-[var(--color-muted)]">
            Built with Next.js &amp; ♥
          </p>
        </div>
      </Container>
    </footer>
  );
}

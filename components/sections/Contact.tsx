"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Phone, Mail, MessageCircle, CheckCircle, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});
type FormData = z.infer<typeof schema>;

type SubmitStatus = "idle" | "loading" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (res.ok) {
        setStatus("success");
        reset();
      } else if (json.fallbackMailto) {
        // API not configured — open mailto fallback
        window.location.href = `mailto:${siteConfig.contact.email}?subject=Portfolio Enquiry from ${data.name}&body=${encodeURIComponent(data.message)}`;
        setStatus("success");
        reset();
      } else {
        setStatus("error");
        setErrorMsg(json.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again or contact directly.");
    }
  };

  return (
    <section
      id="contact"
      className="py-20 lg:py-28"
      aria-labelledby="contact-heading"
    >
      <Container>
        <SectionHeading
          eyebrow="Get In Touch"
          title="Let's work together."
          subtitle="Have a project in mind? Drop a message or reach out directly."
          centered
          id="contact-heading"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact buttons */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-4"
          >
            <p className="font-semibold text-[var(--color-text)] mb-2">
              Prefer to reach out directly?
            </p>

            <a
              href={siteConfig.contact.phoneTel}
              className="flex items-center gap-4 p-4 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)]/40 hover:shadow-[var(--shadow-card-hover)] transition-all duration-200 group"
              id="contact-call-btn"
            >
              <div className="w-11 h-11 rounded-xl bg-[var(--color-accent-light)] flex items-center justify-center shrink-0">
                <Phone size={18} className="text-[var(--color-accent)]" />
              </div>
              <div>
                <p className="text-xs text-[var(--color-muted)]">Call me</p>
                <p className="font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
                  {siteConfig.contact.phone}
                </p>
              </div>
            </a>

            <a
              href={siteConfig.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)]/40 hover:shadow-[var(--shadow-card-hover)] transition-all duration-200 group"
              id="contact-whatsapp-btn"
            >
              <div className="w-11 h-11 rounded-xl bg-[var(--color-accent-light)] flex items-center justify-center shrink-0">
                <MessageCircle size={18} className="text-[var(--color-accent)]" />
              </div>
              <div>
                <p className="text-xs text-[var(--color-muted)]">WhatsApp</p>
                <p className="font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
                  Chat instantly
                </p>
              </div>
            </a>

            <a
              href={siteConfig.contact.emailLink}
              className="flex items-center gap-4 p-4 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)]/40 hover:shadow-[var(--shadow-card-hover)] transition-all duration-200 group"
              id="contact-email-btn"
            >
              <div className="w-11 h-11 rounded-xl bg-[var(--color-accent-light)] flex items-center justify-center shrink-0">
                <Mail size={18} className="text-[var(--color-accent)]" />
              </div>
              <div>
                <p className="text-xs text-[var(--color-muted)]">Email</p>
                <p className="font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors text-sm">
                  {siteConfig.contact.email}
                </p>
              </div>
            </a>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
              noValidate
              aria-label="Contact form"
            >
              {/* Name */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-sm font-medium text-[var(--color-text)] mb-1.5"
                >
                  Your Name <span aria-hidden>*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Rahul Sharma"
                  className="w-full px-4 py-2.5 rounded-[var(--radius-btn)] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] text-sm placeholder:text-[var(--color-muted)]/60 focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-colors"
                  aria-describedby={errors.name ? "name-error" : undefined}
                  aria-invalid={!!errors.name}
                  {...register("name")}
                />
                {errors.name && (
                  <p id="name-error" className="text-xs text-red-500 mt-1.5" role="alert">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-sm font-medium text-[var(--color-text)] mb-1.5"
                >
                  Email Address <span aria-hidden>*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 rounded-[var(--radius-btn)] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] text-sm placeholder:text-[var(--color-muted)]/60 focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-colors"
                  aria-describedby={errors.email ? "email-error" : undefined}
                  aria-invalid={!!errors.email}
                  {...register("email")}
                />
                {errors.email && (
                  <p id="email-error" className="text-xs text-red-500 mt-1.5" role="alert">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-medium text-[var(--color-text)] mb-1.5"
                >
                  Message <span aria-hidden>*</span>
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-2.5 rounded-[var(--radius-btn)] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] text-sm placeholder:text-[var(--color-muted)]/60 focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-colors resize-none"
                  aria-describedby={errors.message ? "message-error" : undefined}
                  aria-invalid={!!errors.message}
                  {...register("message")}
                />
                {errors.message && (
                  <p id="message-error" className="text-xs text-red-500 mt-1.5" role="alert">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                size="lg"
                disabled={status === "loading"}
                className="w-full"
                id="contact-submit-btn"
              >
                {status === "loading" ? "Sending…" : "Send Message"}
              </Button>

              {/* Success */}
              {status === "success" && (
                <div
                  role="status"
                  className="flex items-center gap-3 p-4 rounded-[var(--radius-btn)] bg-green-50 border border-green-200 text-green-700 text-sm"
                >
                  <CheckCircle size={18} className="shrink-0" />
                  Message sent! I&apos;ll be in touch soon.
                </div>
              )}

              {/* Error */}
              {status === "error" && (
                <div
                  role="alert"
                  className="flex items-center gap-3 p-4 rounded-[var(--radius-btn)] bg-red-50 border border-red-200 text-red-700 text-sm"
                >
                  <AlertCircle size={18} className="shrink-0" />
                  {errorMsg}
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

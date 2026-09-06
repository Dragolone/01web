"use client";

import Link from "next/link";
import { useState } from "react";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

type Props = { lang: Locale; dict: Dictionary };
type Status = "idle" | "sending" | "success" | "error" | "unconfigured";

const CONTACT_EMAIL = "dravenzhong27@gmail.com";

const field =
  "w-full rounded-xl border border-border bg-surface px-4 py-3 text-[15px] text-foreground placeholder:text-muted/70 outline-none transition-colors focus:border-[#5cf0ff]/50";

export function ContactForm({ lang, dict }: Props) {
  const t = dict.pages.contact.form;
  const [status, setStatus] = useState<Status>("idle");
  const [hint, setHint] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    type: t.types[0],
    message: "",
    website: "", // honeypot
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  // Fallback when SMTP isn't configured on the server: open a prefilled email.
  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`[${form.type}] ${form.name}`)}&body=${encodeURIComponent(
    `${form.message}\n\n${form.company ? `${form.company}\n` : ""}${form.name} <${form.email}>`,
  )}`;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    setHint(null);
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setHint(t.required);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setHint(t.invalidEmail);
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.status === 503) {
        setStatus("unconfigured");
        return;
      }
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean };
      setStatus(res.ok && data.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-3xl border border-[#5cf0ff]/30 bg-[#5cf0ff]/[0.06] p-8 text-center">
        <p className="text-lg font-semibold tracking-tight">{t.success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative rounded-3xl border border-border p-6 md:p-8">
      <p className="text-lg font-semibold tracking-tight">{t.title}</p>
      <p className="mt-1.5 text-sm text-muted">{t.lead}</p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-xs text-muted">{t.name} *</span>
          <input name="name" autoComplete="name" value={form.name} onChange={set("name")} className={field} required />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs text-muted">{t.email} *</span>
          <input name="email" type="email" autoComplete="email" value={form.email} onChange={set("email")} className={field} required />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs text-muted">{t.company}</span>
          <input name="company" autoComplete="organization" value={form.company} onChange={set("company")} className={field} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs text-muted">{t.type}</span>
          <select name="type" value={form.type} onChange={set("type")} className={`${field} appearance-none`}>
            {t.types.map((o) => (
              <option key={o} value={o} className="bg-[#0a0f20]">
                {o}
              </option>
            ))}
          </select>
        </label>
        <label className="block md:col-span-2">
          <span className="mb-1.5 block text-xs text-muted">{t.message} *</span>
          <textarea
            name="message"
            rows={5}
            value={form.message}
            onChange={set("message")}
            placeholder={t.placeholder}
            className={`${field} resize-y`}
            required
          />
        </label>
        {/* honeypot — hidden from humans, filled by bots */}
        <div aria-hidden className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
          <label>
            website
            <input name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={set("website")} />
          </label>
        </div>
      </div>

      {hint && (
        <p role="alert" className="mt-4 text-sm text-[#ff9bf2]">
          {hint}
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="mt-4 text-sm text-[#ff9bf2]">
          {t.error}
        </p>
      )}

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {status === "unconfigured" ? (
          <a
            href={mailto}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-[#0a1024] transition-shadow hover:shadow-[0_0_36px_-6px_rgba(150,180,255,0.7)]"
          >
            {t.fallback} ↗
          </a>
        ) : (
          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-[#0a1024] transition-shadow hover:shadow-[0_0_36px_-6px_rgba(150,180,255,0.7)] disabled:cursor-wait disabled:opacity-60"
          >
            {status === "sending" ? t.sending : t.submit}
          </button>
        )}
        <p className="text-xs text-muted">
          {t.privacy}
          <Link href={`/${lang}/privacy`} className="underline decoration-muted/50 underline-offset-2 hover:text-foreground">
            {t.privacyLink}
          </Link>
          {t.privacyTail}
        </p>
      </div>
    </form>
  );
}

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

// Contact form → email. Configure via env (see .env.example):
//   SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASS / CONTACT_TO
// When SMTP is not configured the route answers 503 {configured:false} and the
// form falls back to a mailto: link, so the site never shows a broken form.

const MAX = { name: 80, email: 120, company: 120, type: 40, message: 4000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Best-effort per-process rate limit (5 submissions / 10 min / IP).
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // keep the map bounded
  return recent.length > LIMIT;
}

const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.replace(/[\r\n]+/g, " ").trim().slice(0, max) : "";

export async function POST(req: Request) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    return NextResponse.json({ ok: false, configured: false }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  // Honeypot — bots fill every field; humans never see this one.
  if (typeof body.website === "string" && body.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, MAX.name);
  const email = clean(body.email, MAX.email);
  const company = clean(body.company, MAX.company);
  const type = clean(body.type, MAX.type);
  const message = typeof body.message === "string" ? body.message.trim().slice(0, MAX.message) : "";

  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: "missing" }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "email" }, { status: 400 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) {
    return NextResponse.json({ ok: false, error: "rate" }, { status: 429 });
  }

  const port = Number(SMTP_PORT || 465);
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const lines = [
    `姓名 / Name: ${name}`,
    `邮箱 / Email: ${email}`,
    company ? `公司 / Company: ${company}` : null,
    type ? `类型 / Type: ${type}` : null,
    `IP: ${ip}`,
    "",
    message,
  ].filter((l) => l !== null);

  try {
    await transporter.sendMail({
      from: `"01weichuang.com" <${SMTP_USER}>`,
      to: CONTACT_TO || SMTP_USER,
      replyTo: email,
      subject: `[官网留言] ${type || "咨询"} — ${name}`,
      text: lines.join("\n"),
    });
  } catch (err) {
    console.error("[contact] sendMail failed:", err);
    return NextResponse.json({ ok: false, error: "send" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

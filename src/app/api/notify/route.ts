import { NextResponse } from "next/server";

type Payload = {
  type: "reservation" | "contact";
  name?: string;
  email?: string;
  phone?: string;
  date?: string;
  time?: string;
  guests?: number;
  subject?: string;
  message?: string;
  notes?: string;
};

function row(label: string, value?: string | number) {
  if (value === undefined || value === "" || value === null) return "";
  return `<tr><td style="padding:6px 14px 6px 0;color:#888">${label}</td><td style="padding:6px 0;font-weight:600;color:#1b1a16">${value}</td></tr>`;
}

export async function POST(req: Request) {
  let data: Payload;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad request" }, { status: 400 });
  }

  const to = process.env.RESTAURANT_EMAIL || "bonjour@nouilles-nouilles.fr";
  const from = process.env.RESEND_FROM || "Nouilles Nouilles <onboarding@resend.dev>";
  const apiKey = process.env.RESEND_API_KEY;

  const isResa = data.type === "reservation";
  const subject = isResa
    ? `🍜 Nouvelle réservation — ${data.name ?? ""} · ${data.guests ?? "?"} couverts`
    : `✉️ Nouveau message — ${data.subject || "Contact"}`;

  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:520px;margin:auto">
    <h2 style="color:#c4402a">${isResa ? "Nouvelle réservation" : "Nouveau message"}</h2>
    <table style="border-collapse:collapse;font-size:14px">
      ${row("Date", data.date)}
      ${row("Heure", data.time)}
      ${row("Couverts", data.guests)}
      ${row("Nom", data.name)}
      ${row("Téléphone", data.phone)}
      ${row("E-mail", data.email)}
      ${row("Sujet", data.subject)}
      ${row("Demande", data.notes)}
      ${row("Message", data.message)}
    </table>
    <p style="color:#aaa;font-size:12px;margin-top:18px">Envoyé depuis le site Nouilles Nouilles</p>
  </div>`;

  // No API key configured → demo mode: don't fail, just acknowledge.
  if (!apiKey) {
    console.log("[notify] (mode démo, RESEND_API_KEY absente) →", to, "|", subject);
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to: [to], subject, html, reply_to: data.email }),
    });
    if (!res.ok) {
      const text = await res.text();
      console.error("[notify] resend error", res.status, text);
      return NextResponse.json({ ok: false, delivered: false }, { status: 502 });
    }
    return NextResponse.json({ ok: true, delivered: true });
  } catch (e) {
    console.error("[notify] error", e);
    return NextResponse.json({ ok: false, delivered: false }, { status: 500 });
  }
}

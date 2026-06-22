"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/i18n/LanguageProvider";
import Reveal from "./Reveal";

const ADDRESS = "48 rue Legraverend, 35000 Rennes";
const MAP_EMBED =
  "https://maps.google.com/maps?q=" + encodeURIComponent(ADDRESS) + "&z=16&output=embed";
const MAP_DIR =
  "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(ADDRESS);

// Open 7/7: lunch 12:00–14:30, dinner 18:00–22:45
const daySlots: [number, number][] = [
  [720, 870],
  [1080, 1365],
];
const schedule: Record<number, [number, number][]> = {
  0: daySlots,
  1: daySlots,
  2: daySlots,
  3: daySlots,
  4: daySlots,
  5: daySlots,
  6: daySlots,
};

function fmt(mins: number, locale: "fr" | "en") {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return locale === "fr"
    ? m === 0
      ? `${h}h`
      : `${h}h${String(m).padStart(2, "0")}`
    : `${h}:${String(m).padStart(2, "0")}`;
}

type Status = { open: boolean; until?: number; next?: number };

function computeStatus(now: Date): Status {
  const day = now.getDay();
  const mins = now.getHours() * 60 + now.getMinutes();
  for (const [o, c] of schedule[day]) {
    if (mins >= o && mins < c) return { open: true, until: c };
  }
  const next = schedule[day].find(([o]) => o > mins);
  return { open: false, next: next?.[0] };
}

function PhoneIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.3 1l-2.1 2.2z" />
    </svg>
  );
}
function MailIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}
function WaIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M17.47 14.38c-.3-.15-1.74-.86-2-.95-.27-.1-.46-.15-.66.15-.2.3-.76.95-.93 1.14-.17.2-.34.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.34.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.66-1.6-.9-2.18-.24-.57-.48-.5-.66-.5l-.56-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.74-.71 1.98-1.4.24-.68.24-1.27.17-1.39-.07-.12-.27-.2-.57-.35zM12.01 2a9.95 9.95 0 0 0-8.5 15.16L2 22l4.94-1.5A9.95 9.95 0 1 0 12.01 2z" />
    </svg>
  );
}

export default function Visit() {
  const { t, locale } = useI18n();
  const [sent, setSent] = useState(false);
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    setStatus(computeStatus(new Date()));
  }, []);

  const fieldClass =
    "w-full rounded-xl border border-line bg-cream px-4 py-3 text-ink placeholder:text-ink-soft/50 outline-none transition hover:border-ink/20 focus:border-chili";
  const waLink = `https://wa.me/${t.visit.phone.replace(/[^0-9]/g, "")}`;

  return (
    <section id="visit" className="bg-cream">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <div className="max-w-2xl">
          <Reveal>
            <p className="eyebrow text-chili">{t.visit.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display-lg mt-4 text-ink">{t.visit.title}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-base text-ink-soft">{t.visit.subtitle}</p>
          </Reveal>
        </div>

        {/* location + map */}
        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-12">
          <Reveal>
            <div className="flex h-full flex-col">
              {status && (
                <div className="inline-flex items-center gap-2 self-start rounded-full bg-paper px-3.5 py-1.5 text-sm font-medium text-ink ring-1 ring-line">
                  <span className={`relative flex h-2 w-2 ${status.open ? "text-forest" : "text-chili"}`}>
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-current" />
                  </span>
                  {status.open ? (
                    <>
                      {t.visit.open}
                      {status.until != null && (
                        <span className="text-ink-soft">
                          · {t.visit.closesAt} {fmt(status.until, locale)}
                        </span>
                      )}
                    </>
                  ) : (
                    <>
                      {t.visit.closed}
                      {status.next != null && (
                        <span className="text-ink-soft">
                          · {t.visit.opensAt} {fmt(status.next, locale)}
                        </span>
                      )}
                    </>
                  )}
                </div>
              )}

              <a href={MAP_DIR} target="_blank" rel="noreferrer" className="group mt-6 block">
                <span className="block font-display text-3xl leading-tight text-ink sm:text-4xl">
                  48 rue Legraverend
                  <br />
                  <span className="text-ink-soft">35000 Rennes</span>
                </span>
                <span className="mt-4 flex w-fit items-center gap-1.5 text-sm font-semibold text-chili">
                  {t.visit.directions}
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </a>

              <div className="mt-8 border-t border-line pt-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="eyebrow text-ink-soft">{t.visit.hoursTitle}</span>
                  <span className="rounded-full bg-forest/10 px-2.5 py-0.5 text-xs font-semibold text-forest">
                    {t.visit.everyDay}
                  </span>
                </div>
                <dl className="space-y-1">
                  {t.visit.hours.map(([d, h]) => (
                    <div
                      key={d}
                      className="flex items-baseline justify-between gap-4 rounded-lg px-3 py-2 text-sm text-ink-soft transition-colors hover:bg-cream-deep"
                    >
                      <dt className="font-medium text-ink">{d}</dt>
                      <dd className="text-right">{h}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="relative h-[360px] overflow-hidden rounded-[1.75rem] ring-1 ring-line sm:h-[460px] lg:h-full lg:min-h-[480px]">
              <iframe
                title="Google Maps — Nouilles Nouilles"
                src={MAP_EMBED}
                className="h-full w-full grayscale-[0.15]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 rounded-2xl bg-paper/95 px-4 py-3 shadow-lg backdrop-blur sm:right-auto">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🍜</span>
                  <div className="text-sm leading-tight">
                    <div className="font-display text-base text-ink">Nouilles Nouilles</div>
                    <div className="text-xs text-ink-soft">{ADDRESS}</div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* contact & private hire — bento */}
        <div className="mt-16 md:mt-24">
          <Reveal>
            <p className="eyebrow text-chili">{t.visit.contactTitle}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h3 className="display-lg mt-3 text-ink">
              {locale === "fr" ? "Parlons-en" : "Let's talk"}
            </h3>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-3 max-w-md text-base text-ink-soft">{t.visit.contactBody}</p>
          </Reveal>

          <div className="mt-8 grid gap-4 lg:grid-cols-12">
            {/* form card */}
            <Reveal delay={0.1} className="lg:col-span-7">
              <div className="h-full rounded-3xl border border-line bg-paper p-6 sm:p-8">
                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.div
                      key="ok"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex min-h-[320px] flex-col items-center justify-center gap-4 text-center"
                    >
                      <span className="grid h-14 w-14 place-items-center rounded-full bg-forest text-2xl text-paper">
                        ✓
                      </span>
                      <p className="max-w-sm text-ink-soft">{t.visit.cSuccess}</p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onSubmit={(e) => {
                        e.preventDefault();
                        const fd = new FormData(e.currentTarget);
                        fetch("/api/notify", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            type: "contact",
                            name: fd.get("name"),
                            email: fd.get("email"),
                            subject: fd.get("subject"),
                            message: fd.get("message"),
                          }),
                        }).catch(() => {});
                        setSent(true);
                      }}
                      className="space-y-4"
                    >
                      <p className="font-display text-xl text-ink">
                        {locale === "fr" ? "Écrivez-nous" : "Drop us a line"}
                      </p>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <input type="text" name="name" required placeholder={t.visit.cName} className={fieldClass} />
                        <input type="email" name="email" required placeholder={t.visit.cEmail} className={fieldClass} />
                      </div>
                      <select name="subject" required defaultValue="" className={fieldClass}>
                        <option value="" disabled>
                          {t.visit.cSubject}
                        </option>
                        {t.visit.cSubjectOptions.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                      <textarea
                        rows={4}
                        name="message"
                        required
                        placeholder={t.visit.cMessage}
                        className={fieldClass}
                      />
                      <button
                        type="submit"
                        className="w-full rounded-full bg-chili px-6 py-3.5 text-sm font-semibold text-paper transition hover:bg-chili-deep"
                      >
                        {t.visit.cSubmit}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>

            {/* action tiles — transparentes, sobres */}
            <div className="flex flex-col gap-4 lg:col-span-5">
              {[
                {
                  href: `tel:${t.visit.phone.replace(/\s/g, "")}`,
                  external: false,
                  icon: <PhoneIcon className="h-5 w-5" />,
                  label: t.visit.phoneTitle,
                  value: t.visit.phone,
                  delay: 0.15,
                },
                {
                  href: waLink,
                  external: true,
                  icon: <WaIcon className="h-6 w-6" />,
                  label: "WhatsApp",
                  value: locale === "fr" ? "Discuter en direct" : "Chat with us",
                  delay: 0.2,
                },
                {
                  href: `mailto:${t.visit.email}`,
                  external: false,
                  icon: <MailIcon className="h-5 w-5" />,
                  label: t.visit.emailTitle,
                  value: t.visit.email,
                  delay: 0.25,
                },
              ].map((tile) => (
                <Reveal key={tile.label} delay={tile.delay} className="flex-1">
                  <a
                    href={tile.href}
                    {...(tile.external ? { target: "_blank", rel: "noreferrer" } : {})}
                    className="group flex h-full items-center gap-4 rounded-3xl border border-line bg-transparent p-5 text-ink transition duration-300 hover:-translate-y-1 hover:border-ink/25 hover:bg-paper hover:shadow-[0_18px_40px_-24px_rgba(27,26,22,0.45)]"
                  >
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-cream-deep text-ink transition-colors duration-300 group-hover:bg-ink group-hover:text-paper">
                      {tile.icon}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs uppercase tracking-wider text-ink-soft">
                        {tile.label}
                      </span>
                      <span className="block truncate font-display text-lg text-ink">{tile.value}</span>
                    </span>
                    <span className="text-ink-soft transition-transform group-hover:translate-x-1">→</span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

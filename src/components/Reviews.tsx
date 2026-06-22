"use client";

import { useI18n } from "@/i18n/LanguageProvider";
import { reviews, reviewSummary } from "@/data/reviews";
import Reveal from "./Reveal";

function Stars({ rating }: { rating: number }) {
  return (
    <span className="text-sm tracking-tight text-[#f5a623]">
      {"★".repeat(Math.round(rating))}
      <span className="text-line">{"★".repeat(5 - Math.round(rating))}</span>
    </span>
  );
}

export default function Reviews() {
  const { t, locale } = useI18n();

  return (
    <section className="bg-cream-deep">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <Reveal>
              <p className="eyebrow text-chili">{t.reviews.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="display-lg mt-4 text-ink">{t.reviews.title}</h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="flex items-center gap-4 rounded-2xl border border-line bg-paper px-5 py-4">
              <div className="text-center">
                <div className="font-display text-4xl text-ink">{reviewSummary.rating}</div>
                <Stars rating={reviewSummary.rating} />
              </div>
              <div className="h-10 w-px bg-line" />
              <div className="text-sm text-ink-soft">
                <div className="flex items-center gap-1.5 font-semibold text-ink">
                  <GoogleG /> Google
                </div>
                {reviewSummary.count} {locale === "fr" ? "avis" : "reviews"}
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={i} delay={(i % 3) * 0.08}>
              <figure className="flex h-full flex-col rounded-3xl border border-line bg-paper p-6">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-chili/10 font-semibold text-chili">
                    {r.initials}
                  </div>
                  <div>
                    <figcaption className="text-sm font-semibold text-ink">{r.author}</figcaption>
                    <div className="text-xs text-ink-soft">{r.date[locale]}</div>
                  </div>
                  <span className="ml-auto">
                    <GoogleG />
                  </span>
                </div>
                <Stars rating={r.rating} />
                <blockquote className="mt-3 text-sm leading-relaxed text-ink-soft">
                  “{r.text[locale]}”
                </blockquote>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function GoogleG() {
  return (
    <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden>
      <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
      <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
      <path fill="#FBBC05" d="M11.69 28.18c-.44-1.32-.69-2.73-.69-4.18s.25-2.86.69-4.18v-5.7H4.34A21.99 21.99 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z" />
      <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
    </svg>
  );
}

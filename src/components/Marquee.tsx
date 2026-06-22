"use client";

import { useI18n } from "@/i18n/LanguageProvider";

export default function Marquee() {
  const { t } = useI18n();
  const items = t.marquee;
  const doubled = [...items, ...items];

  return (
    <div className="border-y border-line bg-transparent py-3.5 text-ink">
      <div className="flex overflow-hidden">
        <div className="marquee-track flex shrink-0 items-center whitespace-nowrap">
          {doubled.map((item, i) => (
            <span key={i} className="flex items-center">
              <span className="font-display text-lg italic">{item}</span>
              <span className="mx-6 text-base text-chili/70">✶</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

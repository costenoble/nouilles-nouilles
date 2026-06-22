"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/i18n/LanguageProvider";
import {
  categoryOrder,
  allergenLabels,
  type Category,
  type Dish,
} from "@/data/menu";
import { useStore } from "@/store/store";
import Reveal from "./Reveal";

function price(value: number, locale: "fr" | "en") {
  return new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-IE", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

/* refined inline icons — no emoji */
function Flame({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2c1 3-1.5 4.2-1.5 7 0 1.4 1 2.2 1 2.2s.8-1 .8-2.4c2 1.3 3.2 3.4 3.2 5.6A5.5 5.5 0 1 1 7 14c0-2.4 1.6-4 2.7-5.6C11 6.6 12 4.7 12 2z" />
    </svg>
  );
}
function Leaf({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M5 19c0-7 5-12 14-13 .5 6-2 13-11 13-1 0-2-.2-3-.5.5-3 2.5-5.5 6-7-4 1-6 3.5-6 7.5z" />
    </svg>
  );
}

/* decorative noodle lines for the photo-less preview tiles */
function NoodleArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 120" className={className} fill="none" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          d={`M-10 ${20 + i * 20} C 40 ${10 + i * 20}, 80 ${
            34 + i * 20
          }, 120 ${20 + i * 20} S 200 ${10 + i * 20}, 220 ${22 + i * 20}`}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          opacity={0.5}
        />
      ))}
    </svg>
  );
}

const tile: Record<Category, { bg: string; fg: string }> = {
  noodles: { bg: "bg-chili", fg: "text-paper" },
  soups: { bg: "bg-forest", fg: "text-paper" },
  starters: { bg: "bg-porcelain", fg: "text-paper" },
  desserts: { bg: "bg-peach", fg: "text-ink" },
};

function Preview({ dish }: { dish: Dish }) {
  const { t, locale } = useI18n();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={dish.id}
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        {dish.image ? (
          <>
            <Image
              src={dish.image}
              alt={dish.name[locale]}
              fill
              sizes="(max-width:1024px) 100vw, 45vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
          </>
        ) : (
          <div className={`absolute inset-0 ${tile[dish.category].bg}`}>
            <NoodleArt
              className={`absolute bottom-10 left-0 h-40 w-full ${tile[dish.category].fg} opacity-40`}
            />
          </div>
        )}

        <div
          className={`absolute inset-0 flex flex-col justify-end p-7 sm:p-9 ${
            dish.image
              ? "text-paper [text-shadow:0_2px_18px_rgba(0,0,0,0.55)]"
              : tile[dish.category].fg
          }`}
        >
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`text-xs font-bold uppercase tracking-[0.22em] ${
                dish.image ? "text-peach" : ""
              }`}
            >
              {t.categories[dish.category]}
            </span>
            {dish.signature && (
              <span
                className={`rounded-full px-2.5 py-0.5 text-[0.62rem] font-bold uppercase tracking-wider [text-shadow:none] ${
                  dish.image ? "bg-peach text-ink" : "bg-current/20"
                }`}
              >
                ★ Signature
              </span>
            )}
          </div>
          <h3 className="mt-2.5 font-display text-4xl font-semibold leading-[1.03] sm:text-5xl">
            {dish.name[locale]}
          </h3>
          <p className="mt-3 max-w-md text-base font-medium leading-relaxed opacity-95 sm:text-[1.05rem]">
            {dish.desc[locale]}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
            <span className="font-display text-2xl font-semibold">{price(dish.price, locale)}</span>
            {dish.veg && (
              <span className="inline-flex items-center gap-1 opacity-90">
                <Leaf className="h-3.5 w-3.5" /> {t.menu.vegLabel}
              </span>
            )}
            {!!dish.spicy && (
              <span className="inline-flex items-center gap-0.5 opacity-90">
                {Array.from({ length: dish.spicy }).map((_, i) => (
                  <Flame key={i} className="h-3.5 w-3.5" />
                ))}
              </span>
            )}
          </div>

          <div className="mt-4 border-t border-current/20 pt-3 text-[0.7rem] opacity-80">
            <span className="uppercase tracking-wider">{t.menu.allergensLabel}: </span>
            {dish.allergens.length
              ? dish.allergens.map((a) => allergenLabels[a][locale]).join(" · ")
              : locale === "fr"
                ? "aucun majeur"
                : "none major"}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Menu() {
  const { t, locale } = useI18n();
  const { menu } = useStore();
  const [active, setActive] = useState<Category | "all">("all");
  const [vegOnly, setVegOnly] = useState(false);

  const filtered = useMemo(
    () =>
      menu.filter(
        (d) => (active === "all" || d.category === active) && (!vegOnly || d.veg)
      ),
    [menu, active, vegOnly]
  );

  const [activeId, setActiveId] = useState<string>("");
  const current =
    filtered.find((d) => d.id === activeId) ??
    menu.find((d) => d.signature) ??
    filtered[0] ??
    menu[0];

  const selectFilter = (c: Category | "all") => {
    setActive(c);
    const next = menu.find(
      (d) => (c === "all" || d.category === c) && (!vegOnly || d.veg)
    );
    if (next) setActiveId(next.id);
  };

  return (
    <section id="menu" className="bg-cream-deep">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        {/* header */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <Reveal>
              <p className="eyebrow text-chili">{t.menu.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="display-lg mt-4 text-ink">
                {t.menu.title} <span className="italic text-chili">{t.menu.titleItalic}</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 max-w-xl text-base text-ink-soft">{t.menu.intro}</p>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <div className="flex items-center gap-3 self-start rounded-2xl border border-line bg-paper px-4 py-3">
              <svg viewBox="0 0 24 24" className="h-7 w-7 text-ink" fill="currentColor" aria-hidden>
                <path d="M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm10-2h2v2h-2v-2zm4 0h2v2h-2v-2zm-4 4h2v2h-2v-2zm4 0h2v6h-2v-2h-2v-2h2v-2zm-4 4h2v2h-2v-2z" />
              </svg>
              <div className="text-xs leading-tight text-ink-soft">
                <div className="font-semibold text-ink">{t.menu.downloadQr}</div>
                {locale === "fr" ? "à scanner à table" : "scan at the table"}
              </div>
            </div>
          </Reveal>
        </div>

        {/* filters */}
        <div className="mt-12 flex flex-wrap items-center gap-2.5">
          {(["all", ...categoryOrder] as const).map((c) => (
            <button
              key={c}
              onClick={() => selectFilter(c)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                active === c
                  ? "border-ink bg-ink text-paper"
                  : "border-line bg-paper text-ink-soft hover:border-ink/30"
              }`}
            >
              {c === "all" ? t.menu.filterAll : t.categories[c]}
            </button>
          ))}
          <button
            onClick={() => setVegOnly((v) => !v)}
            className={`ml-auto inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition ${
              vegOnly
                ? "border-forest bg-forest text-paper"
                : "border-line bg-paper text-ink-soft hover:border-forest/40"
            }`}
          >
            <Leaf className="h-4 w-4" /> {t.menu.vegLabel}
          </button>
        </div>

        {/* immersive split: sticky preview + list */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[0.85fr_1fr] lg:gap-12">
          <Reveal className="lg:order-1">
            <div className="relative h-[360px] overflow-hidden rounded-[1.75rem] ring-1 ring-black/5 sm:h-[440px] lg:sticky lg:top-28 lg:h-[70vh]">
              <Preview dish={current} />
            </div>
          </Reveal>

          <div className="lg:order-2">
            <ul className="divide-y divide-line/80 border-t border-line/80">
              <AnimatePresence initial={false}>
                {filtered.map((d) => {
                  const isActive = current.id === d.id;
                  return (
                    <motion.li
                      key={d.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35 }}
                    >
                      <button
                        onMouseEnter={() => setActiveId(d.id)}
                        onFocus={() => setActiveId(d.id)}
                        onClick={() => setActiveId(d.id)}
                        className="group flex w-full items-center gap-4 py-5 text-left"
                      >
                        <span
                          className={`hidden h-px shrink-0 bg-chili transition-all duration-300 sm:block ${
                            isActive ? "w-8" : "w-0"
                          }`}
                        />
                        <span className="min-w-0 flex-1">
                          <span className="flex items-baseline justify-between gap-4">
                            <span
                              className={`font-display text-xl leading-tight transition-colors sm:text-2xl ${
                                isActive ? "text-chili" : "text-ink"
                              }`}
                            >
                              {d.name[locale]}
                            </span>
                            <span className="shrink-0 font-display text-lg text-ink">
                              {price(d.price, locale)}
                            </span>
                          </span>
                          <span className="mt-1 flex items-center gap-3 text-xs text-ink-soft">
                            {d.veg && <Leaf className="h-3.5 w-3.5 text-forest" />}
                            {!!d.spicy &&
                              Array.from({ length: d.spicy }).map((_, i) => (
                                <Flame key={i} className="-ml-2.5 h-3.5 w-3.5 text-chili first:ml-0" />
                              ))}
                            <span className="truncate">{d.desc[locale]}</span>
                          </span>
                        </span>
                      </button>
                    </motion.li>
                  );
                })}
              </AnimatePresence>
            </ul>

            <p className="mt-8 max-w-md text-sm leading-relaxed text-ink-soft">
              {t.menu.noteAllergen}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

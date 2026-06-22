"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/i18n/LanguageProvider";
import Logo from "./Logo";

const links = [
  { href: "#menu", key: "menu" },
  { href: "#gallery", key: "gallery" },
  { href: "#visit", key: "visit" },
] as const;

export default function Nav() {
  const { t, locale, setLocale } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-cream/85 backdrop-blur-md border-b border-line/70"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <a href="#top" className="group">
            <Logo size="text-xl sm:text-2xl" />
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <a
                key={l.key}
                href={l.href}
                className="link-underline text-sm font-medium text-ink-soft hover:text-ink"
              >
                {t.nav[l.key]}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center rounded-full border border-line bg-paper/60 p-0.5 text-xs font-semibold sm:flex">
              {(["fr", "en"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLocale(l)}
                  className={`rounded-full px-2.5 py-1 uppercase transition ${
                    locale === l ? "bg-ink text-paper" : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            <a
              href="#reservation"
              className="hidden rounded-full bg-chili px-5 py-2.5 text-sm font-semibold text-paper transition hover:bg-chili-deep md:inline-block"
            >
              {t.nav.reserveCta}
            </a>

            <button
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-paper/60 md:hidden"
            >
              <div className="space-y-1.5">
                <span
                  className={`block h-px w-5 bg-ink transition ${open ? "translate-y-[3px] rotate-45" : ""}`}
                />
                <span
                  className={`block h-px w-5 bg-ink transition ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
                />
              </div>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[68px] z-40 mx-4 rounded-3xl border border-line bg-paper p-6 shadow-xl md:hidden"
          >
            <div className="flex flex-col gap-4">
              {links.map((l) => (
                <a
                  key={l.key}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-2xl text-ink"
                >
                  {t.nav[l.key]}
                </a>
              ))}
              <a
                href="#reservation"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-full bg-chili px-5 py-3 text-center text-sm font-semibold text-paper"
              >
                {t.nav.reserveCta}
              </a>
              <div className="mt-2 flex items-center gap-2 self-start rounded-full border border-line p-0.5 text-xs font-semibold">
                {(["fr", "en"] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLocale(l)}
                    className={`rounded-full px-3 py-1 uppercase ${
                      locale === l ? "bg-ink text-paper" : "text-ink-soft"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

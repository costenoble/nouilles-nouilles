"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/i18n/LanguageProvider";
import Reveal from "./Reveal";

export default function Newsletter() {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);

  return (
    <section className="bg-cream pb-24 md:pb-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-ink px-6 py-14 text-paper md:px-16 md:py-20">
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-20 blur-2xl"
              style={{ background: "var(--color-chili)" }}
            />
            <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="eyebrow text-peach">{t.newsletter.eyebrow}</p>
                <h2 className="display-lg mt-4 max-w-md text-paper">{t.newsletter.title}</h2>
                <p className="mt-4 max-w-sm text-paper/70">{t.newsletter.body}</p>
              </div>

              <div className="lg:justify-self-end lg:pl-8">
                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.p
                      key="ok"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 rounded-2xl bg-peach/15 p-5 text-peach"
                    >
                      <span className="text-xl">✓</span>
                      {t.newsletter.success}
                    </motion.p>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onSubmit={(e) => {
                        e.preventDefault();
                        setSent(true);
                      }}
                      className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
                    >
                      <input
                        type="email"
                        required
                        placeholder={t.newsletter.placeholder}
                        className="w-full rounded-full border border-paper/25 bg-paper/5 px-5 py-3.5 text-paper placeholder:text-paper/40 outline-none transition focus:border-peach"
                      />
                      <button
                        type="submit"
                        className="shrink-0 rounded-full bg-peach px-6 py-3.5 text-sm font-semibold text-ink transition hover:bg-paper"
                      >
                        {t.newsletter.submit}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

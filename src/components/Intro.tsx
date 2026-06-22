"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useI18n } from "@/i18n/LanguageProvider";
import Reveal from "./Reveal";

export default function Intro() {
  const { t } = useI18n();
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-11%", "11%"]);

  return (
    <section id="intro" className="bg-cream py-8 md:py-12">
      {/* green "Notre maison" card */}
      <div className="mx-[15px] overflow-hidden rounded-[2%] bg-forest text-paper">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 md:px-14 md:py-32">
          <Reveal>
            <p className="eyebrow text-peach">{t.intro.eyebrow}</p>
          </Reveal>

          <div className="mt-10 grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <Reveal delay={0.05}>
              <h2 className="display-lg max-w-3xl text-paper">{t.intro.title}</h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="max-w-md text-base leading-relaxed text-paper/80">
                {t.intro.body}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div
              ref={imgRef}
              className="relative mt-14 aspect-[16/7] w-full overflow-hidden rounded-3xl"
            >
              <motion.div style={{ y }} className="absolute inset-x-0 -top-[13%] h-[126%]">
                <Image
                  src="/gallery/gyoza.jpg"
                  alt=""
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/40 to-transparent" />
            </div>
          </Reveal>
        </div>
      </div>

      {/* savoir-faire — below the card, on cream */}
      <div className="mx-auto mt-14 max-w-7xl px-5 md:mt-20 md:px-8">
        <Reveal>
          <p className="eyebrow text-center text-chili">{t.intro.stepsTitle}</p>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {t.intro.steps.map((s, i) => (
            <Reveal key={i} delay={i * 0.12}>
              <div className="group flex h-full flex-col items-center px-6 py-8 text-center sm:py-2">
                <span className="font-display text-4xl text-chili/60 transition-colors group-hover:text-chili">
                  {s.n}
                </span>
                <span className="mt-3 font-display text-2xl text-ink">{s.t}</span>
                <p className="mt-3 max-w-[26ch] text-sm leading-relaxed text-ink-soft">
                  {s.d}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

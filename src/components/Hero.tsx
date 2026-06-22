"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useI18n } from "@/i18n/LanguageProvider";

type Bowl = {
  src: string;
  size: number; // px at desktop
  top: string;
  left: string;
  r: number;
  dur: number;
  delay: number;
  mobile?: boolean; // show on mobile
};

const bowls: Bowl[] = [
  { src: "/dishes/nouilles-sautees.jpg", size: 168, top: "16%", left: "7%", r: -7, dur: 7.5, delay: 0, mobile: true },
  { src: "/dishes/poulet-croustillant.jpg", size: 150, top: "60%", left: "80%", r: 6, dur: 8.5, delay: 0.6, mobile: true },
  { src: "/dishes/pho-boeuf.jpg", size: 124, top: "63%", left: "10%", r: 5, dur: 7, delay: 1.1 },
  { src: "/dishes/gyoza.jpg", size: 132, top: "18%", left: "79%", r: 9, dur: 6.8, delay: 0.3 },
  { src: "/dishes/pho-boeuf.jpg", size: 78, top: "8%", left: "44%", r: -4, dur: 6, delay: 0.9, mobile: true },
  { src: "/dishes/gyoza.jpg", size: 88, top: "78%", left: "46%", r: 7, dur: 7.8, delay: 0.2 },
  { src: "/dishes/nouilles-sautees.jpg", size: 70, top: "40%", left: "92%", r: -8, dur: 6.4, delay: 1.4 },
];

export default function Hero() {
  const { t } = useI18n();
  const constraintsRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="top"
      ref={constraintsRef}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden pt-24"
    >
      {/* soft radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 42%, rgba(248,246,238,0.9), rgba(243,240,230,0) 70%)",
        }}
      />

      {/* floating bowls */}
      {bowls.map((b, i) => (
        <motion.div
          key={i}
          drag
          dragConstraints={constraintsRef}
          dragElastic={0.35}
          dragMomentum={true}
          whileTap={{ scale: 1.08, cursor: "grabbing" }}
          whileHover={{ scale: 1.06 }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 + i * 0.09, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={`absolute z-10 cursor-grab touch-none ${b.mobile ? "" : "hidden md:block"}`}
          style={{ top: b.top, left: b.left }}
        >
          <div
            className="float-bowl bowl-shadow"
            style={
              {
                "--dur": `${b.dur}s`,
                "--delay": `${b.delay}s`,
                "--r": `${b.r}deg`,
              } as React.CSSProperties
            }
          >
            <div
              className="relative overflow-hidden rounded-full ring-1 ring-black/5"
              style={{
                width: `clamp(${b.size * 0.6}px, ${b.size / 12}vw, ${b.size}px)`,
                height: `clamp(${b.size * 0.6}px, ${b.size / 12}vw, ${b.size}px)`,
              }}
            >
              <Image
                src={b.src}
                alt=""
                fill
                sizes="200px"
                className="object-cover"
                draggable={false}
                priority={i < 3}
              />
            </div>
          </div>
        </motion.div>
      ))}

      {/* center content */}
      <div className="relative z-20 mx-auto max-w-3xl px-5 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="eyebrow mb-6 text-chili"
        >
          {t.hero.tag}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="display-xl text-ink"
        >
          {t.hero.title}
          <br />
          <span className="italic text-chili">{t.hero.titleItalic}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mx-auto mt-7 max-w-xl text-base text-ink-soft sm:text-lg"
        >
          {t.hero.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.7 }}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a
            href="#menu"
            className="w-full rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-paper transition hover:bg-ink-soft sm:w-auto"
          >
            {t.hero.ctaPrimary}
          </a>
          <a
            href="#reservation"
            className="w-full rounded-full border border-ink/20 bg-paper/70 px-7 py-3.5 text-sm font-semibold text-ink backdrop-blur transition hover:border-ink/40 sm:w-auto"
          >
            {t.hero.ctaSecondary}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-10 inline-flex items-center gap-2 rounded-full border border-line bg-paper/60 px-4 py-1.5 text-xs font-medium text-ink-soft backdrop-blur"
        >
          <span className="grid grid-cols-3 gap-[3px]">
            {Array.from({ length: 9 }).map((_, i) => (
              <span key={i} className="h-[3px] w-[3px] rounded-full bg-chili" />
            ))}
          </span>
          {t.hero.hint}
        </motion.div>
      </div>

      {/* scroll cue */}
      <a
        href="#intro"
        className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-[0.65rem] uppercase tracking-[0.25em] text-ink-soft"
      >
        {t.hero.scroll}
        <motion.span
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="block h-8 w-px bg-ink-soft/50"
        />
      </a>
    </section>
  );
}

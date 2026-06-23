"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useI18n } from "@/i18n/LanguageProvider";

type Bowl = {
  src: string;
  size: number;
  top: string;
  left: string;
  r: number;
  dur: number;
  delay: number;
  fixed?: boolean; // fixed px size (mobile) instead of responsive clamp
};

// Desktop: positions hugging the edges so the central column stays clear.
const desktopBowls: Bowl[] = [
  { src: "/dishes/nouilles-sautees.jpg", size: 168, top: "15%", left: "5%", r: -7, dur: 7.5, delay: 0 },
  { src: "/dishes/poulet-croustillant.jpg", size: 150, top: "16%", left: "82%", r: 6, dur: 8.5, delay: 0.6 },
  { src: "/dishes/pho-boeuf.jpg", size: 124, top: "66%", left: "7%", r: 5, dur: 7, delay: 1.1 },
  { src: "/dishes/gyoza.jpg", size: 132, top: "63%", left: "83%", r: 9, dur: 6.8, delay: 0.3 },
  { src: "/dishes/pho-boeuf.jpg", size: 78, top: "11%", left: "24%", r: -4, dur: 6, delay: 0.9 },
  { src: "/dishes/gyoza.jpg", size: 88, top: "82%", left: "20%", r: 7, dur: 7.8, delay: 0.2 },
  { src: "/dishes/nouilles-sautees.jpg", size: 70, top: "84%", left: "80%", r: -8, dur: 6.4, delay: 1.4 },
];

// Mobile: 4 small bowls fully inside the screen, in the corners, clear of the text.
const mobileBowls: Bowl[] = [
  { src: "/dishes/nouilles-sautees.jpg", size: 74, top: "9%", left: "5%", r: -6, dur: 7, delay: 0, fixed: true },
  { src: "/dishes/gyoza.jpg", size: 66, top: "10%", left: "63%", r: 7, dur: 7.5, delay: 0.25, fixed: true },
  { src: "/dishes/pho-boeuf.jpg", size: 64, top: "85%", left: "7%", r: 5, dur: 6.5, delay: 0.5, fixed: true },
  { src: "/dishes/poulet-croustillant.jpg", size: 76, top: "86%", left: "60%", r: -6, dur: 8, delay: 0.75, fixed: true },
];

export default function Hero() {
  const { t } = useI18n();
  const constraintsRef = useRef<HTMLDivElement>(null);

  const renderBowl = (b: Bowl, key: string, vis: string, priority: boolean) => {
    const dim = b.fixed
      ? `${b.size}px`
      : `clamp(${b.size * 0.6}px, ${b.size / 12}vw, ${b.size}px)`;
    return (
      <motion.div
        key={key}
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.35}
        dragMomentum
        whileTap={{ scale: 1.08, cursor: "grabbing" }}
        whileHover={{ scale: 1.06 }}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 + b.delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`absolute z-10 cursor-grab touch-none ${vis}`}
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
            style={{ width: dim, height: dim }}
          >
            <Image
              src={b.src}
              alt=""
              fill
              sizes="200px"
              className="object-cover"
              draggable={false}
              priority={priority}
            />
          </div>
        </div>
      </motion.div>
    );
  };

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
      {desktopBowls.map((b, i) => renderBowl(b, `d${i}`, "hidden md:block", i < 3))}
      {mobileBowls.map((b, i) => renderBowl(b, `m${i}`, "md:hidden", i < 2))}

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
      </div>
    </section>
  );
}

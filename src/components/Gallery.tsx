"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/i18n/LanguageProvider";
import { useStore } from "@/store/store";
import Reveal from "./Reveal";

export default function Gallery() {
  const { t, locale } = useI18n();
  const { gallery } = useStore();
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="gallery" className="bg-cream">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <div className="max-w-xl">
          <Reveal>
            <p className="eyebrow text-chili">{t.gallery.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display-lg mt-4 text-ink">{t.gallery.title}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-base text-ink-soft">{t.gallery.body}</p>
          </Reveal>
        </div>

        <div className="mt-12 columns-2 gap-4 lg:columns-3 [&>*]:mb-4">
          {gallery.map((img, i) => (
            <Reveal key={img.id} delay={(i % 3) * 0.06}>
              <button
                onClick={() => setOpen(img.src)}
                className="group relative block w-full overflow-hidden rounded-3xl"
              >
                <Image
                  src={img.src}
                  alt={img[locale]}
                  width={800}
                  height={i % 4 === 0 ? 1000 : i % 3 === 0 ? 650 : 800}
                  sizes="(max-width:1024px) 50vw, 33vw"
                  unoptimized={img.src.startsWith("data:")}
                  className="h-auto w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                <span className="absolute bottom-4 left-4 translate-y-2 font-display text-lg text-paper opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                  {img[locale]}
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/80 p-6 backdrop-blur"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="relative h-[70vh] w-full max-w-3xl overflow-hidden rounded-3xl"
            >
              <Image
                src={open}
                alt=""
                fill
                sizes="80vw"
                unoptimized={open.startsWith("data:")}
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

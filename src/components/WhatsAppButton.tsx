"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/i18n/LanguageProvider";

const PHONE = "33600000000"; // démo

export default function WhatsAppButton() {
  const { t } = useI18n();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const href = `https://wa.me/${PHONE}?text=${encodeURIComponent(t.whatsapp.prefill)}`;

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={t.whatsapp.label}
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group fixed bottom-5 right-5 z-50 flex items-center gap-0 overflow-hidden rounded-full bg-[#25D366] py-3.5 pl-3.5 pr-3.5 text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,0.6)] transition-all hover:pr-5"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M17.47 14.38c-.3-.15-1.74-.86-2-.95-.27-.1-.46-.15-.66.15-.2.3-.76.95-.93 1.14-.17.2-.34.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.34.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.66-1.6-.9-2.18-.24-.57-.48-.5-.66-.5l-.56-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.74-.71 1.98-1.4.24-.68.24-1.27.17-1.39-.07-.12-.27-.2-.57-.35zM12.01 2a9.95 9.95 0 0 0-8.5 15.16L2 22l4.94-1.5A9.95 9.95 0 1 0 12.01 2zm0 18.13c-1.5 0-2.97-.4-4.25-1.16l-.3-.18-2.93.89.9-2.86-.2-.31a8.07 8.07 0 1 1 6.78 3.62z" />
          </svg>
          <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-300 group-hover:ml-2 group-hover:max-w-[200px] group-hover:opacity-100">
            {t.whatsapp.label}
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}

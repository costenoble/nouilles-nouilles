"use client";

import { useI18n } from "@/i18n/LanguageProvider";
import Logo from "./Logo";

const navLinks = [
  { href: "#menu", key: "menu" },
  { href: "#reservation", key: "reservation" },
  { href: "#gallery", key: "gallery" },
  { href: "#visit", key: "visit" },
] as const;

export default function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-forest-deep text-paper">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Logo size="text-2xl sm:text-3xl" tone="text-paper" accent="text-peach" />
            <p className="mt-4 max-w-xs text-sm text-paper/60">{t.footer.tagline}</p>
            <p className="mt-4 text-sm text-paper/80">
              48 rue Legraverend
              <br />
              35000 Rennes
            </p>
          </div>

          <div>
            <div className="eyebrow text-peach">{t.footer.sections}</div>
            <ul className="mt-4 space-y-2.5 text-sm">
              {navLinks.map((l) => (
                <li key={l.key}>
                  <a href={l.href} className="link-underline text-paper/80 hover:text-paper">
                    {t.nav[l.key]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="eyebrow text-peach">{t.footer.follow}</div>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href="#" className="link-underline text-paper/80 hover:text-paper">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="link-underline text-paper/80 hover:text-paper">
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/33600000000"
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline text-paper/80 hover:text-paper"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-paper/15 pt-6 text-xs text-paper/50 sm:flex-row sm:items-center">
          <span>
            © {year} Nouilles Nouilles — {t.footer.rights}
          </span>
          <span>
            {t.footer.made} ·{" "}
            <a href="/admin" className="link-underline hover:text-paper">
              Admin
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

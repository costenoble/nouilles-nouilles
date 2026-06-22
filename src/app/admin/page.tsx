"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthed, logout } from "@/lib/adminAuth";
import { useStore } from "@/store/store";
import AdminReservations from "@/components/admin/AdminReservations";
import AdminMenu from "@/components/admin/AdminMenu";
import AdminGallery from "@/components/admin/AdminGallery";
import Logo from "@/components/Logo";

type Tab = "reservations" | "menu" | "gallery";

const tabs: { id: Tab; label: string }[] = [
  { id: "reservations", label: "Réservations" },
  { id: "menu", label: "Carte & prix" },
  { id: "gallery", label: "Galerie" },
];

export default function AdminDashboard() {
  const router = useRouter();
  const { resetAll } = useStore();
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState<Tab>("reservations");

  useEffect(() => {
    if (!isAuthed()) {
      router.replace("/admin/login");
    } else {
      setReady(true);
    }
  }, [router]);

  if (!ready) return <div className="min-h-[100svh] bg-cream" />;

  return (
    <div className="min-h-[100svh] bg-cream">
      {/* top bar */}
      <header className="sticky top-0 z-40 border-b border-line bg-cream/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5">
          <div className="flex items-center gap-2">
            <Logo size="text-lg sm:text-xl" />
            <span className="ml-1 rounded-full bg-ink px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-paper">
              Admin
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              className="hidden rounded-full border border-line px-4 py-2 text-sm font-medium text-ink-soft transition hover:border-ink/30 sm:inline-block"
            >
              Voir le site ↗
            </a>
            <button
              onClick={() => {
                if (confirm("Réinitialiser toutes les données de démo ?")) resetAll();
              }}
              className="rounded-full border border-line px-3 py-2 text-xs font-medium text-ink-soft transition hover:border-ink/30"
            >
              Réinitialiser
            </button>
            <button
              onClick={() => {
                logout();
                router.replace("/admin/login");
              }}
              className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper transition hover:bg-ink-soft"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-8">
        <h1 className="font-display text-3xl text-ink">Tableau de bord</h1>

        {/* tabs */}
        <div className="mt-6 flex gap-1 rounded-full border border-line bg-paper p-1">
          {tabs.map((tb) => (
            <button
              key={tb.id}
              onClick={() => setTab(tb.id)}
              className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${
                tab === tb.id ? "bg-ink text-paper" : "text-ink-soft hover:text-ink"
              }`}
            >
              {tb.label}
            </button>
          ))}
        </div>

        <div className="mt-8">
          {tab === "reservations" && <AdminReservations />}
          {tab === "menu" && <AdminMenu />}
          {tab === "gallery" && <AdminGallery />}
        </div>
      </main>
    </div>
  );
}

"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { menu as seedMenu, type Dish } from "@/data/menu";

export type ReservationStatus = "pending" | "confirmed" | "declined";

export type Reservation = {
  id: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  guests: number;
  name: string;
  phone: string;
  email: string;
  notes?: string;
  status: ReservationStatus;
  createdAt: number;
};

export type GalleryImage = {
  id: string;
  src: string;
  fr: string;
  en: string;
};

export type Settings = { totalTables: number };

type StoreState = {
  menu: Dish[];
  gallery: GalleryImage[];
  reservations: Reservation[];
  settings: Settings;
};

const seedGallery: GalleryImage[] = [
  { id: "g1", src: "/gallery/poulet-croustillant.jpg", fr: "Bol de poulet croustillant", en: "Crispy chicken bowl" },
  { id: "g2", src: "/gallery/gyoza.jpg", fr: "Gyozas poêlés", en: "Pan-fried gyoza" },
  { id: "g3", src: "/gallery/pho-boeuf.jpg", fr: "Phở bœuf", en: "Beef phở" },
  { id: "g4", src: "/gallery/nouilles-sautees.jpg", fr: "Nouilles sautées", en: "Stir-fried noodles" },
];

function iso(d: Date) {
  return d.toISOString().split("T")[0];
}

function seedReservations(): Reservation[] {
  const today = new Date();
  const tmr = new Date();
  tmr.setDate(tmr.getDate() + 1);
  return [
    { id: "r1", date: iso(today), time: "12:30", guests: 4, name: "Marc Petit", phone: "06 12 34 56 78", email: "marc.petit@email.fr", status: "confirmed", createdAt: Date.now() - 86400000, notes: "Près de la fenêtre si possible" },
    { id: "r2", date: iso(today), time: "20:00", guests: 2, name: "Julie Martin", phone: "06 98 76 54 32", email: "julie.m@email.fr", status: "pending", createdAt: Date.now() - 7200000 },
    { id: "r3", date: iso(today), time: "21:00", guests: 6, name: "Liam O'Brien", phone: "07 11 22 33 44", email: "liam.ob@email.fr", status: "pending", createdAt: Date.now() - 3600000, notes: "Anniversaire 🎉" },
    { id: "r4", date: iso(tmr), time: "19:30", guests: 3, name: "Sophie Durand", phone: "06 55 44 33 22", email: "sophie.d@email.fr", status: "confirmed", createdAt: Date.now() - 1800000 },
    { id: "r5", date: iso(tmr), time: "13:00", guests: 2, name: "Hugo Lefevre", phone: "06 00 11 22 33", email: "hugo.l@email.fr", status: "declined", createdAt: Date.now() - 900000 },
  ];
}

function defaults(): StoreState {
  return {
    menu: seedMenu,
    gallery: seedGallery,
    reservations: seedReservations(),
    settings: { totalTables: 14 },
  };
}

type StoreCtx = StoreState & {
  loaded: boolean;
  addReservation: (r: Omit<Reservation, "id" | "status" | "createdAt">) => void;
  setReservationStatus: (id: string, status: ReservationStatus) => void;
  deleteReservation: (id: string) => void;
  updateDish: (id: string, patch: Partial<Dish>) => void;
  addDish: (dish: Dish) => void;
  deleteDish: (id: string) => void;
  addGalleryImage: (img: Omit<GalleryImage, "id">) => void;
  removeGalleryImage: (id: string) => void;
  setSettings: (patch: Partial<Settings>) => void;
  resetAll: () => void;
};

const Ctx = createContext<StoreCtx | null>(null);
const KEY = "nn-store-v1";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<StoreState>(defaults);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setState({ ...defaults(), ...JSON.parse(raw) });
    } catch {
      /* ignore */
    }
    setLoaded(true);
  }, []);

  const persist = useCallback((next: StoreState) => {
    setState(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }, []);

  const update = useCallback(
    (fn: (s: StoreState) => StoreState) => setState((prev) => {
      const next = fn(prev);
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    }),
    []
  );

  const value: StoreCtx = {
    ...state,
    loaded,
    addReservation: (r) =>
      update((s) => ({
        ...s,
        reservations: [
          {
            ...r,
            id: crypto.randomUUID(),
            status: "pending",
            createdAt: Date.now(),
          },
          ...s.reservations,
        ],
      })),
    setReservationStatus: (id, status) =>
      update((s) => ({
        ...s,
        reservations: s.reservations.map((r) =>
          r.id === id ? { ...r, status } : r
        ),
      })),
    deleteReservation: (id) =>
      update((s) => ({
        ...s,
        reservations: s.reservations.filter((r) => r.id !== id),
      })),
    updateDish: (id, patch) =>
      update((s) => ({
        ...s,
        menu: s.menu.map((d) => (d.id === id ? { ...d, ...patch } : d)),
      })),
    addDish: (dish) => update((s) => ({ ...s, menu: [...s.menu, dish] })),
    deleteDish: (id) =>
      update((s) => ({ ...s, menu: s.menu.filter((d) => d.id !== id) })),
    addGalleryImage: (img) =>
      update((s) => ({
        ...s,
        gallery: [...s.gallery, { ...img, id: crypto.randomUUID() }],
      })),
    removeGalleryImage: (id) =>
      update((s) => ({
        ...s,
        gallery: s.gallery.filter((g) => g.id !== id),
      })),
    setSettings: (patch) =>
      update((s) => ({ ...s, settings: { ...s.settings, ...patch } })),
    resetAll: () => persist(defaults()),
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}

/** Tables used / remaining for a given date (1 reservation = 1 table, declined excluded). */
export function tablesForDate(
  reservations: Reservation[],
  settings: Settings,
  date: string
) {
  const used = reservations.filter(
    (r) => r.date === date && r.status !== "declined"
  ).length;
  return { used, total: settings.totalTables, left: Math.max(0, settings.totalTables - used) };
}

"use client";

import { useMemo, useState } from "react";
import {
  useStore,
  tablesForDate,
  type ReservationStatus,
} from "@/store/store";

const statusMeta: Record<ReservationStatus, { label: string; cls: string }> = {
  pending: { label: "En attente", cls: "bg-amber-100 text-amber-800" },
  confirmed: { label: "Confirmée", cls: "bg-forest/15 text-forest" },
  declined: { label: "Refusée", cls: "bg-chili/10 text-chili" },
};

function fmtDate(d: string) {
  return new Date(d + "T00:00:00").toLocaleDateString("fr-FR", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export default function AdminReservations() {
  const {
    reservations,
    settings,
    setReservationStatus,
    deleteReservation,
    setSettings,
  } = useStore();
  const [filter, setFilter] = useState<ReservationStatus | "all">("all");

  const today = new Date().toISOString().split("T")[0];
  const tablesToday = tablesForDate(reservations, settings, today);

  const counts = useMemo(
    () => ({
      all: reservations.length,
      pending: reservations.filter((r) => r.status === "pending").length,
      confirmed: reservations.filter((r) => r.status === "confirmed").length,
      declined: reservations.filter((r) => r.status === "declined").length,
    }),
    [reservations]
  );

  const list = useMemo(
    () =>
      [...reservations]
        .filter((r) => filter === "all" || r.status === filter)
        .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time)),
    [reservations, filter]
  );

  return (
    <div>
      {/* KPI cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-line bg-paper p-5">
          <div className="text-xs uppercase tracking-wider text-ink-soft">
            Tables restantes aujourd&apos;hui
          </div>
          <div className="mt-2 flex items-end gap-2">
            <span className="font-display text-4xl text-ink">{tablesToday.left}</span>
            <span className="mb-1 text-sm text-ink-soft">/ {tablesToday.total}</span>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs text-ink-soft">Capacité</span>
            <input
              type="number"
              min={1}
              value={settings.totalTables}
              onChange={(e) =>
                setSettings({ totalTables: Math.max(1, Number(e.target.value) || 1) })
              }
              className="w-16 rounded-lg border border-line bg-cream px-2 py-1 text-sm text-ink outline-none focus:border-chili"
            />
          </div>
        </div>
        <div className="rounded-2xl border border-line bg-paper p-5">
          <div className="text-xs uppercase tracking-wider text-ink-soft">En attente</div>
          <div className="mt-2 font-display text-4xl text-amber-600">{counts.pending}</div>
          <div className="mt-3 text-xs text-ink-soft">à traiter</div>
        </div>
        <div className="rounded-2xl border border-line bg-paper p-5">
          <div className="text-xs uppercase tracking-wider text-ink-soft">Confirmées</div>
          <div className="mt-2 font-display text-4xl text-forest">{counts.confirmed}</div>
          <div className="mt-3 text-xs text-ink-soft">total</div>
        </div>
      </div>

      {/* filters */}
      <div className="mt-6 flex flex-wrap gap-2">
        {(["all", "pending", "confirmed", "declined"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
              filter === f
                ? "border-ink bg-ink text-paper"
                : "border-line bg-paper text-ink-soft hover:border-ink/30"
            }`}
          >
            {f === "all" ? "Toutes" : statusMeta[f].label} ({counts[f]})
          </button>
        ))}
      </div>

      {/* list */}
      <div className="mt-5 overflow-hidden rounded-2xl border border-line bg-paper">
        {list.length === 0 && (
          <div className="p-8 text-center text-sm text-ink-soft">Aucune réservation.</div>
        )}
        {list.map((r) => (
          <div
            key={r.id}
            className="flex flex-col gap-3 border-b border-line p-4 last:border-b-0 sm:flex-row sm:items-center sm:gap-4"
          >
            <div className="flex shrink-0 items-center gap-3 sm:w-44">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-cream-deep text-center leading-none">
                <span className="font-display text-base text-ink">{r.time}</span>
              </div>
              <div className="text-sm">
                <div className="font-medium capitalize text-ink">{fmtDate(r.date)}</div>
                <div className="text-ink-soft">{r.guests} couverts</div>
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <div className="font-medium text-ink">{r.name}</div>
              <div className="truncate text-sm text-ink-soft">
                {r.phone} · {r.email}
              </div>
              {r.notes && (
                <div className="mt-0.5 truncate text-xs italic text-ink-soft">“{r.notes}”</div>
              )}
            </div>

            <span
              className={`shrink-0 self-start rounded-full px-2.5 py-1 text-xs font-semibold ${statusMeta[r.status].cls}`}
            >
              {statusMeta[r.status].label}
            </span>

            <div className="flex shrink-0 gap-2">
              {r.status !== "confirmed" && (
                <button
                  onClick={() => setReservationStatus(r.id, "confirmed")}
                  className="rounded-lg bg-forest px-3 py-2 text-xs font-semibold text-paper transition hover:opacity-90"
                >
                  Accepter
                </button>
              )}
              {r.status !== "declined" && (
                <button
                  onClick={() => setReservationStatus(r.id, "declined")}
                  className="rounded-lg border border-line px-3 py-2 text-xs font-semibold text-ink-soft transition hover:border-chili/40 hover:text-chili"
                >
                  Refuser
                </button>
              )}
              <button
                onClick={() => deleteReservation(r.id)}
                aria-label="Supprimer"
                className="rounded-lg border border-line px-3 py-2 text-xs font-semibold text-ink-soft transition hover:border-ink/30"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

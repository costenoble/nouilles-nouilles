"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/i18n/LanguageProvider";
import { useStore, tablesForDate } from "@/store/store";
import AnalogClock from "./AnalogClock";
import Reveal from "./Reveal";

const lunchSlots = ["12:00", "12:30", "13:00", "13:30", "14:00"];
const dinnerSlots = ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"];

export default function Reservation() {
  const { t, locale } = useI18n();
  const { reservations, settings, addReservation } = useStore();
  const [sent, setSent] = useState(false);

  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [time, setTime] = useState("19:30");
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  const tables = tablesForDate(reservations, settings, date);
  const full = tables.left <= 0;

  const prettyDate = new Date(date + "T00:00:00").toLocaleDateString(
    locale === "fr" ? "fr-FR" : "en-GB",
    { weekday: "long", day: "numeric", month: "long" }
  );

  const fieldClass =
    "w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink placeholder:text-ink-soft/50 outline-none transition focus:border-chili";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    addReservation({ date, time, guests, name, phone, email, notes });
    setSent(true);
  };

  return (
    <section id="reservation" className="bg-cream-deep">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="eyebrow text-chili">{t.reservation.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display-lg mt-4 text-ink">
              {t.reservation.title}{" "}
              <span className="italic text-chili">{t.reservation.titleItalic}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-4 max-w-md text-base text-ink-soft">
              {t.reservation.body}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-[2rem] bg-paper shadow-[0_30px_80px_-40px_rgba(27,26,22,0.5)] ring-1 ring-line">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="ok"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex min-h-[460px] flex-col items-center justify-center p-10 text-center"
                >
                  <div className="mb-6 grid h-16 w-16 place-items-center rounded-full bg-forest text-3xl text-paper">
                    ✓
                  </div>
                  <p className="max-w-md text-lg text-ink">{t.reservation.success}</p>
                  <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-2xl bg-cream-deep px-5 py-3 text-sm text-ink-soft">
                    <span className="font-semibold capitalize text-ink">{prettyDate}</span>
                    <span>·</span>
                    <span className="font-semibold text-ink">{time}</span>
                    <span>·</span>
                    <span className="font-semibold text-ink">
                      {guests} {t.reservation.guestsUnit}
                    </span>
                  </div>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-7 rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-ink transition hover:border-ink/40"
                  >
                    {t.reservation.newReservation}
                  </button>
                </motion.div>
              ) : (
                <div key="form" className="grid lg:grid-cols-[0.85fr_1.15fr]">
                  {/* visual / recap */}
                  <div className="flex flex-col items-center justify-center gap-6 bg-gradient-to-b from-cream-deep to-peach/25 p-8 sm:p-10">
                    <AnalogClock time={time} />
                    <div className="w-full space-y-2.5 text-sm">
                      <div className="flex items-center justify-between border-b border-line pb-2.5">
                        <span className="text-ink-soft">{t.reservation.date}</span>
                        <span className="font-semibold capitalize text-ink">{prettyDate}</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-line pb-2.5">
                        <span className="text-ink-soft">{t.reservation.guests}</span>
                        <span className="font-semibold text-ink">
                          {guests} {t.reservation.guestsUnit}
                        </span>
                      </div>
                      <div
                        className={`flex items-center justify-between rounded-xl px-3 py-2 ${
                          full ? "bg-chili/10 text-chili" : "bg-forest/10 text-forest"
                        }`}
                      >
                        <span className="font-medium">
                          {full ? "—" : tables.left} {t.reservation.tablesLeft}
                        </span>
                        <span className="text-xs opacity-70">/ {tables.total}</span>
                      </div>
                    </div>
                  </div>

                  {/* form */}
                  <form onSubmit={submit} className="space-y-5 p-7 sm:p-9">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="block">
                        <span className="mb-1.5 block text-xs font-medium text-ink-soft">
                          {t.reservation.date}
                        </span>
                        <input
                          type="date"
                          required
                          min={today}
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className={fieldClass}
                        />
                      </label>
                      <div className="block">
                        <span className="mb-1.5 block text-xs font-medium text-ink-soft">
                          {t.reservation.guests}
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {Array.from({ length: 8 }).map((_, i) => {
                            const g = i + 1;
                            return (
                              <button
                                key={g}
                                type="button"
                                onClick={() => setGuests(g)}
                                className={`h-9 w-9 rounded-full text-sm font-semibold transition ${
                                  guests === g
                                    ? "bg-ink text-paper"
                                    : "border border-line text-ink-soft hover:border-ink/30"
                                }`}
                              >
                                {g}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* time slots */}
                    <div>
                      <span className="mb-2 block text-xs font-medium text-ink-soft">
                        {t.reservation.chooseSlot}
                      </span>
                      {[
                        { label: t.reservation.lunch, slots: lunchSlots },
                        { label: t.reservation.dinner, slots: dinnerSlots },
                      ].map((group) => (
                        <div key={group.label} className="mb-3">
                          <div className="mb-1.5 text-[0.7rem] uppercase tracking-wider text-ink-soft/70">
                            {group.label}
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {group.slots.map((s) => (
                              <button
                                key={s}
                                type="button"
                                onClick={() => setTime(s)}
                                className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
                                  time === s
                                    ? "bg-chili text-paper"
                                    : "border border-line text-ink-soft hover:border-chili/40"
                                }`}
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <input
                        type="text"
                        required
                        placeholder={t.reservation.name}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={fieldClass}
                      />
                      <input
                        type="tel"
                        required
                        placeholder={t.reservation.phone}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={fieldClass}
                      />
                    </div>
                    <input
                      type="email"
                      required
                      placeholder={t.reservation.email}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={fieldClass}
                    />
                    <input
                      type="text"
                      placeholder={t.reservation.notes}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className={fieldClass}
                    />

                    {full && (
                      <p className="rounded-xl bg-chili/10 px-4 py-3 text-sm text-chili">
                        {t.reservation.noTables}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={full}
                      className="w-full rounded-full bg-chili px-6 py-3.5 text-sm font-semibold text-paper transition hover:bg-chili-deep disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {t.reservation.submit}
                    </button>
                  </form>
                </div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

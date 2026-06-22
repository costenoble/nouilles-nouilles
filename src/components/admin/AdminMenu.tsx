"use client";

import { useState } from "react";
import {
  allergenLabels,
  categoryOrder,
  type Allergen,
  type Category,
  type Dish,
} from "@/data/menu";
import { useStore } from "@/store/store";

const catLabel: Record<Category, string> = {
  noodles: "Nouilles sautées",
  soups: "Soupes & bouillons",
  starters: "À partager",
  desserts: "Douceurs",
};

const allAllergens = Object.keys(allergenLabels) as Allergen[];

export default function AdminMenu() {
  const { menu, updateDish, addDish, deleteDish } = useStore();
  const [openId, setOpenId] = useState<string | null>(null);

  const addNew = (category: Category) => {
    const dish: Dish = {
      id: crypto.randomUUID(),
      category,
      name: { fr: "Nouveau plat", en: "New dish" },
      desc: { fr: "", en: "" },
      price: 0,
      allergens: [],
      spicy: 0,
    };
    addDish(dish);
    setOpenId(dish.id);
  };

  const field =
    "w-full rounded-lg border border-line bg-cream px-3 py-2 text-sm text-ink outline-none focus:border-chili";

  return (
    <div className="space-y-8">
      {categoryOrder.map((cat) => {
        const dishes = menu.filter((d) => d.category === cat);
        return (
          <div key={cat}>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-display text-xl text-ink">{catLabel[cat]}</h3>
              <button
                onClick={() => addNew(cat)}
                className="rounded-full border border-line bg-paper px-3 py-1.5 text-xs font-semibold text-ink transition hover:border-ink/30"
              >
                + Ajouter un plat
              </button>
            </div>

            <div className="space-y-2">
              {dishes.map((d) => {
                const open = openId === d.id;
                return (
                  <div key={d.id} className="rounded-2xl border border-line bg-paper">
                    {/* row */}
                    <div className="flex items-center gap-3 p-3">
                      <button
                        onClick={() => setOpenId(open ? null : d.id)}
                        className="flex min-w-0 flex-1 items-center gap-2 text-left"
                      >
                        <span className={`text-ink-soft transition ${open ? "rotate-90" : ""}`}>
                          ›
                        </span>
                        <span className="truncate font-medium text-ink">{d.name.fr}</span>
                        {d.signature && <span className="text-xs text-chili">★</span>}
                      </button>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          step="0.5"
                          min="0"
                          value={d.price}
                          onChange={(e) =>
                            updateDish(d.id, { price: Number(e.target.value) })
                          }
                          className="w-20 rounded-lg border border-line bg-cream px-2 py-1.5 text-right text-sm font-semibold text-ink outline-none focus:border-chili"
                        />
                        <span className="text-sm text-ink-soft">€</span>
                      </div>
                      <button
                        onClick={() => deleteDish(d.id)}
                        aria-label="Supprimer"
                        className="rounded-lg border border-line px-2.5 py-1.5 text-xs text-ink-soft transition hover:border-chili/40 hover:text-chili"
                      >
                        ✕
                      </button>
                    </div>

                    {/* editor */}
                    {open && (
                      <div className="space-y-3 border-t border-line p-4">
                        <div className="grid gap-3 sm:grid-cols-2">
                          <label className="block">
                            <span className="mb-1 block text-xs text-ink-soft">Nom (FR)</span>
                            <input
                              value={d.name.fr}
                              onChange={(e) =>
                                updateDish(d.id, { name: { ...d.name, fr: e.target.value } })
                              }
                              className={field}
                            />
                          </label>
                          <label className="block">
                            <span className="mb-1 block text-xs text-ink-soft">Nom (EN)</span>
                            <input
                              value={d.name.en}
                              onChange={(e) =>
                                updateDish(d.id, { name: { ...d.name, en: e.target.value } })
                              }
                              className={field}
                            />
                          </label>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <label className="block">
                            <span className="mb-1 block text-xs text-ink-soft">Description (FR)</span>
                            <textarea
                              rows={2}
                              value={d.desc.fr}
                              onChange={(e) =>
                                updateDish(d.id, { desc: { ...d.desc, fr: e.target.value } })
                              }
                              className={field}
                            />
                          </label>
                          <label className="block">
                            <span className="mb-1 block text-xs text-ink-soft">Description (EN)</span>
                            <textarea
                              rows={2}
                              value={d.desc.en}
                              onChange={(e) =>
                                updateDish(d.id, { desc: { ...d.desc, en: e.target.value } })
                              }
                              className={field}
                            />
                          </label>
                        </div>

                        <div className="flex flex-wrap items-center gap-4">
                          <label className="flex items-center gap-2 text-sm text-ink">
                            <input
                              type="checkbox"
                              checked={!!d.veg}
                              onChange={(e) => updateDish(d.id, { veg: e.target.checked })}
                            />
                            Végétarien
                          </label>
                          <label className="flex items-center gap-2 text-sm text-ink">
                            <input
                              type="checkbox"
                              checked={!!d.signature}
                              onChange={(e) => updateDish(d.id, { signature: e.target.checked })}
                            />
                            Signature
                          </label>
                          <label className="flex items-center gap-2 text-sm text-ink">
                            Piment
                            <select
                              value={d.spicy ?? 0}
                              onChange={(e) =>
                                updateDish(d.id, {
                                  spicy: Number(e.target.value) as 0 | 1 | 2 | 3,
                                })
                              }
                              className="rounded-lg border border-line bg-cream px-2 py-1 text-sm"
                            >
                              {[0, 1, 2, 3].map((n) => (
                                <option key={n} value={n}>
                                  {n}
                                </option>
                              ))}
                            </select>
                          </label>
                        </div>

                        <div>
                          <span className="mb-1.5 block text-xs text-ink-soft">Allergènes</span>
                          <div className="flex flex-wrap gap-1.5">
                            {allAllergens.map((a) => {
                              const on = d.allergens.includes(a);
                              return (
                                <button
                                  key={a}
                                  onClick={() =>
                                    updateDish(d.id, {
                                      allergens: on
                                        ? d.allergens.filter((x) => x !== a)
                                        : [...d.allergens, a],
                                    })
                                  }
                                  className={`rounded-full border px-2.5 py-1 text-xs transition ${
                                    on
                                      ? "border-chili bg-chili text-paper"
                                      : "border-line text-ink-soft hover:border-chili/40"
                                  }`}
                                >
                                  {allergenLabels[a].fr}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/adminAuth";
import Logo from "@/components/Logo";

export default function AdminLogin() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(user, pass)) {
      router.push("/admin");
    } else {
      setError(true);
    }
  };

  const field =
    "w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink outline-none transition focus:border-chili";

  return (
    <main className="grid min-h-[100svh] place-items-center bg-cream px-5">
      <div className="w-full max-w-sm">
        <a href="/" className="mb-8 flex justify-center">
          <Logo size="text-xl" />
        </a>

        <div className="rounded-3xl border border-line bg-paper p-8 shadow-[0_30px_80px_-50px_rgba(27,26,22,0.5)]">
          <h1 className="font-display text-2xl text-ink">Espace administrateur</h1>
          <p className="mt-1 text-sm text-ink-soft">
            Connectez-vous pour gérer le restaurant.
          </p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-ink-soft">Identifiant</span>
              <input
                autoFocus
                value={user}
                onChange={(e) => {
                  setUser(e.target.value);
                  setError(false);
                }}
                className={field}
                placeholder="admin"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-ink-soft">Mot de passe</span>
              <input
                type="password"
                value={pass}
                onChange={(e) => {
                  setPass(e.target.value);
                  setError(false);
                }}
                className={field}
                placeholder="admin"
              />
            </label>

            {error && (
              <p className="rounded-lg bg-chili/10 px-3 py-2 text-sm text-chili">
                Identifiants incorrects.
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-paper transition hover:bg-ink-soft"
            >
              Se connecter
            </button>
          </form>

          <p className="mt-5 rounded-lg bg-cream-deep px-3 py-2 text-center text-xs text-ink-soft">
            Démo · identifiant <strong>admin</strong> · mot de passe <strong>admin</strong>
          </p>
        </div>
      </div>
    </main>
  );
}

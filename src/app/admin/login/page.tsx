"use client";

import { useActionState } from "react";
import { login } from "./actions";

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(login, null);

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-6">
      <div className="w-full max-w-sm border border-border bg-surface p-10">
        <p className="text-center font-display text-2xl tracking-[0.2em] text-forest">
          LAVIBEL
        </p>
        <p className="mt-1 text-center text-xs font-light uppercase tracking-[0.3em] text-muted">
          Espace administration
        </p>

        <form action={formAction} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="password"
              className="text-xs font-light uppercase tracking-wide text-muted"
            >
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoFocus
              className="mt-2 w-full border border-border bg-cream px-4 py-3 text-sm text-forest outline-none transition-colors duration-300 focus:border-accent"
            />
          </div>

          {state?.error && (
            <p className="text-sm font-light text-red-700">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full border border-forest bg-forest px-6 py-3 text-sm font-light tracking-wide text-cream transition-colors duration-300 hover:bg-accent hover:border-accent disabled:opacity-60"
          >
            {isPending ? "Connexion…" : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}

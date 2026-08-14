"use client";

import { useActionState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart/CartContext";
import { formatPrice } from "@/lib/format";
import { creerCommande } from "./actions";

export default function CommandePage() {
  const { items, subtotal } = useCart();
  const [state, formAction, isPending] = useActionState(creerCommande, null);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center lg:px-10">
        <h1 className="font-display text-3xl font-light text-forest">
          Votre panier est vide
        </h1>
        <p className="mt-4 text-sm font-light text-muted">
          Ajoutez des produits à votre panier avant de passer commande.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-3 border border-forest px-8 py-3.5 text-sm font-light tracking-wide text-forest transition-colors duration-300 hover:bg-forest hover:text-cream"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl animate-fade-in-up px-6 py-16 lg:px-10">
      <h1 className="font-display text-3xl font-light text-forest lg:text-4xl">
        Finaliser la commande
      </h1>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1.3fr_1fr]">
        <form action={formAction} className="space-y-5">
          <input type="hidden" name="articles" value={JSON.stringify(items)} />

          <div>
            <label className="text-xs font-light uppercase tracking-wide text-muted">
              Nom complet
            </label>
            <input
              name="nom_client"
              required
              className="mt-2 w-full border border-border bg-surface px-4 py-3 text-sm text-forest outline-none transition-colors duration-300 focus:border-accent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-light uppercase tracking-wide text-muted">
                Téléphone
              </label>
              <input
                name="telephone"
                type="tel"
                required
                className="mt-2 w-full border border-border bg-surface px-4 py-3 text-sm text-forest outline-none transition-colors duration-300 focus:border-accent"
              />
            </div>
            <div>
              <label className="text-xs font-light uppercase tracking-wide text-muted">
                Email (optionnel)
              </label>
              <input
                name="email"
                type="email"
                className="mt-2 w-full border border-border bg-surface px-4 py-3 text-sm text-forest outline-none transition-colors duration-300 focus:border-accent"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-light uppercase tracking-wide text-muted">
              Adresse de livraison
            </label>
            <input
              name="adresse"
              required
              className="mt-2 w-full border border-border bg-surface px-4 py-3 text-sm text-forest outline-none transition-colors duration-300 focus:border-accent"
            />
          </div>

          <div>
            <label className="text-xs font-light uppercase tracking-wide text-muted">
              Ville
            </label>
            <input
              name="ville"
              required
              placeholder="Ouagadougou"
              className="mt-2 w-full border border-border bg-surface px-4 py-3 text-sm text-forest outline-none transition-colors duration-300 focus:border-accent"
            />
          </div>

          <div>
            <label className="text-xs font-light uppercase tracking-wide text-muted">
              Notes (optionnel)
            </label>
            <textarea
              name="notes"
              rows={3}
              className="mt-2 w-full border border-border bg-surface px-4 py-3 text-sm text-forest outline-none transition-colors duration-300 focus:border-accent"
            />
          </div>

          <p className="text-xs font-light leading-relaxed text-muted">
            Paiement à la livraison. Notre équipe vous contactera pour
            confirmer votre commande.
          </p>

          {state?.error && (
            <p className="text-sm font-light text-red-700">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full border border-forest bg-forest px-8 py-3.5 text-sm font-light tracking-wide text-cream transition-colors duration-300 hover:bg-accent hover:border-accent disabled:opacity-60 sm:w-auto"
          >
            {isPending ? "Envoi en cours…" : "Confirmer la commande"}
          </button>
        </form>

        <div className="h-fit border border-border bg-surface p-6">
          <p className="font-display text-lg font-light text-forest">
            Récapitulatif
          </p>
          <div className="mt-5 space-y-3 text-sm font-light">
            {items.map((item) => (
              <div key={`${item.produitId}-${item.taille}-${item.couleur}`} className="flex justify-between gap-4">
                <span className="text-forest">
                  {item.nom}
                  <span className="text-muted"> × {item.quantite}</span>
                </span>
                <span className="shrink-0 text-forest">
                  {formatPrice(item.prix * item.quantite)}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-5 flex justify-between border-t border-border pt-5 text-sm text-forest">
            <span>Sous-total</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

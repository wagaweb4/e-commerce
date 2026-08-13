"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart, itemKey } from "@/lib/cart/CartContext";
import { formatPrice } from "@/lib/format";

export default function PanierPage() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center lg:px-10">
        <h1 className="font-display text-3xl font-light text-forest">
          Votre panier est vide
        </h1>
        <p className="mt-4 text-sm font-light text-muted">
          Découvrez nos collections et ajoutez vos pièces favorites.
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
    <div className="mx-auto max-w-5xl px-6 py-16 lg:px-10">
      <h1 className="font-display text-3xl font-light text-forest lg:text-4xl">
        Votre panier
      </h1>

      <div className="mt-10 divide-y divide-border border-y border-border">
        {items.map((item) => {
          const key = itemKey(item);
          return (
            <div key={key} className="flex gap-5 py-6">
              <Link
                href={`/produits/${item.slug}`}
                className="relative h-28 w-24 shrink-0 overflow-hidden border border-border bg-surface"
              >
                {item.image && (
                  <Image src={item.image} alt={item.nom} fill className="object-cover" />
                )}
              </Link>

              <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Link
                      href={`/produits/${item.slug}`}
                      className="font-display text-lg font-light text-forest transition-colors duration-300 hover:text-accent"
                    >
                      {item.nom}
                    </Link>
                    <p className="mt-1 text-xs font-light uppercase tracking-wide text-muted">
                      {[item.couleur, item.taille].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                  <p className="text-sm font-light text-forest">{formatPrice(item.prix)}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center border border-border">
                    <button
                      type="button"
                      onClick={() => updateQuantity(key, item.quantite - 1)}
                      className="px-3 py-1 text-forest transition-colors duration-300 hover:text-accent"
                      aria-label="Diminuer la quantité"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm text-forest">{item.quantite}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(key, item.quantite + 1)}
                      className="px-3 py-1 text-forest transition-colors duration-300 hover:text-accent"
                      aria-label="Augmenter la quantité"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(key)}
                    className="text-xs font-light uppercase tracking-wide text-muted transition-colors duration-300 hover:text-red-700"
                  >
                    Retirer
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex flex-col items-end gap-4">
        <div className="flex w-full max-w-xs items-center justify-between text-sm font-light text-forest sm:justify-end sm:gap-8">
          <span className="text-muted">Sous-total</span>
          <span className="text-base">{formatPrice(subtotal)}</span>
        </div>
        <Link
          href="/commande"
          className="w-full max-w-xs border border-forest bg-forest px-8 py-3.5 text-center text-sm font-light tracking-wide text-cream transition-colors duration-300 hover:bg-accent hover:border-accent"
        >
          Passer la commande
        </Link>
      </div>
    </div>
  );
}

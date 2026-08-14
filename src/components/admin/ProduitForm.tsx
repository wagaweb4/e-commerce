"use client";

import { useActionState, useState } from "react";
import type { Category, Product } from "@/types/database";

type FormAction = (
  prevState: { error: string } | null,
  formData: FormData
) => Promise<{ error: string } | null>;

export default function ProduitForm({
  action,
  categories,
  produit,
}: {
  action: FormAction;
  categories: Category[];
  produit?: Product;
}) {
  const [state, formAction, isPending] = useActionState(action, null);
  const [imagesToRemove, setImagesToRemove] = useState<string[]>([]);

  return (
    <form action={formAction} className="mt-8 max-w-2xl space-y-6">
      <div>
        <label className="text-xs font-light uppercase tracking-wide text-muted">
          Nom du produit
        </label>
        <input
          name="nom"
          required
          defaultValue={produit?.nom}
          className="mt-2 w-full border border-border bg-surface px-4 py-3 text-sm text-forest outline-none transition-colors duration-300 focus:border-accent"
        />
      </div>

      <div>
        <label className="text-xs font-light uppercase tracking-wide text-muted">
          Slug (optionnel — généré depuis le nom sinon)
        </label>
        <input
          name="slug"
          defaultValue={produit?.slug}
          placeholder="ex-manteau-en-laine"
          className="mt-2 w-full border border-border bg-surface px-4 py-3 text-sm text-forest outline-none transition-colors duration-300 focus:border-accent"
        />
      </div>

      <div>
        <label className="text-xs font-light uppercase tracking-wide text-muted">
          Description courte
        </label>
        <textarea
          name="description_courte"
          rows={3}
          defaultValue={produit?.description_courte ?? ""}
          className="mt-2 w-full border border-border bg-surface px-4 py-3 text-sm text-forest outline-none transition-colors duration-300 focus:border-accent"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs font-light uppercase tracking-wide text-muted">
            Prix (FCFA)
          </label>
          <input
            name="prix"
            type="number"
            step="1"
            min="0"
            required
            defaultValue={produit?.prix}
            className="mt-2 w-full border border-border bg-surface px-4 py-3 text-sm text-forest outline-none transition-colors duration-300 focus:border-accent"
          />
        </div>
        <div>
          <label className="text-xs font-light uppercase tracking-wide text-muted">
            Stock
          </label>
          <input
            name="stock"
            type="number"
            min="0"
            defaultValue={produit?.stock ?? 0}
            className="mt-2 w-full border border-border bg-surface px-4 py-3 text-sm text-forest outline-none transition-colors duration-300 focus:border-accent"
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-light uppercase tracking-wide text-muted">
          Catégorie
        </label>
        <select
          name="categorie_id"
          defaultValue={produit?.categorie_id ?? ""}
          className="mt-2 w-full border border-border bg-surface px-4 py-3 text-sm text-forest outline-none transition-colors duration-300 focus:border-accent"
        >
          <option value="">Aucune</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nom}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs font-light uppercase tracking-wide text-muted">
            Tailles (séparées par des virgules)
          </label>
          <input
            name="tailles"
            defaultValue={produit?.tailles?.join(", ")}
            placeholder="S, M, L, XL"
            className="mt-2 w-full border border-border bg-surface px-4 py-3 text-sm text-forest outline-none transition-colors duration-300 focus:border-accent"
          />
        </div>
        <div>
          <label className="text-xs font-light uppercase tracking-wide text-muted">
            Couleurs (séparées par des virgules)
          </label>
          <input
            name="couleurs"
            defaultValue={produit?.couleurs?.join(", ")}
            placeholder="Noir, Camel"
            className="mt-2 w-full border border-border bg-surface px-4 py-3 text-sm text-forest outline-none transition-colors duration-300 focus:border-accent"
          />
        </div>
      </div>

      {produit && produit.images.length > 0 && (
        <div>
          <p className="text-xs font-light uppercase tracking-wide text-muted">
            Images actuelles
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            {produit.images.map((url) => {
              const marked = imagesToRemove.includes(url);
              return (
                <label
                  key={url}
                  className={`relative h-20 w-20 cursor-pointer overflow-hidden border ${
                    marked ? "border-red-500 opacity-40" : "border-border"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} alt="" className="h-full w-full object-cover" />
                  <input
                    type="checkbox"
                    name="images_a_supprimer"
                    value={url}
                    className="absolute right-1 top-1"
                    checked={marked}
                    onChange={(e) =>
                      setImagesToRemove((prev) =>
                        e.target.checked
                          ? [...prev, url]
                          : prev.filter((u) => u !== url)
                      )
                    }
                  />
                </label>
              );
            })}
          </div>
          <p className="mt-1 text-xs font-light text-muted">
            Cochez une image pour la supprimer à l&apos;enregistrement.
          </p>
        </div>
      )}

      <div>
        <label className="text-xs font-light uppercase tracking-wide text-muted">
          {produit ? "Ajouter des images" : "Images"}
        </label>
        <input
          name="images"
          type="file"
          accept="image/*"
          multiple
          className="mt-2 w-full border border-border bg-surface px-4 py-3 text-sm text-forest outline-none transition-colors duration-300 focus:border-accent"
        />
      </div>

      {state?.error && (
        <p className="text-sm font-light text-red-700">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="border border-forest bg-forest px-8 py-3 text-sm font-light tracking-wide text-cream transition-colors duration-300 hover:bg-accent hover:border-accent disabled:opacity-60"
      >
        {isPending ? "Enregistrement…" : "Enregistrer"}
      </button>
    </form>
  );
}

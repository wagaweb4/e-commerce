"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart/CartContext";

function OptionGroup({
  label,
  options,
  selected,
  onSelect,
}: {
  label: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div>
      <p className="text-xs font-light uppercase tracking-wide text-muted">{label}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onSelect(option)}
            aria-pressed={selected === option}
            className={`border px-4 py-2 text-sm font-light tracking-wide transition-all duration-300 ease-premium active:scale-95 ${
              selected === option
                ? "border-forest bg-forest text-cream"
                : "border-border text-forest hover:border-accent hover:text-accent"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function AddToCartForm({
  produitId,
  slug,
  nom,
  prix,
  image,
  tailles,
  couleurs,
  stock,
}: {
  produitId: string;
  slug: string;
  nom: string;
  prix: number;
  image: string | null;
  tailles: string[];
  couleurs: string[];
  stock: number;
}) {
  const { addItem } = useCart();
  const [taille, setTaille] = useState(tailles[0] ?? "");
  const [couleur, setCouleur] = useState(couleurs[0] ?? "");
  const [quantite, setQuantite] = useState(1);
  const [confirme, setConfirme] = useState(false);

  const enRupture = stock === 0;

  const handleAdd = () => {
    addItem({
      produitId,
      slug,
      nom,
      prix,
      image,
      taille: taille || null,
      couleur: couleur || null,
      quantite,
    });
    setConfirme(true);
    setTimeout(() => setConfirme(false), 2000);
  };

  return (
    <div>
      {(couleurs.length > 0 || tailles.length > 0) && (
        <div className="space-y-6">
          {couleurs.length > 0 && (
            <OptionGroup
              label="Couleur"
              options={couleurs}
              selected={couleur}
              onSelect={setCouleur}
            />
          )}
          {tailles.length > 0 && (
            <OptionGroup
              label="Taille"
              options={tailles}
              selected={taille}
              onSelect={setTaille}
            />
          )}
        </div>
      )}

      <div className="mt-6 flex items-center gap-3">
        <p className="text-xs font-light uppercase tracking-wide text-muted">Quantité</p>
        <div className="flex items-center border border-border">
          <button
            type="button"
            onClick={() => setQuantite((q) => Math.max(1, q - 1))}
            className="px-3 py-1.5 text-forest transition-colors duration-300 hover:bg-cream hover:text-accent active:scale-90"
            aria-label="Diminuer la quantité"
          >
            −
          </button>
          <span key={quantite} className="w-8 animate-pop text-center text-sm text-forest">
            {quantite}
          </span>
          <button
            type="button"
            onClick={() => setQuantite((q) => q + 1)}
            className="px-3 py-1.5 text-forest transition-colors duration-300 hover:bg-cream hover:text-accent active:scale-90"
            aria-label="Augmenter la quantité"
          >
            +
          </button>
        </div>
      </div>

      <p className="mt-6 text-xs font-light uppercase tracking-wide text-muted">
        {enRupture ? "Rupture de stock" : "En stock"}
      </p>

      <button
        type="button"
        onClick={handleAdd}
        disabled={enRupture}
        className={`mt-4 w-full border px-8 py-3.5 text-sm font-light tracking-wide transition-all duration-300 ease-premium active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto ${
          confirme
            ? "border-forest bg-forest/90 text-cream"
            : "border-forest bg-forest text-cream hover:bg-accent hover:border-accent"
        }`}
      >
        <span className="inline-flex items-center gap-2">
          {confirme && <span className="animate-pop">✓</span>}
          {confirme ? "Ajouté au panier" : "Ajouter au panier"}
        </span>
      </button>
    </div>
  );
}

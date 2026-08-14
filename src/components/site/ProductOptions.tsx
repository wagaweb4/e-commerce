"use client";

import { useState } from "react";

function OptionGroup({
  label,
  options,
}: {
  label: string;
  options: string[];
}) {
  const [selected, setSelected] = useState(options[0]);

  return (
    <div>
      <p className="text-xs font-light uppercase tracking-wide text-muted">{label}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setSelected(option)}
            aria-pressed={selected === option}
            className={`border px-4 py-2 text-sm font-light tracking-wide transition-colors duration-300 ${
              selected === option
                ? "border-forest bg-forest text-cream"
                : "border-border text-forest hover:border-accent"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ProductOptions({
  tailles,
  couleurs,
}: {
  tailles: string[];
  couleurs: string[];
}) {
  if (tailles.length === 0 && couleurs.length === 0) return null;

  return (
    <div className="mt-8 space-y-6">
      {couleurs.length > 0 && <OptionGroup label="Couleur" options={couleurs} />}
      {tailles.length > 0 && <OptionGroup label="Taille" options={tailles} />}
    </div>
  );
}

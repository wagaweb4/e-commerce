"use client";

import { useTransition } from "react";
import { updateStatutCommande } from "@/app/admin/(dashboard)/commandes/actions";
import type { CommandeStatut } from "@/types/database";

const STATUTS: { value: CommandeStatut; label: string }[] = [
  { value: "en_attente", label: "En attente" },
  { value: "confirmee", label: "Confirmée" },
  { value: "expediee", label: "Expédiée" },
  { value: "livree", label: "Livrée" },
  { value: "annulee", label: "Annulée" },
];

export default function StatutSelect({
  id,
  statut,
}: {
  id: string;
  statut: CommandeStatut;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <select
      defaultValue={statut}
      disabled={isPending}
      onChange={(e) => {
        const formData = new FormData();
        formData.set("id", id);
        formData.set("statut", e.target.value);
        startTransition(() => {
          updateStatutCommande(formData);
        });
      }}
      className="border border-border bg-surface px-3 py-1.5 text-xs font-light text-forest outline-none transition-colors duration-300 focus:border-accent disabled:opacity-60"
    >
      {STATUTS.map((s) => (
        <option key={s.value} value={s.value}>
          {s.label}
        </option>
      ))}
    </select>
  );
}

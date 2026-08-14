"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import type { CommandeStatut } from "@/types/database";

export async function updateStatutCommande(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const statut = String(formData.get("statut") ?? "") as CommandeStatut;
  if (!id || !statut) return;

  const supabase = createAdminClient();
  await supabase.from("commandes").update({ statut }).eq("id", id);

  revalidatePath("/admin/commandes");
}

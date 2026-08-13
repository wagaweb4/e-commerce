"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { slugify } from "@/lib/slug";

export async function createCategorie(formData: FormData) {
  const nom = String(formData.get("nom") ?? "").trim();
  if (!nom) return;

  const supabase = createAdminClient();
  await supabase.from("categories").insert({ nom, slug: slugify(nom) });

  revalidatePath("/admin/categories");
}

export async function deleteCategorie(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = createAdminClient();
  await supabase.from("categories").delete().eq("id", id);

  revalidatePath("/admin/categories");
}

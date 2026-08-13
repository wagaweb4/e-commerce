"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { slugify } from "@/lib/slug";

const BUCKET = "produits";

function parseList(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

async function uploadImages(files: File[], slug: string): Promise<string[]> {
  const supabase = createAdminClient();
  const urls: string[] = [];

  for (const file of files) {
    if (!file || file.size === 0) continue;
    const ext = file.name.split(".").pop() || "jpg";
    const path = `${slug}/${crypto.randomUUID()}.${ext}`;

    const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
      contentType: file.type,
      upsert: false,
    });
    if (error) throw new Error(`Échec de l'upload de l'image : ${error.message}`);

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
    urls.push(data.publicUrl);
  }

  return urls;
}

function extractStoragePath(url: string): string | null {
  const marker = `/object/public/${BUCKET}/`;
  const index = url.indexOf(marker);
  if (index === -1) return null;
  return decodeURIComponent(url.slice(index + marker.length));
}

export async function createProduit(_prevState: { error: string } | null, formData: FormData) {
  const supabase = createAdminClient();

  const nom = String(formData.get("nom") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const slug = slugify(slugInput || nom);

  if (!nom || !slug) {
    return { error: "Le nom du produit est requis." };
  }

  const prix = Math.round(Number(formData.get("prix")));
  if (!Number.isFinite(prix) || prix < 0) {
    return { error: "Le prix est invalide." };
  }

  const stock = Number(formData.get("stock") ?? 0);
  const categorieId = String(formData.get("categorie_id") ?? "") || null;
  const descriptionCourte = String(formData.get("description_courte") ?? "").trim() || null;
  const tailles = parseList(formData.get("tailles"));
  const couleurs = parseList(formData.get("couleurs"));
  const files = formData.getAll("images").filter((f): f is File => f instanceof File);

  let images: string[] = [];
  try {
    images = await uploadImages(files, slug);
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Échec de l'upload." };
  }

  const { error } = await supabase.from("produits").insert({
    nom,
    slug,
    description_courte: descriptionCourte,
    prix,
    categorie_id: categorieId,
    tailles,
    couleurs,
    stock: Number.isFinite(stock) ? stock : 0,
    images,
  });

  if (error) {
    return { error: `Impossible de créer le produit : ${error.message}` };
  }

  revalidatePath("/admin/produits");
  redirect("/admin/produits");
}

export async function updateProduit(
  id: string,
  _prevState: { error: string } | null,
  formData: FormData
) {
  const supabase = createAdminClient();

  const nom = String(formData.get("nom") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const slug = slugify(slugInput || nom);

  if (!nom || !slug) {
    return { error: "Le nom du produit est requis." };
  }

  const prix = Math.round(Number(formData.get("prix")));
  if (!Number.isFinite(prix) || prix < 0) {
    return { error: "Le prix est invalide." };
  }

  const stock = Number(formData.get("stock") ?? 0);
  const categorieId = String(formData.get("categorie_id") ?? "") || null;
  const descriptionCourte = String(formData.get("description_courte") ?? "").trim() || null;
  const tailles = parseList(formData.get("tailles"));
  const couleurs = parseList(formData.get("couleurs"));
  const files = formData.getAll("images").filter((f): f is File => f instanceof File && f.size > 0);
  const imagesToRemove = formData.getAll("images_a_supprimer").map(String);

  const { data: existing, error: fetchError } = await supabase
    .from("produits")
    .select("images")
    .eq("id", id)
    .single();

  if (fetchError || !existing) {
    return { error: "Produit introuvable." };
  }

  let images = existing.images.filter((url) => !imagesToRemove.includes(url));

  if (imagesToRemove.length > 0) {
    const paths = imagesToRemove.map(extractStoragePath).filter((p): p is string => Boolean(p));
    if (paths.length > 0) {
      await supabase.storage.from(BUCKET).remove(paths);
    }
  }

  try {
    const newImages = await uploadImages(files, slug);
    images = [...images, ...newImages];
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Échec de l'upload." };
  }

  const { error } = await supabase
    .from("produits")
    .update({
      nom,
      slug,
      description_courte: descriptionCourte,
      prix,
      categorie_id: categorieId,
      tailles,
      couleurs,
      stock: Number.isFinite(stock) ? stock : 0,
      images,
    })
    .eq("id", id);

  if (error) {
    return { error: `Impossible de mettre à jour le produit : ${error.message}` };
  }

  revalidatePath("/admin/produits");
  redirect("/admin/produits");
}

export async function deleteProduit(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = createAdminClient();

  const { data: existing } = await supabase
    .from("produits")
    .select("images")
    .eq("id", id)
    .single();

  if (existing?.images?.length) {
    const paths = existing.images.map(extractStoragePath).filter((p): p is string => Boolean(p));
    if (paths.length > 0) {
      await supabase.storage.from(BUCKET).remove(paths);
    }
  }

  await supabase.from("produits").delete().eq("id", id);

  revalidatePath("/admin/produits");
}

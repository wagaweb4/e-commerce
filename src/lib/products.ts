import { createClient } from "@/lib/supabase/server";
import type { ProductWithCategory } from "@/types/database";

export const NAV_CATEGORIES = [
  { slug: "femme", label: "Femme" },
  { slug: "homme", label: "Homme" },
  { slug: "chaussures", label: "Chaussures" },
  { slug: "accessoires", label: "Accessoires" },
] as const;

export async function getCategories() {
  const supabase = await createClient();
  const { data } = await supabase.from("categories").select("*").order("nom");
  return data ?? [];
}

export async function getCategoryBySlug(slug: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  return data;
}

export async function getProductsByCategorySlug(slug: string) {
  const category = await getCategoryBySlug(slug);
  if (!category) return { category: null, produits: [] as ProductWithCategory[] };

  const supabase = await createClient();
  const { data } = await supabase
    .from("produits")
    .select("*, categories(*)")
    .eq("categorie_id", category.id)
    .order("created_at", { ascending: false });

  return { category, produits: (data ?? []) as ProductWithCategory[] };
}

export async function getFeaturedProducts(limit = 6) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("produits")
    .select("*, categories(*)")
    .order("created_at", { ascending: false })
    .limit(limit);
  return (data ?? []) as ProductWithCategory[];
}

export async function getCategoryHighlights() {
  const supabase = await createClient();
  const results = await Promise.all(
    NAV_CATEGORIES.map(async (cat) => {
      const { data } = await supabase
        .from("produits")
        .select("images, categories!inner(nom, slug)")
        .eq("categories.slug", cat.slug)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      return { ...cat, image: data?.images?.[0] ?? null };
    })
  );
  return results;
}

export async function getProductBySlug(slug: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("produits")
    .select("*, categories(*)")
    .eq("slug", slug)
    .maybeSingle();
  return data as ProductWithCategory | null;
}

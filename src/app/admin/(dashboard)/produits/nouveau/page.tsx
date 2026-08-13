import { createAdminClient } from "@/lib/supabase/admin";
import ProduitForm from "@/components/admin/ProduitForm";
import { createProduit } from "../actions";

export const dynamic = "force-dynamic";

export default async function NouveauProduitPage() {
  const supabase = createAdminClient();
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("nom");

  return (
    <div>
      <h1 className="font-display text-3xl font-light text-forest">
        Nouveau produit
      </h1>
      <ProduitForm action={createProduit} categories={categories ?? []} />
    </div>
  );
}

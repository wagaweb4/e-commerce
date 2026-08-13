import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import ProduitForm from "@/components/admin/ProduitForm";
import { updateProduit } from "../../actions";

export default async function ModifierProduitPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createAdminClient();

  const [{ data: produit }, { data: categories }] = await Promise.all([
    supabase.from("produits").select("*").eq("id", id).single(),
    supabase.from("categories").select("*").order("nom"),
  ]);

  if (!produit) notFound();

  const updateProduitWithId = updateProduit.bind(null, id);

  return (
    <div>
      <h1 className="font-display text-3xl font-light text-forest">
        Modifier {produit.nom}
      </h1>
      <ProduitForm
        action={updateProduitWithId}
        categories={categories ?? []}
        produit={produit}
      />
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import { createAdminClient } from "@/lib/supabase/admin";
import { deleteProduit } from "./actions";
import { formatPrice } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function AdminProduitsPage() {
  const supabase = createAdminClient();
  const { data: produits, error } = await supabase
    .from("produits")
    .select("*, categories(id, nom, slug)")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-light text-forest">Produits</h1>
        <Link
          href="/admin/produits/nouveau"
          className="border border-forest bg-forest px-6 py-2.5 text-sm font-light tracking-wide text-cream transition-colors duration-300 hover:bg-accent hover:border-accent"
        >
          + Nouveau produit
        </Link>
      </div>

      {error && (
        <p className="mt-6 text-sm font-light text-red-700">
          Impossible de charger les produits : {error.message}
        </p>
      )}

      {!error && produits && produits.length === 0 && (
        <p className="mt-10 text-sm font-light text-muted">
          Aucun produit pour l&apos;instant. Créez le premier.
        </p>
      )}

      {!error && produits && produits.length > 0 && (
        <div className="mt-8 overflow-hidden border border-border bg-surface">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs font-light uppercase tracking-wide text-muted">
                <th className="px-5 py-3">Produit</th>
                <th className="px-5 py-3">Catégorie</th>
                <th className="px-5 py-3">Prix</th>
                <th className="px-5 py-3">Stock</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {produits.map((produit) => (
                <tr key={produit.id} className="border-b border-border last:border-0">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden border border-border bg-cream">
                        {produit.images?.[0] && (
                          <Image
                            src={produit.images[0]}
                            alt={produit.nom}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                      <span className="font-light text-forest">{produit.nom}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 font-light text-muted">
                    {produit.categories?.nom ?? "—"}
                  </td>
                  <td className="px-5 py-4 font-light text-forest">
                    {formatPrice(Number(produit.prix))}
                  </td>
                  <td className="px-5 py-4 font-light text-muted">{produit.stock}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-4">
                      <Link
                        href={`/admin/produits/${produit.id}/modifier`}
                        className="text-sm font-light text-forest transition-colors duration-300 hover:text-accent"
                      >
                        Modifier
                      </Link>
                      <form action={deleteProduit}>
                        <input type="hidden" name="id" value={produit.id} />
                        <button
                          type="submit"
                          className="text-sm font-light text-muted transition-colors duration-300 hover:text-red-700"
                        >
                          Supprimer
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

import { notFound } from "next/navigation";
import { getProductsByCategorySlug } from "@/lib/products";
import ProductCard from "@/components/site/ProductCard";

export const dynamic = "force-dynamic";

export default async function CategoriePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { category, produits } = await getProductsByCategorySlug(slug);

  if (!category) notFound();

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <div className="border-b border-border pb-8">
        <p className="text-xs font-light uppercase tracking-[0.35em] text-accent">
          Collection
        </p>
        <h1 className="mt-3 font-display text-4xl font-light text-forest lg:text-5xl">
          {category.nom}
        </h1>
      </div>

      {produits.length === 0 ? (
        <p className="mt-16 text-sm font-light text-muted">
          Aucun produit disponible dans cette collection pour le moment.
        </p>
      ) : (
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
          {produits.map((produit) => (
            <ProductCard key={produit.id} produit={produit} />
          ))}
        </div>
      )}
    </div>
  );
}

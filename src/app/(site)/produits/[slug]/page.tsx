import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import ProductGallery from "@/components/site/ProductGallery";
import ProductOptions from "@/components/site/ProductOptions";

export const dynamic = "force-dynamic";

export default async function ProduitPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const produit = await getProductBySlug(slug);

  if (!produit) notFound();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:px-10">
      {produit.categories && (
        <Link
          href={`/categorie/${produit.categories.slug}`}
          className="text-xs font-light uppercase tracking-[0.3em] text-accent transition-colors duration-300 hover:text-accent-hover"
        >
          {produit.categories.nom}
        </Link>
      )}

      <div className="mt-6 grid gap-12 lg:grid-cols-2 lg:gap-16">
        <ProductGallery images={produit.images} nom={produit.nom} />

        <div className="lg:pt-2">
          <h1 className="font-display text-3xl font-light text-forest lg:text-4xl">
            {produit.nom}
          </h1>
          <p className="mt-3 text-lg font-light text-forest">
            {formatPrice(Number(produit.prix))}
          </p>

          {produit.description_courte && (
            <p className="mt-6 max-w-md text-sm font-light leading-relaxed text-muted">
              {produit.description_courte}
            </p>
          )}

          <ProductOptions tailles={produit.tailles} couleurs={produit.couleurs} />

          <p className="mt-8 text-xs font-light uppercase tracking-wide text-muted">
            {produit.stock > 0 ? "En stock" : "Rupture de stock"}
          </p>

          <button
            type="button"
            disabled={produit.stock === 0}
            className="mt-4 w-full border border-forest bg-forest px-8 py-3.5 text-sm font-light tracking-wide text-cream transition-colors duration-300 hover:bg-accent hover:border-accent disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
          >
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
}

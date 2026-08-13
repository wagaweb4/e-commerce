import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import ProductGallery from "@/components/site/ProductGallery";
import AddToCartForm from "@/components/site/AddToCartForm";

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

      <div className="mt-6 grid animate-fade-in-up gap-12 lg:grid-cols-2 lg:gap-16">
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

          <div className="mt-8">
            <AddToCartForm
              produitId={produit.id}
              slug={produit.slug}
              nom={produit.nom}
              prix={Number(produit.prix)}
              image={produit.images?.[0] ?? null}
              tailles={produit.tailles}
              couleurs={produit.couleurs}
              stock={produit.stock}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductsByCategorySlug } from "@/lib/products";
import ProductCard from "@/components/site/ProductCard";
import FadeIn from "@/components/site/FadeIn";

export const dynamic = "force-dynamic";

export default async function CategoriePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { category, produits } = await getProductsByCategorySlug(slug);

  if (!category) notFound();

  const image = produits.find((p) => p.images?.[0])?.images[0];

  return (
    <div>
      <div className="relative flex h-[45vh] min-h-80 items-end overflow-hidden border-b border-border">
        {image ? (
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-top"
          />
        ) : (
          <div className="absolute inset-0 bg-forest" />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-forest/90 via-forest/30 to-forest/10" />

        <div className="relative mx-auto w-full max-w-7xl px-6 pb-10 lg:px-10">
          <p className="animate-fade-in-up text-xs font-light uppercase tracking-[0.35em] text-accent">
            Collection
          </p>
          <h1
            style={{ animationDelay: "100ms" }}
            className="mt-3 animate-fade-in-up font-display text-4xl font-light text-cream lg:text-6xl"
          >
            {category.nom}
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        {produits.length === 0 ? (
          <p className="text-sm font-light text-muted">
            Aucun produit disponible dans cette collection pour le moment.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
            {produits.map((produit, index) => (
              <FadeIn key={produit.id} delay={(index % 4) * 90}>
                <ProductCard produit={produit} />
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

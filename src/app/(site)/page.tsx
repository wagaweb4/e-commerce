import Link from "next/link";
import Image from "next/image";
import { getCategoryHighlights, getFeaturedProducts } from "@/lib/products";
import ProductCard from "@/components/site/ProductCard";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [produitsPhares, univers] = await Promise.all([
    getFeaturedProducts(8),
    getCategoryHighlights(),
  ]);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-start px-6 py-28 lg:px-10 lg:py-40">
          <p className="text-xs font-light uppercase tracking-[0.35em] text-accent">
            Collection permanente
          </p>
          <h1 className="mt-6 max-w-2xl font-display text-5xl font-light leading-[1.1] text-forest lg:text-7xl">
            L&apos;élégance,
            <br />
            sans excès.
          </h1>
          <p className="mt-6 max-w-md text-base font-light leading-relaxed text-muted">
            Lavibel façonne des vêtements, chaussures et accessoires pensés
            pour durer — une garde-robe minimaliste, aux finitions justes.
          </p>
          <Link
            href="#produits-phares"
            className="mt-10 inline-flex items-center gap-3 border border-forest px-8 py-3.5 text-sm font-light tracking-wide text-forest transition-colors duration-300 hover:bg-forest hover:text-cream"
          >
            Découvrir la collection
          </Link>
        </div>
      </section>

      {produitsPhares.length > 0 && (
        <section id="produits-phares" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <h2 className="font-display text-3xl font-light text-forest">
            Produits phares
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
            {produitsPhares.map((produit) => (
              <ProductCard key={produit.id} produit={produit} />
            ))}
          </div>
        </section>
      )}

      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <h2 className="font-display text-3xl font-light text-forest">
            Nos univers
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {univers.map((item) => (
              <Link
                key={item.slug}
                href={`/categorie/${item.slug}`}
                className="group block"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden border border-border bg-cream transition-colors duration-300 group-hover:border-accent">
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.label}
                      fill
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>
                <p className="mt-6 font-display text-2xl font-light text-forest">
                  {item.label}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-6 py-24 text-center lg:px-10">
          <h2 className="font-display text-3xl font-light text-forest">
            Une maison, une exigence
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base font-light leading-relaxed text-muted">
            Chaque pièce Lavibel est sélectionnée pour sa qualité de matière
            et la précision de sa coupe. Une mode pensée pour traverser les
            saisons.
          </p>
        </div>
      </section>
    </div>
  );
}

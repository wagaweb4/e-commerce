import Link from "next/link";
import Image from "next/image";
import { getCategoryHighlights, getFeaturedProducts } from "@/lib/products";
import ProductCard from "@/components/site/ProductCard";
import FadeIn from "@/components/site/FadeIn";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [produitsPhares, univers] = await Promise.all([
    getFeaturedProducts(8),
    getCategoryHighlights(),
  ]);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-border">
        <Image
          src="/hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-forest/85 via-forest/55 to-forest/25" />

        <div className="relative mx-auto flex max-w-7xl flex-col items-start px-6 py-28 lg:px-10 lg:py-40">
          <p className="animate-fade-in-up text-xs font-light uppercase tracking-[0.35em] text-accent">
            Collection permanente
          </p>
          <h1
            style={{ animationDelay: "120ms" }}
            className="mt-6 max-w-2xl animate-fade-in-up font-display text-5xl font-light leading-[1.1] text-cream lg:text-7xl"
          >
            L&apos;élégance,
            <br />
            sans excès.
          </h1>
          <p
            style={{ animationDelay: "240ms" }}
            className="mt-6 max-w-md animate-fade-in-up text-base font-light leading-relaxed text-cream/80"
          >
            Lavibel façonne des vêtements, chaussures et accessoires pensés
            pour durer — une garde-robe minimaliste, aux finitions justes.
          </p>
          <Link
            href="#produits-phares"
            style={{ animationDelay: "380ms" }}
            className="group mt-10 inline-flex animate-fade-in-up items-center gap-3 overflow-hidden border border-cream px-8 py-3.5 text-sm font-light tracking-wide text-cream transition-colors duration-500 ease-premium hover:bg-cream hover:text-forest"
          >
            Découvrir la collection
            <span className="transition-transform duration-500 ease-premium group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </section>

      {produitsPhares.length > 0 && (
        <section id="produits-phares" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <FadeIn>
            <h2 className="font-display text-3xl font-light text-forest">
              Produits phares
            </h2>
          </FadeIn>
          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
            {produitsPhares.map((produit, index) => (
              <FadeIn key={produit.id} delay={(index % 4) * 90}>
                <ProductCard produit={produit} />
              </FadeIn>
            ))}
          </div>
        </section>
      )}

      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <FadeIn>
            <h2 className="font-display text-3xl font-light text-forest">
              Nos univers
            </h2>
          </FadeIn>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {univers.map((item, index) => (
              <FadeIn key={item.slug} delay={index * 90}>
                <Link href={`/categorie/${item.slug}`} className="group block">
                  <div className="relative aspect-[4/5] w-full overflow-hidden border border-border bg-cream transition-colors duration-300 group-hover:border-accent">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.label}
                        fill
                        sizes="(min-width: 1024px) 25vw, 50vw"
                        className="object-cover transition-transform duration-700 ease-premium group-hover:scale-110"
                      />
                    )}
                    <div className="absolute inset-0 bg-forest/0 transition-colors duration-500 group-hover:bg-forest/10" />
                  </div>
                  <p className="mt-6 font-display text-2xl font-light text-forest transition-colors duration-300 group-hover:text-accent">
                    {item.label}
                  </p>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-6 py-24 text-center lg:px-10">
          <FadeIn>
            <h2 className="font-display text-3xl font-light text-forest">
              Une maison, une exigence
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base font-light leading-relaxed text-muted">
              Chaque pièce Lavibel est sélectionnée pour sa qualité de matière
              et la précision de sa coupe. Une mode pensée pour traverser les
              saisons.
            </p>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import { getCategoryHighlights, getFeaturedProducts } from "@/lib/products";
import ProductCard from "@/components/site/ProductCard";
import FeaturedProductCard from "@/components/site/FeaturedProductCard";
import FadeIn from "@/components/site/FadeIn";

export const dynamic = "force-dynamic";

const VALEURS = [
  {
    titre: "Matières sélectionnées",
    texte: "Laine, cuir pleine fleur, lin — chaque matière est choisie pour sa tenue dans le temps.",
    icon: (
      <path
        d="M12 3c4 2 7 5 7 9a7 7 0 0 1-14 0c0-4 3-7 7-9Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    titre: "Fabrication soignée",
    texte: "Des coupes précises et des finitions faites pour durer, saison après saison.",
    icon: (
      <>
        <circle cx="8" cy="8" r="2.5" />
        <circle cx="16" cy="16" r="2.5" />
        <path d="M9.8 9.8 20 20M4 20 14.2 9.8" strokeLinecap="round" />
      </>
    ),
  },
  {
    titre: "Livraison à Ouagadougou",
    texte: "Commande en ligne, livraison rapide et paiement à la réception.",
    icon: (
      <>
        <path d="M3 7h11v10H3z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 10h4l3 3v4h-7z" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="7.5" cy="18" r="1.5" />
        <circle cx="17.5" cy="18" r="1.5" />
      </>
    ),
  },
];

export default async function HomePage() {
  const [produitsPhares, univers] = await Promise.all([
    getFeaturedProducts(9),
    getCategoryHighlights(),
  ]);

  const [featured, ...autresProduits] = produitsPhares;
  const [vedette, ...autresUnivers] = univers;

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

      {featured && (
        <section id="produits-phares" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <FadeIn>
              <p className="text-xs font-light uppercase tracking-[0.35em] text-accent">
                Sélection du moment
              </p>
              <h2 className="mt-4 font-display text-4xl font-light leading-tight text-forest lg:text-5xl">
                Produits
                <br />
                phares
              </h2>
              <p className="mt-6 max-w-sm text-sm font-light leading-relaxed text-muted">
                Une sélection resserrée de pièces qui incarnent l&apos;esprit
                Lavibel — matières nobles, coupes précises, intemporalité
                assumée.
              </p>
            </FadeIn>
            <FadeIn delay={120}>
              <FeaturedProductCard produit={featured} />
            </FadeIn>
          </div>

          {autresProduits.length > 0 && (
            <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-4">
              {autresProduits.map((produit, index) => (
                <FadeIn key={produit.id} delay={(index % 4) * 90}>
                  <ProductCard produit={produit} />
                </FadeIn>
              ))}
            </div>
          )}
        </section>
      )}

      <section className="bg-forest">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 sm:grid-cols-3 lg:px-10">
          {VALEURS.map((valeur, index) => (
            <FadeIn key={valeur.titre} delay={index * 100}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.2}
                className="h-8 w-8 text-accent"
              >
                {valeur.icon}
              </svg>
              <p className="mt-4 font-display text-xl font-light text-cream">
                {valeur.titre}
              </p>
              <p className="mt-2 max-w-xs text-sm font-light leading-relaxed text-cream/70">
                {valeur.texte}
              </p>
            </FadeIn>
          ))}
        </div>
      </section>

      {vedette && (
        <section className="border-b border-border bg-surface">
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
            <FadeIn>
              <p className="text-xs font-light uppercase tracking-[0.35em] text-accent">
                Univers
              </p>
              <h2 className="mt-4 font-display text-3xl font-light text-forest lg:text-4xl">
                Nos collections
              </h2>
            </FadeIn>

            <FadeIn delay={100} className="mt-10 block">
              <Link
                href={`/categorie/${vedette.slug}`}
                className="group relative block aspect-4/5 w-full overflow-hidden border border-border sm:aspect-16/9 lg:aspect-5/2"
              >
                {vedette.image && (
                  <Image
                    src={vedette.image}
                    alt={vedette.label}
                    fill
                    sizes="100vw"
                    className="object-cover object-top transition-transform duration-700 ease-premium group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-linear-to-r from-forest/80 via-forest/20 to-transparent" />
                <div className="absolute inset-y-0 left-0 flex flex-col justify-center px-8 sm:px-12">
                  <p className="font-display text-3xl font-light text-cream sm:text-5xl">
                    {vedette.label}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-light tracking-wide text-cream/90">
                    Découvrir
                    <span className="transition-transform duration-500 ease-premium group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </FadeIn>

            {autresUnivers.length > 0 && (
              <div className="mt-8 grid gap-8 sm:grid-cols-3">
                {autresUnivers.map((item, index) => (
                  <FadeIn key={item.slug} delay={index * 90}>
                    <Link href={`/categorie/${item.slug}`} className="group block">
                      <div className="relative aspect-4/5 w-full overflow-hidden border border-border bg-cream transition-colors duration-300 group-hover:border-accent">
                        {item.image && (
                          <Image
                            src={item.image}
                            alt={item.label}
                            fill
                            sizes="(min-width: 1024px) 25vw, 50vw"
                            className="object-cover transition-transform duration-700 ease-premium group-hover:scale-110"
                          />
                        )}
                      </div>
                      <p className="mt-6 font-display text-2xl font-light text-forest transition-colors duration-300 group-hover:text-accent">
                        {item.label}
                      </p>
                    </Link>
                  </FadeIn>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <section>
        <div className="mx-auto grid max-w-7xl gap-0 lg:grid-cols-2">
          <FadeIn className="relative min-h-[22rem] lg:min-h-[32rem]">
            <Image
              src="/manifeste.jpg"
              alt="Savoir-faire artisanal Lavibel"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </FadeIn>
          <FadeIn
            delay={120}
            className="flex flex-col justify-center bg-surface px-6 py-16 lg:px-16 lg:py-0"
          >
            <p className="text-xs font-light uppercase tracking-[0.35em] text-accent">
              Notre exigence
            </p>
            <h2 className="mt-4 font-display text-3xl font-light leading-tight text-forest lg:text-4xl">
              Une maison,
              <br />
              une exigence.
            </h2>
            <p className="mt-6 max-w-md text-base font-light leading-relaxed text-muted">
              Chaque pièce Lavibel est sélectionnée pour sa qualité de matière
              et la précision de sa coupe. Une mode pensée pour traverser les
              saisons, loin des effets de mode éphémères.
            </p>
            <Link
              href="/categorie/femme"
              className="group mt-8 inline-flex w-fit items-center gap-3 border border-forest px-8 py-3.5 text-sm font-light tracking-wide text-forest transition-colors duration-500 ease-premium hover:bg-forest hover:text-cream"
            >
              Explorer la collection
              <span className="transition-transform duration-500 ease-premium group-hover:translate-x-1">
                →
              </span>
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

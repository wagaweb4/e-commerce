import Link from "next/link";

const UNIVERS = [
  {
    label: "Femme",
    href: "/femme",
    description: "Silhouettes fluides, matières nobles.",
  },
  {
    label: "Homme",
    href: "/homme",
    description: "Coupes épurées, savoir-faire précis.",
  },
  {
    label: "Accessoires",
    href: "/accessoires",
    description: "Les détails qui font la différence.",
  },
];

export default function HomePage() {
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
            href="/nouveautes"
            className="mt-10 inline-flex items-center gap-3 border border-forest px-8 py-3.5 text-sm font-light tracking-wide text-forest transition-colors duration-300 hover:bg-forest hover:text-cream"
          >
            Découvrir la collection
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <h2 className="font-display text-3xl font-light text-forest">
          Nos univers
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {UNIVERS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group block border border-border bg-surface p-8 transition-colors duration-300 hover:border-accent"
            >
              <div className="aspect-[4/5] w-full border border-border bg-cream transition-colors duration-300 group-hover:border-accent" />
              <p className="mt-6 font-display text-2xl font-light text-forest">
                {item.label}
              </p>
              <p className="mt-2 text-sm font-light text-muted">
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-surface">
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

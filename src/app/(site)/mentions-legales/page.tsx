import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales — Lavibel",
};

export default function MentionsLegalesPage() {
  return (
    <div className="mx-auto max-w-3xl animate-fade-in-up px-6 py-24 lg:px-10">
      <p className="text-xs font-light uppercase tracking-[0.35em] text-accent">
        Informations
      </p>
      <h1 className="mt-4 font-display text-4xl font-light text-forest lg:text-5xl">
        Mentions légales
      </h1>

      <div className="mt-12 space-y-10 text-sm font-light leading-relaxed text-muted">
        <section>
          <h2 className="font-display text-lg font-light text-forest">
            Éditeur du site
          </h2>
          <p className="mt-3">
            Lavibel — Ouagadougou, Burkina Faso
            <br />
            Contact : contact@lavibel.bf
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-light text-forest">
            Hébergement
          </h2>
          <p className="mt-3">
            Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133,
            Walnut, CA 91789, États-Unis.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-light text-forest">
            Propriété intellectuelle
          </h2>
          <p className="mt-3">
            L&apos;ensemble des contenus présents sur ce site (textes,
            visuels, identité de marque) est la propriété de Lavibel, sauf
            mention contraire, et ne peut être reproduit sans autorisation
            préalable.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-light text-forest">
            Données personnelles
          </h2>
          <p className="mt-3">
            Les informations transmises lors d&apos;une commande (nom,
            téléphone, adresse) sont utilisées uniquement dans le cadre du
            traitement de cette commande et ne sont ni revendues ni
            partagées avec des tiers.
          </p>
        </section>
      </div>
    </div>
  );
}

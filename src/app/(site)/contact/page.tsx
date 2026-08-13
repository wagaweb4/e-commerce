import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Lavibel",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl animate-fade-in-up px-6 py-24 lg:px-10">
      <p className="text-xs font-light uppercase tracking-[0.35em] text-accent">
        Contact
      </p>
      <h1 className="mt-4 font-display text-4xl font-light text-forest lg:text-5xl">
        Nous écrire
      </h1>
      <p className="mt-6 max-w-lg text-sm font-light leading-relaxed text-muted">
        Une question sur une commande, une pièce ou une collaboration ?
        Notre équipe vous répond sous 48h.
      </p>

      <div className="mt-12 grid gap-10 sm:grid-cols-2">
        <div>
          <p className="text-xs font-light uppercase tracking-wide text-muted">
            Boutique
          </p>
          <p className="mt-2 text-sm font-light leading-relaxed text-forest">
            Secteur 15, Avenue Kwamé N&apos;Krumah
            <br />
            Ouagadougou, Burkina Faso
          </p>
        </div>
        <div>
          <p className="text-xs font-light uppercase tracking-wide text-muted">
            Téléphone
          </p>
          <p className="mt-2 text-sm font-light text-forest">+226 25 00 00 00</p>
        </div>
        <div>
          <p className="text-xs font-light uppercase tracking-wide text-muted">
            Email
          </p>
          <p className="mt-2 text-sm font-light text-forest">contact@lavibel.bf</p>
        </div>
        <div>
          <p className="text-xs font-light uppercase tracking-wide text-muted">
            Horaires
          </p>
          <p className="mt-2 text-sm font-light leading-relaxed text-forest">
            Lundi – Samedi, 9h – 19h
          </p>
        </div>
      </div>
    </div>
  );
}

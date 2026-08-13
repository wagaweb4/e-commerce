import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-cream">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-display text-xl tracking-[0.2em] text-forest">
              LAVIBEL
            </p>
            <p className="mt-3 max-w-xs text-sm font-light leading-relaxed text-muted">
              Mode intemporelle, façonnée avec exigence. Vêtements, chaussures
              et accessoires pour elle et lui.
            </p>
          </div>

          <div>
            <p className="text-sm font-medium tracking-wide text-forest">
              Navigation
            </p>
            <ul className="mt-3 space-y-2 text-sm font-light text-muted">
              <li>
                <Link href="/femme" className="transition-colors duration-300 hover:text-accent">
                  Femme
                </Link>
              </li>
              <li>
                <Link href="/homme" className="transition-colors duration-300 hover:text-accent">
                  Homme
                </Link>
              </li>
              <li>
                <Link href="/accessoires" className="transition-colors duration-300 hover:text-accent">
                  Accessoires
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-medium tracking-wide text-forest">
              Informations
            </p>
            <ul className="mt-3 space-y-2 text-sm font-light text-muted">
              <li>
                <Link href="/contact" className="transition-colors duration-300 hover:text-accent">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/mentions-legales" className="transition-colors duration-300 hover:text-accent">
                  Mentions légales
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 text-xs font-light tracking-wide text-muted">
          © {year} Lavibel. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}

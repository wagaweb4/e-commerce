import Link from "next/link";
import { logout } from "../login/actions";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-6 py-5 lg:px-10">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 sm:gap-x-10">
            <Link
              href="/admin/produits"
              className="font-display text-xl tracking-[0.2em] text-forest"
            >
              LAVIBEL
            </Link>
            <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-light tracking-wide">
              <Link
                href="/admin/produits"
                className="text-forest transition-colors duration-300 hover:text-accent"
              >
                Produits
              </Link>
              <Link
                href="/admin/categories"
                className="text-forest transition-colors duration-300 hover:text-accent"
              >
                Catégories
              </Link>
              <Link
                href="/admin/commandes"
                className="text-forest transition-colors duration-300 hover:text-accent"
              >
                Commandes
              </Link>
            </nav>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="text-sm font-light tracking-wide text-muted transition-colors duration-300 hover:text-accent"
            >
              Déconnexion
            </button>
          </form>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-12 lg:px-10">{children}</main>
    </div>
  );
}

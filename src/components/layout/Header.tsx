import Link from "next/link";
import { NAV_CATEGORIES } from "@/lib/products";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <Link
          href="/"
          className="font-display text-2xl font-medium tracking-[0.2em] text-forest"
        >
          LAVIBEL
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {NAV_CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categorie/${cat.slug}`}
              className="text-sm font-light tracking-wide text-forest transition-colors duration-300 hover:text-accent"
            >
              {cat.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-6 text-sm font-light tracking-wide text-forest">
          <Link
            href="/contact"
            className="hidden transition-colors duration-300 hover:text-accent sm:inline"
          >
            Contact
          </Link>
          <button
            type="button"
            aria-label="Rechercher"
            className="transition-colors duration-300 hover:text-accent"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.4}
              className="h-5 w-5"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.2-3.2" strokeLinecap="round" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Panier"
            className="transition-colors duration-300 hover:text-accent"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.4}
              className="h-5 w-5"
            >
              <path
                d="M6 8h12l-1 12H7L6 8Z"
                strokeLinejoin="round"
              />
              <path d="M9 8V6a3 3 0 0 1 6 0v2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

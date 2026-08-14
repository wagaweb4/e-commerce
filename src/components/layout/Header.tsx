"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { NAV_CATEGORIES } from "@/lib/navCategories";
import CartButton from "@/components/site/CartButton";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  ...NAV_CATEGORIES.map((cat) => ({
    href: `/categorie/${cat.slug}`,
    label: cat.label,
  })),
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- ferme le menu mobile a chaque changement de route
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-cream/85 backdrop-blur-md transition-shadow duration-500 ${
        scrolled ? "border-border shadow-[0_1px_20px_-4px_rgba(31,61,48,0.12)]" : "border-transparent"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-[padding] duration-500 lg:px-10 ${
          scrolled ? "py-3.5" : "py-5"
        }`}
      >
        <Link
          href="/"
          className="font-display text-2xl font-medium tracking-[0.2em] text-forest transition-transform duration-300 hover:scale-[1.02]"
        >
          LAVIBEL
        </Link>

        <nav className="hidden items-center gap-3 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="border border-border px-4 py-2 text-sm font-light tracking-wide text-forest transition-all duration-300 ease-premium hover:border-forest hover:bg-forest hover:text-cream"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5 text-sm font-light tracking-wide text-forest sm:gap-6">
          <Link
            href="/contact"
            className="hidden transition-colors duration-300 hover:text-accent sm:inline"
          >
            Contact
          </Link>
          <button
            type="button"
            aria-label="Rechercher"
            className="hidden transition-colors duration-300 hover:text-accent sm:inline-flex"
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
          <CartButton />
          <button
            type="button"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="relative h-5 w-6 shrink-0 md:hidden"
          >
            <span
              className={`absolute left-0 h-px w-6 bg-forest transition-all duration-300 ease-premium ${
                menuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 h-px w-6 -translate-y-1/2 bg-forest transition-opacity duration-200 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 h-px w-6 bg-forest transition-all duration-300 ease-premium ${
                menuOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "top-full -translate-y-full"
              }`}
            />
          </button>
        </div>
      </div>

      <div
        className={`grid overflow-hidden bg-cream transition-[grid-template-rows] duration-500 ease-premium md:hidden ${
          menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0">
          <nav className="flex flex-col gap-2 border-t border-border px-6 py-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="border border-border px-4 py-3 text-sm font-light tracking-wide text-forest transition-colors duration-300 hover:border-forest hover:bg-forest hover:text-cream"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="border border-border px-4 py-3 text-sm font-light tracking-wide text-forest transition-colors duration-300 hover:border-forest hover:bg-forest hover:text-cream"
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

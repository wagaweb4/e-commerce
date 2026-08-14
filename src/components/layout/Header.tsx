"use client";

import { useEffect, useState } from "react";
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
          <CartButton />
        </div>
      </div>
    </header>
  );
}

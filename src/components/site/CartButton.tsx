"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart/CartContext";

export default function CartButton() {
  const { count } = useCart();

  return (
    <Link
      href="/panier"
      aria-label="Panier"
      className="relative transition-colors duration-300 hover:text-accent"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
        className="h-5 w-5"
      >
        <path d="M6 8h12l-1 12H7L6 8Z" strokeLinejoin="round" />
        <path d="M9 8V6a3 3 0 0 1 6 0v2" strokeLinecap="round" />
      </svg>
      {count > 0 && (
        <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-medium text-cream">
          {count}
        </span>
      )}
    </Link>
  );
}

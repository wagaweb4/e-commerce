import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/types/database";

export default function FeaturedProductCard({ produit }: { produit: Product }) {
  const image = produit.images?.[0];

  return (
    <Link
      href={`/produits/${produit.slug}`}
      className="group relative block aspect-4/5 w-full overflow-hidden border border-border bg-surface lg:aspect-3/4"
    >
      {image && (
        <Image
          src={image}
          alt={produit.nom}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-premium group-hover:scale-110"
        />
      )}
      <div className="absolute inset-0 bg-linear-to-t from-forest/85 via-forest/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-8">
        <p className="text-xs font-light uppercase tracking-[0.3em] text-accent">
          Sélection
        </p>
        <p className="mt-2 font-display text-2xl font-light text-cream lg:text-3xl">
          {produit.nom}
        </p>
        <p className="mt-1 text-sm font-light text-cream/80">
          {formatPrice(Number(produit.prix))}
        </p>
      </div>
    </Link>
  );
}

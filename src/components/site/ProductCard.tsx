import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/types/database";

export default function ProductCard({ produit }: { produit: Product }) {
  const image = produit.images?.[0];

  return (
    <Link href={`/produits/${produit.slug}`} className="group block">
      <div className="relative aspect-[3/4] w-full overflow-hidden border border-border bg-surface transition-shadow duration-500 ease-premium group-hover:shadow-[0_20px_40px_-16px_rgba(31,61,48,0.25)]">
        {image ? (
          <Image
            src={image}
            alt={produit.nom}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover transition-transform duration-700 ease-premium group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs font-light uppercase tracking-wide text-muted">
            Lavibel
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center bg-forest/90 py-3 text-xs font-light uppercase tracking-[0.2em] text-cream transition-transform duration-500 ease-premium group-hover:translate-y-0">
          Voir le produit
        </div>
      </div>
      <p className="mt-4 font-display text-lg font-light text-forest transition-colors duration-300 group-hover:text-accent">
        {produit.nom}
      </p>
      <p className="mt-1 text-sm font-light text-muted">{formatPrice(Number(produit.prix))}</p>
    </Link>
  );
}

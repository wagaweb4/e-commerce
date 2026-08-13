import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/types/database";

export default function ProductCard({ produit }: { produit: Product }) {
  const image = produit.images?.[0];

  return (
    <Link href={`/produits/${produit.slug}`} className="group block">
      <div className="relative aspect-[3/4] w-full overflow-hidden border border-border bg-surface">
        {image ? (
          <Image
            src={image}
            alt={produit.nom}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs font-light uppercase tracking-wide text-muted">
            Lavibel
          </div>
        )}
      </div>
      <p className="mt-4 font-display text-lg font-light text-forest transition-colors duration-300 group-hover:text-accent">
        {produit.nom}
      </p>
      <p className="mt-1 text-sm font-light text-muted">{formatPrice(Number(produit.prix))}</p>
    </Link>
  );
}

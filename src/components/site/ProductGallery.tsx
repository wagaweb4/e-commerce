"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductGallery({
  images,
  nom,
}: {
  images: string[];
  nom: string;
}) {
  const [active, setActive] = useState(0);
  const displayImages = images.length > 0 ? images : [null];

  return (
    <div>
      <div className="relative aspect-3/4 w-full overflow-hidden border border-border bg-surface">
        {displayImages[active] ? (
          <Image
            key={active}
            src={displayImages[active] as string}
            alt={nom}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
            className="animate-fade-in object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm font-light uppercase tracking-wide text-muted">
            Lavibel
          </div>
        )}
      </div>

      {displayImages.length > 1 && (
        <div className="mt-4 grid grid-cols-5 gap-3">
          {displayImages.map((src, index) => (
            <button
              key={src ?? index}
              type="button"
              onClick={() => setActive(index)}
              className={`relative aspect-3/4 overflow-hidden border transition-all duration-300 ease-premium ${
                index === active
                  ? "border-forest opacity-100"
                  : "border-border opacity-70 hover:border-accent hover:opacity-100"
              }`}
            >
              {src && (
                <Image src={src} alt={`${nom} — vue ${index + 1}`} fill className="object-cover" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { formatPrice } from "@/lib/format";
import ClearCartOnMount from "@/components/site/ClearCartOnMount";

export const dynamic = "force-dynamic";

type CommandeArticle = {
  nom: string;
  prix: number;
  taille: string | null;
  couleur: string | null;
  quantite: number;
};

export default async function ConfirmationCommandePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createAdminClient();
  const { data: commande } = await supabase
    .from("commandes")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!commande) notFound();

  const articles = commande.articles as unknown as CommandeArticle[];

  return (
    <div className="mx-auto max-w-2xl px-6 py-24 lg:px-10">
      <ClearCartOnMount />

      <p className="text-xs font-light uppercase tracking-[0.35em] text-accent">
        Commande confirmée
      </p>
      <h1 className="mt-4 font-display text-3xl font-light text-forest lg:text-4xl">
        Merci, {commande.nom_client.split(" ")[0]}.
      </h1>
      <p className="mt-4 text-sm font-light leading-relaxed text-muted">
        Votre commande a bien été enregistrée. Notre équipe vous contactera au{" "}
        {commande.telephone} pour confirmer la livraison à {commande.ville}.
      </p>

      <div className="mt-10 border border-border bg-surface p-6">
        <p className="text-xs font-light uppercase tracking-wide text-muted">
          Numéro de commande
        </p>
        <p className="mt-1 font-display text-lg font-light text-forest">
          {commande.id}
        </p>

        <div className="mt-6 space-y-3 border-t border-border pt-6 text-sm font-light">
          {articles.map((article, index) => (
            <div key={index} className="flex justify-between gap-4">
              <span className="text-forest">
                {article.nom}
                {(article.taille || article.couleur) && (
                  <span className="text-muted">
                    {" "}
                    ({[article.couleur, article.taille].filter(Boolean).join(" · ")})
                  </span>
                )}
                <span className="text-muted"> × {article.quantite}</span>
              </span>
              <span className="shrink-0 text-forest">
                {formatPrice(article.prix * article.quantite)}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-between border-t border-border pt-6 text-sm text-forest">
          <span>Total</span>
          <span>{formatPrice(Number(commande.total))}</span>
        </div>
      </div>

      <Link
        href="/"
        className="mt-10 inline-flex items-center gap-3 border border-forest px-8 py-3.5 text-sm font-light tracking-wide text-forest transition-colors duration-300 hover:bg-forest hover:text-cream"
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}

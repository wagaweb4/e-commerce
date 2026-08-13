import { createAdminClient } from "@/lib/supabase/admin";
import { formatPrice } from "@/lib/format";
import StatutSelect from "@/components/admin/StatutSelect";
import type { CommandeArticle } from "@/types/database";

export const dynamic = "force-dynamic";

export default async function AdminCommandesPage() {
  const supabase = createAdminClient();
  const { data: commandes, error } = await supabase
    .from("commandes")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="font-display text-3xl font-light text-forest">Commandes</h1>

      {error && (
        <p className="mt-6 text-sm font-light text-red-700">
          Impossible de charger les commandes : {error.message}
        </p>
      )}

      {!error && commandes && commandes.length === 0 && (
        <p className="mt-10 text-sm font-light text-muted">
          Aucune commande pour l&apos;instant.
        </p>
      )}

      {!error && commandes && commandes.length > 0 && (
        <div className="mt-8 space-y-4">
          {commandes.map((commande) => {
            const articles = commande.articles as unknown as CommandeArticle[];
            return (
              <div key={commande.id} className="border border-border bg-surface p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="font-light text-forest">{commande.nom_client}</p>
                    <p className="mt-1 text-xs font-light text-muted">
                      {commande.telephone} · {commande.ville}
                    </p>
                    <p className="mt-1 text-xs font-light text-muted">
                      {new Date(commande.created_at).toLocaleString("fr-FR", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-sm font-light text-forest">
                      {formatPrice(Number(commande.total))}
                    </p>
                    <StatutSelect id={commande.id} statut={commande.statut} />
                  </div>
                </div>

                <div className="mt-4 space-y-1 border-t border-border pt-4 text-xs font-light text-muted">
                  {articles.map((article, index) => (
                    <div key={index} className="flex justify-between">
                      <span>
                        {article.nom}
                        {(article.taille || article.couleur) &&
                          ` (${[article.couleur, article.taille].filter(Boolean).join(" · ")})`}
                        {" × "}
                        {article.quantite}
                      </span>
                      <span>{formatPrice(article.prix * article.quantite)}</span>
                    </div>
                  ))}
                </div>

                {commande.notes && (
                  <p className="mt-4 border-t border-border pt-4 text-xs font-light italic text-muted">
                    {commande.notes}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

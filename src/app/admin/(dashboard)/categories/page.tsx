import { createAdminClient } from "@/lib/supabase/admin";
import { createCategorie, deleteCategorie } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  const supabase = createAdminClient();
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("nom");

  return (
    <div>
      <h1 className="font-display text-3xl font-light text-forest">Catégories</h1>

      <form action={createCategorie} className="mt-8 flex max-w-md gap-3">
        <input
          name="nom"
          required
          placeholder="Nom de la catégorie"
          className="flex-1 border border-border bg-surface px-4 py-3 text-sm text-forest outline-none transition-colors duration-300 focus:border-accent"
        />
        <button
          type="submit"
          className="border border-forest bg-forest px-6 py-3 text-sm font-light tracking-wide text-cream transition-colors duration-300 hover:bg-accent hover:border-accent"
        >
          Ajouter
        </button>
      </form>

      <div className="mt-8 max-w-md border border-border bg-surface">
        {(!categories || categories.length === 0) && (
          <p className="p-5 text-sm font-light text-muted">Aucune catégorie.</p>
        )}
        {categories?.map((cat) => (
          <div
            key={cat.id}
            className="flex items-center justify-between border-b border-border px-5 py-4 last:border-0"
          >
            <div>
              <p className="font-light text-forest">{cat.nom}</p>
              <p className="text-xs font-light text-muted">{cat.slug}</p>
            </div>
            <form action={deleteCategorie}>
              <input type="hidden" name="id" value={cat.id} />
              <button
                type="submit"
                className="text-sm font-light text-muted transition-colors duration-300 hover:text-red-700"
              >
                Supprimer
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}

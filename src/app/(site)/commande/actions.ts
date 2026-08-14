"use server";

import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import type { CartItem } from "@/lib/cart/types";

export type CommandeState = { error: string } | null;

export async function creerCommande(
  _prevState: CommandeState,
  formData: FormData
): Promise<CommandeState> {
  const nomClient = String(formData.get("nom_client") ?? "").trim();
  const telephone = String(formData.get("telephone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim() || null;
  const adresse = String(formData.get("adresse") ?? "").trim();
  const ville = String(formData.get("ville") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim() || null;
  const articlesRaw = String(formData.get("articles") ?? "[]");

  if (!nomClient || !telephone || !adresse || !ville) {
    return { error: "Merci de renseigner tous les champs obligatoires." };
  }

  let panier: CartItem[];
  try {
    panier = JSON.parse(articlesRaw);
  } catch {
    return { error: "Panier invalide." };
  }

  if (!Array.isArray(panier) || panier.length === 0) {
    return { error: "Votre panier est vide." };
  }

  const supabase = createAdminClient();

  const { data: produits, error: produitsError } = await supabase
    .from("produits")
    .select("id, nom, prix, stock")
    .in(
      "id",
      panier.map((a) => a.produitId)
    );

  if (produitsError || !produits) {
    return { error: "Impossible de vérifier les produits du panier." };
  }

  const produitsById = new Map(produits.map((p) => [p.id, p]));

  let total = 0;
  const articles = [];
  for (const item of panier) {
    const produit = produitsById.get(item.produitId);
    if (!produit) continue;
    const prix = Number(produit.prix);
    total += prix * item.quantite;
    articles.push({
      produit_id: produit.id,
      nom: produit.nom,
      prix,
      taille: item.taille,
      couleur: item.couleur,
      quantite: item.quantite,
    });
  }

  if (articles.length === 0) {
    return { error: "Les produits de votre panier ne sont plus disponibles." };
  }

  const { data: commande, error: insertError } = await supabase
    .from("commandes")
    .insert({
      nom_client: nomClient,
      telephone,
      email,
      adresse,
      ville,
      notes,
      articles,
      total,
    })
    .select("id")
    .single();

  if (insertError || !commande) {
    return { error: `Impossible d'enregistrer la commande : ${insertError?.message}` };
  }

  await Promise.all(
    articles.map((a) => {
      const produit = produitsById.get(a.produit_id);
      if (!produit) return Promise.resolve();
      const nouveauStock = Math.max(0, produit.stock - a.quantite);
      return supabase.from("produits").update({ stock: nouveauStock }).eq("id", a.produit_id);
    })
  );

  redirect(`/commande/confirmation/${commande.id}`);
}

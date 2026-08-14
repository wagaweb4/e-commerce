export type CartItem = {
  produitId: string;
  slug: string;
  nom: string;
  prix: number;
  image: string | null;
  taille: string | null;
  couleur: string | null;
  quantite: number;
};

export type Category = {
  id: string;
  nom: string;
  slug: string;
  created_at: string;
};

export type Product = {
  id: string;
  nom: string;
  slug: string;
  description_courte: string | null;
  prix: number;
  categorie_id: string | null;
  tailles: string[];
  couleurs: string[];
  stock: number;
  images: string[];
  created_at: string;
  updated_at: string;
};

export type ProductWithCategory = Product & {
  categories: Category | null;
};

export type CommandeArticle = {
  produit_id: string;
  nom: string;
  prix: number;
  taille: string | null;
  couleur: string | null;
  quantite: number;
};

export type CommandeStatut =
  | "en_attente"
  | "confirmee"
  | "expediee"
  | "livree"
  | "annulee";

export type Commande = {
  id: string;
  nom_client: string;
  telephone: string;
  email: string | null;
  adresse: string;
  ville: string;
  notes: string | null;
  articles: CommandeArticle[];
  total: number;
  statut: CommandeStatut;
  created_at: string;
};

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "13.0.5";
  };
  public: {
    Tables: {
      categories: {
        Row: Category;
        Insert: Omit<Category, "id" | "created_at"> & { id?: string };
        Update: Partial<Omit<Category, "id" | "created_at">>;
        Relationships: [];
      };
      produits: {
        Row: Product;
        Insert: Omit<Product, "id" | "created_at" | "updated_at"> & {
          id?: string;
        };
        Update: Partial<Omit<Product, "id" | "created_at" | "updated_at">>;
        Relationships: [
          {
            foreignKeyName: "produits_categorie_id_fkey";
            columns: ["categorie_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
        ];
      };
      commandes: {
        Row: Commande;
        Insert: Omit<Commande, "id" | "created_at" | "statut"> & {
          id?: string;
          statut?: CommandeStatut;
        };
        Update: Partial<Omit<Commande, "id" | "created_at">>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

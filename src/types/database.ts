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
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

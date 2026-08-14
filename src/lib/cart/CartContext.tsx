"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartItem } from "./types";

const STORAGE_KEY = "lavibel_cart";

export function itemKey(item: Pick<CartItem, "produitId" | "taille" | "couleur">) {
  return `${item.produitId}::${item.taille ?? ""}::${item.couleur ?? ""}`;
}

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  addItem: (item: CartItem) => void;
  updateQuantity: (key: string, quantite: number) => void;
  removeItem: (key: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- lecture ponctuelle du panier au montage, nécessaire pour éviter un mismatch d'hydratation (localStorage indisponible côté serveur).
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // localStorage indisponible ou contenu corrompu : on repart d'un panier vide.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      const key = itemKey(item);
      const existing = prev.find((i) => itemKey(i) === key);
      if (existing) {
        return prev.map((i) =>
          itemKey(i) === key ? { ...i, quantite: i.quantite + item.quantite } : i
        );
      }
      return [...prev, item];
    });
  };

  const updateQuantity = (key: string, quantite: number) => {
    setItems((prev) =>
      prev
        .map((i) => (itemKey(i) === key ? { ...i, quantite } : i))
        .filter((i) => i.quantite > 0)
    );
  };

  const removeItem = (key: string) => {
    setItems((prev) => prev.filter((i) => itemKey(i) !== key));
  };

  const clear = () => setItems([]);

  const { count, subtotal } = useMemo(
    () => ({
      count: items.reduce((sum, i) => sum + i.quantite, 0),
      subtotal: items.reduce((sum, i) => sum + i.quantite * i.prix, 0),
    }),
    [items]
  );

  return (
    <CartContext.Provider
      value={{ items, count, subtotal, addItem, updateQuantity, removeItem, clear }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart doit être utilisé sous CartProvider");
  return ctx;
}

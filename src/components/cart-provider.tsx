"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type CartItem = {
  id: string;
  description: string;
  price: number;
};

type CartContextType = {
  cart: CartItem[];
  cartTotal: number;
  addToCart: (description: string, price: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

const STORAGE_KEY = "maas-cart"

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
      try {
        const savedCart = localStorage.getItem(STORAGE_KEY);

        if (savedCart) {
          setCart(JSON.parse(savedCart));
        }
      } catch {
        console.error("Failed to load cart from localStorage");
      } finally {
        setIsLoaded(true);
      }
    }, []);

  const addToCart = (description: string, price: number) => {
    setCart((items) => [
      ...items,
      {
        id: crypto.randomUUID(),
        description,
        price,
      },
    ]);
  };

  const removeFromCart = (id: string) => {
    setCart((items) => items.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((total, item) => total + item.price, 0);

  return (
    <CartContext.Provider
      value={{ cart, cartTotal, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}

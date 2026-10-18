"use client";

import { PlanId, VALID_PLANS } from "@/lib/user";
import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";

export type CartItem = {
  id: string;
  description: string;
  price: number;
  planId?: PlanId;
};

type CartContextType = {
  cart: CartItem[];
  cartTotal: number;
  addToCart: (description: string, price: number, planId?: PlanId) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

const STORAGE_KEY = "maas-cart";
const EMPTY: CartItem[] = [];

const CartContext = createContext<CartContextType | null>(null);

const listeners = new Set<() => void>();
let cachedRaw: string | null = null;
let cachedCart: CartItem[] = EMPTY;

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

function isCartItemArray(value: unknown): value is CartItem[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        typeof item.id === "string" &&
        typeof item.description === "string" &&
        typeof item.price === "number" &&
        Number.isFinite(item.price),
    )
  );
}

function getSnapshot(): CartItem[] {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (raw !== cachedRaw) {
    cachedRaw = raw;

    try {
      const parsed: unknown = raw ? JSON.parse(raw) : [];
      cachedCart = isCartItemArray(parsed) ? parsed : EMPTY;
    } catch {
      cachedCart = EMPTY;
    }
  }

  return cachedCart;
}

function getServerSnapshot(): CartItem[] {
  return EMPTY;
}

function writeCart(next: CartItem[]) {
  const raw = JSON.stringify(next);

  try {
    localStorage.setItem(STORAGE_KEY, raw);
  } catch (error) {
    console.error("Failed to save cart:", error);
    return;
  }

  cachedRaw = raw;
  cachedCart = next;
  listeners.forEach((listener) => listener());
}

export function CartProvider({ children }: { children: ReactNode }) {
  const cart = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const addToCart = (description: string, price: number, planId?: PlanId) => {
    if (!Number.isFinite(price) || price < 0) {
      throw new Error("Cart item price must be a finite, non-negative number");
    }

    if (planId && !VALID_PLANS.includes(planId)) {
      throw new Error("Plan iD does not exist.")
    }

    writeCart([
      ...getSnapshot(),
      {
        id: crypto.randomUUID(), description, price,
        ...(planId ? {planId}: {})},
    ]);
  };

  const removeFromCart = (id: string) =>
    writeCart(getSnapshot().filter((item) => item.id !== id));

  const clearCart = () => writeCart([]);

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
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}

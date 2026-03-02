"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";

type CartItem = {
  _id: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  clearCart: () => Promise<void>;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data: session } = useSession();
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    if (!session?.user?.email) {
      setCart([]);
      return;
    }

    fetch(`/api/cart?email=${session.user.email}`)
      .then((res) => res.json())
      .then((data) => setCart(data));
  }, [session]);

  const addToCart = async (item: Omit<CartItem, "quantity">) => {
    if (!session?.user?.email) return;

    await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: session.user.email,
        item: { ...item, quantity: 1 },
      }),
    });

    const res = await fetch(
      `/api/cart?email=${session.user.email}`
    );
    const data = await res.json();
    setCart(data);
  };

  const removeFromCart = async (id: string) => {
    if (!session?.user?.email) return;

    await fetch("/api/cart/remove", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: session.user.email,
        productId: id,
      }),
    });

    const res = await fetch(
      `/api/cart?email=${session.user.email}`
    );
    const data = await res.json();
    setCart(data);
  };

  const clearCart = async () => {
    if (!session?.user?.email) return;

    await fetch("/api/cart", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: session.user.email,
      }),
    });

    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
};
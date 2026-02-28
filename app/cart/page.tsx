"use client";

import Navbar from "@/components/layout/Navbar";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Button from "@/components/Button";
import Link from "next/link";

export default function CartPage() {
  const { cart, addToCart, removeFromCart } = useCart();

  const increaseQty = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });
  };

  const decreaseQty = (item: any) => {
    if (item.quantity === 1) {
      removeFromCart(item.id);
    } else {
      removeFromCart(item.id);
      for (let i = 1; i < item.quantity; i++) {
        addToCart(item);
      }
    }
  };

  return (
    <main className="bg-[#F4F3EE] min-h-screen">
      <Navbar />

      <div className="pt-40 max-w-5xl mx-auto px-10">
        <h1 className="text-4xl font-bold mb-10 text-[#4E482E]">
          Your Cart
        </h1>

        {cart.length === 0 ? (
          <p className="text-xl text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl shadow-md flex items-center justify-between px-8 py-6 mb-6"
              >
                <div className="flex items-center gap-6">
                  <Image
                    src={item.image || ""}
                    alt={item.name}
                    width={100}
                    height={100}
                  />
                  <div>
                    <h2 className="text-2xl font-semibold text-[#4E482E]">
                      {item.name}
                    </h2>
                    <p className="text-gray-500">
                      ₹ {item.price}
                    </p>
                  </div>
                </div>

                {/* Quantity Controls (UI SAME STYLE) */}
                <div className="flex flex-col items-center bg-[#A6B11E] rounded-2xl px-3 text-white">
                  <button
                    onClick={() => decreaseQty(item)}
                    className="text-2xl px-4"
                  >
                    −
                  </button>

                  <span className="text-xl px-6">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => increaseQty(item)}
                    className="text-2xl px-4"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}

            <div className="text-right mt-10">
              <Link href="/payment">
                <Button bgColor="#4E482E" title="Proceed to Checkout" />
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
"use client";

import React, { useState, useRef, useEffect } from "react";
import { DM_Sans, Playfair_Display } from "next/font/google";
import Link from "next/link";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useCart } from "@/context/CartContext";
import { useSession, signOut } from "next-auth/react";

const dmSans = DM_Sans({ subsets: ["latin"] });

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
});

const Navbar = () => {
  const { cart } = useCart();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className={`${dmSans.className} fixed top-0 w-full h-28 z-999`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-10 py-4">
        <Link href="/">
          <h1
            className={`${playfair.className} text-3xl cursor-pointer tracking-widest font-bold text-[#4E482E] hover:scale-105 transition`}
          >
            MED<span className="text-[#6B8E23]">TECH</span>
          </h1>
        </Link>

        <div className="flex gap-10 text-2xl font-medium text-[#4E482E]">
          <Link href="/collections" className="hover:text-[#6B8E23] cursor-pointer transition">
            Collections
          </Link>
          <Link href="/#ourStory" className="hover:text-[#6B8E23] cursor-pointer transition">
            Our Story
          </Link>
          <Link href="/contact" className="hover:text-[#6B8E23] cursor-pointer transition">
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative" ref={dropdownRef}>
            {session ? (
              <>
                <div
                  onClick={() => setOpen(!open)}
                  className="flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow border hover:shadow-lg cursor-pointer transition"
                >
                  <div className="w-8 h-8 rounded-full bg-[#4E482E] text-white flex items-center justify-center text-sm font-semibold">
                    {session.user?.name?.charAt(0).toUpperCase()}
                  </div>

                  <span className="text-sm font-semibold text-[#4E482E]">
                    {session.user?.name}
                  </span>
                </div>

                {open && (
                  <div className="absolute right-0 mt-3 w-40 bg-white rounded-xl shadow-lg border py-2">
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="w-full text-left px-4 py-2 text-md text-[#6B8E23] hover:bg-gray-100 transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <Link href="/login" className="cursor-pointer">
                <div className="p-3 bg-white rounded-full shadow hover:scale-105 transition">
                  <FaUser className="h-5 w-5 text-[#4E482E]" />
                </div>
              </Link>
            )}
          </div>

          <Link href="/cart" className="relative cursor-pointer">
            <div className="p-3 bg-white rounded-full shadow hover:scale-105 transition">
              <FaShoppingCart className="h-5 w-5 text-[#4E482E]" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#6B8E23] text-white text-xs px-2 py-[2px] rounded-full">
                  {totalItems}
                </span>
              )}
            </div>
          </Link>

          {session?.user?.role === "admin" && (
            <Link
              href="/admin"
              className="px-5 py-2 cursor-pointer rounded-full bg-gradient-to-r from-[#4E482E] to-[#6D6A5F] text-white text-sm font-semibold shadow hover:scale-105 transition"
            >
              Admin Panel
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// <Link href="/shop">
//   {/* <button className="text-xl flex text-white items-center  bg-black py-4 px-6 rounded-full font-Montagu_Slab font-light">
//     Shop Now
//     <Image
//       src="/images/navbar/arrow-up-right.png"
//       alt="Logo"
//       width={10000}
//       height={1000}
//       className="w-5"
//     />
//   </button> */}
//   <Button bgColor={btnColor} title="Shop Now" />
// </Link>

"use client";

import React, { useState, useRef, useEffect } from "react";
import { DM_Sans, Playfair_Display } from "next/font/google";
import Link from "next/link";
import { FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa";
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
  const [menuOpen, setMenuOpen] = useState(false);

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className={`${dmSans.className} fixed top-0 w-full z-50 bg-[#F4F3EE]/80 backdrop-blur-md border-b border-[#e8e6dd]`}>

      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 lg:px-10 py-4">

        {/* LOGO */}

        <Link href="/">
          <h1 className={`${playfair.className} text-2xl lg:text-3xl tracking-widest font-bold text-[#4E482E] cursor-pointer hover:opacity-80`}>
            MED<span className="text-[#6B8E23]">TECH</span>
          </h1>
        </Link>

        {/* DESKTOP LINKS */}

        <div className="hidden lg:flex gap-10 text-lg font-medium text-[#4E482E]">

          <Link href="/collections" className="hover:text-[#6B8E23] transition">
            Collections
          </Link>

          <Link href="/#ourStory" className="hover:text-[#6B8E23] transition">
            Our Story
          </Link>

          <Link href="/contact" className="hover:text-[#6B8E23] transition">
            Contact
          </Link>

        </div>

        {/* RIGHT SIDE */}

        <div className="flex items-center gap-5">

          {/* USER */}

          <div className="relative hidden lg:block" ref={dropdownRef}>

            {session ? (
              <>
                <div
                  onClick={() => setOpen(!open)}
                  className="flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow border cursor-pointer hover:shadow-lg transition"
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
                      className="w-full text-left px-4 py-2 text-sm text-[#6B8E23] hover:bg-gray-100 transition"
                    >
                      Logout
                    </button>

                  </div>
                )}
              </>
            ) : (
              <Link href="/login">
                <div className="p-3 bg-white rounded-full shadow hover:scale-105 transition">
                  <FaUser className="h-5 w-5 text-[#4E482E]" />
                </div>
              </Link>
            )}

          </div>

          {/* CART */}

          <Link href="/cart" className="relative">

            <div className="p-3 bg-white rounded-full shadow hover:scale-105 transition">

              <FaShoppingCart className="h-5 w-5 text-[#4E482E]" />

              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#6B8E23] text-white text-xs px-2 py-[2px] rounded-full">
                  {totalItems}
                </span>
              )}

            </div>

          </Link>

          {/* ADMIN */}

          {session?.user?.role === "admin" && (
            <Link
              href="/admin"
              className="hidden lg:block px-5 py-2 rounded-full bg-gradient-to-r from-[#4E482E] to-[#6D6A5F] text-white text-sm font-semibold shadow hover:scale-105 transition"
            >
              Admin Panel
            </Link>
          )}

          {/* MOBILE MENU BUTTON */}

          <button
            className="lg:hidden p-2 text-[#4E482E]"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

        </div>

      </div>

      {/* MOBILE MENU */}

      {menuOpen && (

        <div className="lg:hidden bg-[#F4F3EE]/95 backdrop-blur-md px-6 pb-6 flex flex-col gap-6 text-lg font-medium text-[#4E482E]">

          <Link href="/collections" onClick={() => setMenuOpen(false)}>
            Collections
          </Link>

          <Link href="/#ourStory" onClick={() => setMenuOpen(false)}>
            Our Story
          </Link>

          <Link href="/contact" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>

          {session ? (
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-left text-[#6B8E23]"
            >
              Logout
            </button>
          ) : (
            <Link href="/login" onClick={() => setMenuOpen(false)}>
              Login
            </Link>
          )}

        </div>

      )}

    </nav>
  );
};

export default Navbar;
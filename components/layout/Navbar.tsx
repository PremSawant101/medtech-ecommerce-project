"use client";

import React, { useLayoutEffect, useState, useRef, useEffect } from "react";
import { DM_Sans, Playfair_Display } from "next/font/google";
import Link from "next/link";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useCart } from "@/context/CartContext";
import { useSession, signOut } from "next-auth/react";
import gsap from "gsap";

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
  const menuRef = useRef<HTMLDivElement>(null);

  const logoRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);


  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      className={`${dmSans.className} fixed top-0 w-full z-50 backdrop-blur-md bg-white/60 border-b border-[#e8e6dd]`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-10 py-4">

        {/* LOGO */}
        <Link href="/">
          <h1
            ref={logoRef}
            className={`${playfair.className} text-3xl tracking-widest font-bold text-[#4E482E] hover:opacity-80 transition`}
          >
            MED<span className="text-[#6B8E23]">TECH</span>
          </h1>
        </Link>

        {/* LINKS */}
        <div
          ref={linksRef}
          className="hidden md:flex gap-12 text-lg font-medium text-[#4E482E]"
        >
          {["Collections", "Our Story", "Contact"].map((item, i) => {
            const href =
              item === "Our Story"
                ? "/#ourStory"
                : `/${item.toLowerCase().replace(" ", "")}`;

            return (
              <Link
                key={i}
                href={href}
                className="relative group transition"
              >
                {item}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#6B8E23] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            );
          })}
        </div>

        {/* RIGHT SIDE */}
        <div ref={rightRef} className="flex items-center gap-6">

          <div className="hidden md:flex items-center gap-6" ref={dropdownRef}>
            {session ? (
              <>
                <div
                  onClick={() => setOpen(!open)}
                  className="flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-md border hover:shadow-xl cursor-pointer transition"
                >
                  <div className="w-8 h-8 rounded-full bg-[#4E482E] text-white flex items-center justify-center text-sm font-semibold">
                    {session.user?.name?.charAt(0).toUpperCase()}
                  </div>

                  <span className="text-sm font-semibold text-[#4E482E]">
                    {session.user?.name}
                  </span>
                </div>

                {open && (
                  <div className="absolute right-0 mt-3 w-44 bg-white rounded-xl shadow-xl border py-2">
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
                <div className="p-3 bg-white rounded-full shadow-md hover:scale-105 transition">
                  <FaUser className="h-5 w-5 text-[#4E482E]" />
                </div>
              </Link>
            )}
          </div>

          <Link href="/cart" className="relative">
            <div className="p-3 bg-white rounded-full shadow-md hover:scale-105 transition">
              <FaShoppingCart className="h-5 w-5 text-[#4E482E]" />

              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#6B8E23] text-white text-xs px-2 py-[2px] rounded-full shadow">
                  {totalItems}
                </span>
              )}
            </div>
          </Link>

          {session?.user?.role === "admin" && (
            <Link
              href="/admin"
              className="px-6 py-2 rounded-full bg-gradient-to-r from-[#4E482E] to-[#6D6A5F] text-white text-sm font-semibold shadow-lg hover:scale-105 transition"
            >
              Admin Panel
            </Link>
          )}

          {/* HAMBURGER MENU */}
          <div className="md:hidden" ref={menuRef}>
            <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        ref={menuRef}
        className={`${
          menuOpen ? "block" : "hidden"
        } md:hidden bg-white/80 backdrop-blur-md absolute top-full left-0 w-full h-screen`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 text-2xl font-medium text-[#4E482E]">
          {["Collections", "Our Story", "Contact"].map((item, i) => {
            const href =
              item === "Our Story"
                ? "/#ourStory"
                : `/${item.toLowerCase().replace(" ", "")}`;

            return (
              <Link
                key={i}
                href={href}
                className="relative group transition"
                onClick={() => setMenuOpen(false)}
              >
                {item}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#6B8E23] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            );
          })}
          <div className="mt-8">
          {session ? (
              <>
                <div
                  onClick={() => setOpen(!open)}
                  className="flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-md border hover:shadow-xl cursor-pointer transition"
                >
                  <div className="w-8 h-8 rounded-full bg-[#4E482E] text-white flex items-center justify-center text-sm font-semibold">
                    {session.user?.name?.charAt(0).toUpperCase()}
                  </div>

                  <span className="text-sm font-semibold text-[#4E482E]">
                    {session.user?.name}
                  </span>
                </div>

                {open && (
                  <div className="absolute right-0 mt-3 w-44 bg-white rounded-xl shadow-xl border py-2">
                    <button
                      onClick={() => {
                        signOut({ callbackUrl: "/" });
                        setMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-[#6B8E23] hover:bg-gray-100 transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <Link href="/login">
                <div className="p-3 bg-white rounded-full shadow-md hover:scale-105 transition" onClick={() => setMenuOpen(false)}>
                  <FaUser className="h-5 w-5 text-[#4E482E]" />
                </div>
              </Link>
            )}
            </div>
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

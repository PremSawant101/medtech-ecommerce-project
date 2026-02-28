"use client";

import React, { useState, useRef, useEffect } from "react";
import { DM_Sans } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { useCart } from "@/context/CartContext";
import { useSession, signOut } from "next-auth/react";

const dmSans = DM_Sans({
  subsets: ["latin"],
});

const Navbar = () => {
  const { cart } = useCart();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("Session Data:", session);
  }, [session]);
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
  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div
      className={`${dmSans.className} z-999 bg-transparent text-black fixed h-40 text-2xl font-600 flex items-center right-1/5 w-6xl font-semibold`}
    >
      <div className="flex items-center justify-around w-full">
        {/* USER ICON */}
        <div className="relative" ref={dropdownRef}>
          {session ? (
            <>
              {/* User Badge */}
              <div
                onClick={() => setOpen(!open)}
                className="flex items-center gap-3 px-4 py-2 rounded-full
                   bg-white shadow-md border border-gray-200
                   hover:shadow-lg transition-all duration-200
                   cursor-pointer"
              >
                {/* Avatar */}
                <div className="w-8 h-8 rounded-full bg-[#4E482E] text-white flex items-center justify-center text-sm font-semibold">
                  {session.user?.name?.charAt(0).toUpperCase()}
                </div>

                {/* Name */}
                <span className="text-sm font-semibold text-[#4E482E]">
                  {session.user?.name}
                </span>

                {/* Arrow */}
                <svg
                  className={`w-4 h-4 text-[#4E482E] transition-transform duration-200 ${open ? "rotate-180" : ""
                    }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>

              {/* Dropdown */}
              {open && (
                <div className="absolute mt-3 w-40 bg-white rounded-xl shadow-lg border border-gray-200 py-2 right-0 z-50">
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="w-full text-left px-4 py-2 text-sm text-[#4E482E] hover:bg-gray-100 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <Link href="/login">
              <div className="p-4 bg-white rounded-full shadow-md hover:scale-105 transition">
                <FaUser className="h-6 w-6 text-[#4E482E]" />
              </div>
            </Link>
          )}
        </div>

        {/* LINKS */}
        <div className="links flex gap-14">
          <Link href="/collections" className="px-4">
            Collections
          </Link>
          <Link href="/#ourStory" className="px-4">
            Our Story
          </Link>
          <Link href="/" className="px-4">
            Education
          </Link>
          <Link href="/contact" className="px-4">
            Contact
          </Link>
        </div>

        {/* CART ICON */}
        <div>
          <Link href="/cart" className="cursor-pointer relative">
            <div className="p-4 bg-white rounded-full relative">
              <FaShoppingCart className="h-6 w-6" />

              {/* Badge */}
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#4E482E] text-white text-sm px-[8px] py-[2px] rounded-full">
                  {totalItems}
                </span>
              )}
            </div>
          </Link>
        </div>
        {session?.user?.role === "admin" && (
          <Link
            href="/admin"
            className="px-5 py-2 rounded-full
               bg-gradient-to-r from-[#4E482E] to-[#6D6A5F]
               text-white text-sm font-semibold
               shadow-md hover:shadow-lg hover:scale-105
               transition-all duration-200"
          >
            Admin Panel
          </Link>
        )}
      </div>

    </div>
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

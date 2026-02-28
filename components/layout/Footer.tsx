"use client";

import Image from "next/image";
import Link from "next/link";
import { Lexend } from "next/font/google";

const lexend = Lexend({ subsets: ["latin"] });

export default function Footer() {
  return (
    <section
      className={`relative bg-linear-to-l  from-[#FFFEFE26] to-[#DFE2D2] text-[#4E482E] text-[#4E482E] ${lexend.className}`}
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/amla-bg.jpg"
          alt="Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm" />
      </div>

      <div className="max-w-[1300px] mx-auto px-20 py-20">
        <div className="grid grid-cols-3 gap-20">

          {/* COLUMN 1 */}
          <div>
            <h3 className="text-3xl font-bold mb-4">
              Ayurveda Shop
            </h3>

            <p className="text-lg mb-6 text-[#6D6A5F]">
              Rooted in nature. Crafted with tradition.
            </p>

            <p className="text-[#6D6A5F] leading-relaxed">
              123 Wellness Street<br />
              Ahmedabad, Gujarat<br />
              India - 380001
            </p>
          </div>

          {/* COLUMN 2 */}
          <div>
            <h4 className="text-xl font-semibold mb-6">
              Products
            </h4>

            <ul className="space-y-3 text-[#6D6A5F]">
              <li>
                <Link href="/collections/hair-oil" className="hover:text-[#A6B11E] transition">
                  Hair Oil
                </Link>
              </li>
              <li>
                <Link href="/collections/hair-tablets" className="hover:text-[#A6B11E] transition">
                  Hair Tablets
                </Link>
              </li>
              <li>
                <Link href="/collections/hair-lepa" className="hover:text-[#A6B11E] transition">
                  Hair Lepa
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3 */}
          <div>
            <h4 className="text-xl font-semibold mb-6">
              Quick Links
            </h4>

            <ul className="space-y-3 text-[#6D6A5F]">
              <li>
                <Link href="/" className="hover:text-[#A6B11E] transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-[#A6B11E] transition">
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/our-story" className="hover:text-[#A6B11E] transition">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/education" className="hover:text-[#A6B11E] transition">
                  Education
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#A6B11E] transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="mt-16 pt-8 border-t border-[#4E482E]/30 text-center text-sm text-[#6D6A5F]">
          © 2026 Ayurveda Shop. All Rights Reserved.
        </div>
      </div>
    </section>
  );
}
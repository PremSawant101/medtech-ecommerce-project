"use client";

import Navbar from "@/components/layout/Navbar";
import { Lexend } from "next/font/google";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const lexend = Lexend({
  subsets: ["latin"],
});

type Product = {
  _id: string;
  name: string;
  category: string;
  image?: string;
};

export default function CollectionsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  useGSAP(
    () => {
      const sections = gsap.utils.toArray<HTMLElement>(".collection-section");

      sections.forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "+=80%",
          pin: true,
          scrub: true,
        });
      });

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: containerRef }
  );

  const hairOil = products.filter((p) =>
    p.category?.toLowerCase().includes("oil")
  );

  const hairTablets = products.filter((p) =>
    p.category?.toLowerCase().includes("tablet")
  );

  const hairLepa = products.filter((p) =>
    p.category?.toLowerCase().includes("lepa")
  );

  return (
    <div>
      <Navbar />

      <main
        ref={containerRef}
        className={`relative bg-[#F4F3EE] ${lexend.className}`}
      >
        {/* FIXED BACKGROUND */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <Image
            src="/images/amla.png"
            alt="Amla"
            width={250}
            height={250}
            className="absolute -top-40 -left-20 blur-sm -rotate-45"
          />
          <Image
            src="/images/frontAmla.png"
            alt="Amla"
            width={200}
            height={200}
            className="absolute -top-30 right-1/5 rotate-140"
          />
          <Image
            src="/images/leaves/leaf1.png"
            alt="Leaf"
            width={250}
            height={250}
            className="absolute -bottom-20 -left-20 rotate-45"
          />
        </div>

        {/* ================= HAIR OIL ================= */}
        <section className="collection-section min-h-screen flex flex-col items-center justify-center px-6 md:px-16">
          <h1
            className="text-[60px] md:text-[120px] font-extrabold text-transparent mt-28 tracking-wide text-center"
            style={{ WebkitTextStroke: "2px #A6B11E" }}
          >
            HAIR OIL
          </h1>

          <div className="flex gap-20 flex-wrap justify-center">
            {hairOil.map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}
                image={product.image || "/images/oil/product1.png"}
                title={product.name}
              />
            ))}
          </div>
        </section>

        {/* ================= HAIR TABLETS ================= */}
        <section className="collection-section min-h-screen flex flex-col items-center justify-center px-6 md:px-16">
          <h1
            className="text-[60px] md:text-[120px] font-extrabold text-transparent mt-28 tracking-wide text-center"
            style={{ WebkitTextStroke: "2px #A6B11E" }}
          >
            HAIR TABLETS
          </h1>

          <div className="flex gap-20 flex-wrap justify-center">
            {hairTablets.map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}
                image={product.image || "/images/tablets/product1.png"}
                title={product.name}
              />
            ))}
          </div>
        </section>

        {/* ================= HAIR LEPA ================= */}
        <section className="collection-section min-h-screen flex flex-col items-center justify-center px-6 md:px-16">
          <h1
            className="text-[60px] md:text-[120px] font-extrabold text-transparent mt-28 tracking-wide text-center"
            style={{ WebkitTextStroke: "2px #A6B11E" }}
          >
            HAIR LEPA
          </h1>

          <div className="flex gap-20 flex-wrap justify-center mb-32">
            {hairLepa.map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}
                image={product.image || "/images/hairLepa/product1.png"}
                title={product.name}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function ProductCard({
  id,
  image,
  title,
}: {
  id: string;
  image: string;
  title: string;
}) {
  return (
    <div className="group relative w-[280px] md:w-[360px] bg-white rounded-[28px] shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden">
      <div className="flex items-center justify-center h-[320px] bg-[#F8F8F5]">
        <Image
          src={image}
          alt={title}
          width={500}
          height={500}
          className="object-contain h-[260px] transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="p-6 flex flex-col items-center gap-4">
        <h3 className="text-2xl font-semibold text-gray-800 tracking-wide text-center">
          {title}
        </h3>

        <Link href={`/collections/${id}`}>
          <button className="relative px-8 py-3 text-sm font-semibold border-2 border-[#A6B11E] text-[#A6B11E] rounded-full overflow-hidden transition-all duration-400 hover:text-white group/button">
            <span className="absolute inset-0 bg-[#A6B11E] scale-x-0 origin-left transition-transform duration-400 group-hover/button:scale-x-100"></span>
            <span className="relative z-10">View Product</span>
          </button>
        </Link>
      </div>
    </div>
  );
}

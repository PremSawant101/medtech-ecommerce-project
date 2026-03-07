"use client";

import Navbar from "@/components/layout/Navbar";
import { Lexend } from "next/font/google";
import Image from "next/image";
import { useRef, useEffect, useState, useCallback } from "react";
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
  discount: number;
};

/* ── Mobile Carousel ── */

function MobileCarousel({
  products,
  defaultImage,
}: {
  products: Product[];
  defaultImage: string;
}) {
  const [current, setCurrent] = useState(0);
  const [isLandscape, setIsLandscape] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const check = () => setIsLandscape(window.innerWidth > window.innerHeight);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const perPage = isLandscape ? 2 : 1;
  const maxIndex = Math.max(0, products.length - perPage);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && current < maxIndex) setCurrent((p) => p + 1);
      if (diff < 0 && current > 0) setCurrent((p) => p - 1);
    }
  }, [current, maxIndex]);

  const cardWidth = isLandscape ? 50 : 100;

  return (
    <div
      className="w-full overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="flex transition-transform duration-300"
        style={{ transform: `translateX(-${current * cardWidth}%)` }}
      >
        {products.map((product) => (
          <div
            key={product._id}
            className="flex-shrink-0 px-3"
            style={{ width: `${cardWidth}%` }}
          >
            <Link href={`/collections/${product._id}`}>
              <div className="bg-white rounded-[40px] shadow-xl overflow-hidden flex flex-col items-center">
                <div className="py-4">
                  <Image
                    src={product.image || defaultImage}
                    alt={product.name}
                    width={400}
                    height={300}
                    className="object-contain w-full h-44"
                  />
                </div>

                <div className="bg-[#A6B11E] text-white text-center py-4 text-lg font-semibold w-full">
                  {product.name}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-3">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full ${i === current ? "bg-[#A6B11E]" : "bg-gray-300"
              }`}
          />
        ))}
      </div>
    </div>
  );
}

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
        {/* Background */}
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

        {/* HAIR OIL */}
        <section className="collection-section min-h-screen flex flex-col items-center justify-center pt-16 lg:pt-0 bg-[#F4F3EE]/85">
          <h1
            className="text-[64px] lg:text-[120px] font-extrabold text-transparent"
            style={{ WebkitTextStroke: "2px #A6B11E" }}
          >
            HAIR OIL
          </h1>

          <div className="w-full px-4 mt-4 lg:hidden">
            <MobileCarousel
              products={hairOil}
              defaultImage="/images/oil/product1.png"
            />
          </div>

          <div className="hidden lg:flex gap-8 mt-1">
            {hairOil.map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}
                image={product.image || "/images/oil/product1.png"}
                title={product.name}
                discount={product.discount}
              />
            ))}
          </div>
        </section>

        {/* TABLETS */}
        <section className="collection-section min-h-screen flex flex-col items-center justify-center pt-16 lg:pt-0 bg-[#F4F3EE]/85">
          <h1
            className="text-[48px] lg:text-[120px] font-extrabold text-transparent"
            style={{ WebkitTextStroke: "2px #A6B11E" }}
          >
            HAIR TABLETS
          </h1>

          <div className="w-full px-4 mt-4 lg:hidden">
            <MobileCarousel
              products={hairTablets}
              defaultImage="/images/tablets/product1.png"
            />
          </div>

          <div className="hidden lg:flex gap-8 mt-1">
            {hairTablets.map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}
                image={product.image || "/images/tablets/product1.png"}
                title={product.name}
                discount={product.discount}
              />
            ))}
          </div>
        </section>

        {/* LEPA */}
        <section className="collection-section min-h-screen flex flex-col items-center justify-center pt-16 lg:pt-0 bg-[#F4F3EE]/85">
          <h1
            className="text-[64px] lg:text-[120px] font-extrabold text-transparent"
            style={{ WebkitTextStroke: "2px #A6B11E" }}
          >
            HAIR LEPA
          </h1>

          <div className="w-full px-4 mt-4 lg:hidden">
            <MobileCarousel
              products={hairLepa}
              defaultImage="/images/hairLepa/product1.png"
            />
          </div>

          <div className="hidden lg:flex gap-8 mt-1">
            {hairLepa.map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}
                image={product.image || "/images/hairLepa/product1.png"}
                title={product.name}
                discount={product.discount}
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
  discount = 0,
}: {
  id: string;
  image: string;
  title: string;
  discount?: number;
}) {
  return (
    <div className="group relative w-[280px] md:w-[360px] bg-white rounded-[28px] shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden">
      <div className="relative flex items-center justify-center h-[320px] bg-[#F8F8F5]">
        {discount > 0 && (
          <div className="absolute top-4 left-4 bg-[#A6B11E] text-white text-xs px-3 py-1 rounded-full shadow-lg">
            -{discount}%
          </div>
        )}

        <Image
          src={image}
          alt={title}
          width={500}
          height={500}
          className="object-contain h-[260px] transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="p-6 flex flex-col items-center gap-4">
        <h3 className="text-2xl font-semibold text-gray-800 text-center">
          {title}
        </h3>

        <Link href={`/collections/${id}`}>
          <button className="px-8 py-3 text-sm font-semibold border-2 border-[#A6B11E] text-[#A6B11E] rounded-full hover:bg-[#A6B11E] hover:text-white transition">
            View Product
          </button>
        </Link>
      </div>
    </div>
  );
}
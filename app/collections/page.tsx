"use client";

import Navbar from "@/components/layout/Navbar";
import { Lexend } from "next/font/google";
import Image from "next/image";
import { useRef, useEffect, useState, useCallback } from "react";
import Link from "next/link";

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
  category,
}: {
  products: Product[];
  defaultImage: string;
  category: string;
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
                <div className="relative py-4 w-full">
                  <div className="absolute top-3 left-3 bg-[#8B1A1A] text-white text-[10px] font-bold uppercase px-3 py-1 rounded-sm z-10 tracking-wide">
                    {(product as any).categoryLabel || category}
                  </div>
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



  const hairOil = products.filter((p) =>
    p.category?.toLowerCase().includes("oil")
  );
  const hairTablets = products.filter((p) =>
    p.category?.toLowerCase().includes("tablet")
  );
  const hairLepa = products.filter((p) =>
    p.category?.toLowerCase().includes("lepa")
  );

  const allProducts = [
    ...hairOil.map((p) => ({ ...p, categoryLabel: "HAIR OIL", defaultImage: "/images/oil/product1.png" })),
    ...hairTablets.map((p) => ({ ...p, categoryLabel: "HAIR TABLETS", defaultImage: "/images/tablets/product1.png" })),
    ...hairLepa.map((p) => ({ ...p, categoryLabel: "HAIR LEPA", defaultImage: "/images/hairLepa/product1.png" })),
  ];

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

        {/* All Products Grid */}
        <section className="relative z-10 pt-28 pb-16 px-4 lg:px-12 bg-[#F4F3EE]/85">
          <h1 className="text-3xl lg:text-5xl font-bold text-[#A6B11E] mb-10 px-2">
            Our Products
          </h1>

          {/* Responsive Grid: 2 cols on mobile, 4 cols on desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 justify-items-center">
            {allProducts.map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}
                image={product.image || product.defaultImage}
                title={product.name}
                discount={product.discount}
                category={product.categoryLabel}
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
  category,
}: {
  id: string;
  image: string;
  title: string;
  discount?: number;
  category: string;
}) {
  return (
    <div className="group relative w-full bg-white rounded-[16px] lg:rounded-[28px] shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden">
      <div className="relative flex items-center justify-center h-[150px] lg:h-[260px] bg-[#F8F8F5]">
        {/* Category Label Tag */}
        <div className="absolute top-2 left-2 lg:top-3 lg:left-3 bg-[#8B1A1A] text-white text-[8px] lg:text-[10px] font-bold uppercase px-2 lg:px-3 py-0.5 lg:py-1 rounded-sm z-10 tracking-wide">
          {category}
        </div>

        {discount > 0 && (
          <div className="absolute top-2 right-2 lg:top-3 lg:right-3 bg-[#A6B11E] text-white text-[9px] lg:text-xs px-2 lg:px-3 py-0.5 lg:py-1 rounded-full shadow-lg">
            -{discount}%
          </div>
        )}

        <Image
          src={image}
          alt={title}
          width={500}
          height={500}
          className="object-contain h-[120px] lg:h-[200px] transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="p-3 lg:p-5 flex flex-col items-center gap-2 lg:gap-3">
        <h3 className="text-xs lg:text-lg font-semibold text-gray-800 text-center line-clamp-2">
          {title}
        </h3>

        <Link href={`/collections/${id}`}>
          <button className="px-4 lg:px-6 py-1.5 lg:py-2 text-[10px] lg:text-sm font-semibold border-2 border-[#A6B11E] text-[#A6B11E] rounded-full hover:bg-[#A6B11E] hover:text-white transition">
            View Product
          </button>
        </Link>
      </div>
    </div>
  );
}
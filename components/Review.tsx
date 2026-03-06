"use client";

import Navbar from "@/components/layout/Navbar";
import AddedToCart from "@/components/AddedToCart";
import { Lexend } from "next/font/google";
import Image from "next/image";
import { useRef, useState, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/components/Button";

gsap.registerPlugin(ScrollTrigger);

const lexend = Lexend({
  subsets: ["latin"],
});

const reviews = [
  { name: "Ravina" },
  { name: "Heena" },
  { name: "Ravina" },
];

/* Mobile Swipe Carousel for Reviews (1 card at a time) */
function MobileReviewCarousel() {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

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
      if (diff > 0 && current < reviews.length - 1) setCurrent((p) => p + 1);
      if (diff < 0 && current > 0) setCurrent((p) => p - 1);
    }
  }, [current]);

  return (
    <div
      className="w-full overflow-hidden px-4 relative"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="flex transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {reviews.map((r, i) => (
          <div key={i} className="w-full flex-shrink-0 px-2">
            <div className="bg-white rounded-[40px] shadow-xl overflow-hidden">
              <div className="p-6 text-[#4E482E] leading-relaxed text-sm">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry&apos;s standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, .
              </div>
              <div className="bg-[#A6B11E] text-white text-center py-6 text-2xl font-semibold">
                {r.name}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {reviews.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              i === current ? "bg-[#A6B11E]" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* Tablet Swipe Carousel for Reviews (2 cards at a time) */
function TabletReviewCarousel() {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const maxIndex = reviews.length - 2; // last valid start index to show 2 cards

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

  return (
    <div
      className="w-full overflow-hidden px-6 relative"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="flex transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${current * 50}%)` }}
      >
        {reviews.map((r, i) => (
          <div key={i} className="w-1/2 flex-shrink-0 px-3">
            <div className="bg-white rounded-[40px] shadow-xl overflow-hidden">
              <div className="p-6 text-[#4E482E] leading-relaxed text-sm">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry&apos;s standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, .
              </div>
              <div className="bg-[#A6B11E] text-white text-center py-5 text-xl font-semibold">
                {r.name}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              i === current ? "bg-[#A6B11E]" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

const Review = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const amlaRef = useRef<HTMLDivElement>(null);
  const leavesRef = useRef<HTMLDivElement>(null);

  const [cart, setCart] = useState<{ [key: string]: number }>({});

  useGSAP(
    () => {
      const amlaBg = amlaRef.current;
      const leavesBg = leavesRef.current;
      if (!amlaBg || !leavesBg) return;

      const amlas = gsap.utils.toArray<HTMLImageElement>(".amla");
      amlas.forEach((amla) => {
        gsap.fromTo(
          amla,
          { y: 200 },
          {
            y: -200,
            ease: "none",
            scrollTrigger: {
              trigger: amlaBg,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      const leaves = gsap.utils.toArray<HTMLImageElement>(".leaf");
      leaves.forEach((leaf) => {
        gsap.fromTo(
          leaf,
          { y: 400 },
          {
            y: -450,
            ease: "none",
            scrollTrigger: {
              trigger: leavesBg,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    },
    { scope: containerRef },
  );
  return (
    <section
      ref={leavesRef}
      className="relative min-h-0 xl:min-h-screen bg-[#F4F3EE] flex flex-col items-center justify-start py-10 md:pt-6 md:pb-36 xl:pt-12 xl:pb-40"
    >
      <h1
        className="md:absolute md:bottom-0 xl:-bottom-30 text-5xl md:text-[130px] xl:text-[400px] font-extrabold text-[#A6B11E] md:text-transparent xl:text-transparent pointer-events-none select-none -mt-16 md:mt-0 mb-4 md:mb-0 xl:mb-8 z-20"
        style={{ WebkitTextStroke: "2px #A6B11E" }}
      >
        Reviews
      </h1>

      <img
        src="/images/amla.png"
        className="amla absolute -top-10 left-1/2 -translate-x-1/2 blur-sm rotate-12 w-72"
      />

      <img
        src="/images/amla.png"
        className="amla absolute -bottom-90 left-1/3 w-52 -rotate-22"
      />

      <Image
        src="/images/leaves/leaf1.png"
        alt="Leaf"
        width={250}
        height={250}
        className="leaf absolute w-80 -left-40 top-20 rotate-102"
      />

      <Image
        src="/images/leaves/leaf1.png"
        alt="Leaf"
        width={250}
        height={250}
        className="leaf absolute w-80 -right-40 bottom-20 blur-xs"
      />

      {/* Phone: swipe carousel (1 card) */}
      <div className="relative w-full z-10 md:hidden">
        <MobileReviewCarousel />
      </div>

      {/* Tablet/iPad: swipe carousel (2 cards) */}
      <div className="relative w-full z-10 hidden md:block xl:hidden">
        <TabletReviewCarousel />
      </div>

      {/* Desktop: side-by-side row */}
      <div className="hidden xl:flex gap-12 relative z-10 items-center justify-center">
        {reviews.map((r, index) => (
          <div
            key={index}
            className="w-95 bg-white rounded-[40px] shadow-xl overflow-hidden"
          >
            <div className="p-10 text-[#4E482E] leading-relaxed text-base">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard dummy
              text ever since the 1500s, when an unknown printer took a galley
              of type and scrambled it to make a type specimen book. It has
              survived not only five centuries, .
            </div>

            <div className="bg-[#A6B11E] text-white text-center py-6 text-2xl font-semibold">
              {r.name}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Review;
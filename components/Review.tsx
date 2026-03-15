"use client";

import { Lexend } from "next/font/google";
import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const lexend = Lexend({
  subsets: ["latin"],
});

const reviews = [
  {
    name: "Ravina",
    text: "Amla Hair Oil use karne ke baad hair fall noticeably kam hua. Texture light hai aur scalp par heavy feel nahi hota.",
  },
  {
    name: "Heena",
    text: "2 weeks se use kar rahi hu aur hair shine aur smoothness kaafi improve hua hai. Herbal smell bhi natural lagti hai.",
  },
  {
    name: "Aarohi",
    text: "Packaging aur product quality dono premium hai. Regular use se scalp health better feel hoti hai.",
  },
];

export default function Review() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leavesRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const leavesBg = leavesRef.current;
      if (!leavesBg) return;

      const amlas = gsap.utils.toArray<HTMLImageElement>(".amla");

      amlas.forEach((amla) => {
        gsap.fromTo(
          amla,
          { y: 200 },
          {
            y: -200,
            ease: "none",
            scrollTrigger: {
              trigger: leavesBg,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
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
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={leavesRef}
      className={`relative bg-[#F4F3EE] flex flex-col items-center justify-center py-12 lg:py-20 px-4 lg:px-6 pb-8 lg:pb-12 overflow-hidden ${lexend.className}`}
    >
      {/* BIG TEXT */}

      <h1
        className="mt-6 lg:mt-10 text-[40px] md:text-[90px] lg:text-[140px] font-extrabold text-[#4E482E] pointer-events-none select-none whitespace-nowrap z-[5] relative"
        style={{ letterSpacing: "0.04em" }}
      >
        Reviews
      </h1>

      {/* Decorations */}

      <img
        src="/images/amla.png"
        className="amla absolute -top-10 left-1/2 -translate-x-1/2 blur-sm rotate-12 w-48 md:w-72"
      />

      <img
        src="/images/amla.png"
        className="amla absolute -bottom-60 left-1/3 w-36 md:w-52 -rotate-12"
      />

      <Image
        src="/images/leaves/leaf1.png"
        alt="Leaf"
        width={250}
        height={250}
        className="leaf absolute w-60 md:w-80 -left-20 md:-left-40 top-20 rotate-90"
      />

      <Image
        src="/images/leaves/leaf1.png"
        alt="Leaf"
        width={250}
        height={250}
        className="leaf absolute w-60 md:w-80 -right-20 md:-right-40 bottom-20"
      />

      {/* Review Cards */}

      <div className="relative z-10 w-full max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">

          {reviews.map((review, index) => (
            <div
              key={index}
              className="
              w-full
              lg:w-[32%]
              bg-white
              rounded-[20px]
              lg:rounded-[32px]
              shadow-xl
              hover:shadow-2xl
              transition
              overflow-hidden
              "
            >
              <div className="p-5 lg:p-8 text-[#4E482E] leading-relaxed text-[13px] lg:text-[15px]">
                <span className="text-2xl lg:text-4xl text-[#A6B11E] font-bold">“</span>
                {review.text}
              </div>

              <div className="bg-[#A6B11E] text-white text-center py-3 lg:py-5 text-base lg:text-xl font-semibold">
                {review.name}
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
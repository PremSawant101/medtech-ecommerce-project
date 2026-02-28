"use client";

import Navbar from "@/components/layout/Navbar";
import AddedToCart from "@/components/AddedToCart";
import { Lexend } from "next/font/google";
import Image from "next/image";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/components/Button";
import Review from "@/components/Review";

gsap.registerPlugin(ScrollTrigger);

const lexend = Lexend({
  subsets: ["latin"],
});

export default function ProductPage() {
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
    <main
      ref={containerRef}
      className={`bg-[#F4F3EE] min-h-screen relative overflow-hidden ${lexend.className}`}
    >
      <Navbar />

      {/* ================= PRODUCT DETAILS ================= */}
      <section
        ref={amlaRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
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
          className="absolute -top-30 right-1/5  rotate-140"
        />

        <Image
          src="/images/leaves/leaf1.png"
          alt="Leaf"
          width={250}
          height={250}
          className="absolute -bottom-20 -left-20 rotate-45"
        />

        <Image
          src="/images/amla.png"
          alt="Amla"
          width={250}
          height={250}
          className="absolute bottom-10 right-10 rotate-45"
        />

        <Image
          src="/images/leaves/leaf1.png"
          alt="Leaf"
          width={250}
          height={250}
          className="absolute bottom-2/4 -right-20 -rotate-45 blur-xs"
        />

        <div className="w-full max-w-350 flex items-center justify-between z-10">
          {/* LEFT SIDE PRODUCT IMAGE */}
          <div className="relative max-w-6xl h-1/2 flex items-end justify-center w-1/2">
            <Image
              src="/images/tablets/product2.png"
              alt="Amlika Tablets"
              width={1000}
              height={1000}
              className="object-contain w-180 h-170 flex items-end justify-end"
            />
          </div>

          {/* RIGHT SIDE CONTENT */}
          <div className="w-1/2 pl-20 text-[#4E482E]">
            <h1 className="text-6xl font-bold mb-4">Amlika Tablets</h1>

            <h3 className="text-xl font-semibold mb-6">
              Lorem Ipsum is simply dummy
            </h3>

            <p className="text-lg leading-relaxed mb-8 text-[#6D6A5F]">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries.
            </p>
            <Button bgColor="#4E482E" title="Add to cart" />
          </div>
        </div>
      </section>

      {/* REVIEW SECTION */}
      {/* <section
        ref={leavesRef}
        className="relative min-h-screen bg-[#F4F3EE] flex flex-col items-center justify-center py-40"
      >
        <h1
          className="absolute -bottom-10 text-[360px] font-extrabold text-transparent pointer-events-none select-none"
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

        <div className="flex gap-12 relative z-10">
          {["Ravina", "Heena", "Ravina"].map((name, index) => (
            <div
              key={index}
              className="w-95 bg-white rounded-[40px] shadow-xl overflow-hidden"
            >
              <div className="p-10 text-[#4E482E] leading-relaxed">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, .
              </div>

              <div className="bg-[#A6B11E] text-white text-center py-6 text-2xl font-semibold">
                {name}
              </div>
            </div>
          ))}
        </div>
      </section> */}
      <Review />
    </main>
  );
}

// {/* Floating Amla Top */}
// <Image
//   src="/images/amla.png"
//   alt="Amla"
//   width={200}
//   height={200}
//   className="amla absolute top-10 -rotate-40 left-4/4 -translate-x-1/2"
// />

// {/* Bottom Right Amla */}
// <Image
//   src="/images/amla.png"
//   alt="Amla"
//   width={200}
//   height={200}
//   className="amla absolute bottom-10 right-70 rotate-45"
// />

// {/* Bottom Center Blur Amla */}
// <Image
//   src="/images/amla.png"
//   alt="Amla"
//   width={250}
//   height={250}
//   className="amla absolute -bottom-20 left-1/3 blur-md opacity-80"
// />

// {/* Right Decorative Leaf */}
// <Image
//   src="/images/leaves/leaf1.png"
//   alt="Leaf"
//   width={250}
//   height={250}
//   className="leaf absolute -left-40 rotate-120 -top-3/6 blur-[2px]"
// />

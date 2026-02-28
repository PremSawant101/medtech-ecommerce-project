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

gsap.registerPlugin(ScrollTrigger);

const lexend = Lexend({
  subsets: ["latin"],
});

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
            className="relative min-h-screen bg-[#F4F3EE] flex flex-col items-center justify-center py-40"
          >
            <h1
              className="absolute -bottom-50 text-[400px] font-extrabold text-transparent pointer-events-none select-none"
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
          </section>
  )
}

export default Review
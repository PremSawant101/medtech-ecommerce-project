"use client";

import BottleScene from "@/components/BottleScene";
import Navbar from "@/components/layout/Navbar";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Lexend } from "next/font/google";
import { useRef } from "react";
import Image from "next/image";

const lexend = Lexend({
  subsets: ["latin"],
});

export default function Home() {
  const fadeBg = useRef<HTMLDivElement>(null);
  const amlaRef = useRef<HTMLDivElement>(null);
  const leavesRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const bg = fadeBg.current;
    const amlaBg = amlaRef.current;
    const leavesBg = leavesRef.current;

    if (!bg || !amlaBg || !leavesBg) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    tl.to(bg, {
      opacity: 0,
      duration: 1,
    });

    const amlas = gsap.utils.toArray<HTMLImageElement>(".amla");
    amlas.forEach((amla, index) => {
      gsap.fromTo(
        amla,
        { y: 200, duration: 1.4 },
        {
          y: -200,
          opacity: 1,
          ease: "none",
          stagger: index * 1.8,
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
    leaves.forEach((leaf, index) => {
      gsap.fromTo(
        leaf,
        { y: 400, duration: 1 },
        {
          y: -450,
          opacity: 1,
          ease: "none",
          stagger: index * 1.8,
          scrollTrigger: {
            trigger: leavesBg,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    });
  });

  return (
    <main className={`bg-white ${lexend.className} overflow-hidden`}>
      <Navbar />

      <BottleScene />

      {/* Hero Section */}
      <section
        ref={fadeBg}
        className="h-screen bg-[url(/images/amlaBg.png)] pointer-events-none overflow-hidden bg-center bg-no-repeat bg-cover text-white flex items-center justify-center"
      >
        <div className="h-screen w-screen bg-black/20"></div>
        <h1 className="text-pretty text-[80px] sm:text-[100px] md:text-[120px] lg:text-[160px] leading-none font-extrabold w-[80%] sm:w-1/2 md:w-1/3 lg:w-1/6 absolute top-40 left-6 sm:left-16 md:left-40 lg:left-80">
          Nature's Answer To Hairfall
        </h1>
      </section>

      {/* Rooted in Amla Section */}
      <section
        ref={amlaRef}
        className="h-screen relative bg-linear-to-l from-[#FFFEFE26] to-[#DFE2D2] text-[#4E482E] flex items-center justify-start"
      >
        <h1 className="text-pretty text-[78px] sm:text-[92px] md:text-[100px] lg:text-[140px] pl-6 sm:pl-12 md:pl-20 lg:pl-40 sm:font-light w-[60%] sm:w-1/2 md:w-2/5 lg:w-1/6 z-40">
          Rooted in <span className="font-extrabold">Amla</span>
        </h1>

        <div className="bg-[url('/images/amla.png')] bg-center bg-no-repeat bg-contain amla absolute w-58 sm:w-48 md:w-60 lg:w-80 aspect-square top-20 -left-10 sm:top-80 sm:left-20 z-10" />

        <div className="bg-[url('/images/amla.png')] bg-center bg-no-repeat bg-contain amla absolute w-50 sm:w-32 md:w-40 lg:w-62 aspect-square top-100 -right-10 -rotate-280 sm:bottom-10 sm:-left-10 sm:rotate-300 z-10" />

        <div className="bg-[url('/images/amla.png')] bg-center bg-no-repeat bg-contain amla absolute w-60 sm:w-32 md:w-40 lg:w-66 aspect-square -bottom-40 -left-10 sm:top-1/6 sm:-right-20 rotate-320 z-10" />

        <div className="bg-[url('/images/amla.png')] bg-center bg-no-repeat bg-contain amla absolute hidden sm:block w-20 sm:w-32 md:w-40 lg:w-68 aspect-square bottom-10 right-3/12 rotate-120 z-10" />

        <div className="bg-[url('/images/amla.png')] bg-center bg-no-repeat bg-contain amla absolute hidden sm:block w-28 sm:w-44 md:w-52 lg:w-60 aspect-square top-3/10 left-3/14 rotate-18 z-10" />

        <div className="bg-[url('/images/frontAmla.png')] bg-center bg-no-repeat bg-contain amla absolute hidden sm:block w-28 sm:w-44 md:w-52 lg:w-62 aspect-square -bottom-36 left-4/10 rotate-104 z-10" />

        <div className="bg-[url('/images/frontAmla.png')] bg-center bg-no-repeat bg-contain amla absolute hidden sm:block w-28 sm:w-48 md:w-56 lg:w-66 aspect-square top-3/7 right-7/16 z-10" />

        <div className="bg-[url('/images/frontAmla.png')] bg-center bg-no-repeat bg-contain amla absolute hidden sm:block w-28 sm:w-48 md:w-56 lg:w-68 aspect-square -bottom-40 right-1/10 rotate-140 z-10" />
      </section>

      {/* Calmed by Ashwagandha Section */}
      <section
        ref={leavesRef}
        className="h-screen relative bg-linear-to-l from-[#FFFEFE26] to-[#DFE2D2] text-[#4E482E] flex items-center justify-center"
      >
        <h1 className="text-[#4E482E] absolute text-[50px] sm:text-[60px] md:text-[80px] lg:text-9xl w-[90%] sm:w-3/4 md:w-2/3 text-right top-1/6 right-[5%] sm:right-1/8 font-400 z-40">
          Calmed by <span className="font-extrabold">Ashwagandha</span>
        </h1>

        <div
          className="leaf leaf-3 absolute w-[200vw] sm:w-[160vw] md:w-200 lg:w-220 aspect-square -bottom-6/15 sm:-bottom-6/14 -left-[80%] sm:left-[12%] md:left-46 lg:left-55 rotate-20
          bg-[url('/images/leaves/leaf1.png')] bg-contain bg-no-repeat bg-center"
        />

        <div
          className="leaf leaf-2 absolute w-[120vw] sm:w-[160vw] md:w-200 aspect-square -top-20 sm:-top-90 -left-[80%] sm:-left-[70%] md:-left-110 rotate-120
          bg-[url('/images/leaves/leaf3.png')] bg-contain bg-no-repeat bg-center"
        />

        <div
          className="leaf leaf-4 absolute w-[110vw] sm:w-[140vw] md:w-180 aspect-square -rotate-90 -right-80 sm:-bottom-130 sm:-right-1/12 z-50
          bg-[url('/images/leaves/leaf3.png')] bg-contain bg-no-repeat bg-center"
        />
      </section>

      {/* Product Images Section */}
      <section className="h-screen bg-linear-to-l from-[#FFFEFE26] to-[#DFE2D2] text-[#4E482E] font-lexend flex items-center justify-center">
        <div
          id="ourStory"
          className="max-w-7xl p-6 sm:p-10 md:p-14 flex flex-col sm:flex-row justify-between items-center gap-8 sm:gap-16 md:gap-40 lg:gap-75"
        >
          <Image
            src="/images/p1.png"
            alt="Bottle"
            height={1000}
            width={10000}
            className="w-[80vw] sm:w-[40vw] md:w-150"
          />
          <Image
            src="/images/p2.png"
            alt="Bottle"
            height={1000}
            width={10000}
            className="w-[80vw] sm:w-[40vw] md:w-150"
          />
        </div>
      </section>
    </main>
  );
}
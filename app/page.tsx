"use client";

import BottleScene from "@/components/BottleScene";
import Navbar from "@/components/layout/Navbar";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Lexend } from "next/font/google";
import { use, useEffect, useRef } from "react";

import { ReactLenis } from "lenis/react";
import Lenis from "lenis";
import Image from "next/image";

import Cal, { getCalApi } from "@calcom/embed-react";
import Footer from "@/components/layout/Footer";

// import Image from "next/image";

const lexend = Lexend({
  subsets: ["latin"],
});

export default function Home() {
  const fadeBg = useRef<HTMLDivElement>(null);
  const amlaRef = useRef<HTMLDivElement>(null);
  const leavesRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.5,
      prevent: (node) => node.id === "get_burger-content",
    });

    function update(time: any) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => gsap.ticker.remove(update);
  });

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
      <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />

      <Navbar />

      <BottleScene />

      <section
        ref={fadeBg}
        className="h-screen bg-[url(/images/amlaBg.png)] pointer-events-none overflow-hidden bg-center bg-no-repeat bg-cover text-white flex items-center justify-center"
      >
        <div className="h-screen w-screen bg-black/20 "></div>
        <h1 className="text-pretty text-[160px] leading-none font-extrabold w-1/6 absolute left-80 ">
          Nature's Answer To Hairfall
        </h1>
      </section>

      <section
        ref={amlaRef}
        className="h-screen relative bg-linear-to-l  from-[#FFFEFE26] to-[#DFE2D2] text-[#4E482E] flex items-center justify-center"
      >
        <h1 className="text-pretty text-[160px] leading-tight font-normal w-1/6 absolute left-70 top-30 text-6xl">
          Rooted in <span className="font-extrabold">Amla</span>
        </h1>
        <img
          src="/images/amla.png"
          className="amla amla-1 absolute w-80 -top-40 left-10"
        />
        <img
          src="/images/amla.png"
          className="amla amla-2 absolute w-62 bottom-10 -left-10 rotate-300"
        />
        <img
          src="/images/amla.png"
          className="amla amla-3 absolute w-66 top-1/6 -right-20 rotate-320"
        />
        <img
          src="/images/amla.png"
          className="amla amla-4 absolute w-68 bottom-10 right-3/12 rotate-120"
        />
        {/* -- */}
        <img
          src="/images/amla.png"
          className="amla amla-1 absolute w-60 top-3/10 left-3/14 rotate-18"
        />
        <img
          src="/images/frontAmla.png"
          className="amla amla-2 absolute w-62 z-99 -bottom-36 left-4/10 rotate-104"
        />
        <img
          src="/images/frontAmla.png"
          className="amla amla-3 absolute w-66 top-3/7 right-7/16"
        />
        <img
          src="/images/frontAmla.png"
          className="amla amla-4 absolute w-68 -bottom-40 right-1/10 rotate-140"
        />
      </section>

      <section
        ref={leavesRef}
        className="h-screen relative bg-linear-to-l  from-[#FFFEFE26] to-[#DFE2D2] text-[#4E482E] flex items-center justify-center"
      >
        <h1 className="text-[#4E482E] absolute text-9xl w-2/3 text-right top-1/6 right-1/8 font-400">
          Calmed by <span className="font-extrabold">Ashwagandha</span>
        </h1>
        <img
          src="/images/leaves/leaf1.png"
          className="leaf leaf-3 absolute w-160 -bottom-7/14 left-46 rotate-20"
        />
        <img
          src="/images/leaves/leaf3.png"
          className="leaf leaf-2 absolute w-200 -top-170 -left-110 rotate-120"
        />
        <img
          src="/images/leaves/leaf3.png"
          className="leaf leaf-4 absolute w-180 -bottom-180 -right-1/12 z-99"
        />
      </section>

      <section className="h-screen bg-linear-to-l  from-[#FFFEFE26] to-[#DFE2D2] text-[#4E482E] font-lexend flex items-center justify-center">
        <div id="ourStory" className="max-w-7xl p-14 flex justify-between items-center gap-75">
          <Image
            src="/images/p1.png"
            alt="Bottle"
            height={1000}
            width={10000}
            className="w-150"
          />
          <Image
            src="/images/p2.png"
            alt="Bottle"
            height={1000}
            width={10000}
            className="w-150"
          />
        </div>
      </section>
    </main>
  );
}

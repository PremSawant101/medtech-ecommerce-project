"use client";

import BottleScene from "@/components/BottleScene";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Lexend } from "next/font/google";
import { useEffect, useRef } from "react";
import { ReactLenis } from "lenis/react";
import Lenis from "lenis";

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
    });

    function update(time: any) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => gsap.ticker.remove(update);

  }, []);

  useGSAP(() => {

    const bg = fadeBg.current;
    const amlaBg = amlaRef.current;
    const leavesBg = leavesRef.current;
    const storyBg = document.getElementById("ourStorySection");
    const container = document.getElementById("pinContainer");

    if (!bg || !amlaBg || !leavesBg || !storyBg || !container) return;

    const amlas = gsap.utils.toArray<HTMLImageElement>(".amla");
    const leaves = gsap.utils.toArray<HTMLImageElement>(".leaf");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=300%",
        scrub: true,
        pin: true,
      },
    });

    gsap.set([amlaBg, leavesBg, storyBg], { opacity: 0, visibility: "hidden" });

    gsap.set(amlas, { y: 200, opacity: 0 });
    gsap.set(leaves, { y: 200, opacity: 0 });

    tl.to(bg, { opacity: 0, duration: 1 })

      .to(amlaBg, { opacity: 1, visibility: "visible", duration: 1 }, "<")

      .to(amlas,
        { y: -50, opacity: 1, stagger: 0.1, duration: 1 },
        "<"
      )

      .to(amlaBg, { opacity: 0, duration: 1 })

      .to(leavesBg, { opacity: 1, visibility: "visible", duration: 1 }, "<")

      .to(leaves,
        { y: -50, opacity: 1, stagger: 0.1, duration: 1 },
        "<"
      )

      .to(leavesBg, { opacity: 0, duration: 1 })

      .to(storyBg, { opacity: 1, visibility: "visible", duration: 1 }, "<");

  });

  return (

    <main className={`bg-white ${lexend.className} overflow-hidden`}>

      <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />

      <Navbar />

      <BottleScene />

      <div id="pinContainer" className="h-screen w-full relative overflow-hidden bg-white">

        {/* Intro */}

        <section
          ref={fadeBg}
          className="absolute inset-0 h-screen bg-[url(/images/amlaBg.png)] bg-center bg-no-repeat bg-cover text-white flex items-center"
        >

          <div className="h-screen w-screen bg-black/20 absolute inset-0"></div>

          <h1 className="text-[60px] md:text-[120px] lg:text-[140px] font-extrabold absolute left-6 md:left-20 top-28 tracking-tight">

            Nature's <br /> Answer <br /> to Hair Fall

          </h1>

        </section>

        {/* Amla */}

        <section
          ref={amlaRef}
          className="absolute inset-0 h-screen bg-linear-to-l from-[#FFFEFE26] to-[#DFE2D2] text-[#4E482E] flex items-center"
        >

          <h1 className="text-[60px] md:text-[120px] font-medium absolute left-10 top-28">

            Rooted in <br />

            <span className="font-extrabold">Amla</span>

          </h1>

          <img src="/images/amla.png" className="amla absolute w-28 lg:w-80 top-10 left-10" />
          <img src="/images/frontAmla.png" className="amla absolute w-24 lg:w-60 bottom-10 right-20" />

        </section>

        {/* Leaves */}

        <section
          ref={leavesRef}
          className="absolute inset-0 h-screen bg-linear-to-l from-[#FFFEFE26] to-[#DFE2D2] text-[#4E482E] flex items-center justify-end"
        >

          <h1 className="text-[50px] md:text-[120px] text-right absolute right-10 top-40">

            Calmed by <br />

            <span className="font-extrabold">Ashwagandha</span>

          </h1>

          <img src="/images/leaves/leaf1.png" className="leaf absolute w-80 bottom-0 left-10" />

        </section>

        {/* Our Story */}

        <section
          id="ourStorySection"
          className="absolute inset-0 bg-[#F5F5ED] text-[#4E482E] flex items-center justify-center"
        >

          <div className="max-w-5xl text-xl leading-relaxed text-center px-6">

            Ayurveda is one of the oldest health sciences focused on wellness.

            Our mission since 2011 is to help people achieve healthier lives

            through authentic Ayurvedic treatments and herbal formulations.

          </div>

        </section>

      </div>

      <Footer />

    </main>

  );
}
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
    const storyBg = document.getElementById("ourStorySection");
    const container = document.getElementById("pinContainer");

    if (!bg || !amlaBg || !leavesBg || !storyBg || !container) return;

    // Remove any previous ScrollTriggers from floating elements, we'll control them in the main timeline
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

    // Initial states
    gsap.set([amlaBg, leavesBg, storyBg], { opacity: 0, visibility: "hidden" });

    // Animate amlas initial position so they can fly in
    gsap.set(amlas, { y: 200, opacity: 0 });
    gsap.set(leaves, { y: 200, opacity: 0 });

    // Transition 1: Intro -> Amla Section
    tl.to(bg, { opacity: 0, duration: 1 })
      .to(amlaBg, { opacity: 1, visibility: "visible", duration: 1 }, "<")
      .to(amlas, { y: -50, opacity: 1, stagger: 0.1, duration: 1, ease: "power1.out" }, "<");

    // Transition 2: Amla Section -> Leaves Section
    tl.to(amlaBg, { opacity: 0, duration: 1 })
      .to(leavesBg, { opacity: 1, visibility: "visible", duration: 1 }, "<")
      .to(leaves, { y: -50, opacity: 1, stagger: 0.1, duration: 1, ease: "power1.out" }, "<");

    // Transition 3: Leaves Section -> Our Story Section
    tl.to(leavesBg, { opacity: 0, duration: 1 })
      .to(storyBg, { opacity: 1, visibility: "visible", duration: 1 }, "<");

  });

  return (
    <main className={`bg-white ${lexend.className} overflow-hidden`}>
      <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />

      <Navbar />

      <BottleScene />

      <div id="pinContainer" className="h-screen w-full relative overflow-hidden bg-white">

        {/* Intro Section */}
        <section
          ref={fadeBg}
          className="absolute inset-0 h-screen bg-[url(/images/amlaBg.png)] bg-center bg-no-repeat bg-cover text-white flex items-start lg:items-center justify-start z-10"
        >
          <div className="h-screen w-screen bg-black/20 absolute inset-0 z-999"></div>
          <h1 className="text-balance text-[70px] md:text-8xl lg:text-[140px] leading-[1.1] font-extrabold w-[90%] md:max-w-5xl absolute left-4  md:left-20 lg:left-32 top-1/4 md:top-24 lg:top-28 z-10 tracking-tight">
            Nature&apos;s<br />Answer<br />to<br />Hair Fall.
          </h1>
        </section>

        {/* Amla Section */}
        <section
          ref={amlaRef}
          className="absolute inset-0 h-screen bg-linear-to-l from-[#FFFEFE26] to-[#DFE2D2] text-[#4E482E] flex items-center justify-start z-20 pointer-events-none"
        >
          <h1 className="text-[#4E482E] text-balance text-5xl md:text-8xl lg:text-[130px] leading-[1.0] font-medium w-[90%] md:max-w-4xl absolute left-6 md:left-20 lg:left-32 top-16 md:top-24 lg:top-28 z-10 tracking-tight">
            Rooted<br />in<br /><span className="font-extrabold text-[90px] md:text-[150px] leading-[0.8]">Amla</span>
          </h1>
          <img src="/images/amla.png" className="amla absolute w-28 lg:w-80 -top-10 left-10" />
          <img src="/images/amla.png" className="amla absolute w-22 lg:w-62 bottom-20 -left-10 rotate-300" />
          <img src="/images/amla.png" className="amla absolute w-24 lg:w-66 top-1/4 -right-10 rotate-320" />
          <img src="/images/frontAmla.png" className="amla absolute w-24 lg:w-66 top-1/3 right-1/4" />
          <img src="/images/frontAmla.png" className="amla absolute w-24 lg:w-68 bottom-10 right-1/10 rotate-140" />
        </section>

        {/* Ashwagandha / Leaves Section */}
        <section
          ref={leavesRef}
          className="absolute inset-0 h-screen bg-linear-to-l from-[#FFFEFE26] to-[#DFE2D2] text-[#4E482E] flex items-center justify-end z-30 pointer-events-none"
        >
          <h1 className="text-[#4E482E] text-balance absolute text-5xl md:text-8xl lg:text-[130px] leading-[1.0] md:max-w-5xl text-right top-20 md:top-32 lg:top-40 right-10 md:right-32 lg:right-40 font-medium z-10 tracking-tight">
            Calmed by<br /><span className="font-extrabold text-[60px] sm:text-[80px] md:text-[150px] leading-[0.8]">Ashwagandha</span>
          </h1>
          {/* Top Left Leaf */}
          <img src="/images/leaves/leaf3.png" className="leaf absolute w-40 md:w-80 lg:w-[400px] -top-10 md:-top-20 -left-10 md:-left-20 rotate-180 z-0 opacity-90" />

          {/* Bottom Left Leaf */}
          <img src="/images/leaves/leaf1.png" className="leaf absolute w-50 md:w-100 lg:w-[450px] -bottom-10 md:-bottom-20 -left-10 md:-left-20 rotate-0 z-0 opacity-80" />

          {/* Bottom Right Leaf */}
          <img src="/images/leaves/leaf3.png" className="leaf absolute w-40 md:w-80 lg:w-[350px] -bottom-10 md:-bottom-20 -right-10 md:-right-20 rotate-0 z-0 opacity-90" />
        </section>

        {/* Our Story Section */}
        <section
          id="ourStorySection"
          className="absolute inset-0 h-full bg-[#F5F5ED] text-[#4E482E] font-lexend flex sm:items-center sm:justify-center z-40 py-10 lg:py-0 pointer-events-none"
        >
          <div id="ourStory" className="w-full max-w-[1400px] px-6 lg:px-14 flex flex-col md:flex-row sm:justify-center justify-end  items-end pb-40 mt-40 lg:mt-0 h-full relative z-10">
            <div className="w-full md:w-1/3 lg:w-[450px] hidden sm:block">
              <p className="text-xl md:text-2xl lg:text-[26px] leading-[1.6] font-light text-justify text-[#4E482E] tracking-tight">
                Ayurveda is one of the best health science for illness to wellness.We are follower of this tradition to make people healthy.Ayurveda was created on two purposes one is to make healthy people more healthy by its Rasayan chikitsa (rejuvenation)2nd purpose to treat the diseases and make disease free society.
              </p>
            </div>


            <div className="w-full md:w-1/3 lg:w-[450px]">
              <p className="text-xl md:text-2xl lg:text-[26px] leading-[1.6] font-light text-justify text-[#4E482E] tracking-tight">
                So we are trying our best to fillfill among two purposes since 2011.
                Our speciality in obesity, chronic skin disorders,Women’s disorders like Pcos,pcod,irregular or painful menstruation,hormonal imbalance.We are treating all above disorders successfully with authentic Ayurvedic medicine & classical Panchkarma.
              </p>
            </div>
          </div>
        </section>

      </div>
    </main >
  );
}

"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function BottleScene() {
  const bottleRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    const bottle = bottleRef.current;
    if (!bottle) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    tl.fromTo(
      bottle,
      { y: "9vh", x: "5vw", opacity: 1, rotate: 82 },
      { y: "0vh", opacity: 1, rotate: 45, duration: 1, scale: 1.35 },
    )
      .to(bottle, {
        rotate: "-=65",
        scale: 2.4,
        y: "40vh",
        x: "20vw",
        duration: 1,
      })
      .to(bottle, {
        rotate: "-=45",
        scale: 1.52,
        y: "6vh",
        x: "10vw",
        duration: 1,
      })
      .to(bottle, {
        rotate: "-=110",
        y: "-40vh",
        x: "-1vw",
        scale: 1.22,
        duration: 1,
      });
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-40">
      <Image
        ref={bottleRef}
        src="/images/amlaBottle.png"
        alt="Bottle"
        height={1000}
        width={1000}
        className="w-[min(52vw,16rem)] md:w-[min(26vw,26rem)]"
      />
    </div>
  );
}

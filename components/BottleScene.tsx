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

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  gsap.set(bottle, {
    transformOrigin: "50% 90%"
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      invalidateOnRefresh: true
    }
  });

  tl.fromTo(
    bottle,
    {
      y: vh * 0.09,
      x: vw * 0.05,
      opacity: 1,
      rotate: 82
    },
    {
      y: vh * 0,
      opacity: 1,
      rotate: 45,
      duration: 1,
      scale: 1.35
    }
  )

  .to(bottle, {
    rotate: "-=90",
    scale: 1.6,
    y: vh * 0.40,
    x: vw * 0.20,
    duration: 1
  })

  .to(bottle, {
    rotate: "-=45",
    scale: 1.52,
    y: vh * 0.06,
    x: vw * 0.10,
    duration: 1
  })

  .to(bottle, {
    rotate: "-=100",
    y: vh * -0.14,
    x: vw * -0.08,
    scale: 1.22,
    duration: 1
  });

  const handleResize = () => ScrollTrigger.refresh();
  window.addEventListener("resize", handleResize);

  return () => window.removeEventListener("resize", handleResize);

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

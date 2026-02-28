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
      { y: 72, x: 50, opacity: 1, rotate: 82 },
      { y: 0, opacity: 1, rotate: 45, duration: 1, scale: 1.5 },
    )
      .to(bottle, {
        rotate: "-=80",
        scale: 1.6,
        yPercent: 40,
        xPercent: 50,
        duration: 1,
      })
      .to(bottle, {
        rotate: "-=45",
        scale: 1.7,
        yPercent: 10,
        xPercent: 25,
        duration: 1,
      })
      .to(bottle, {
        rotate: "-=100",
        yPercent: "-40",
        xPercent: "-14",
        scale: 1.3,
        duration: 1,
      });
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
      <Image
        ref={bottleRef}
        src="/images/amlaBottle.png"
        alt="Bottle"
        height={1000}
        width={1000}
        className=" md:w-150"
      />
    </div>
  );
}

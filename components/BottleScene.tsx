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

    const width = window.innerWidth;

    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;
    const isDesktop = width >= 1024 && width < 1280;
    const isXL = width >= 1280 && width < 1536;
    const is2XL = width >= 1536;

    const container = document.getElementById("pinContainer");

    const triggerElement = container || document.body;
    const endValue = container ? "+=300%" : "bottom bottom";

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        start: "top top",
        end: endValue,
        scrub: true,
      },
    });

    if (isMobile) {
      // Intro -> Amla
      tl.fromTo(
        bottle,
        { yPercent: 50, xPercent: 0, opacity: 1, rotate: 0, scale: 2.4 },
        {
          yPercent: 30,
          xPercent: 10,
          opacity: 1,
          duration: 1,
          scale: 1.8,
        },
      )
        // Amla -> Leaves
        .to(bottle, {
          rotate: "-90",
          scale: 1.8,
          yPercent: 40,
          xPercent: 10,
          duration: 1,
        })
        // Leaves -> Story
        .to(bottle, {
          rotate: "-180",
          yPercent: "-60",
          xPercent: -10,
          scale: 1.8,
          duration: 1,
        });
    } else if (isDesktop) {
      // Intro -> Amla (Bottle stays perfectly right side up, slightly to the right)
      tl.fromTo(
        bottle,
        { yPercent: -60, xPercent: -20, opacity: 1, rotate: 82, scale: 1.1 },
        {
          yPercent: 20,
          xPercent: 20,
          opacity: 1,
          rotate: 0,
          duration: 1,
          scale: 1.8,
        }, // Straight up
      )
        // Amla -> Leaves (Bottle tilts horizontally, centered/left)
        .to(bottle, {
          rotate: "-90",
          scale: 1.8,
          yPercent: 10, // Moved further down
          xPercent: "-20",
          duration: 1,
        })
        // Leaves -> Story (Bottle scales massively, perfectly centered, showing top cap)
        .to(bottle, {
          rotate: "-180",
          yPercent: -35, // Adjusted to compensate for scaling
          xPercent: "-10",
          scale: 1.8,
          duration: 1,
        });
    } else if (isXL) {
      tl.fromTo(
        bottle,
        { yPercent: 6, xPercent: -15, rotate: 84, scale: 1.3 },
        { yPercent: 25, xPercent: 20, rotate: 0, scale: 2 },
      )
        .to(bottle, {
          rotate: -80,
          yPercent: 25,
          xPercent: -12,
          scale: 2,
        })
        .to(bottle, {
          rotate: -180,
          yPercent: -40,
          xPercent: -12,
          scale: 2,
        });
    } else if (is2XL) {
      tl.fromTo(
        bottle,
        { yPercent: 0, xPercent: -40, rotate: 82, scale: 1.4 },
        { yPercent: 25, xPercent: 25, rotate: 0, scale: 2.2 },
      )
        .to(bottle, {
          rotate: -80,
          yPercent: 30,
          xPercent: -15,
          scale: 2.2,
        })
        .to(bottle, {
          rotate: -180,
          yPercent: -45,
          xPercent: -15,
          scale: 2.2,
        });
    } else if (isTablet) {
      tl.fromTo(
        bottle,
        { yPercent: "-40", xPercent: -20, rotate: 82, scale: 1.2 },
        { yPercent: 20, xPercent: 10, rotate: 0, scale: 1.8 },
      )
        .to(bottle, {
          rotate: -80,
          yPercent: 20,
          xPercent: -10,
          scale: 1.8,
        })
        .to(bottle, {
          rotate: -180,
          yPercent: -35,
          xPercent: -10,
          scale: 1.8,
        });
    }
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-1">
      <Image
        ref={bottleRef}
        src="/images/amlaBottle.png"
        alt="Bottle"
        height={1000}
        width={1000}
        className="w-[clamp(160px,18vw,420px)] object-contain"
      />
    </div>
  );
}

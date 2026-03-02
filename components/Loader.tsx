"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";

export default function Loader() {
    const [hide, setHide] = useState(false);

    useEffect(() => {
        const tl = gsap.timeline();

        tl.fromTo(
            ".line",
            { width: "0%" },
            { width: "160px", duration: 1.2, ease: "power3.out" }
        )

            .fromTo(
                ".brand-dark",
                { opacity: 0, letterSpacing: "10px" },
                {
                    opacity: 1,
                    letterSpacing: "6px",
                    duration: 1,
                    ease: "power2.out",
                },
                "-=0.6"
            )

            .to(".glow", {
                opacity: 0.6,
                duration: 0.8,
                yoyo: true,
                repeat: 1,
            })

            .to(".dark-loader", {
                opacity: 0,
                duration: 1,
                delay: 0.8,
                ease: "power2.out",
                onComplete: () => setHide(true),
            });
    }, []);

    if (hide) return null;

    return (
        <div className="dark-loader fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0F0F10]">

            <div className="relative mb-6 h-[2px]">
                <div className="line h-[2px] bg-[#6B8E23] mx-auto"></div>
                <div className="glow absolute inset-0 bg-[#6B8E23] blur-md opacity-0"></div>
            </div>

            <h1 className="brand-dark text-3xl font-light text-[#EAEAEA] tracking-[6px]">
                MEDTECH
            </h1>

            <p className="mt-3 text-xs text-gray-400 tracking-widest">
                Crafted in Nature
            </p>
        </div>
    );
}
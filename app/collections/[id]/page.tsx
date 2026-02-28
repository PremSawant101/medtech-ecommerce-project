"use client";

import Navbar from "@/components/layout/Navbar";
import AddedToCart from "@/components/AddedToCart";
import { Lexend } from "next/font/google";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/components/Button";
import Review from "@/components/Review";


gsap.registerPlugin(ScrollTrigger);

const lexend = Lexend({
    subsets: ["latin"],
});

export default function ProductPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const amlaRef = useRef<HTMLDivElement>(null);
    const leavesRef = useRef<HTMLDivElement>(null);

    const { id } = useParams();
    const { addToCart } = useCart();
    const { cart } = useCart();

    useEffect(() => {
        console.log("Cart Updated:", cart);
    }, [cart]);
    const [product, setProduct] = useState<any>(null);

    useEffect(() => {
        if (!id) return;

        fetch(`/api/products/${id}`)
            .then((res) => res.json())
            .then((data) => setProduct(data));
    }, [id]);

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
                    }
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
                    }
                );
            });
        },
        { scope: containerRef }
    );

    if (!product) {
        return <div className="p-20 text-center">Loading...</div>;
    }

    return (
        <main
            ref={containerRef}
            className={`bg-[#F4F3EE] min-h-screen relative overflow-hidden ${lexend.className}`}
        >
            <Navbar />

            <section
                ref={amlaRef}
                className="relative h-screen flex items-center justify-center overflow-hidden"
            >
                <Image
                    src="/images/amla.png"
                    alt="Amla"
                    width={250}
                    height={250}
                    className="absolute -top-40 -left-20 blur-sm -rotate-45"
                />

                <Image
                    src="/images/frontAmla.png"
                    alt="Amla"
                    width={200}
                    height={200}
                    className="absolute -top-30 right-1/5 rotate-140"
                />

                <Image
                    src="/images/leaves/leaf1.png"
                    alt="Leaf"
                    width={250}
                    height={250}
                    className="absolute -bottom-20 -left-20 rotate-45"
                />

                <div className="w-full max-w-350 flex items-center justify-between z-10">

                    <div className="relative max-w-6xl h-1/2 flex items-end justify-center w-1/2">
                        <Image
                            src={product.image}
                            alt={product.name}
                            width={1000}
                            height={1000}
                            className="object-contain w-180 h-170"
                        />
                    </div>

                    <div className="w-1/2 pl-20 text-[#4E482E]">
                        <h1 className="text-6xl font-bold mb-4">
                            {product.name}
                        </h1>

                        <h3 className="text-xl font-semibold mb-6">
                            ₹ {product.price}
                        </h3>
                        {product.stock === 0 ? (
                            <p className="text-red-600 font-semibold text-lg mb-4">
                                Out of Stock
                            </p>
                        ) : product.stock <= 5 ? (
                            <p className="text-orange-500 font-medium text-lg mb-4">
                                Only {product.stock} left in stock!
                            </p>
                        ) : null}
                        <p className="text-lg leading-relaxed mb-8 text-[#6D6A5F]">
                            {product.description}
                        </p>

                        <Button
                            bgColor={product.stock === 0 ? "gray" : "brown"}
                            title={product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                            disabled={product.stock === 0}
                            onClick={() => {
                                if (product.stock === 0) return;

                                addToCart({
                                    id: product._id,
                                    name: product.name,
                                    price: product.price,
                                    image: product.image,
                                });
                            }}
                        />
                    </div>
                </div>
            </section>

            <Review />
        </main>
    );
}

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

    const [toast, setToast] = useState<string | null>(null);

    const showToast = (message: string) => {
        setToast(message);
        setTimeout(() => {
            setToast(null);
        }, 2500);
    };
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
            {toast && (
                <div className="fixed top-25 right-10 bg-[#4E482E] text-white px-6 py-3 rounded-xl shadow-2xl z-50 transition-all duration-300">
                    {toast}
                </div>
            )}
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

                        {product.discount > 0 && (
                            <div className="absolute top-10 left-10 bg-[#A6B11E] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                                -{product.discount}%
                            </div>
                        )}
                        <Image
                            src={product.image}
                            alt={product.name}
                            width={1000}
                            height={1000}
                            className="object-contain w-180 h-170"
                        />
                    </div>

                    <div className="w-1/2 pl-24 text-[#4E482E]">

                        <h1 className="text-6xl font-extrabold mb-6 tracking-tight leading-tight">
                            {product.name}
                        </h1>

                        <div className="flex items-center gap-6 mb-6">
                            <div className="flex items-center gap-4">

                                {product.discount > 0 ? (
                                    <>
                                        <span className="text-xl line-through text-gray-400">
                                            ₹ {product.price}
                                        </span>

                                        <span className="text-3xl font-bold text-[#A6B11E]">
                                            ₹ {Math.round(product.price - (product.price * product.discount) / 100)}
                                        </span>

                                        <span className="text-sm text-green-600 font-semibold">
                                            {product.discount}% OFF
                                        </span>
                                    </>
                                ) : (
                                    <span className="text-3xl font-bold text-[#A6B11E]">
                                        ₹ {product.price}
                                    </span>
                                )}

                            </div>

                            {product.stock > 0 && (
                                <span className="text-sm px-4 py-1 rounded-full bg-[#4E482E]/10 text-[#4E482E] font-medium">
                                    In Stock
                                </span>
                            )}
                        </div>

                        {product.stock === 0 ? (
                            <p className="text-red-600 font-semibold text-lg mb-6">
                                Out of Stock
                            </p>
                        ) : product.stock <= 5 ? (
                            <p className="text-orange-500 font-medium text-lg mb-6">
                                Only {product.stock} left in stock!
                            </p>
                        ) : null}

                        <p className="text-lg leading-relaxed mb-10 text-[#6D6A5F] max-w-xl">
                            {product.description}
                        </p>

                        <div className="flex items-center gap-6">
                            <Button
                                bgColor={product.stock === 0 ? "gray" : "brown"}
                                title={product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                                disabled={product.stock === 0}
                                onClick={() => {
                                    if (product.stock === 0) return;

                                    addToCart({
                                        _id: product._id,
                                        name: product.name,
                                        price:
                                            product.discount > 0
                                                ? Math.round(product.price - (product.price * product.discount) / 100)
                                                : product.price,
                                        image: product.image,
                                    });

                                    showToast("Product added to cart 🛒");
                                }}
                            />

                            {product.stock > 0 && (
                                <span className="text-sm text-[#6D6A5F]">
                                    Secure & Fast Delivery
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <Review />
        </main>
    );
}
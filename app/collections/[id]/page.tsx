"use client";

import Navbar from "@/components/layout/Navbar";
import AddedToCart from "@/components/AddedToCart";
import { Lexend } from "next/font/google";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
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
    const [allProducts, setAllProducts] = useState<any[]>([]);

    useEffect(() => {
        if (!id) return;

        fetch(`/api/products/${id}`)
            .then((res) => res.json())
            .then((data) => setProduct(data));
    }, [id]);

    useEffect(() => {
        fetch("/api/products")
            .then((res) => res.json())
            .then((data) => setAllProducts(data));
    }, []);

    const similarProducts = allProducts.filter((p) => p._id !== id);

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
                <div className="fixed top-24 right-6 bg-[#4E482E] text-white px-6 py-3 rounded-xl shadow-2xl z-50 transition-all duration-300">
                    {toast}
                </div>
            )}
            <section
                ref={amlaRef}
                className="relative min-h-screen lg:h-screen flex items-center justify-center overflow-hidden"
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
                    className="absolute -bottom-20 -left-20 rotate-45 blur-md lg:blur-none"
                />

                <div className="w-full max-w-350 flex flex-col lg:flex-row items-center justify-between z-10 px-4 lg:px-0">

                    <div className="relative max-w-6xl h-1/2 flex items-end justify-center w-full lg:w-1/2">
                        <Image
                            src={product.image}
                            alt={product.name}
                            width={1000}
                            height={1000}
                            className="object-contain w-100 h-100 md:w-140 md:h-150 lg:w-180 lg:h-170"
                        />
                    </div>

                    <div className="w-full lg:w-1/2 pl-0 lg:pl-20 text-[#4E482E] mt-6 lg:mt-0">
                        <h1 className="text-2xl lg:text-4xl font-bold mb-4 leading-snug">
                            {product.name}
                        </h1>

                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="text-sm font-medium text-[#A6B11E] tracking-wide">₹</span>
                            <span className="text-3xl font-bold text-[#4E482E] tracking-tight">{product.price}</span>
                        </div>
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
                                    _id: product._id,
                                    name: product.name,
                                    price: product.price,
                                    image: product.image,
                                });

                                showToast("Product added to cart 🛒");
                            }}
                        />
                    </div>
                </div>
            </section>

            <Review />

            {/* Similar Products */}
            {similarProducts.length > 0 && (
                <section className="relative bg-[#F4F3EE] py-12 lg:py-20 px-4 lg:px-12">
                    <h2 className="text-2xl lg:text-4xl font-bold text-[#4E482E] mb-8 px-2">
                        Similar Products
                    </h2>

                    <div className="overflow-x-auto pb-4 scrollbar-hide">
                        <div className="flex gap-4 lg:gap-6 w-max px-2">
                            {similarProducts.map((item) => (
                                <Link key={item._id} href={`/collections/${item._id}`}>
                                    <div className="w-[160px] lg:w-[220px] bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex-shrink-0 group">
                                        <div className="relative h-[140px] lg:h-[180px] bg-[#F8F8F5] flex items-center justify-center">
                                            {/* Category Label */}
                                            <div className="absolute top-2 left-2 lg:top-3 lg:left-3 bg-[#8B1A1A] text-white text-[7px] lg:text-[10px] font-bold uppercase px-2 lg:px-3 py-0.5 lg:py-1 rounded-sm z-10 tracking-wide">
                                                {item.category?.toLowerCase().includes("oil") ? "HAIR OIL" : item.category?.toLowerCase().includes("tablet") ? "HAIR TABLETS" : item.category?.toLowerCase().includes("lepa") ? "HAIR LEPA" : item.category}
                                            </div>
                                            <Image
                                                src={item.image || "/images/oil/product1.png"}
                                                alt={item.name}
                                                width={300}
                                                height={300}
                                                className="object-contain h-[110px] lg:h-[150px] transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>
                                        <div className="p-3 lg:p-4">
                                            <h3 className="text-xs lg:text-sm font-semibold text-[#4E482E] line-clamp-2 mb-1">
                                                {item.name}
                                            </h3>
                                            <div className="flex items-baseline gap-0.5">
                                                <span className="text-[10px] lg:text-xs text-[#A6B11E] font-medium">₹</span>
                                                <span className="text-sm lg:text-base font-bold text-[#4E482E]">{item.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
}
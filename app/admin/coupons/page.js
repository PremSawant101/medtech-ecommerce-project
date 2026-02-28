"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CouponsPage() {

    const { data: session, status } = useSession();
    const router = useRouter();

    const [coupons, setCoupons] = useState([]);
    const [code, setCode] = useState("");
    const [discount, setDiscount] = useState("");
    const [expiry, setExpiry] = useState("");
    const [message, setMessage] = useState("");


    useEffect(() => {
        if (status === "loading") return;

        if (!session) {
            router.push("/login");
        }

        if (session?.user?.role !== "admin") {
            router.push("/");
        }
    }, [session, status]);


    const loadCoupons = async () => {
        const res = await fetch("/api/coupons");
        const data = await res.json();
        setCoupons(data);
    };

    useEffect(() => {
        loadCoupons();
    }, []);


    const addCoupon = async () => {
        const res = await fetch("/api/coupons", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: session?.user?.email,
                code,
                discountPercent: Number(discount),
                expiryDate: expiry,
            }),
        });

        const data = await res.json();
        setMessage(data.message);

        if (res.ok) {
            setCode("");
            setDiscount("");
            setExpiry("");
            loadCoupons();
        }
    };


    const deleteCoupon = async (id) => {
        await fetch(`/api/coupons/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: session?.user?.email,
            }),
        });

        loadCoupons();
    };


    const updateCoupon = async (id) => {
        await fetch(`/api/coupons/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: session?.user?.email,
                discountPercent: Number(discount),
                expiryDate: expiry,
            }),
        });

        loadCoupons();
    };


    if (status === "loading") {
        return <p className="p-10 text-white">Loading...</p>;
    }


    return (
        <div className="min-h-screen bg-[#100C08] text-[#FFFAF0] p-10">

            <h1 className="text-3xl font-bold text-[#6B8E23] mb-10">
                Coupons Management
            </h1>

            <div className="bg-[#FFFAF0] text-black p-6 rounded-2xl shadow-xl max-w-xl mb-10">

                <h2 className="text-xl font-semibold mb-4 text-[#6B8E23]">
                    Create Coupon
                </h2>

                <input
                    placeholder="Coupon Code (MED50)"
                    className="w-full border p-3 rounded-lg mb-3"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Discount %"
                    className="w-full border p-3 rounded-lg mb-3"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                />

                <input
                    type="date"
                    className="w-full border p-3 rounded-lg mb-4"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                />

                <button
                    onClick={addCoupon}
                    className="bg-[#6B8E23] text-white px-6 py-2 rounded-lg hover:bg-[#556B2F]"
                >
                    Add Coupon
                </button>

                {message && (
                    <p className="mt-4 text-green-600">{message}</p>
                )}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                {coupons.map((c) => (
                    <div
                        key={c._id}
                        className="bg-[#FFFAF0] text-black p-6 rounded-2xl shadow-lg"
                    >
                        <p className="font-bold text-lg">
                            {c.code}
                        </p>

                        <p className="text-gray-600">
                            Discount: {c.discountPercent}%
                        </p>

                        <p className="text-gray-600">
                            Expiry: {new Date(c.expiryDate).toDateString()}
                        </p>

                        <div className="mt-4 flex gap-3">

                            <button
                                onClick={() => deleteCoupon(c._id)}
                                className="bg-red-600 text-white px-4 py-2 rounded"
                            >
                                Delete
                            </button>

                            <button
                                onClick={() => updateCoupon(c._id)}
                                className="bg-[#6B8E23] text-white px-4 py-2 rounded"
                            >
                                Update
                            </button>

                        </div>
                    </div>
                ))}

            </div>

        </div>
    );
}
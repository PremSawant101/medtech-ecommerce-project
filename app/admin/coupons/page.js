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
    const [editId, setEditId] = useState(null);

    // ===== Auth Check =====
    useEffect(() => {
        if (status === "loading") return;

        if (!session) {
            router.push("/login");
        }

        if (session?.user?.role !== "admin") {
            router.push("/");
        }
    }, [session, status]);

    // ===== Load Coupons =====
    const loadCoupons = async () => {
        const res = await fetch("/api/coupons");
        const data = await res.json();
        setCoupons(data);
    };

    useEffect(() => {
        loadCoupons();
    }, []);

    // ===== Add / Update Coupon =====
    const saveCoupon = async () => {

        if (!code || !discount || !expiry) {
            setMessage("Please fill all fields");
            return;
        }

        const method = editId ? "PUT" : "POST";
        const url = editId
            ? `/api/coupons/${editId}`
            : "/api/coupons";

        const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
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
            setEditId(null);
            loadCoupons();
        }
    };

    // ===== Delete Coupon =====
    const deleteCoupon = async (id) => {
        const confirmDelete = confirm("Delete this coupon?");
        if (!confirmDelete) return;

        const res = await fetch(`/api/coupons/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: session?.user?.email,
            }),
        });

        if (res.ok) {
            loadCoupons();
        }
    };

    if (status === "loading") {
        return <p className="p-10 text-white">Loading...</p>;
    }

    return (
        <div className="min-h-screen bg-[#0F0F0F] text-white p-5">

            <h1 className="text-4xl font-bold text-[#6B8E23] mb-8">
                Coupons Management
            </h1>

            <div className="bg-[#1A1A1A] p-8 rounded-2xl shadow-xl max-w-xl mb-12 border border-[#222]">

                <h2 className="text-2xl font-semibold mb-6 text-[#6B8E23]">
                    {editId ? "Edit Coupon" : "Create Coupon"}
                </h2>

                <input
                    placeholder="Coupon Code (MED50)"
                    className="w-full mb-4 p-3 rounded-lg bg-[#111] border border-[#222]"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                />

                <input
                    type="number"
                    placeholder="Discount %"
                    className="w-full mb-4 p-3 rounded-lg bg-[#111] border border-[#222]"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                />

                <input
                    type="date"
                    className="w-full mb-6 p-3 rounded-lg bg-[#111] border border-[#222]"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                />

                <div className="flex gap-4">
                    <button
                        onClick={saveCoupon}
                        className="bg-[#6B8E23] px-6 py-3 rounded-lg font-semibold hover:bg-[#556B2F] transition"
                    >
                        {editId ? "Update Coupon" : "Add Coupon"}
                    </button>

                    {editId && (
                        <button
                            onClick={() => {
                                setEditId(null);
                                setCode("");
                                setDiscount("");
                                setExpiry("");
                            }}
                            className="text-gray-400 underline"
                        >
                            Cancel Edit
                        </button>
                    )}
                </div>

                {message && (
                    <p className="mt-4 text-green-400">{message}</p>
                )}
            </div>

            {/* ===== COUPON LIST ===== */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                {coupons.map((c) => {
                    const isExpired = new Date(c.expiryDate) < new Date();

                    return (
                        <div
                            key={c._id}
                            className="bg-[#1A1A1A] p-6 rounded-2xl shadow-lg border border-[#222] hover:scale-[1.02] transition"
                        >

                            {/* Code + Status */}
                            <div className="flex justify-between items-center mb-4">
                                <p className="font-bold text-xl tracking-wider">
                                    {c.code}
                                </p>

                                <span className={`text-xs px-3 py-1 rounded-full font-semibold ${isExpired
                                    ? "bg-red-600 text-white"
                                    : "bg-green-600 text-white"
                                    }`}>
                                    {isExpired ? "Expired" : "Active"}
                                </span>
                            </div>

                            <p className="text-gray-400 mb-2">
                                Discount: <span className="text-[#6B8E23] font-semibold">
                                    {c.discountPercent}%
                                </span>
                            </p>

                            <p className="text-gray-400 mb-6">
                                Expiry: {new Date(c.expiryDate).toDateString()}
                            </p>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => {
                                        setEditId(c._id);
                                        setCode(c.code);
                                        setDiscount(c.discountPercent);
                                        setExpiry(c.expiryDate?.split("T")[0]);
                                    }}
                                    className="bg-[#6B8E23] px-4 py-2 rounded-lg text-sm hover:bg-[#556B2F]"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => deleteCoupon(c._id)}
                                    className="bg-red-600 px-4 py-2 rounded-lg text-sm hover:bg-red-700"
                                >
                                    Delete
                                </button>
                            </div>

                        </div>
                    );
                })}

            </div>

        </div>
    );
}
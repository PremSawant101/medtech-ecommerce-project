"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const p = await fetch("/api/products");
        const o = await fetch("/api/orders");

        setProducts(await p.json());
        setOrders(await o.json());
    };

    return (
        <div>
            <h1 className="text-4xl font-bold mb-12 text-[#6B8E23]">
                Dashboard Overview
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#1A1A1A] p-8 rounded-2xl border border-gray-800">
                    <h3>Total Products</h3>
                    <p className="text-3xl text-[#6B8E23]">{products.length}</p>
                </div>

                <div className="bg-[#1A1A1A] p-8 rounded-2xl border border-gray-800">
                    <h3>Total Orders</h3>
                    <p className="text-3xl text-[#6B8E23]">{orders.length}</p>
                </div>
            </div>
        </div>
    );
}
"use client";

import { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";

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

    // ====== Analytics ======

    const totalRevenue = orders
        .filter(o => o.status === "delivered")
        .reduce((sum, o) => sum + o.totalAmount, 0);

    const pendingOrders = orders.filter(o => o.status === "pending").length;
    const approvedOrders = orders.filter(o => o.status === "approved").length;
    const deliveredOrders = orders.filter(o => o.status === "delivered").length;
    const cancelledOrders = orders.filter(o => o.status === "cancelled").length;

    // ===== Revenue By Date =====

    const revenueByDate = {};

    orders.forEach(order => {
        if (order.status === "delivered") {
            const date = new Date(order.createdAt).toLocaleDateString();
            revenueByDate[date] =
                (revenueByDate[date] || 0) + order.totalAmount;
        }
    });

    const revenueChartData = Object.keys(revenueByDate).map(date => ({
        date,
        revenue: revenueByDate[date],
    }));

    // ===== Status Pie Data =====

    const statusData = [
        { name: "Pending", value: pendingOrders },
        { name: "Approved", value: approvedOrders },
        { name: "Delivered", value: deliveredOrders },
        { name: "Cancelled", value: cancelledOrders },
    ];

    const COLORS = ["#FACC15", "#3B82F6", "#22C55E", "#EF4444"];

    return (
        <div>

            <h1 className="text-4xl font-bold mb-12 text-[#6B8E23]">
                Dashboard Overview
            </h1>

            {/* ===== STATS ===== */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <StatCard title="Total Products" value={products.length} />
                <StatCard title="Total Orders" value={orders.length} />
                <StatCard title="Revenue" value={`₹ ${totalRevenue}`} />
            </div>

            {/* ===== CHART SECTION ===== */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                {/* Revenue Chart */}
                <div className="bg-[#1A1A1A] p-6 rounded-2xl shadow-xl">
                    <h2 className="text-xl font-semibold mb-6 text-[#6B8E23]">
                        Revenue Overview
                    </h2>

                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={revenueChartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                            <XAxis dataKey="date" stroke="#aaa" />
                            <YAxis stroke="#aaa" />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="revenue"
                                stroke="#6B8E23"
                                strokeWidth={3}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Status Pie Chart */}
                <div className="bg-[#1A1A1A] p-6 rounded-2xl shadow-xl">
                    <h2 className="text-xl font-semibold mb-6 text-[#6B8E23]">
                        Order Status
                    </h2>

                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={statusData}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={100}
                                label
                            >
                                {statusData.map((entry, index) => (
                                    <Cell key={index} fill={COLORS[index]} />
                                ))}
                            </Pie>
                            <Legend />
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

            </div>
        </div>
    );
}


// ===== Reusable Card =====
function StatCard({ title, value }) {
    return (
        <div className="bg-[#1A1A1A] p-6 rounded-2xl shadow-lg">
            <p className="text-gray-400 text-sm">{title}</p>
            <h2 className="text-3xl font-bold mt-2 text-[#6B8E23]">
                {value}
            </h2>
        </div>
    );
}
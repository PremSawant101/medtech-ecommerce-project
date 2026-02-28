"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrdersPage() {

    const { data: session, status } = useSession();
    const router = useRouter();

    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        if (status === "loading") return;

        if (!session) {
            router.push("/login");
        }

        if (session?.user?.role !== "admin") {
            router.push("/");
        }
    }, [session, status]);

    useEffect(() => {
        if (session?.user?.role === "admin") {
            loadOrders();
        }
    }, [session]);

    const loadOrders = async () => {
        const res = await fetch("/api/orders");
        const data = await res.json();
        setOrders(data);
    };

    const updateStatus = async (id, newStatus) => {
        await fetch(`/api/orders/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: session?.user?.email,
                status: newStatus,
            }),
        });

        loadOrders();
    };

    if (status === "loading") {
        return <p className="p-10 text-white">Loading...</p>;
    }

    return (
        <div className="min-h-screen bg-[#0F0F0F] text-[#FFFAF0] p-10">

            <h1 className="text-4xl font-bold mb-12 text-[#6B8E23] tracking-wide">
                Orders Management
            </h1>

            {orders.length === 0 && (
                <p className="text-gray-400">No orders found.</p>
            )}

            {orders.map((order) => (
                <div
                    key={order._id}
                    className="bg-[#1A1A1A] p-6 rounded-2xl mb-6 shadow-xl hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 cursor-pointer border border-[#222]"
                    onClick={() => setSelectedOrder(order)}
                >
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-400">
                                {new Date(order.createdAt).toLocaleString()}
                            </p>
                            <p className="text-lg font-semibold mt-1">
                                {order.userEmail}
                            </p>
                        </div>

                        <div className="text-right">
                            <p className="text-xl font-bold text-[#6B8E23]">
                                ₹{order.totalAmount}
                            </p>
                            <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${order.status === "paid"
                                    ? "bg-green-600"
                                    : order.status === "shipped"
                                        ? "bg-blue-600"
                                        : order.status === "delivered"
                                            ? "bg-purple-600"
                                            : "bg-yellow-600"
                                    }`}
                            >
                                {order.status}
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-3 mt-5">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                updateStatus(order._id, "approved");
                            }}
                            className="bg-[#6B8E23] hover:bg-[#556B2F] px-4 py-2 rounded-lg text-sm transition"
                        >
                            Approve
                        </button>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                updateStatus(order._id, "shipped");
                            }}
                            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm transition"
                        >
                            Ship
                        </button>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                updateStatus(order._id, "delivered");
                            }}
                            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-sm transition"
                        >
                            Deliver
                        </button>
                    </div>
                </div>
            ))}

            {selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50">

                    <div className="bg-white text-black p-8 rounded-3xl w-[550px] relative shadow-2xl">

                        <button
                            onClick={() => setSelectedOrder(null)}
                            className="absolute top-4 right-5 text-xl font-bold hover:text-red-600"
                        >
                            ✕
                        </button>

                        <h2 className="text-2xl font-bold text-[#6B8E23] mb-6">
                            Order Details
                        </h2>

                        <div className="space-y-2 text-sm">
                            <p><strong>User:</strong> {selectedOrder.userEmail}</p>
                            <p><strong>Total:</strong> ₹{selectedOrder.totalAmount}</p>
                            <p>
                                <strong>Status:</strong>{" "}
                                <span className="font-semibold text-[#6B8E23]">
                                    {selectedOrder.status}
                                </span>
                            </p>
                            <p>
                                <strong>Created:</strong>{" "}
                                {new Date(selectedOrder.createdAt).toLocaleString()}
                            </p>
                        </div>

                        <hr className="my-6" />

                        <h3 className="font-semibold mb-3">Products</h3>

                        <div className="space-y-3 max-h-40 overflow-y-auto">
                            {selectedOrder.products?.map((p, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-100 p-3 rounded-lg text-sm"
                                >
                                    <p><strong>ID:</strong> {p.productId}</p>
                                    <p><strong>Quantity:</strong> {p.quantity}</p>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
}
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrdersPage() {

    const { data: session, status } = useSession();
    const router = useRouter();

    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [filter, setFilter] = useState("all");

    const totalOrders = orders.length;

    const totalRevenue = orders
        .filter(o => o.status === "delivered")
        .reduce((sum, o) => sum + o.totalAmount, 0);

    const pendingOrders = orders.filter(o => o.status === "pending").length;

    const cancelledOrders = orders.filter(o => o.status === "cancelled").length;

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

    const filteredOrders =
        filter === "all"
            ? orders
            : orders.filter(order => order.status === filter);
    return (
        <div className="min-h-screen bg-[#0F0F0F] text-[#FFFAF0] p-5">

            <h1 className="text-4xl font-bold mb-12 text-[#6B8E23] tracking-wide">
                Orders Management
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

                <div className="bg-[#1A1A1A] p-6 rounded-2xl shadow-lg border border-[#222]">
                    <p className="text-gray-400 text-sm">Total Orders</p>
                    <h2 className="text-3xl font-bold mt-2">{totalOrders}</h2>
                </div>

                <div className="bg-green-700 p-6 rounded-2xl shadow-lg">
                    <p className="text-sm text-green-100">Total Revenue</p>
                    <h2 className="text-3xl font-bold mt-2">₹ {totalRevenue}</h2>
                </div>

                <div className="bg-yellow-600 p-6 rounded-2xl shadow-lg">
                    <p className="text-sm text-yellow-100">Pending Orders</p>
                    <h2 className="text-3xl font-bold mt-2">{pendingOrders}</h2>
                </div>

                <div className="bg-red-700 p-6 rounded-2xl shadow-lg">
                    <p className="text-sm text-red-100">Cancelled Orders</p>
                    <h2 className="text-3xl font-bold mt-2">{cancelledOrders}</h2>
                </div>

            </div>
            <div className="flex gap-3 mb-6 flex-wrap">
                {["all", "pending", "approved", "shipped", "delivered", "cancelled"].map(status => (
                    <button
                        key={status}
                        onClick={() => setFilter(status)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition ${filter === status
                            ? "bg-[#6B8E23] text-white"
                            : "bg-[#1A1A1A] text-gray-300 hover:bg-gray-700"
                            }`}
                    >
                        {status.toUpperCase()}
                    </button>
                ))}
            </div>

            {orders.length === 0 && (
                <p className="text-gray-400">No orders found.</p>
            )}

            {filteredOrders.map((order) => (
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
                            <p>
                                <strong>Status:</strong>{" "}
                                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${order.status === "pending"
                                    ? "bg-yellow-500"
                                    : order.status === "approved"
                                        ? "bg-blue-500"
                                        : order.status === "shipped"
                                            ? "bg-purple-500"
                                            : order.status === "delivered"
                                                ? "bg-green-600"
                                                : "bg-red-600"
                                    } text-white`}>
                                    {order.status}
                                </span>
                            </p>
                        </div>
                    </div>

                    <div className="space-x-3 mt-4">

                        {order.status === "pending" && (
                            <>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        updateStatus(order._id, "approved");
                                    }}
                                    className="bg-[#6B8E23] px-4 py-2 rounded"
                                >
                                    Approve
                                </button>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        updateStatus(order._id, "cancelled");
                                    }}
                                    className="bg-red-600 px-4 py-2 rounded"
                                >
                                    Cancel
                                </button>
                            </>
                        )}

                        {order.status === "approved" && (
                            <>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        updateStatus(order._id, "shipped");
                                    }}
                                    className="bg-blue-600 px-4 py-2 rounded"
                                >
                                    Ship
                                </button>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        updateStatus(order._id, "cancelled");
                                    }}
                                    className="bg-red-600 px-4 py-2 rounded"
                                >
                                    Cancel
                                </button>
                            </>
                        )}

                        {order.status === "shipped" && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    updateStatus(order._id, "delivered");
                                }}
                                className="bg-purple-600 px-4 py-2 rounded"
                            >
                                Deliver
                            </button>
                        )}

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
                                    <p><strong>Product:</strong> {p.productId?.name}</p>
                                    <p><strong>Price:</strong> ₹{p.productId?.price}</p>
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
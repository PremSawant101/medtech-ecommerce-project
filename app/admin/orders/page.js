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
        <div className="min-h-screen bg-[#100C08] text-[#FFFAF0] p-10">

            <h1 className="text-3xl font-bold mb-10 text-[#6B8E23]">
                Orders Management
            </h1>

            {orders.map((order) => (
                <div
                    key={order._id}
                    className="bg-[#1A1A1A] p-6 rounded-2xl mb-6 cursor-pointer hover:scale-[1.01] transition"
                    onClick={() => setSelectedOrder(order)}
                >
                    <p><strong>User:</strong> {order.userEmail}</p>
                    <p><strong>Total:</strong> ₹{order.totalAmount}</p>
                    <p><strong>Status:</strong> {order.status}</p>

                    <div className="space-x-3 mt-4">
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
                                updateStatus(order._id, "shipped");
                            }}
                            className="bg-blue-600 px-4 py-2 rounded"
                        >
                            Ship
                        </button>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                updateStatus(order._id, "delivered");
                            }}
                            className="bg-purple-600 px-4 py-2 rounded"
                        >
                            Deliver
                        </button>
                    </div>
                </div>
            ))}


            {selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">

                    <div className="bg-[#FFFAF0] text-black p-8 rounded-2xl w-[500px] relative">

                        <button
                            onClick={() => setSelectedOrder(null)}
                            className="absolute top-3 right-4 text-xl"
                        >
                            ✕
                        </button>

                        <h2 className="text-2xl font-bold text-[#6B8E23] mb-4">
                            Order Details
                        </h2>

                        <p><strong>User:</strong> {selectedOrder.userEmail}</p>
                        <p><strong>Total:</strong> ₹{selectedOrder.totalAmount}</p>
                        <p><strong>Status:</strong> {selectedOrder.status}</p>
                        <p><strong>Created:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p>

                        <hr className="my-4" />

                        <h3 className="font-semibold mb-2">Products:</h3>

                        {selectedOrder.products?.map((p, index) => (
                            <div key={index} className="mb-2">
                                <p>Product ID: {p.productId}</p>
                                <p>Quantity: {p.quantity}</p>
                            </div>
                        ))}

                        {selectedOrder.prescriptionUploaded && (
                            <>
                                <hr className="my-4" />
                                <p className="text-red-600 font-semibold">
                                    Prescription Uploaded
                                </p>
                                <p>File: {selectedOrder.prescriptionFile}</p>
                            </>
                        )}

                    </div>
                </div>
            )}

        </div>
    );
}
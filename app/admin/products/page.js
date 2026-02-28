"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function ProductsPage() {

    const { data: session } = useSession();

    const [products, setProducts] = useState([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");
    const [editId, setEditId] = useState(null);

    const loadProducts = async () => {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const addProduct = async () => {
        const res = await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: session?.user?.email,
                name,
                category: "Medicine",
                description,
                price: Number(price),
                stock: 100,
                prescriptionRequired: false,
                image,
            }),
        });

        const data = await res.json();
        setMessage(data.message);

        setName("");
        setPrice("");
        setImage("");
        setDescription("");

        loadProducts();
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this product?")) return;

        await fetch(`/api/products/${id}`, {
            method: "DELETE",
        });

        loadProducts();
    };
    const startEdit = (product) => {
        setEditId(product._id);
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setDescription(product.description);
    };
    const updateProduct = async () => {
        await fetch(`/api/products/${editId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                description,
                price: Number(price),
                image,
            }),
        });

        setEditId(null);
        setName("");
        setPrice("");
        setImage("");
        setDescription("");
        loadProducts();
    };
    return (
        <div className="min-h-screen bg-[#100C08] text-[#FFFAF0] p-10">

            <h1 className="text-3xl font-bold text-[#6B8E23] mb-8">
                Product Management
            </h1>

            <div className="bg-[#FFFAF0] text-black rounded-2xl shadow-xl p-6 max-w-xl mb-10">

                <h2 className="text-xl font-semibold mb-4 text-[#6B8E23]">
                    Add Product
                </h2>

                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Product Name"
                    className="w-full border p-3 rounded-lg mb-3"
                />

                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price"
                    className="w-full border p-3 rounded-lg mb-3"
                />

                <input
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="Image URL"
                    className="w-full border p-3 rounded-lg mb-3"
                />

                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    className="w-full border p-3 rounded-lg mb-4"
                />

                <button
                    onClick={editId ? updateProduct : addProduct}
                    className="bg-[#6B8E23] text-white px-6 py-2 rounded-lg hover:bg-[#556B2F] transition"
                >
                    {editId ? "Update Product" : "Add Product"}
                </button>

                {message && (
                    <p className="mt-3 text-green-600">{message}</p>
                )}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((p) => (
                    <div
                        key={p._id}
                        className="bg-[#FFFAF0] text-black p-5 rounded-2xl shadow-lg"
                    >
                        <img
                            src={p.image || "https://via.placeholder.com/300"}
                            alt={p.name}
                            className="w-full h-40 object-cover rounded-lg mb-3"
                        />

                        <h3 className="font-bold text-lg">{p.name}</h3>
                        <p className="text-gray-600">{p.description}</p>

                        <div className="mt-3 flex justify-between items-center">
                            <span className="font-semibold text-[#6B8E23]">
                                ₹{p.price}
                            </span>
                            <span className="text-sm">
                                Stock: {p.stock}
                            </span>
                        </div>
                        <div className="mt-4 flex gap-3">
                            <button
                                onClick={() => handleDelete(p._id)}
                                className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition"
                            >
                                Delete
                            </button>

                            <button
                                onClick={() => startEdit(p)}
                                className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600 transition"
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}
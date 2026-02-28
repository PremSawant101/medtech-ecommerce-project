"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function ProductsPage() {

    const { data: session } = useSession();

    const [products, setProducts] = useState([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [stock, setStock] = useState("");
    const [editId, setEditId] = useState(null);
    const [message, setMessage] = useState("");

    // Load Products
    const loadProducts = async () => {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
    };

    useEffect(() => {
        loadProducts();
    }, []);

    // Add Product
    const addProduct = async () => {
        const res = await fetch("/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: session?.user?.email,
                name,
                category,
                description,
                price: Number(price),
                stock: Number(stock),
                prescriptionRequired: false,
                image,
            }),
        });

        const data = await res.json();
        setMessage(data.message);
        resetForm();
        loadProducts();
    };

    // Delete Product
    const handleDelete = async (id) => {
        if (!confirm("Are you sure?")) return;

        await fetch(`/api/products/${id}`, {
            method: "DELETE",
        });

        loadProducts();
    };

    // Start Edit
    const startEdit = (product) => {
        setEditId(product._id);
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setCategory(product.category);
        setDescription(product.description);
        setStock(product.stock);
    };

    // Update Product
    const updateProduct = async () => {
        await fetch(`/api/products/${editId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name,
                description,
                price: Number(price),
                image,
                category,
                stock: Number(stock),
            }),
        });

        setMessage("Product updated successfully");
        resetForm();
        loadProducts();
    };

    const resetForm = () => {
        setEditId(null);
        setName("");
        setPrice("");
        setImage("");
        setCategory("");
        setDescription("");
        setStock("");
    };

    return (
        <div className="min-h-screen bg-[#100C08] text-[#FFFAF0] p-10">

            <h1 className="text-3xl font-bold text-[#6B8E23] mb-8">
                Product Management
            </h1>

            {/* FORM */}
            <div className="bg-[#FFFAF0] text-black rounded-2xl shadow-xl p-6 max-w-xl mb-10">

                <h2 className="text-xl font-semibold mb-4 text-[#6B8E23]">
                    {editId ? "Edit Product" : "Add Product"}
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

                <input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    placeholder="Stock Quantity"
                    className="w-full border p-3 rounded-lg mb-3"
                />

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border p-3 rounded-lg mb-3"
                >
                    <option value="">Select Category</option>
                    <option value="Hair Oil">Hair Oil</option>
                    <option value="Hair Tablet">Hair Tablet</option>
                    <option value="Hair Lepa">Hair Lepa</option>
                </select>

                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    className="w-full border p-3 rounded-lg mb-4"
                />

                <button
                    onClick={editId ? updateProduct : addProduct}
                    className="bg-[#6B8E23] text-white px-6 py-2 rounded-lg"
                >
                    {editId ? "Update Product" : "Add Product"}
                </button>

                {editId && (
                    <button
                        onClick={resetForm}
                        className="ml-3 bg-gray-500 text-white px-6 py-2 rounded-lg"
                    >
                        Cancel
                    </button>
                )}

                {message && (
                    <p className="mt-3 text-green-600">{message}</p>
                )}
            </div>

            {/* PRODUCT LIST */}
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

                        <div className="mt-3 flex justify-between">
                            <span className="text-[#6B8E23] font-semibold">
                                ₹{p.price}
                            </span>
                            <span className={`font-semibold ${p.stock === 0 ? "text-red-600" : ""}`}>
                                Stock: {p.stock}
                            </span>
                        </div>

                        <div className="mt-4 flex gap-3">
                            <button
                                onClick={() => handleDelete(p._id)}
                                className="bg-red-500 text-white px-3 py-1 rounded-md"
                            >
                                Delete
                            </button>

                            <button
                                onClick={() => startEdit(p)}
                                className="bg-blue-500 text-white px-3 py-1 rounded-md"
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
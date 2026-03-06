"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function ProductsPage() {
    const { data: session } = useSession();

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [filterCategory, setFilterCategory] = useState("all");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [stock, setStock] = useState("");
    const [editId, setEditId] = useState(null);
    const [message, setMessage] = useState("");
    const [discount, setDiscount] = useState("");

    const loadProducts = async () => {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const resetForm = () => {
        setEditId(null);
        setName("");
        setPrice("");
        setImage("");
        setCategory("");
        setDescription("");
        setStock("");
        setDiscount("");
    };

    const addProduct = async () => {
        await fetch("/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: session?.user?.email,
                name,
                category,
                description,
                price: Number(price),
                stock: Number(stock),
                discount: Number(discount) || 0,
                prescriptionRequired: false,
                image,
            }),
        });

        setMessage("Product added successfully");
        resetForm();
        loadProducts();
    };

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
                discount: Number(discount) || 0,
            }),
        });

        setMessage("Product updated successfully");
        resetForm();
        loadProducts();
    };

    const handleDelete = async (id) => {
        if (!confirm("Delete this product?")) return;
        await fetch(`/api/products/${id}`, { method: "DELETE" });
        loadProducts();
    };
    const startEdit = (product) => {
        setEditId(product._id);
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setCategory(product.category);
        setDescription(product.description);
        setStock(product.stock);
        setDiscount(product.discount || 0);
    };
    // ===== Filtering Logic =====

    const filteredProducts = products
        .filter((p) =>
            p.name.toLowerCase().includes(search.toLowerCase())
        )
        .filter((p) =>
            filterCategory === "all"
                ? true
                : p.category === filterCategory
        );

    return (
        <div className="min-h-screen bg-[#0F0F0F] text-white">

            <h1 className="text-4xl font-bold text-[#6B8E23] mb-10">
                Inventory Management
            </h1>

            <div className="grid lg:grid-cols-3 gap-5">

                {/* ===== LEFT FORM ===== */}
                <div className="bg-[#1A1A1A] p-8 rounded-2xl shadow-xl">
                    <h2 className="text-2xl font-semibold mb-6 text-[#6B8E23]">
                        {editId ? "Edit Product" : "Add Product"}
                    </h2>

                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Product Name"
                        className="w-full mb-4 p-3 rounded-lg bg-[#111] border border-[#222]"
                    />

                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Price"
                        className="w-full mb-4 p-3 rounded-lg bg-[#111] border border-[#222]"
                    />

                    <input
                        type="number"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        placeholder="Stock"
                        className="w-full mb-4 p-3 rounded-lg bg-[#111] border border-[#222]"
                    />
                    <input
                        type="number"
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        placeholder="Discount (%)"
                        className="w-full mb-4 p-3 rounded-lg bg-[#111] border border-[#222]"
                    />
                    <input
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        placeholder="Image URL"
                        className="w-full mb-4 p-3 rounded-lg bg-[#111] border border-[#222]"
                    />

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full mb-4 p-3 rounded-lg bg-[#111] border border-[#222]"
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
                        className="w-full mb-6 p-3 rounded-lg bg-[#111] border border-[#222]"
                    />

                    <div className="flex gap-3">
                        <button
                            onClick={editId ? updateProduct : addProduct}
                            className="bg-[#6B8E23] px-6 py-3 rounded-lg font-semibold"
                        >
                            {editId ? "Update" : "Add Product"}
                        </button>

                        {editId && (
                            <button
                                onClick={resetForm}
                                className="bg-gray-600 px-6 py-3 rounded-lg"
                            >
                                Cancel
                            </button>
                        )}
                    </div>

                    {message && (
                        <p className="mt-4 text-green-500">{message}</p>
                    )}
                </div>

                {/* ===== RIGHT PRODUCT LIST ===== */}
                <div className="lg:col-span-2 flex flex-col h-[75vh]">

                    {/* Search + Filter */}
                    <div className="flex gap-4 mb-6">
                        <input
                            placeholder="Search product..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="flex-1 p-3 rounded-lg bg-[#1A1A1A] border border-[#222]"
                        />

                        <select
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            className="p-3 rounded-lg bg-[#1A1A1A] border border-[#222]"
                        >
                            <option value="all">All</option>
                            <option value="Hair Oil">Hair Oil</option>
                            <option value="Hair Tablet">Hair Tablet</option>
                            <option value="Hair Lepa">Hair Lepa</option>
                        </select>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 overflow-y-auto pr-2 flex-1">
                        {filteredProducts.map((p) => {
                            console.log(p);
                            return (
                                <div
                                    key={p._id}
                                    className="relative bg-[#1A1A1A] p-5 rounded-2xl shadow-lg hover:scale-[1.02] transition"
                                >
                                    {p.discount > 0 && (
                                        <div className="absolute top-3 left-3 bg-[#6B8E23] text-white text-xs px-2 py-1 rounded-full">
                                            -{p.discount}%
                                        </div>
                                    )}
                                    <img
                                        src={p.image}
                                        alt={p.name}
                                        className="w-full h-40 object-cover rounded-lg mb-4"
                                    />

                                    <h3 className="text-lg font-bold mb-2">{p.name}</h3>

                                    <div className="flex justify-between items-center mb-3">
                                        <div className="flex flex-col">
                                            {p.discount > 0 ? (
                                                <>
                                                    <span className="text-gray-400 line-through text-sm">
                                                        ₹{p.price}
                                                    </span>
                                                    <span className="text-[#6B8E23] font-bold">
                                                        ₹{Math.round(p.price - (p.price * Number(p.discount)) / 100)}
                                                    </span>
                                                </>
                                            ) : (
                                                <span className="text-[#6B8E23] font-bold">
                                                    ₹{p.price}
                                                </span>
                                            )}
                                        </div>

                                        <StockBadge stock={p.stock} />
                                    </div>

                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => startEdit(p)}
                                            className="bg-blue-600 px-4 py-2 rounded-md text-sm"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => handleDelete(p._id)}
                                            className="bg-red-600 px-4 py-2 rounded-md text-sm"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                </div>

            </div>
        </div>
    );
}


// ===== Stock Badge =====
function StockBadge({ stock }) {
    if (stock === 0) {
        return (
            <span className="bg-red-600 text-xs px-3 py-1 rounded-full">
                Out of Stock
            </span>
        );
    }

    if (stock < 5) {
        return (
            <span className="bg-yellow-500 text-xs px-3 py-1 rounded-full">
                Low Stock
            </span>
        );
    }

    return (
        <span className="bg-green-600 text-xs px-3 py-1 rounded-full">
            In Stock
        </span>
    );
}
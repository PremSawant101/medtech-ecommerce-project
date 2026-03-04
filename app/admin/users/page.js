"use client";

import { useEffect, useState } from "react";

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 6;

    const loadUsers = async () => {
        const res = await fetch("/api/users");
        const data = await res.json();
        setUsers(data);
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const filteredUsers = users.filter(
        (u) =>
            u.name?.toLowerCase().includes(search.toLowerCase()) ||
            u.email?.toLowerCase().includes(search.toLowerCase())
    );

    const indexOfLast = currentPage * usersPerPage;
    const indexOfFirst = indexOfLast - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    return (
        <div className="min-h-screen bg-[#0F0F0F] text-white p-5 flex flex-col">

            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-[#6B8E23]">
                    Registered Users
                </h1>

                <div className="bg-[#6B8E23] text-black px-5 py-2 rounded-xl font-semibold shadow-md">
                    Total: {users.length}
                </div>
            </div>

            <div className="mb-6">
                <input
                    placeholder="Search users..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="w-full md:w-1/3 px-4 py-3 rounded-lg bg-[#1A1A1A] border border-[#222] focus:outline-none focus:border-[#6B8E23] transition"
                />
            </div>

            <div className="flex-1">
                <div className="bg-[#141414] rounded-2xl overflow-hidden border border-[#2A2A2A] shadow-lg">

                    <div className="grid grid-cols-4 px-8 py-5 text-[#EFE9DD] bg-[#6B8E23] text-sm font-semibold tracking-wide">
                        <span>#</span>
                        <span>Name</span>
                        <span>Email</span>
                        <span className="text-center">Joined</span>
                    </div>

                    <div className="bg-[#EFE9DD] text-black">
                        {currentUsers.length === 0 ? (
                            <div className="p-10 text-center text-gray-500">
                                No users found.
                            </div>
                        ) : (
                            currentUsers.map((user, index) => (
                                <div
                                    key={user._id}
                                    className="grid grid-cols-4 px-8 py-5 items-center border-t border-[#E3DAC9] hover:bg-[#e9e2d3] transition duration-200"
                                >
                                    <span className="text-gray-600 font-medium">
                                        {indexOfFirst + index + 1}
                                    </span>

                                    <span className="font-semibold">
                                        {user.name}
                                    </span>

                                    <span className="text-gray-600 break-words">
                                        {user.email}
                                    </span>

                                    <span className="text-gray-500 text-sm text-center">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-3 mt-8 pt-6 border-t border-[#222]">

                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => prev - 1)}
                        className={`px-4 py-2 rounded-lg text-sm transition ${currentPage === 1
                            ? "bg-[#1A1A1A] text-gray-600 cursor-not-allowed"
                            : "bg-[#1C1C1C] hover:bg-[#6B8E23] hover:text-black"
                            }`}
                    >
                        Prev
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${currentPage === i + 1
                                ? "bg-[#6B8E23] text-black"
                                : "bg-[#1C1C1C] hover:bg-[#2A2A2A]"
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        className={`px-4 py-2 rounded-lg text-sm transition ${currentPage === totalPages
                            ? "bg-[#1A1A1A] text-gray-600 cursor-not-allowed"
                            : "bg-[#1C1C1C] hover:bg-[#6B8E23] hover:text-black"
                            }`}
                    >
                        Next
                    </button>

                </div>
            )}
        </div>
    );
}
"use client";

import { useEffect, useState } from "react";

export default function UsersPage() {
    const [users, setUsers] = useState([]);

    const loadUsers = async () => {
        const res = await fetch("/api/users");
        const data = await res.json();
        setUsers(data);
    };

    useEffect(() => {
        loadUsers();
    }, []);

    return (
        <div className="min-h-screen bg-[#100C08] text-[#FFFAF0] p-10">

            <div className="flex items-center justify-between mb-10">
                <div>
                    <h1 className="text-3xl font-bold text-[#6B8E23] tracking-wide">
                        Registered Users
                    </h1>
                </div>

                <div className="bg-gradient-to-r from-[#6B8E23] to-[#556B2F] text-white px-5 py-2 rounded-full text-sm font-semibold shadow-lg">
                    Total Users: {users.length}
                </div>
            </div>

            <div className="bg-[#FFFAF0] rounded-3xl shadow-2xl overflow-hidden">

                <div className="grid grid-cols-3 bg-[#6B8E23] text-white px-8 py-5 font-semibold text-sm uppercase tracking-wider">
                    <span>#</span>
                    <span>Name</span>
                    <span>Email</span>
                </div>

                {users.length === 0 ? (
                    <div className="p-10 text-center text-gray-500">
                        No registered users found.
                    </div>
                ) : (
                    users.map((user, index) => (
                        <div
                            key={user._id}
                            className="grid grid-cols-3 px-8 py-5 items-center border-b last:border-none hover:bg-gray-50 transition duration-200"
                        >
                            <span className="text-gray-500 font-medium">
                                {index + 1}
                            </span>

                            <span className="font-semibold text-[#100C08]">
                                {user.name}
                            </span>

                            <span className="text-gray-600 break-words">
                                {user.email}
                            </span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
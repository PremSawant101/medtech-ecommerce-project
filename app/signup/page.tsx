"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignup = async () => {
        if (!name || !email || !password) {
            setMessage("Please fill all fields");
            return;
        }

        setLoading(true);

        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();
        setLoading(false);

        if (res.ok) {
            setMessage("Signup successful 🎉 Redirecting...");
            setTimeout(() => {
                router.push("/login");
            }, 1500);
        } else {
            setMessage(data.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#100C08]">
            <div className="bg-white p-8 rounded-xl w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Create Account
                </h2>

                <input
                    placeholder="Full Name"
                    className="w-full border p-2 mb-4"
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    placeholder="Email"
                    className="w-full border p-2 mb-4"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border p-2 mb-4"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleSignup}
                    disabled={loading}
                    className="w-full bg-[#6B8E23] text-white py-2 rounded"
                >
                    {loading ? "Creating..." : "Sign Up"}
                </button>

                {message && (
                    <p className="mt-4 text-center text-green-600">
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}
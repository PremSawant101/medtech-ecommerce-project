"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lexend } from "next/font/google";
import { FaFacebook, FaTwitter, FaGoogle } from "react-icons/fa";

const lexend = Lexend({
    subsets: ["latin"],
});

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
        <main
            className={`relative min-h-screen flex items-center justify-center ${lexend.className}`}
        >
            {/* Background */}
            <div className="absolute inset-0 -z-10">
                <Image
                    src="/images/amlaBg.png"
                    alt="Amla Background"
                    fill
                    className="object-cover"
                />
                <div className="absolute bg-white/40 inset-0 backdrop-blur-sm"></div>
            </div>

            <div className="w-120 bg-[#F5F3EE] rounded-[40px] shadow-xl px-10 py-14">
                <h1 className="text-4xl font-bold text-center mb-10 text-black">
                    Create Account
                </h1>

                <div className="mb-6">
                    <label className="block mb-2 text-lg font-medium text-black">
                        Full Name
                    </label>
                    <input
                        type="text"
                        placeholder="Type your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full text-black px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#9A6B4C]"
                    />
                </div>

                <div className="mb-6">
                    <label className="block mb-2 text-lg font-medium text-black">
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder="Type your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full text-black  px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#9A6B4C]"
                    />
                </div>

                <div className="mb-8">
                    <label className="block mb-2 text-lg font-medium text-black">
                        Password
                    </label>
                    <input
                        type="password"
                        placeholder="Type your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full text-black px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#9A6B4C]"
                    />
                </div>

                <button
                    onClick={handleSignup}
                    disabled={loading}
                    className="w-full bg-[#9A6B4C] text-white py-4 rounded-full text-xl font-semibold hover:scale-105 transition"
                >
                    {loading ? "Creating..." : "Sign Up"}
                </button>

                {message && (
                    <p className="mt-4 text-center text-green-600">{message}</p>
                )}

                <div className="text-center mt-6 text-gray-700">
                    or Sign Up using
                </div>

                <div className="flex justify-center gap-6 mt-4">
                    <FaFacebook className="h-10 w-10 cursor-pointer hover:scale-110 transition text-blue-600" />
                    <FaTwitter className="h-10 w-10 cursor-pointer hover:scale-110 transition text-blue-400" />
                    <FaGoogle
                        onClick={() =>
                            router.push("/login")
                        }
                        className="h-10 w-10 cursor-pointer hover:scale-110 transition text-red-500"
                    />
                </div>

                <div
                    onClick={() => router.push("/login")}
                    className="text-center mt-8 text-black font-medium underline cursor-pointer hover:opacity-70"
                >
                    Already have an account? LOGIN
                </div>
            </div>
        </main>
    );
}
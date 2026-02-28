"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import { Lexend } from "next/font/google";

import { FaFacebook, FaTwitter, FaGoogle } from "react-icons/fa";


const lexend = Lexend({
  subsets: ["latin"],
});

export default function LoginPage() {
  const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
  return (
    <main
      className={`relative min-h-screen flex items-center justify-center ${lexend.className}`}
    >
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/amlaBg.png"
          alt="Amla Background"
          fill
          className="object-cover "
        />
        {/* Soft Overlay */}
        <div className="absolute bg-white/40 inset-0 backdrop-blur-sm"></div>
      </div>

      {/* Login Card */}
      <div className="w-120 bg-[#F5F3EE] rounded-[40px] shadow-xl px-10 py-14">
        <h1 className="text-4xl font-bold text-center mb-10 text-black">
          Login
        </h1>

        {/* Username */}
        <div className="mb-8">
          <label className="block mb-2 text-lg font-medium text-black">
            Username
          </label>
         <input
  type="text"
  placeholder="Type your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="..."
/>
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block mb-2 text-lg font-medium text-black">
            Password
          </label>
          <input
  type="password"
  placeholder="Type your password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  className="..."
/>
        </div>

        <div className="text-right text-sm text-gray-600 mb-8 cursor-pointer hover:underline">
          Forgot password?
        </div>

        {/* Login Button */}
        <button
  onClick={async () => {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      alert("Invalid credentials");
    } else {
      window.location.href = "/";
    }
  }}
  className="w-full bg-[#9A6B4C] text-white py-4 rounded-full text-xl font-semibold"
>
  Login
</button>

        {/* Social Login */}
        <div className="text-center mt-6 text-gray-700">
          or Sign Up using
        </div>

        <div className="flex justify-center gap-6 mt-4">
          <div>
            <FaFacebook className="h-10 w-10 cursor-pointer hover:scale-110 transition text-blue-600" />
          </div>
          <div>
            <FaTwitter className="h-10 w-10 cursor-pointer hover:scale-110 transition text-blue-400" />
          </div>
          <div>
            <FaGoogle className="h-10 w-10 cursor-pointer hover:scale-110 transition text-red-500" />
          </div>
        </div>

        <div className="text-center mt-8 text-black font-medium underline cursor-pointer hover:opacity-70">
          SIGN UP
        </div>
      </div>
    </main>
  );
}
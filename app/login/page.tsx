"use client";

import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import { Lexend } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaFacebook, FaTwitter, FaGoogle } from "react-icons/fa";


const lexend = Lexend({
  subsets: ["latin"],
});

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      if (session?.user?.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    }
  }, [status, session, router]);
  return (
    <main
      className={`relative min-h-screen flex items-center justify-center ${lexend.className}`}
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/amlaBg.png"
          alt="Amla Background"
          fill
          className="object-cover "
        />
        <div className="absolute bg-white/40 inset-0 backdrop-blur-sm"></div>
      </div>

      <div className="w-120 bg-[#F5F3EE] rounded-[40px] shadow-xl px-10 py-14">
        <h1 className="text-4xl font-bold text-center mb-10 text-black">
          Login
        </h1>

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

        <button
          onClick={async () => {
            const result = await signIn("credentials", {
              email,
              password,
              redirect: false,
            });
            console.log("clickeed")
            if (result?.error) {
              alert("Invalid credentials");
            }
          }}
          className="w-full bg-[#9A6B4C] text-white py-4 rounded-full text-xl font-semibold"
        >
          Login
        </button>

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
            <FaGoogle
              onClick={() =>
                signIn("google", {
                  callbackUrl: "/",
                })
              }
              className="h-10 w-10 cursor-pointer hover:scale-110 transition text-red-500"
            />
          </div>
        </div>

        <div onClick={() => router.push("/signup")} className="text-center mt-8 text-black font-medium underline cursor-pointer hover:opacity-70">
          SIGN UP
        </div>
      </div>
    </main>
  );
}
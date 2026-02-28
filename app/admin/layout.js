"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function AdminLayout({ children }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "loading") return;

        if (!session || session.user.role !== "admin") {
            router.push("/");
        }
    }, [session, status]);

    if (!session || session.user.role !== "admin") {
        return null;
    }

    return (
        <div className="min-h-screen flex bg-[#0F0F0F] text-[#FFFAF0]">

            <aside className="w-64 bg-[#111111] border-r border-[#6B8E23] p-6 flex flex-col justify-between">

                <div>
                    <h2 className="text-2xl font-bold text-[#6B8E23] mb-10">
                        MedTech Admin
                    </h2>
                    <div className="mb-6 p-3 rounded-lg bg-[#1A1A1A] border border-[#6B8E23]/40 shadow-sm">
                        <p className="text-xs uppercase tracking-wider text-[#6B8E23] mb-1">
                            Logged in as
                        </p>

                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-[#6B8E23] text-black flex items-center justify-center text-sm font-bold">
                                {session?.user?.name?.charAt(0).toUpperCase()}
                            </div>

                            <span className="text-sm font-semibold text-[#FFFAF0]">
                                {session?.user?.name}
                            </span>
                        </div>
                    </div>
                    <nav className="flex flex-col gap-4 text-[#E3DAC9]">
                        <Link href="/admin" className="hover:text-[#6B8E23] transition">
                            Dashboard
                        </Link>

                        <Link href="/admin/products" className="hover:text-[#6B8E23] transition">
                            Products
                        </Link>

                        <Link href="/admin/orders" className="hover:text-[#6B8E23] transition">
                            Orders
                        </Link>

                        <Link href="/admin/coupons" className="hover:text-[#6B8E23] transition">
                            Coupons
                        </Link>
                        <Link href="/admin/users" className="hover:text-[#6B8E23] transition">
                            Users
                        </Link>
                    </nav>
                </div>

                <div className="flex flex-col gap-4 mt-10 border-t border-[#6B8E23]/30 pt-6">

                    <Link
                        href="/"
                        className="bg-[#6B8E23] text-black py-2 px-4 rounded-md text-center font-semibold hover:opacity-80 transition"
                    >
                        Go to Website
                    </Link>

                    <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="border border-[#6B8E23] text-[#6B8E23] py-2 px-4 rounded-md hover:bg-[#6B8E23] hover:text-black transition"
                    >
                        Logout
                    </button>

                </div>
            </aside>

            <main className="flex-1 p-10">
                {children}
            </main>

        </div>
    );
}
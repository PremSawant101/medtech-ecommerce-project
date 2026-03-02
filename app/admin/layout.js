"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function AdminLayout({ children }) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (status === "loading") return;
        if (!session || session.user.role !== "admin") {
            router.push("/");
        }
    }, [session, status]);

    if (!session || session.user.role !== "admin") {
        return null;
    }

    const navItems = [
        { name: "Dashboard", href: "/admin" },
        { name: "Products", href: "/admin/products" },
        { name: "Orders", href: "/admin/orders" },
        { name: "Coupons", href: "/admin/coupons" },
        { name: "Users", href: "/admin/users" },
    ];

    return (
        <div className="h-screen flex bg-[#0B0F0E] text-[#F5F5F5] overflow-hidden">

            <aside className="w-72 h-full bg-[#111815] border-r border-[#1E2A24] p-8 flex flex-col justify-between">
                <div>
                    <h2 className="text-3xl font-extrabold tracking-wide text-[#6B8E23] mb-12">
                        MED<span className="text-white">TECH</span>
                    </h2>

                    <div className="mb-10 p-4 rounded-xl bg-[#151E1A] border border-[#24352C]">
                        <p className="text-xs text-gray-400 mb-2">Logged in as</p>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#6B8E23] text-black flex items-center justify-center font-bold">
                                {session.user.name?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <p className="font-semibold">{session.user.name}</p>
                                <p className="text-xs text-gray-400">Administrator</p>
                            </div>
                        </div>
                    </div>

                    <nav className="flex flex-col gap-3">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`px-4 py-3 rounded-lg transition-all duration-200 ${pathname === item.href
                                    ? "bg-[#6B8E23] text-black font-semibold"
                                    : "hover:bg-[#1A2620] text-gray-300"
                                    }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="space-y-4 pt-8 border-t border-[#1E2A24]">
                    <Link
                        href="/"
                        className="block text-center bg-[#6B8E23] text-black py-3 rounded-lg font-semibold hover:opacity-80 transition"
                    >
                        Go to Website
                    </Link>

                    <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="w-full border border-[#6B8E23] py-3 rounded-lg text-[#6B8E23] hover:bg-[#6B8E23] hover:text-black transition"
                    >
                        Logout
                    </button>
                </div>
            </aside>

            <div className="flex-1 flex flex-col">

                <header className="h-20 border-b border-[#1E2A24] flex items-center justify-between px-10 bg-[#0F1412]">
                    <h1 className="text-xl font-semibold tracking-wide">
                        Admin Dashboard
                    </h1>
                    <div className="text-sm text-gray-400">
                        Welcome back,{" "}
                        <span className="text-[#6B8E23] font-medium">
                            {session.user.name}
                        </span>
                    </div>
                </header>

                <main className="flex-1 p-5 overflow-y-auto">
                    {children}
                </main>

            </div>
        </div>
    );
}
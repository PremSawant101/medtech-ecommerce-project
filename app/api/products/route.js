import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();

        const products = await Product.find();

        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.json(
            { message: "Server error" },
            { status: 500 }
        );
    }
}

export async function POST(req) {
    try {
        await connectDB();

        const {
            email,
            name,
            category,
            description,
            price,
            stock,
            prescriptionRequired,
            image,
        } = await req.json();

        const user = await User.findOne({ email });

        if (!user || user.role !== "admin") {
            return NextResponse.json(
                { message: "Unauthorized. Admin only." },
                { status: 403 }
            );
        }

        const product = await Product.create({
            name,
            category,
            description,
            price,
            stock,
            prescriptionRequired,
            image,
        });

        return NextResponse.json({
            message: "Product created successfully",
            product,
        });

    } catch (error) {
        return NextResponse.json(
            { message: "Server error" },
            { status: 500 }
        );
    }
}
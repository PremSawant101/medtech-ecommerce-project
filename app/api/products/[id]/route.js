import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

import mongoose from "mongoose";

export async function GET(req, context) {
    try {
        await connectDB();

        const params = await context.params;
        const id = params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return Response.json(
                { message: "Invalid ID format" },
                { status: 400 }
            );
        }

        const product = await Product.findById(id);

        if (!product) {
            return Response.json(
                { message: "Product not found" },
                { status: 404 }
            );
        }

        return Response.json(product);
    } catch (error) {
        console.log(error);
        return Response.json(
            { message: error.message },
            { status: 500 }
        );
    }
}
export async function PUT(req, context) {
    try {
        await connectDB();

        const { id } = await context.params;

        const body = await req.json();

        console.log("Incoming stock:", body.stock);

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            {
                name: body.name,
                description: body.description,
                price: Number(body.price),
                image: body.image,
                category: body.category,
                stock: Number(body.stock), // 🔥 THIS LINE IS IMPORTANT
            },
            { new: true }
        );

        return Response.json({
            message: "Product updated successfully",
            product: updatedProduct,
        });

    } catch (error) {
        console.log(error);
        return Response.json(
            { message: "Server error" },
            { status: 500 }
        );
    }
}

export async function DELETE(req, context) {
    try {
        await connectDB();

        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== "admin") {
            return Response.json(
                { message: "Unauthorized" },
                { status: 403 }
            );
        }

        const params = await context.params;
        const id = params.id;

        await Product.findByIdAndDelete(id);

        return Response.json({
            message: "Product deleted successfully",
        });
    } catch (error) {
        console.log("DELETE ERROR:", error);
        return Response.json(
            { message: error.message },
            { status: 500 }
        );
    }
}
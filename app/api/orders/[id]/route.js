import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";
import User from "@/models/User";

export async function PUT(req, context) {
    await connectDB();

    const { id } = await context.params;

    const { email, status } = await req.json();

    const user = await User.findOne({ email });

    if (!user || user.role !== "admin") {
        return Response.json(
            { message: "Unauthorized. Admin only." },
            { status: 403 }
        );
    }

    const updatedOrder = await Order.findByIdAndUpdate(
        id,
        { status },
        { returnDocument: "after" }
    );

    if (!updatedOrder) {
        return Response.json(
            { message: "Order not found" },
            { status: 404 }
        );
    }

    return Response.json({
        message: "Order status updated successfully",
        order: updatedOrder,
    });
}
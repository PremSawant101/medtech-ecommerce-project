import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";

export async function PUT(req, context) {
    await connectDB();

    const { id } = await context.params;

    const { prescriptionFile } = await req.json();

    const order = await Order.findById(id);

    if (!order) {
        return Response.json(
            { message: "Order not found" },
            { status: 404 }
        );
    }

    if (order.status !== "waiting_for_prescription") {
        return Response.json(
            { message: "Prescription not required for this order" },
            { status: 400 }
        );
    }

    order.prescriptionUploaded = true;
    order.prescriptionFile = prescriptionFile;
    order.status = "pending";

    await order.save();

    return Response.json({
        message: "Prescription uploaded successfully",
        order,
    });
}
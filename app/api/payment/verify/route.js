import connectDB from "@/lib/mongodb";
import Payment from "@/models/Payment";
import Order from "@/models/Order";

export async function POST(req) {
    await connectDB();

    const { paymentId, status } = await req.json();

    const payment = await Payment.findById(paymentId);

    if (!payment) {
        return Response.json(
            { message: "Payment not found" },
            { status: 404 }
        );
    }

    payment.status = status;
    await payment.save();

    if (status === "success") {
        await Order.findByIdAndUpdate(payment.orderId, {
            status: "paid",
        });
    }

    return Response.json({
        message: "Payment status updated",
    });
}
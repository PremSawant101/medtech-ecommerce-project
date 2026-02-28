import connectDB from "@/lib/mongodb";
import Payment from "@/models/Payment";

export async function POST(req) {
    await connectDB();

    const { orderId, userEmail, amount } = await req.json();

    const payment = await Payment.create({
        orderId,
        userEmail,
        amount,
        status: "pending",
    });

    return Response.json({
        message: "Payment order created",
        payment,
    });
}
import Razorpay from "razorpay";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json();
        const { amount, orderId } = body;

        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt: `receipt_${orderId}`,
        };

        const order = await razorpay.orders.create(options);

        return NextResponse.json({
            success: true,
            razorpayOrder: order,
        });

    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}
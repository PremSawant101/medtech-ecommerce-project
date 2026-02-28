import connectDB from "@/lib/mongodb";
import Payment from "@/models/Payment";
import Order from "@/models/Order";
import Product from "@/models/Product";

export async function POST(req) {
    try {
        await connectDB();

        const { paymentId, status } = await req.json();

        const payment = await Payment.findById(paymentId);

        if (!payment) {
            return Response.json(
                { message: "Payment not found" },
                { status: 404 }
            );
        }

        if (payment.status === "success") {
            return Response.json({
                message: "Payment already processed",
            });
        }

        payment.status = status;
        await payment.save();

        if (status === "success") {

            const order = await Order.findById(payment.orderId);

            if (!order) {
                return Response.json(
                    { message: "Order not found" },
                    { status: 404 }
                );
            }
            if (order.status === "paid") {
                return Response.json({
                    message: "Order already paid",
                });
            }

            for (let item of order.products) {

                const product = await Product.findById(item.productId);

                if (!product) continue;

                if (product.stock < item.quantity) {
                    return Response.json(
                        { message: `Not enough stock for ${product.name}` },
                        { status: 400 }
                    );
                }

                product.stock -= item.quantity;
                await product.save();
            }

            order.status = "paid";
            await order.save();
        }

        return Response.json({
            message: "Payment status updated successfully",
        });

    } catch (error) {
        console.log(error);
        return Response.json(
            { message: "Server error" },
            { status: 500 }
        );
    }
}
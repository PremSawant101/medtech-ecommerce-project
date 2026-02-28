import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";
import Product from "@/models/Product";
import Coupon from "@/models/Coupon";

export async function POST(req) {
    await connectDB();

    const { userEmail, products, couponCode } = await req.json();

    let totalAmount = 0;
    let requiresPrescription = false;

    for (let item of products) {
        const product = await Product.findById(item.productId);

        if (!product) {
            return Response.json(
                { message: "Product not found" },
                { status: 404 }
            );
        }

        totalAmount += product.price * item.quantity;

        if (product.prescriptionRequired) {
            requiresPrescription = true;
        }
    }

    if (couponCode) {
        const coupon = await Coupon.findOne({ code: couponCode });

        if (!coupon) {
            return Response.json(
                { message: "Invalid coupon code" },
                { status: 400 }
            );
        }

        if (new Date(coupon.expiryDate) < new Date()) {
            return Response.json(
                { message: "Coupon expired" },
                { status: 400 }
            );
        }

        const discountAmount =
            (totalAmount * coupon.discountPercent) / 100;

        totalAmount = totalAmount - discountAmount;
    }

    const order = await Order.create({
        userEmail,
        products,
        totalAmount,
        status: requiresPrescription
            ? "waiting_for_prescription"
            : "pending",
    });

    return Response.json({
        message: "Order placed successfully",
        order,
    });
}

export async function GET() {
    await connectDB();
    const orders = await Order.find();
    return Response.json(orders);
}
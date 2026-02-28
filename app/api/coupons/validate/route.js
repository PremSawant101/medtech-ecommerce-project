import connectDB from "@/lib/mongodb";
import Coupon from "@/models/Coupon";

export async function POST(req) {
    try {
        await connectDB();

        const { code, subtotal } = await req.json();

        const coupon = await Coupon.findOne({ code });

        if (!coupon) {
            return Response.json({
                valid: false,
                message: "Invalid Coupon Code",
            });
        }

        // Expiry check
        const now = new Date();
        if (new Date(coupon.expiryDate) < now) {
            return Response.json({
                valid: false,
                message: "Coupon Expired",
            });
        }

        const discount =
            subtotal * (coupon.discountPercent / 100);

        return Response.json({
            valid: true,
            discount,
            message: `${coupon.discountPercent}% Discount Applied`,
        });

    } catch (error) {
        return Response.json({
            valid: false,
            message: "Server Error",
        });
    }
}
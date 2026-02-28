import connectDB from "@/lib/mongodb";
import Coupon from "@/models/Coupon";
import User from "@/models/User";

export async function PUT(req, { params }) {
    await connectDB();

    const { email, discountPercent, expiryDate } = await req.json();

    const user = await User.findOne({ email });

    if (!user || user.role !== "admin") {
        return Response.json(
            { message: "Unauthorized" },
            { status: 403 }
        );
    }

    const updatedCoupon = await Coupon.findByIdAndUpdate(
        params.id,
        { discountPercent, expiryDate },
        { new: true }
    );

    return Response.json({
        message: "Coupon updated successfully",
        coupon: updatedCoupon,
    });
}

export async function DELETE(req, { params }) {
    await connectDB();

    const { email } = await req.json();

    const user = await User.findOne({ email });

    if (!user || user.role !== "admin") {
        return Response.json(
            { message: "Unauthorized" },
            { status: 403 }
        );
    }

    await Coupon.findByIdAndDelete(params.id);

    return Response.json({
        message: "Coupon deleted successfully",
    });
}
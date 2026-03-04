import connectDB from "@/lib/mongodb";
import Coupon from "@/models/Coupon";
import User from "@/models/User";


// ===== UPDATE COUPON =====
export async function PUT(req, context) {

    await connectDB();

    const { id } = await context.params;   // ✅ FIXED
    const { email, discountPercent, expiryDate } = await req.json();

    const user = await User.findOne({ email });

    if (!user || user.role !== "admin") {
        return Response.json(
            { message: "Unauthorized" },
            { status: 403 }
        );
    }

    const updatedCoupon = await Coupon.findByIdAndUpdate(
        id,
        { discountPercent, expiryDate },
        { returnDocument: "after" }   // ✅ Updated mongoose option
    );

    if (!updatedCoupon) {
        return Response.json(
            { message: "Coupon not found" },
            { status: 404 }
        );
    }

    return Response.json({
        message: "Coupon updated successfully",
        coupon: updatedCoupon,
    });
}


// ===== DELETE COUPON =====
export async function DELETE(req, context) {

    await connectDB();

    const { id } = await context.params;   // ✅ FIXED
    const { email } = await req.json();

    const user = await User.findOne({ email });

    if (!user || user.role !== "admin") {
        return Response.json(
            { message: "Unauthorized" },
            { status: 403 }
        );
    }

    const deletedCoupon = await Coupon.findByIdAndDelete(id);

    if (!deletedCoupon) {
        return Response.json(
            { message: "Coupon not found" },
            { status: 404 }
        );
    }

    return Response.json({
        message: "Coupon deleted successfully",
    });
}
import mongoose from "mongoose";

const CouponSchema = new mongoose.Schema(
    {
        code: {
            type: String,
            unique: true,
        },
        discountPercent: Number,
        expiryDate: Date,
    },
    { timestamps: true }
);

export default mongoose.models.Coupon ||
    mongoose.model("Coupon", CouponSchema);
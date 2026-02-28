import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
    {
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
        },
        userEmail: String,
        amount: Number,
        paymentId: String,
        status: {
            type: String,
            default: "pending",
        },
    },
    { timestamps: true }
);

export default mongoose.models.Payment ||
    mongoose.model("Payment", paymentSchema);
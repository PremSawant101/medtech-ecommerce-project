import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
    {
        userEmail: String,

        products: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                },
                name: String,
                price: Number,
                quantity: Number,
            },
        ],

        totalAmount: Number,

        prescriptionUploaded: {
            type: Boolean,
            default: false,
        },

        prescriptionFile: {
            type: String,
            default: null,
        },

        status: {
            type: String,
            default: "pending",
        },
    },
    { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
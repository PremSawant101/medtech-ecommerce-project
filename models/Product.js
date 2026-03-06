import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        name: String,
        category: {
            type: String,
            required: true,
        },
        description: String,
        price: Number,
        stock: Number,
        prescriptionRequired: Boolean,
        image: {
            type: String,
            required: true,
        },
        discount: {
            type: Number,
            default: 0
        },
    },
    { timestamps: true }
);

export default mongoose.models.Product ||
    mongoose.model("Product", ProductSchema);


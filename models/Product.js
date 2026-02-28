import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        name: String,
        category: String,
        description: String,
        price: Number,
        stock: Number,
        prescriptionRequired: Boolean,
        image: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.models.Product ||
    mongoose.model("Product", ProductSchema);
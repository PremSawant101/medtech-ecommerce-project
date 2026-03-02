import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema({
    productId: String,
    name: String,
    price: Number,
    image: String,
    quantity: Number,
});

const CartSchema = new mongoose.Schema(
    {
        userEmail: {
            type: String,
            required: true,
            unique: true,
        },
        items: [CartItemSchema],
    },
    { timestamps: true }
);

export default mongoose.models.Cart ||
    mongoose.model("Cart", CartSchema);
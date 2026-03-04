import connectDB from "@/lib/mongodb";
import Cart from "@/models/Cart";

export async function POST(req) {
    await connectDB();

    const { email, productId } = await req.json();

    const cart = await Cart.findOne({ userEmail: email });

    if (!cart) return Response.json([]);

    cart.items = cart.items.filter(
        (item) => item.productId !== productId
    );

    await cart.save();

    return Response.json({ message: "Item removed" });
}
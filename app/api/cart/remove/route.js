import connectDB from "@/lib/mongodb";
import Cart from "@/models/Cart";

export async function POST(req) {

    await connectDB();

    const { email, productId } = await req.json();

    const cart = await Cart.findOne({ userEmail: email });

    if (!cart) return Response.json([]);

    const item = cart.items.find(
        (item) => item.productId === productId
    );

    if (!item) return Response.json({ message: "Item not found" });

    if (item.quantity > 1) {
        item.quantity -= 1;
    } else {
        cart.items = cart.items.filter(
            (item) => item.productId !== productId
        );
    }

    await cart.save();

    return Response.json(cart.items);
}
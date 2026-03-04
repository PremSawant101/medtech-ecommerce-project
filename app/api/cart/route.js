import connectDB from "@/lib/mongodb";
import Cart from "@/models/Cart";

export async function GET(req) {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) return Response.json([]);

    const cart = await Cart.findOne({ userEmail: email });

    return Response.json(cart?.items || []);
}

export async function POST(req) {
    await connectDB();

    const { email, item } = await req.json();

    let cart = await Cart.findOne({ userEmail: email });

    if (!cart) {
        cart = await Cart.create({
            userEmail: email,
            items: [item],
        });
    } else {

        const existingItem = cart.items.find(
            (i) => i._id.toString() === item._id
        );

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.items.push({ ...item, quantity: 1 });
        }

        await cart.save();
    }

    return Response.json({ message: "Cart updated" });
}

export async function DELETE(req) {
    await connectDB();

    const { email } = await req.json();

    await Cart.findOneAndDelete({ userEmail: email });

    return Response.json({ message: "Cart cleared" });
}
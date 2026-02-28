import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function GET() {
    await connectDB();

    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
        return Response.json(
            { message: "Unauthorized" },
            { status: 403 }
        );
    }

    const users = await User.find({ role: "user" }).select("-password");

    return Response.json(users);
}
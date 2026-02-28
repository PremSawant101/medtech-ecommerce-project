import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        await connectDB();

        const { name, email, password } = await req.json();

        // Validation
        if (!name || !email || !password) {
            return Response.json(
                { message: "All fields are required" },
                { status: 400 }
            );
        }

        // Check existing user
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return Response.json(
                { message: "User already exists" },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "user",
        });

        return Response.json({
            message: "Signup successful ✅",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
        });
    } catch (error) {
        console.log(error);
        return Response.json(
            { message: "Server error" },
            { status: 500 }
        );
    }
}
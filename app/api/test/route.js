import connectDB from "@/lib/mongodb";

export async function GET() {
    await connectDB();
    return Response.json({ message: "MongoDB Connected Successfully" });
}
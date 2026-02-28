import mongoose from "mongoose";

const MONGODB_URI = "mongodb://127.0.0.1:27017/medtech";

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI");
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            bufferCommands: false,
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}
console.log("Connected DB:", mongoose.connection.name);


export default connectDB;
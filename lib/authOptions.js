import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),

        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                await connectDB();

                const user = await User.findOne({
                    email: credentials.email,
                });

                if (!user) return null;

                // 🔥 If Google user tries credentials login
                if (!user.password) {
                    throw new Error("Please login with Google");
                }

                const isMatch = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if (!isMatch) return null;

                return {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                };
            },
        }),
    ],

    session: {
        strategy: "jwt",
    },

    callbacks: {
        async signIn({ user }) {
            await connectDB();

            const existingUser = await User.findOne({
                email: user.email,
            });

            if (!existingUser) {
                await User.create({
                    name: user.name,
                    email: user.email,
                    role: "user",
                });
            }

            return true;
        },

        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
            }
            return token;
        },

        async session({ session, token }) {
            session.user.role = token.role;
            return session;
        },
    },

    secret: process.env.NEXTAUTH_SECRET,
};
import { hashPassword } from "@/lib/bcrypt";
import { NextResponse } from "next/server";
import User from "@/models/user.model";
import { cookies } from "next/headers";
import { signToken } from "@/lib/jwt";
import { db } from "@/lib/db";

export async function POST(req: Request) {

    await db();

    try {

        const { fullname, email, password } = await req.json();

        if (!fullname || !email || !password) {

            return NextResponse.json(
                { message: "All fields are required" },
                { status: 400 }
            );

        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {

            return NextResponse.json(
                { message: "User already exists" },
                { status: 400 }
            );

        }

        const hashed = await hashPassword(password);

        const user = await User.create({
            fullname,
            email,
            password: hashed
        });

        const token = signToken(user._id.toString());

        const cookieStore = await cookies();

        cookieStore.set("name", user.fullname, {
            httpOnly: false,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        });

        cookieStore.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24 * 7
        });

        return NextResponse.json(
            {
                id: user._id,
                fullname: user.fullname,
                email: user.email
            },
            { status: 201 }
        );

    } catch (error) {

        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );

    }

};
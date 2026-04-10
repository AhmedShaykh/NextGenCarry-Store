import { comparePassword } from "@/lib/bcrypt";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import User from "@/models/user.model";
import { signToken } from "@/lib/jwt";
import { db } from "@/lib/db";

export async function POST(req: Request) {

    await db();

    try {

        const { email, password } = await req.json();

        if (!email || !password) {

            return NextResponse.json(
                { message: "Email and password required" },
                { status: 400 }
            );

        }

        const user = await User.findOne({ email }).select("+password");

        if (!user) {

            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401 }
            );

        }

        const isMatch = await comparePassword(
            password,
            user.password
        );

        if (!isMatch) {

            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401 }
            );

        }

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
            { status: 200 }
        );

    } catch (error) {

        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );

    }

};
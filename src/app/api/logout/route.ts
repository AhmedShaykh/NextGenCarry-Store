import BlacklistToken from "@/models/blacklisttoken.model";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";

export async function POST() {

    await db();

    try {

        const cookieStore = await cookies();

        const token = cookieStore.get("token")?.value;

        if (!token) {

            return NextResponse.json(
                { message: "You are already logged out" },
                { status: 400 }
            );

        }

        const existing = await BlacklistToken.findOne({ token });

        if (!existing) {

            await BlacklistToken.create({ token });

        }

        cookieStore.delete("token");

        return NextResponse.json(
            { message: "User logged out successfully" },
            { status: 200 }
        );

    } catch (error) {

        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );

    }

};
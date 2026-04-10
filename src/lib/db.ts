import { setServers } from "node:dns/promises";
import mongoose from "mongoose";

setServers(["1.1.1.1", "8.8.8.8"]);

export const db = async (): Promise<void> => {

    if (mongoose.connection.readyState >= 1) return;

    try {

        await mongoose.connect(process.env.DATABASE_URL as string);

        console.log("MongoDB Connected ✔");

    } catch (error) {

        console.error("MongoDB Connection Error ❌", error);

    }

};
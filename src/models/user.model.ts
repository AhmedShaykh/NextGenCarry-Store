import mongoose, { Schema, Model } from "mongoose";

export interface IUser {
    fullname: string;
    email: string;
    password: string;
};

const UserSchema = new Schema<IUser>(
    {
        fullname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            select: false
        }
    },
    {
        timestamps: true
    }
);

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
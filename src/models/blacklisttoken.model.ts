import mongoose, { Schema, Model } from "mongoose";

export interface IBlacklistToken {
    token: string;
    createdAt: Date;
};

const BlacklistTokenSchema = new Schema<IBlacklistToken>(
    {
        token: {
            type: String,
            required: true,
            unique: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

const BlacklistToken: Model<IBlacklistToken> = mongoose.models.BlacklistToken || mongoose.model("BlacklistToken", BlacklistTokenSchema);

export default BlacklistToken;
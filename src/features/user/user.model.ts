import { HydratedDocument, Schema, Model, model } from "mongoose";
import bcrypt from "bcrypt";

interface Iuser {
    username: string;
    email: string;
    password: string;
};

export interface IuserMethod {
    isPasswordMatches(password: string): Promise<boolean>;
};

export type IuserModel = Model<Iuser, {}, IuserMethod>;
export type IuserDoc = HydratedDocument<Iuser, IuserMethod>;

const userSchema = new Schema<Iuser, IuserModel, IuserMethod>({
    username: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        select: false,
        required: true
    }
}, {
    timestamps: true,
    toObject: {
        transform(doc, ret) {
            const obj = ret as Record<string, unknown>;

            delete obj.password;
            delete obj.__v;
            return obj;
        }
    }
});

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isPasswordMatches = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};

export const User = model<Iuser, IuserModel>("User", userSchema);
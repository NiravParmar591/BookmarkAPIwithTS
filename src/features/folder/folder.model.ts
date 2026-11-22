import { HydratedDocument, model, Schema, Types } from "mongoose";

interface Ifolder {
    name: string;
    owner: Types.ObjectId;
};

export type IfolderDoc = HydratedDocument<Ifolder>;

const folderSchema = new Schema<Ifolder>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true,
    toObject: {
        transform(doc, ret) {
            const obj = ret as Record<string, unknown>;
            delete obj.__v;
            return obj;
        }
    }
});

export const Folder = model<Ifolder>("Folder", folderSchema);
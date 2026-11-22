import { HydratedDocument, Schema, model, Types } from "mongoose";

interface Ibookmark {
    title: string;
    url: string;
    owner: Types.ObjectId;
    folder: Types.ObjectId;
}

export type IbookmarkDoc = HydratedDocument<Ibookmark>;

const bookmarkSchema = new Schema<Ibookmark>({
    title: {
        type: String,
        trim: true,
        required: true
    },
    url: {
        type: String,
        trim: true,
        required: true
    },
    owner: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    },
    folder: {
        type: Types.ObjectId,
        ref: "Folder",
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

export const Bookmark = model<Ibookmark>("Bookmark", bookmarkSchema);
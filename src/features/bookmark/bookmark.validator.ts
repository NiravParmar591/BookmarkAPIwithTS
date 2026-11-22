import { Types } from "mongoose";
import { z } from "zod";
import { requiredField } from "../shared/shared";

export const createBookmarkValidator = z.object({
    title: z.string(requiredField("Title")).trim().min(1, "Title must be at least 1 character").max(100, "Title must be less than 100 characters"),
    url: z.string(requiredField("Url")).trim().url("Invalid URL"),
    folder: z.string(requiredField("Folder")).refine((id) => Types.ObjectId.isValid(id), "Invalid folder id")
});

export const updateBookmarkValidator = z.object({
    title: z.string(requiredField("Title")).trim().min(1, "Title must be at least 1 character").max(100, "Title must be less than 100 characters"),
    url: z.string(requiredField("Url")).trim().url("Invalid URL")
});

export const folderQueryValidator = z.object({
    folder: z.string(requiredField("Folder")).refine((id) => Types.ObjectId.isValid(id), "Invalid folder id").optional()
});

export type createBookmarkInput = z.infer<typeof createBookmarkValidator>;
export type updateBookmarkInput = z.infer<typeof updateBookmarkValidator>;
export type folderQueryInput = z.infer<typeof folderQueryValidator>;
import { z } from "zod";
import { requiredField } from "../shared/shared";

export const createFolderValidator = z.object({
    name: z.string(requiredField("Name"))
        .trim()
        .min(1, "Folder name must be at least 1 characters")
        .max(100, "Folder name must be less than 100 characters")
});

export const updateFolderValidator = z.object({
    name: z.string(requiredField("Name"))
        .trim()
        .min(1, "Folder name must be at least 1 character")
        .max(100, "Folder name must be less than 100 characters")
});

export type CreateFolderInput = z.infer<typeof createFolderValidator>;
export type UpdateFolderInput = z.infer<typeof updateFolderValidator>;
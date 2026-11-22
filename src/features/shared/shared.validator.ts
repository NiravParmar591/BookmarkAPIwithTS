import { Types } from "mongoose";
import { z } from "zod";

export const idParamsValidator = z.object({
    id: z.string().refine((id) => Types.ObjectId.isValid(id), "Invalid id")
});

export type IdParamsInput = z.infer<typeof idParamsValidator>;

import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

type sourceType = "body" | "params" | "query"

export const centralValidator = (validator: ZodType, source: sourceType) => async (req: Request, res: Response, next: NextFunction) => {
    const data = req[source] || {};
    const result = await validator.safeParse(data);

    if (result.error) {
        return next(result.error);
    }

    req.input = { ...req.input, ...(result.data as object) };
    next();
};
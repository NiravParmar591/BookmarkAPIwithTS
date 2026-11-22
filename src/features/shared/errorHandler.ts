import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import { ZodError } from "zod";

export const errorHandler = (err: Error & { code?: number }, req: Request, res: Response, next: NextFunction) => {
    console.log(err);

    if (err instanceof ZodError) {
        return res.status(400).json({
            success: false,
            message: err.issues[0].message,
            missingFields: err.issues[0].path
        });
    }

    if (err instanceof JsonWebTokenError) {
        return res.status(400).json({
            success: false,
            message: err.message
        })
    }

    res.status(err.code || 500).json({
        success: false,
        message: err.message || "Internal server error"
    });
};
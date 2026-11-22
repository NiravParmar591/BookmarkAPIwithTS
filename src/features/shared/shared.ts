import jwt, { JsonWebTokenError, SignOptions } from "jsonwebtoken";

export const genError = (message: string, code: number = 500) => Object.assign(new Error(message), { code });

export const genToken = (data: Record<string, unknown>) => jwt.sign(data, process.env.JWT_SECRET as string, { expiresIn: process.env.JWT_EXPIRY as SignOptions["expiresIn"] });

export const requiredField = (field: string) => ({ error: `${field} is required` });
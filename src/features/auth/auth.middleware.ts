import { Request, Response, NextFunction } from "express";
import { genError } from "../shared/shared";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../user/user.model";

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const tokenString = req.cookies["Token"];

    if (!tokenString) return next(genError("Authentication token not found", 404));

    const tokenData = jwt.verify(tokenString, process.env.JWT_SECRET as string) as JwtPayload;
    const user = await User.findById(tokenData.id);

    if (!user) return next(genError("User not found", 401));

    req.user = user;
    next();
};
import { Response, Request } from "express";
import { Service } from "../types/services";

export const authController = <Tinput, Tresult extends { token: string }>(service: Service<Tinput, Tresult>, message: string, code: number = 200) => async (req: Request, res: Response) => {
    const data = await service({ input: req.input as Tinput });

    if (data.token) {
        res.cookie("Token", data.token, { maxAge: Number(process.env.COOKIE_MAX_AGE || 7) * 24 * 60 * 60 * 1000 });
    }

    res.status(code).json({ success: true, message, ...data });
};
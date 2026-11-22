import { Request, Response } from "express";
import { Service } from "../types/services";

export const centralController = <Iinput, IResult>(service: Service<Iinput, IResult>, code: number = 200) => async (req: Request, res: Response) => {
    const serviceData = await service({ user: req.user, input: req.input as Iinput });
    res.status(code).json(serviceData);
};
import { loginInput, RegisterInput } from "./auth.validator";
import { User } from "../user/user.model";
import { genError, genToken } from "../shared/shared";
import { serviceContext } from "../types/services";

export const registerUserService = async ({ input: { email, username, password } }: serviceContext<RegisterInput>) => {
    const existUser = await User.findOne({ email });
    if (existUser) throw genError("User already exists", 409);

    const newUser = new User({ email, username, password });
    await newUser.save();

    const token = genToken({ id: newUser._id, username: newUser.username, email: newUser.email });
    const userObject = newUser.toObject();

    return {
        token, userObject
    };
};

export const loginUserService = async ({ input: { email, password } }: serviceContext<loginInput>) => {
    const existUser = await User.findOne({ email }).select("+password");
    if (!existUser || !(await existUser.isPasswordMatches(password))) throw genError("Invalid email and password", 400);

    const token = genToken({ id: existUser._id, username: existUser.username, email: existUser.email });
    const userObject = existUser.toObject();

    return {
        token, userObject
    };
};
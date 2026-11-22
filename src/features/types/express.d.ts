import { IuserDoc } from "../user/user.model";

declare global {
    namespace Express {
        interface Request {
            user?: IuserDoc,
            input?: Record<string, unknown>
        }
    }
}
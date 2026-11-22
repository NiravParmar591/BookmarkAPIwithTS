import { IuserDoc } from "../user/user.model";

export interface serviceContext<inputResult> {
    user?: IuserDoc,
    input: inputResult
}

export type Service<Tinput, Tresult> = (data: serviceContext<Tinput>) => Promise<Tresult>;
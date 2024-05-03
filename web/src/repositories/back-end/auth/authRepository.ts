import { IAuthRepository } from "./IAuthRepository";
import { BackEndAuthRepository } from "./backEndAuthRepository";

export const authRepository: IAuthRepository = new BackEndAuthRepository();

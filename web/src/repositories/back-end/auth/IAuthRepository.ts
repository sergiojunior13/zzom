import { LoginUser, SignUser } from "@/types/user";

export interface IAuthRepository {
  sign(data: SignUser): Promise<void | Error>;
  login(data: LoginUser): Promise<void | Error>;
}
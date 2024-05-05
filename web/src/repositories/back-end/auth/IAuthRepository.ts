import { LoginUser, SignUser } from "@/types/user";

export interface IAuthRepository {
  sign(data: SignUser): Promise<void>;
  login(data: LoginUser): Promise<void>;
}

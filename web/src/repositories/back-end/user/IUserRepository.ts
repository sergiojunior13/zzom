import { SignUser, User } from "@/types/user";

export interface IUserRepository {
  sign(user: SignUser): Promise<void>;
  login(user: User): Promise<{ token: string }>;

  getUserData(): Promise<User>;
}

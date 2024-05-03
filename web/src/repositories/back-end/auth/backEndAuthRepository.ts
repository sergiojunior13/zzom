import { SignUser } from "@/types/user";
import { IAuthRepository } from "./IAuthRepository";
import { API } from "@/services/back-end";

export class BackEndAuthRepository implements IAuthRepository {
  async login(data: SignUser) {
    try {
      await API.post("/login", data);
    } catch (e: any) {
      const errorMessage =
        (e?.response?.data as string) ||
        (e?.message as string) ||
        "Erro desconhecido.";

      return new Error(errorMessage);
    }
  }

  async sign(data: SignUser) {
    try {
      await API.post("/sign", data);
    } catch (e: any) {
      const errorMessage =
        (e?.response?.data as string) ||
        (e?.message as string) ||
        "Erro desconhecido.";

      return new Error(errorMessage);
    }
  }
}

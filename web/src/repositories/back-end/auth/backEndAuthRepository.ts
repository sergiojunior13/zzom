import { SignUser } from "@/types/user";
import { IAuthRepository } from "./IAuthRepository";
import { API } from "@/services/back-end";

export class BackEndAuthRepository implements IAuthRepository {
  async login(data: SignUser) {
    try {
      await API.post("/classes.php?func=login", { params: [data.username, data.password] });
    } catch (e: any) {
      const errorMessage =
        (e?.response?.data as string) || (e?.message as string) || "Erro desconhecido.";

      throw new Error(errorMessage);
    }
  }

  async sign(data: SignUser) {
    try {
      await API.post("/classes.php?func=sign", { params: [data.username, data.password] });
    } catch (e: any) {
      const errorMessage =
        (e?.response?.data as string) || (e?.message as string) || "Erro desconhecido.";

      throw new Error(errorMessage);
    }
  }
}

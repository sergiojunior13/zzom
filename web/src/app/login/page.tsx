"use client";

import { authRepository } from "@/repositories/back-end/auth/authRepository";
import { AuthStorage } from "@/services/auth-storage";
import { LoginUser } from "@/types/user";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function Login() {
  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const username = new FormData(e.currentTarget).get("username") as string;
    const password = new FormData(e.currentTarget).get("password") as string;

    try {
      await submitLoginToApiAndStorage({ username, password });
      router.replace("/");
    } catch (e: any) {
      console.table(e);
      alert(
        "Houve um erro durante a tentativa de entrar na sua conta (verifique o console para mais informações): " +
          e?.message || e
      );
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" />
      <input type="password" name="password" />

      <button type="submit">Entrar</button>
      <span>
        Ainda não possui uma conta?{" "}
        <Link href="/sign" className="text-indigo-700">
          Crie uma
        </Link>
        .
      </span>
    </form>
  );
}

async function submitLoginToApiAndStorage({ username, password }: LoginUser) {
  await authRepository.login({ username, password }).then(() => AuthStorage.registerIsLogged());
}

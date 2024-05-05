"use client";

import { authRepository } from "@/repositories/back-end/auth/authRepository";
import { AuthStorage } from "@/services/auth-storage";
import { SignUser } from "@/types/user";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function Sign() {
  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const username = new FormData(e.currentTarget).get("username") as string;
    const password = new FormData(e.currentTarget).get("password") as string;

    try {
      await submitSignToApiAndStorage({ username, password });
      router.replace("/");
    } catch (e: any) {
      console.table(e);
      alert(
        "Houve um erro durante a criação da sua conta (verifique o console para mais informações): " +
          e?.message || e
      );
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" />
      <input type="password" name="password" />

      <button type="submit">Criar conta</button>
      <span>
        Já possui uma conta?{" "}
        <Link href="/login" className="text-indigo-700">
          Entre aqui
        </Link>
        .
      </span>
    </form>
  );
}

async function submitSignToApiAndStorage({ username, password }: SignUser) {
  await authRepository.sign({ username, password }).then(() => AuthStorage.registerIsLogged());
}
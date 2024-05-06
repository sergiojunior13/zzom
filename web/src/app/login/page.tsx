"use client";

import { authRepository } from "@/repositories/back-end/auth/authRepository";
import { AuthStorage } from "@/services/auth-storage";
import { SignUser } from "@/types/user";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { EyeOff, Eye } from "lucide-react";

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

  type PasswordType = "password" | "text";

  const [inputPasswordType, setInputPasswordType] =
    useState<PasswordType>("password");
  const handleTogglePasswordType = (type: PasswordType) => {
    setInputPasswordType(type === "password" ? "text" : "password");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-zinc-900 text-white rounded-lg">
      <div className="p-12 rounded-lg shadow-lg max-w-lg bg-zinc-800">
        <img className="w-full h-8 mb-8" src="./logo.svg" alt="logo" />
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-sm">Usuário</label>
            <input
              className="px-4 py-3 bg-zinc-900 border text-sm text-white leading-5 border-gray-200 rounded placeholder:text-white outline-none focus:border-purple-700"
              type="email"
              id="email"
              placeholder="Digite seu email"
              name="email"
            />
          </div>

          <div className="flex flex-col gap-2 relative">
            <label className="font-semibold text-sm">Senha</label>
            <input
              className="px-4 py-3 bg-zinc-900 border text-sm text-white leading-5 border-gray-200 rounded placeholder:text-white outline-none focus:border-purple-700"
              id="password"
              placeholder="Digite sua senha"
              type={inputPasswordType}
            />
            <button
              className="absolute right-4 top-11 text-gray-400"
              type="button"
              onClick={() => handleTogglePasswordType(inputPasswordType)}
            >
              {inputPasswordType === "password" ? <EyeOff /> : <Eye />}
            </button>
            <a
              className="text-purple-500 hover:text-purple-400 hover:underline"
              href="#"
            >
              Esqueceu a senha?
            </a>
          </div>

          <footer className="flex flex-col gap-8">
            <button
              className="bg-purple-500 text-white font-bold py-4 rounded outline-none hover:bg-purple-400"
              type="submit"
            >
              Efetuar Login
            </button>
            <span className="text-zinc-400">
              Não possui uma conta?{" "}
              <Link href="/sign" className="text-indigo-700">
                Entre aqui
              </Link>
              .
            </span>
          </footer>
        </form>
      </div>
    </div>
  );
}

async function submitSignToApiAndStorage({ username, password }: SignUser) {
  await authRepository
    .sign({ username, password })
    .then(() => AuthStorage.registerIsLogged(username));
}

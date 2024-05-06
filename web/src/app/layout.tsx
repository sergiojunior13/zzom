"use client";

import { Poppins } from "next/font/google";
import "./globals.css";
import { AuthStorage } from "@/services/auth-storage";
import { useRouter } from "next/navigation";
import { AsideMenu } from "@/components/asidemenu";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isLogged =
    typeof window !== "undefined" ? AuthStorage.checkIsLogged() : false;

  // if (!isLogged) useRouter().replace("/sign");

  return (
    <html lang="pt-br">
      <head>
        <title>ZZOM: Encontre suas músicas favoritas</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </head>

      <body className="bg-black text-zinc-50">
        <div className="flex flex-col">
          <div className="flex flex-1 gap-2 p-1.5">
            <AsideMenu />
            <div className="bg-zinc-900 rounded-lg w-full">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}

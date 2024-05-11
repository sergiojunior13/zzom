"use client";

import { Poppins } from "next/font/google";
import "./globals.css";
import { AuthStorage } from "@/services/auth-storage";
import { useRouter } from "next/navigation";
import { AsideMenu } from "@/components/asidemenu";
import React, { useEffect, useState } from "react";
import Menu from "@/components/menuhamburgue";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  if(typeof window == "undefined") return <p>Renderizando...</p>;
  
  const isLogged = AuthStorage.checkIsLogged();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [showAsideMenu, setShowAsideMenu] = useState(false);

  useEffect(() => {
    // Função para atualizar a largura da tela
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Adicionando o event listener quando o componente é montado
    window.addEventListener("resize", handleResize);

    // Limpando o event listener quando o componente é desmontado
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Dependência vazia significa que este efeito é executado apenas uma vez após a montagem do componente

  // useEffect(() => {
  //   // Verifica se o usuário está logado quando o componente é montado
  //   // const isLogged = AuthStorage.checkIsLogged();
  //   // if (!isLogged) {
  //   //   router.replace("/sign");
  //   }
  // }, []);

  const toggleAsideMenu = () => {
    setShowAsideMenu(!showAsideMenu);
  };

  const closeAsideMenu = () => {
    setShowAsideMenu(false);
  };

  return (
    <html lang="pt-br">
      <head>
        <title>ZZOM: Encontre suas músicas favoritas</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </head>

      <body className="bg-black text-zinc-50">
        <div className="flex flex-col">
          <div className="flex flex-1 gap-2 p-1.5">
            <div>
              {screenWidth < 768 && (
                <button
                  onClick={toggleAsideMenu}
                  className="absolute bg-transparent"
                >
                  <Menu />
                </button>
              )}
            </div>
            {showAsideMenu && <AsideMenu />}
            {screenWidth > 768 && <AsideMenu />}
            <div
              className="bg-zinc-900 rounded-lg w-full"
              onClick={closeAsideMenu}
            >
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

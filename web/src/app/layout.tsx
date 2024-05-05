import { Poppins } from "next/font/google";
import { Header } from "@/components/header";
import "./globals.css";

const poppins = Poppins({ weight: ["400", "500", "600", "700", "800"], subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;


}>) {
  return (
    <html lang="pt-br">
      <head>
        <title>ZZOM: Encontre suas músicas favoritas</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </head>

      <body className="bg-black text-zinc-50">
      {children}
     
      </body>

      
    </html>
  );
}

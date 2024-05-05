import { Home, Search, Library } from "lucide-react";

import Playlists from "@/app/playlists/page";

export function AsideMenu() {
  return (
    <aside className="w-96">
      <nav className="flex flex-col gap-2 h-full">
        <div className="bg-zinc-900 rounded-md h-32 p-3 flex flex-col justify-center gap-4">
          <a href="" className="flex items-center gap-2 text-sn font-semibold">
            <Home />
            Inicio
          </a>
          <a href="/search" className="flex items-center gap-2 text-sn font-semibold" >
            <Search />
            Pesquisa
          </a>
        </div>
        <div className="bg-zinc-900 rounded-md h-full p-4">
          <div className="flex gap-1">
            <Library />
            <h1 className="text-l font-bold text-center">Sua Biblioteca</h1>
          </div>
          <Playlists />
        </div>
      </nav>
    </aside>
  );
}
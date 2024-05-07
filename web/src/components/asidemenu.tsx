import { Home, Search, Library, LogOut } from "lucide-react";

import Playlists from "@/app/playlists/page";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthStorage } from "@/services/auth-storage";

export function AsideMenu() {
  const router = useRouter();

  function logout() {
    AuthStorage.unregisterIsLogged();

    router.refresh();
  }

  return (
    <aside className="min-w-[200px]  sticky top-0 left-0 h-full gap-2 flex flex-col w-100%">
      <div className="bg-zinc-900 rounded-md p-3 flex flex-col  justify-center gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-sn font-semibold"
        >
          <Home />
          Inicio
        </Link>
        <Link
          href="/search"
          className="flex items-center gap-2 text-sn font-semibold"
        >
          <Search />
          Pesquisa
        </Link>
      </div>
      <div className="bg-zinc-900 rounded-md h-full p-3">
        <div className="flex gap-1 h-full">
          <Library />
          <h1 className="text-l font-bold text-center">Sua Biblioteca</h1>
        </div>

        <Playlists />

        <button
          onClick={logout}
          className="flex gap-2 hover:bg-zinc-800 w-full p-2"
        >
          <LogOut size={24} />
          Deslogar
        </button>
      </div>
    </aside>
  );
}

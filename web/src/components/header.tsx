import Image from "next/image";
import logo from "../../public/logo.svg";
import Link from "next/link";
import { AuthStorage } from "@/services/auth-storage";
import { useRouter } from "next/navigation";

export function Header() {
  const router = useRouter();

  function logout() {
    AuthStorage.unregisterIsLogged();

    router.refresh();
  }

  return (
    <header className="bg-indigo-950 flex items-center justify-between p-4 px-8">
      <Link href="/">
        <Image src={logo} alt="zzom logo" width={100} />
      </Link>

      <div className="flex gap-2">
        <Link href="/playlists">Minhas playlists</Link>

        <button onClick={logout}>Deslogar</button>
      </div>
    </header>
  );
}

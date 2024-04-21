import Image from "next/image";
import logo from "../../public/logo.svg";
import Link from "next/link";

export function Header() {
  return (
    <header className="bg-indigo-950 flex items-center justify-between p-4 px-8">
      <Image src={logo} alt="zzom logo" width={100} />

      <Link href="/playlists">Minhas playlists</Link>
    </header>
  );
}

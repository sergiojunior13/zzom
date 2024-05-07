import Image from "next/image";
import logo from "../../public/logo.svg";
import Link from "next/link";

export function Header() {
  return (
    <header className="flex items-center justify-between p-4 ml-8 px-8">
      <Link href="/">
        <Image src={logo} alt="zzom logo" width={100} />
      </Link>
    </header>
  );
}

import Image from "next/image";
import logo from "../../public/logo.svg";

export function Header() {
  return (
    <header className="bg-indigo-950 flex items-center p-4">
      <Image src={logo} alt="zzom logo" width={100} />
    </header>
  );
}

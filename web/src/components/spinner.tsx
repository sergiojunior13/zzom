import Image from "next/image";
import favicon from "../../public/favicon.svg";

export function Spinner({
  size = 32,
  color = "white",
}: {
  size?: number;
  color?: "white" | "black";
}) {
  return (
    <Image
      className={`animate-bounce ${color == "black" ? "invert" : ""}`}
      src={favicon}
      alt="loading..."
      width={size}
      height={size}
    />
  );
}

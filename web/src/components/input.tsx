import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export function Input({
  className,
  ...props
}: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
  return (
    <input
      className={
        "bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 outline-indigo-900 placeholder:text-zinc-600 " +
        className
      }
      {...props}
    />
  );
}

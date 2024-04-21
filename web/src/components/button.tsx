import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export function Button({
  children,
  className,
  ...rest
}: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
  return (
    <button
      className={
        "w-full p-2 bg-indigo-700 hover:bg-indigo-800 rounded-lg font-medium flex justify-center items-center " +
        className
      }
      {...rest}
    >
      {children}
    </button>
  );
}

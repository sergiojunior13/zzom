import { HTMLAttributes } from "react";

export function Section({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={"bg-zinc-900 border border-zinc-800 rounded-lg p-4 my-14 max-w-3xl w-full m-auto px-8 " + className} {...props}>
      {children}
    </div>
  );
}

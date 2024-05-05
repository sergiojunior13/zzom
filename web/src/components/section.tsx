import { HTMLAttributes } from "react";

export function Section({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={"bg-zinc-900 border border-none rounded-lg p-4 my-14 w-full m-auto px-8 " + className} {...props}>
      {children}
    </div>
  );
}

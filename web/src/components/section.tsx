import { HTMLAttributes } from "react";

export function Section({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={"bg-zinc-900 border border-zinc-800 rounded-lg p-4 " + className} {...props}>
      {children}
    </div>
  );
}

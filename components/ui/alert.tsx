import * as React from "react";
import { cn } from "@/lib/utils";

type AlertProps = React.ComponentProps<"div"> & {
  variant?: "default" | "destructive";
};

const variants = {
  default: "border-slate-200 bg-slate-50 text-slate-700",
  destructive: "border-red-200 bg-red-50 text-red-600",
};

function Alert({ className, variant = "default", ...props }: AlertProps) {
  return (
    <div
      className={cn(
        "rounded-md border p-4 text-sm font-medium",
        variants[variant],
        className,
      )}
      role="alert"
      {...props}
    />
  );
}

export { Alert };

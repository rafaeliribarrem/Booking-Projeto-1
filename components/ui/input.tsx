import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-11 min-h-[44px] w-full min-w-0 rounded-base border-2 border-sand-200 bg-cream-50 px-4 py-3 text-base text-sand-900 shadow-sm transition-all outline-none",
        "placeholder:text-sand-600",
        "selection:bg-terracotta-500 selection:text-cream-50",
        "focus:border-terracotta-500 focus:ring-2 focus:ring-terracotta-500/20",
        "hover:border-sand-300",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-sand-100",
        "aria-invalid:border-terracotta-600 aria-invalid:ring-2 aria-invalid:ring-terracotta-600/20",
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-sand-900",
        className
      )}
      {...props}
    />
  );
}

export { Input };

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-3 py-1 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none transition-all overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-terracotta-500 text-cream-50 [a&]:hover:bg-terracotta-600",
        secondary:
          "border-transparent bg-sage-500 text-cream-50 [a&]:hover:bg-sage-600",
        accent:
          "border-transparent bg-clay-500 text-cream-50 [a&]:hover:bg-clay-600",
        outline:
          "border-sand-300 bg-transparent text-sand-900 [a&]:hover:bg-sand-50",
        success: "border-transparent bg-sage-600 text-cream-50",
        warning: "border-transparent bg-clay-500 text-cream-50",
        error: "border-transparent bg-terracotta-600 text-cream-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };

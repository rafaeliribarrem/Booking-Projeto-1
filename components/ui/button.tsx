import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-base text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500 focus-visible:ring-offset-2 aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-terracotta-500 text-cream-50 hover:bg-terracotta-600 active:bg-terracotta-700 shadow-sm hover:shadow-md transition-shadow",
        secondary:
          "bg-sage-500 text-cream-50 hover:bg-sage-600 active:bg-sage-700 shadow-sm hover:shadow-md transition-shadow",
        outline:
          "border-2 border-sand-300 bg-transparent text-sand-900 hover:bg-sand-50 hover:border-sand-400 active:bg-sand-100",
        ghost:
          "bg-transparent text-sand-900 hover:bg-sand-100 active:bg-sand-200",
        destructive:
          "bg-terracotta-600 text-cream-50 hover:bg-terracotta-700 active:bg-terracotta-800 shadow-sm",
        link: "text-terracotta-500 underline-offset-4 hover:underline hover:text-terracotta-600",
      },
      size: {
        sm: "h-10 px-4 py-2 text-sm has-[>svg]:px-3",
        default: "h-11 px-6 py-3 text-base has-[>svg]:px-4 min-h-[44px]",
        lg: "h-12 px-8 py-4 text-lg has-[>svg]:px-6",
        icon: "size-11 min-h-[44px] min-w-[44px]",
        "icon-sm": "size-10",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };

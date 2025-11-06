import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const imageCardVariants = cva(
  "flex flex-col overflow-hidden rounded-base transition-shadow",
  {
    variants: {
      variant: {
        default: "bg-cream-100 text-sand-900 border border-sand-200 shadow-sm",
        elevated: "bg-cream-100 text-sand-900 shadow-md hover:shadow-lg",
        outlined: "bg-transparent text-sand-900 border-2 border-sand-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface ImageCardProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof imageCardVariants> {}

function ImageCard({ className, variant, ...props }: ImageCardProps) {
  return (
    <div
      data-slot="image-card"
      className={cn(imageCardVariants({ variant }), className)}
      {...props}
    />
  );
}

function ImageCardMedia({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="image-card-media"
      className={cn("relative w-full overflow-hidden", className)}
      {...props}
    />
  );
}

function ImageCardBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="image-card-body"
      className={cn("flex flex-col gap-4 p-6", className)}
      {...props}
    />
  );
}

function ImageCardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="image-card-header"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

function ImageCardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="image-card-title"
      className={cn(
        "text-lg font-semibold leading-tight text-sand-900",
        className
      )}
      {...props}
    />
  );
}

function ImageCardDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="image-card-description"
      className={cn("text-sm text-sand-600", className)}
      {...props}
    />
  );
}

function ImageCardContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="image-card-content"
      className={cn("flex flex-col gap-3", className)}
      {...props}
    />
  );
}

function ImageCardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="image-card-footer"
      className={cn(
        "flex items-center gap-2 pt-2 border-t border-sand-200",
        className
      )}
      {...props}
    />
  );
}

export {
  ImageCard,
  ImageCardMedia,
  ImageCardBody,
  ImageCardHeader,
  ImageCardTitle,
  ImageCardDescription,
  ImageCardContent,
  ImageCardFooter,
};

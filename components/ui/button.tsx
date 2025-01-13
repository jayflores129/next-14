import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:focus-visible:ring-stone-300 px-3",
  {
    variants: {
      variant: {
        default: "bg-xxprimary text-stone-50 shadow hover:bg-xxprimary/90",
        destructive:
          "bg-red-500 text-stone-50 shadow-sm hover:bg-red-500/90 dark:bg-red-900 dark:text-stone-50 dark:hover:bg-red-900/90",
        outline:
          "border bg-xxbackground text-xxsurface-foreground shadow-sm dark:hover:opacity-80",
        secondary:
          "bg-xxsecondary text-stone-50 shadow-sm hover:bg-xxsecondary/80",
        ghost:
          "hover:bg-stone-100 hover:text-stone-900 dark:hover:bg-stone-800 dark:hover:text-stone-50",
        link: "text-stone-900 underline-offset-4 hover:underline dark:text-stone-50",
      },
      size: {
        default: "py-1.5",
        sm: "px-3 py-1 text-sm",
        lg: "py-2",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

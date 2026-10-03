import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm";
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      type = "button",
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      default:
        "bg-indigo-600 text-white hover:bg-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.3)]",
      destructive:
        "bg-rose-600 text-white hover:bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.3)]",
      outline:
        "border border-[#1E2436] bg-[#0D0F17] hover:bg-[#161B2B] text-[#94A3B8] hover:text-white",
      secondary:
        "bg-[#161B2B] text-white hover:bg-[#1E2436] border border-[#1E2436]",
      ghost:
        "hover:bg-[#161B2B] text-[#94A3B8] hover:text-white",
      link: "text-indigo-400 underline-offset-4 hover:underline",
    };

    const sizeStyles = {
      default: "h-9 px-4 py-2 text-xs",
      sm: "h-8 rounded px-3 text-xs",
      lg: "h-10 rounded-md px-6 text-sm",
      icon: "h-9 w-9 p-0",
      "icon-sm": "h-7 w-7 p-0 rounded",
      "icon-xs": "h-6 w-6 p-0 rounded",
    };

    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-lg font-mono font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500 disabled:pointer-events-none disabled:opacity-50",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };

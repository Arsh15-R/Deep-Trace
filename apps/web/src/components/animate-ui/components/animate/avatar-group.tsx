"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  invert?: boolean;
}

export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ children, className, invert = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="avatar-group"
        className={cn(
          "flex items-center -space-x-3.5 group/avatar-group",
          "[&>*]:transition-all [&>*]:duration-200 [&>*]:ease-out",
          "[&>*:hover]:z-30 [&>*:hover]:scale-110 [&>*:hover]:-translate-y-1 [&>*:hover]:shadow-lg",
          invert && "flex-row-reverse space-x-reverse",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
AvatarGroup.displayName = "AvatarGroup";

export interface AvatarGroupTooltipProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

export const AvatarGroupTooltip = React.forwardRef<
  HTMLDivElement,
  AvatarGroupTooltipProps
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="avatar-group-tooltip"
      className={cn(
        "pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 z-50",
        "opacity-0 scale-90 translate-y-1 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0",
        "transition-all duration-200 ease-out",
        "whitespace-nowrap rounded-md bg-[#0D0F17]/95 px-2 py-0.5 text-[11px] font-heading font-bold text-white shadow-xl border border-indigo-500/40 backdrop-blur-md",
        "after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-[#0D0F17]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
AvatarGroupTooltip.displayName = "AvatarGroupTooltip";

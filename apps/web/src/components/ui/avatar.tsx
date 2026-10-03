"use client";

import * as React from "react";
import { Avatar as BaseAvatar } from "@base-ui/react/avatar";
import { cn } from "@/lib/utils";

interface AvatarProps extends React.ComponentProps<typeof BaseAvatar.Root> {
  size?: "default" | "sm" | "lg";
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size = "default", ...props }, ref) => {
    return (
      <BaseAvatar.Root
        ref={ref}
        data-slot="avatar"
        data-size={size}
        className={cn(
          "group relative flex shrink-0 rounded-full select-none items-center justify-center overflow-visible",
          size === "sm" && "size-8 text-xs",
          size === "default" && "size-10 text-sm",
          size === "lg" && "size-12 text-base",
          className
        )}
        {...props}
      />
    );
  }
);
Avatar.displayName = "Avatar";

const AvatarImage = React.forwardRef<
  HTMLImageElement,
  React.ComponentProps<typeof BaseAvatar.Image>
>(({ className, ...props }, ref) => {
  return (
    <BaseAvatar.Image
      ref={ref}
      data-slot="avatar-image"
      className={cn("aspect-square h-full w-full object-cover rounded-full", className)}
      {...props}
    />
  );
});
AvatarImage.displayName = "AvatarImage";

const AvatarFallback = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof BaseAvatar.Fallback>
>(({ className, ...props }, ref) => {
  return (
    <BaseAvatar.Fallback
      ref={ref}
      data-slot="avatar-fallback"
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full bg-muted font-heading font-bold text-card-foreground select-none uppercase",
        className
      )}
      {...props}
    />
  );
});
AvatarFallback.displayName = "AvatarFallback";

const AvatarBadge = React.forwardRef<
  HTMLSpanElement,
  React.ComponentProps<"span">
>(({ className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      data-slot="avatar-badge"
      className={cn(
        "absolute bottom-0 right-0 z-10 block size-2.5 rounded-full ring-2 ring-background bg-emerald-500",
        className
      )}
      {...props}
    />
  );
});
AvatarBadge.displayName = "AvatarBadge";

const AvatarGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="avatar-group"
      className={cn(
        "flex items-center -space-x-2 [&>*]:ring-2 [&>*]:ring-background [&>*]:transition-transform [&>*:hover]:z-10 [&>*:hover]:scale-105",
        className
      )}
      {...props}
    />
  );
});
AvatarGroup.displayName = "AvatarGroup";

const AvatarGroupCount = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="avatar-group-count"
      className={cn(
        "relative flex size-10 shrink-0 items-center justify-center rounded-full bg-muted border border-border text-xs font-mono font-bold text-muted-foreground ring-2 ring-background",
        className
      )}
      {...props}
    />
  );
});
AvatarGroupCount.displayName = "AvatarGroupCount";

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
  AvatarGroup,
  AvatarGroupCount,
};

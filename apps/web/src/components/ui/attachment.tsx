"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "@/components/ui/button";

export type AttachmentState =
  | "idle"
  | "uploading"
  | "processing"
  | "error"
  | "done";

export type AttachmentSize = "default" | "sm" | "xs";
export type AttachmentOrientation = "horizontal" | "vertical";

interface AttachmentContextValue {
  state: AttachmentState;
  size: AttachmentSize;
  orientation: AttachmentOrientation;
}

const AttachmentContext = React.createContext<AttachmentContextValue>({
  state: "done",
  size: "default",
  orientation: "horizontal",
});

function useAttachmentContext() {
  return React.useContext(AttachmentContext);
}

/* ── Attachment (Root) ─────────────────────────────────── */
interface AttachmentProps extends React.ComponentProps<"div"> {
  state?: AttachmentState;
  size?: AttachmentSize;
  orientation?: AttachmentOrientation;
}

const Attachment = React.forwardRef<HTMLDivElement, AttachmentProps>(
  (
    {
      state = "done",
      size = "default",
      orientation = "horizontal",
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <AttachmentContext.Provider value={{ state, size, orientation }}>
        <div
          ref={ref}
          data-slot="attachment"
          data-state={state}
          data-size={size}
          data-orientation={orientation}
          className={cn(
            "group/attachment relative flex overflow-hidden border transition-all duration-200 select-none",
            // Orientation
            orientation === "horizontal"
              ? "flex-row items-center"
              : "flex-col items-start",
            // Sizes
            size === "xs" &&
              (orientation === "horizontal"
                ? "h-10 min-w-44 gap-2 rounded-lg p-1.5 text-xs"
                : "w-40 gap-1.5 rounded-lg p-2 text-xs"),
            size === "sm" &&
              (orientation === "horizontal"
                ? "h-12 min-w-56 gap-2.5 rounded-xl p-2 text-xs"
                : "w-48 gap-2 rounded-xl p-2.5 text-xs"),
            size === "default" &&
              (orientation === "horizontal"
                ? "h-14 min-w-64 gap-3 rounded-xl p-2.5 text-sm"
                : "w-56 gap-2.5 rounded-xl p-3 text-sm"),
            // State Treatments
            state === "idle" &&
              "border-[#1E2436] bg-[#0D0F17] hover:border-indigo-500/40 text-card-foreground",
            state === "uploading" &&
              "border-indigo-500/40 bg-indigo-950/20 text-card-foreground shadow-[0_0_15px_rgba(99,102,241,0.15)]",
            state === "processing" &&
              "border-cyan-500/40 bg-cyan-950/20 text-card-foreground shadow-[0_0_15px_rgba(6,182,212,0.15)]",
            state === "error" &&
              "border-rose-500/60 bg-rose-950/25 text-rose-100 shadow-[0_0_15px_rgba(244,63,94,0.15)]",
            state === "done" &&
              "border-[#1E2436] bg-[#0D0F17] hover:border-indigo-500/50 hover:bg-[#101420] text-card-foreground shadow-sm",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </AttachmentContext.Provider>
    );
  }
);
Attachment.displayName = "Attachment";

/* ── AttachmentMedia ───────────────────────────────────── */
interface AttachmentMediaProps extends React.ComponentProps<"div"> {
  variant?: "icon" | "image";
}

const AttachmentMedia = React.forwardRef<HTMLDivElement, AttachmentMediaProps>(
  ({ variant = "icon", className, children, ...props }, ref) => {
    const { size, orientation, state } = useAttachmentContext();

    return (
      <div
        ref={ref}
        data-slot="attachment-media"
        data-variant={variant}
        className={cn(
          "relative shrink-0 overflow-hidden rounded-lg transition-colors flex items-center justify-center",
          // Variant: Icon
          variant === "icon" && [
            "bg-[#161B2B] text-[#94A3B8] border border-[#1E2436]",
            size === "xs" && "size-7 [&>svg]:size-3.5",
            size === "sm" && "size-8 [&>svg]:size-4",
            size === "default" && "size-9 [&>svg]:size-4.5",
            state === "uploading" &&
              "border-indigo-500/30 text-indigo-400 bg-indigo-500/10",
            state === "processing" &&
              "border-cyan-500/30 text-cyan-400 bg-cyan-500/10",
            state === "error" &&
              "border-rose-500/40 text-rose-400 bg-rose-500/15",
          ],
          // Variant: Image
          variant === "image" && [
            "border border-[#1E2436] bg-[#101420]",
            orientation === "horizontal" && [
              size === "xs" && "size-7",
              size === "sm" && "size-8",
              size === "default" && "size-9",
            ],
            orientation === "vertical" && [
              size === "xs" && "w-full h-20",
              size === "sm" && "w-full h-24",
              size === "default" && "w-full h-32",
            ],
            "[&>img]:h-full [&>img]:w-full [&>img]:object-cover",
          ],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
AttachmentMedia.displayName = "AttachmentMedia";

/* ── AttachmentContent ─────────────────────────────────── */
const AttachmentContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="attachment-content"
      className={cn("flex-1 min-w-0 flex flex-col justify-center", className)}
      {...props}
    />
  );
});
AttachmentContent.displayName = "AttachmentContent";

/* ── AttachmentTitle ───────────────────────────────────── */
const AttachmentTitle = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, children, ...props }, ref) => {
  const { state } = useAttachmentContext();
  const isShimmering = state === "uploading" || state === "processing";

  return (
    <div
      ref={ref}
      data-slot="attachment-title"
      className={cn(
        "truncate font-sans font-semibold text-white tracking-tight leading-tight",
        isShimmering && [
          "relative overflow-hidden",
          "before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer",
          state === "uploading"
            ? "before:bg-gradient-to-r before:from-transparent before:via-indigo-400/30 before:to-transparent text-indigo-200"
            : "before:bg-gradient-to-r before:from-transparent before:via-cyan-400/30 before:to-transparent text-cyan-200",
        ],
        state === "error" && "text-rose-200 font-bold",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
AttachmentTitle.displayName = "AttachmentTitle";

/* ── AttachmentDescription ─────────────────────────────── */
const AttachmentDescription = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, children, ...props }, ref) => {
  const { state } = useAttachmentContext();

  return (
    <div
      ref={ref}
      data-slot="attachment-description"
      className={cn(
        "truncate text-[10px] font-mono text-[#94A3B8] leading-normal",
        state === "uploading" && "text-indigo-400/90 font-medium",
        state === "processing" && "text-cyan-400/90 font-medium",
        state === "error" && "text-rose-400 font-medium",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
AttachmentDescription.displayName = "AttachmentDescription";

/* ── AttachmentActions ─────────────────────────────────── */
const AttachmentActions = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="attachment-actions"
      className={cn("relative z-10 flex items-center gap-1 shrink-0 ml-auto", className)}
      {...props}
    />
  );
});
AttachmentActions.displayName = "AttachmentActions";

/* ── AttachmentAction ──────────────────────────────────── */
interface AttachmentActionProps extends React.ComponentProps<typeof Button> {}

const AttachmentAction = React.forwardRef<HTMLButtonElement, AttachmentActionProps>(
  ({ className, size = "icon-xs", variant = "ghost", ...props }, ref) => {
    return (
      <Button
        ref={ref}
        data-slot="attachment-action"
        size={size}
        variant={variant}
        className={cn(
          "text-[#94A3B8] hover:text-white hover:bg-[#1E2436]/60 transition-colors",
          className
        )}
        {...props}
      />
    );
  }
);
AttachmentAction.displayName = "AttachmentAction";

/* ── AttachmentTrigger ─────────────────────────────────── */
interface AttachmentTriggerProps
  extends Omit<React.ComponentProps<"button">, "children"> {
  render?:
    | React.ReactElement
    | ((props: React.ComponentProps<"button">) => React.ReactElement);
  children?: React.ReactNode;
}

const AttachmentTrigger = React.forwardRef<
  HTMLButtonElement,
  AttachmentTriggerProps
>(({ render, className, ...props }, ref) => {
  const defaultClasses = cn(
    "absolute inset-0 z-0 h-full w-full cursor-pointer rounded-[inherit] bg-transparent focus:outline-none focus:ring-1 focus:ring-indigo-500/50",
    className
  );

  if (typeof render === "function") {
    return render({
      ref: ref as any,
      className: defaultClasses,
      ...props,
    });
  }

  if (React.isValidElement(render)) {
    return React.cloneElement(render as React.ReactElement<any>, {
      ref,
      className: cn(defaultClasses, (render.props as any).className),
      ...props,
    });
  }

  return (
    <button
      ref={ref}
      type="button"
      data-slot="attachment-trigger"
      className={defaultClasses}
      {...props}
    />
  );
});
AttachmentTrigger.displayName = "AttachmentTrigger";

/* ── AttachmentGroup ───────────────────────────────────── */
const AttachmentGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="attachment-group"
      className={cn("relative w-full overflow-hidden", className)}
      {...props}
    >
      {/* Edge Fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-[#08090D] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-[#08090D] to-transparent z-10" />

      {/* Scrollable Container */}
      <div className="flex items-center gap-2.5 overflow-x-auto scroll-smooth snap-x snap-mandatory py-1.5 px-3 no-scrollbar">
        {children}
      </div>
    </div>
  );
});
AttachmentGroup.displayName = "AttachmentGroup";

export {
  Attachment,
  AttachmentMedia,
  AttachmentContent,
  AttachmentTitle,
  AttachmentDescription,
  AttachmentActions,
  AttachmentAction,
  AttachmentTrigger,
  AttachmentGroup,
};

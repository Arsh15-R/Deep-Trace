"use client";

import * as React from "react";
import { PanelLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "4.5rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

interface SidebarContextValue {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean | ((value: boolean) => boolean)) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean | ((value: boolean) => boolean)) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}

/* ── SidebarProvider ─────────────────────────────────────── */
interface SidebarProviderProps extends React.ComponentProps<"div"> {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const SidebarProvider = React.forwardRef<
  HTMLDivElement,
  SidebarProviderProps
>(
  (
    {
      defaultOpen = true,
      open: openProp,
      onOpenChange: setOpenProp,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const [_open, _setOpen] = React.useState(defaultOpen);
    const [openMobile, setOpenMobile] = React.useState(false);
    const [isMobile, setIsMobile] = React.useState(false);

    const open = openProp !== undefined ? openProp : _open;
    const setOpen = React.useCallback(
      (value: boolean | ((value: boolean) => boolean)) => {
        const openState = typeof value === "function" ? value(open) : value;
        if (setOpenProp) {
          setOpenProp(openState);
        } else {
          _setOpen(openState);
        }
        try {
          document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
        } catch (e) {}
      },
      [setOpenProp, open]
    );

    // Responsive window check
    React.useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Keyboard shortcut (ctrl+b / cmd+b)
    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (
          event.key.toLowerCase() === SIDEBAR_KEYBOARD_SHORTCUT &&
          (event.metaKey || event.ctrlKey)
        ) {
          event.preventDefault();
          toggleSidebar();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isMobile, open, openMobile]);

    const toggleSidebar = React.useCallback(() => {
      if (isMobile) {
        setOpenMobile((prev) => !prev);
      } else {
        setOpen((prev) => !prev);
      }
    }, [isMobile, setOpen]);

    const state = open ? "expanded" : "collapsed";

    const contextValue = React.useMemo<SidebarContextValue>(
      () => ({
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
      }),
      [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
    );

    return (
      <SidebarContext.Provider value={contextValue}>
        <div
          ref={ref}
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH,
              "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
              "--sidebar-width-mobile": SIDEBAR_WIDTH_MOBILE,
              ...style,
            } as React.CSSProperties
          }
          className={cn(
            "group/sidebar-wrapper flex min-h-svh w-full text-card-foreground",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </SidebarContext.Provider>
    );
  }
);
SidebarProvider.displayName = "SidebarProvider";

/* ── Sidebar ─────────────────────────────────────────────── */
interface SidebarProps extends React.ComponentProps<"div"> {
  side?: "left" | "right";
  variant?: "sidebar" | "floating" | "inset";
  collapsible?: "offcanvas" | "icon" | "none";
  dir?: "ltr" | "rtl";
}

export const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      side = "left",
      variant = "sidebar",
      collapsible = "icon",
      dir,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

    if (collapsible === "none") {
      return (
        <div
          ref={ref}
          data-slot="sidebar"
          data-variant={variant}
          data-side={side}
          className={cn(
            "flex h-full w-[var(--sidebar-width)] flex-col bg-[#0B0D14] text-white border-r border-[#1E2436]",
            className
          )}
          {...props}
        >
          {children}
        </div>
      );
    }

    // Mobile Drawer
    if (isMobile) {
      if (!openMobile) return null;
      return (
        <div className="fixed inset-0 z-50 flex md:hidden" dir={dir}>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setOpenMobile(false)}
          />
          {/* Panel */}
          <div
            ref={ref}
            data-slot="sidebar"
            data-mobile="true"
            data-side={side}
            className={cn(
              "relative z-50 flex h-full w-[var(--sidebar-width-mobile)] max-w-[85vw] flex-col bg-[#0B0D14] text-white shadow-2xl border-r border-[#1E2436] p-0",
              className
            )}
            {...props}
          >
            {children}
          </div>
        </div>
      );
    }

    // Desktop Collapsible
    return (
      <div
        ref={ref}
        data-slot="sidebar"
        data-state={state}
        data-collapsible={state === "collapsed" ? collapsible : ""}
        data-variant={variant}
        data-side={side}
        dir={dir}
        className={cn(
          "group peer hidden md:block text-white transition-all duration-200 ease-in-out shrink-0 relative z-20",
          state === "expanded"
            ? "w-[var(--sidebar-width)]"
            : collapsible === "icon"
            ? "w-[var(--sidebar-width-icon)]"
            : "w-0 overflow-hidden",
          className
        )}
      >
        <div
          data-slot="sidebar-container"
          data-side={side}
          className={cn(
            "flex h-full w-full flex-col bg-[#0B0D14] border-r border-[#1E2436] relative transition-all duration-200",
            variant === "floating" && "m-2 rounded-xl border shadow-2xl",
            variant === "inset" && "bg-transparent border-0"
          )}
          {...props}
        >
          {children}
        </div>
      </div>
    );
  }
);
Sidebar.displayName = "Sidebar";

/* ── SidebarTrigger ──────────────────────────────────────── */
export const SidebarTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      ref={ref}
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon-sm"
      className={cn(
        "h-8 w-8 text-[#94A3B8] hover:text-white hover:bg-[#161B2B] border border-[#1E2436] rounded-lg transition",
        className
      )}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      title="Toggle Sidebar (Ctrl+B)"
      {...props}
    >
      <PanelLeft className="size-4 rtl:rotate-180 text-indigo-400" />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
});
SidebarTrigger.displayName = "SidebarTrigger";

/* ── SidebarRail ─────────────────────────────────────────── */
export const SidebarRail = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>(({ className, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      ref={ref}
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar Rail"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        "absolute inset-y-0 -right-2 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-indigo-500/50 sm:flex cursor-col-resize",
        className
      )}
      {...props}
    />
  );
});
SidebarRail.displayName = "SidebarRail";

/* ── SidebarInset ────────────────────────────────────────── */
export const SidebarInset = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"main">
>(({ className, ...props }, ref) => {
  return (
    <main
      ref={ref}
      data-slot="sidebar-inset"
      className={cn(
        "relative flex min-h-svh flex-1 flex-col bg-[#08090D] overflow-hidden",
        className
      )}
      {...props}
    />
  );
});
SidebarInset.displayName = "SidebarInset";

/* ── SidebarHeader ───────────────────────────────────────── */
export const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="sidebar-header"
      className={cn("flex flex-col gap-2 p-3 border-b border-[#1E2436] shrink-0", className)}
      {...props}
    />
  );
});
SidebarHeader.displayName = "SidebarHeader";

/* ── SidebarFooter ───────────────────────────────────────── */
export const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="sidebar-footer"
      className={cn("flex flex-col gap-2 p-3 border-t border-[#1E2436] shrink-0 mt-auto bg-[#08090D]/40", className)}
      {...props}
    />
  );
});
SidebarFooter.displayName = "SidebarFooter";

/* ── SidebarContent ──────────────────────────────────────── */
export const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="sidebar-content"
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto px-2.5 py-3 no-scrollbar",
        className
      )}
      {...props}
    />
  );
});
SidebarContent.displayName = "SidebarContent";

/* ── SidebarGroup ────────────────────────────────────────── */
export const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="sidebar-group"
      className={cn("relative flex w-full min-w-0 flex-col py-1", className)}
      {...props}
    />
  );
});
SidebarGroup.displayName = "SidebarGroup";

/* ── SidebarGroupLabel ───────────────────────────────────── */
export const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  const { state } = useSidebar();
  if (state === "collapsed") return null;

  return (
    <div
      ref={ref}
      data-slot="sidebar-group-label"
      className={cn(
        "flex h-7 shrink-0 items-center px-2 text-[10px] font-mono uppercase tracking-wider text-[#64748B]",
        className
      )}
      {...props}
    />
  );
});
SidebarGroupLabel.displayName = "SidebarGroupLabel";

/* ── SidebarGroupAction ──────────────────────────────────── */
export const SidebarGroupAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>(({ className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      data-slot="sidebar-group-action"
      className={cn(
        "absolute right-2 top-2 flex size-5 items-center justify-center rounded text-[#94A3B8] hover:text-white hover:bg-[#161B2B] transition",
        className
      )}
      {...props}
    />
  );
});
SidebarGroupAction.displayName = "SidebarGroupAction";

/* ── SidebarGroupContent ─────────────────────────────────── */
export const SidebarGroupContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="sidebar-group-content"
      className={cn("w-full text-xs", className)}
      {...props}
    />
  );
});
SidebarGroupContent.displayName = "SidebarGroupContent";

/* ── SidebarMenu ─────────────────────────────────────────── */
export const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => {
  return (
    <ul
      ref={ref}
      data-slot="sidebar-menu"
      className={cn("flex w-full min-w-0 flex-col gap-1 list-none p-0 m-0", className)}
      {...props}
    />
  );
});
SidebarMenu.displayName = "SidebarMenu";

/* ── SidebarMenuItem ─────────────────────────────────────── */
export const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => {
  return (
    <li
      ref={ref}
      data-slot="sidebar-menu-item"
      className={cn("group/menu-item relative list-none", className)}
      {...props}
    />
  );
});
SidebarMenuItem.displayName = "SidebarMenuItem";

/* ── SidebarMenuButton ───────────────────────────────────── */
interface SidebarMenuButtonProps extends React.ComponentProps<"button"> {
  isActive?: boolean;
  size?: "default" | "sm" | "lg";
  variant?: "default" | "outline";
  render?: React.ReactElement | ((props: any) => React.ReactElement);
}

export const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  SidebarMenuButtonProps
>(
  (
    {
      isActive = false,
      size = "default",
      variant = "default",
      render,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const { state } = useSidebar();

    const baseClasses = cn(
      "peer/menu-button flex w-full items-center gap-2.5 overflow-hidden rounded-lg px-2.5 py-2 text-left text-xs font-heading font-bold tracking-wider outline-none transition-all duration-150 select-none group",
      isActive
        ? "bg-indigo-600/15 text-white border border-indigo-500/40 shadow-[0_0_15px_rgba(99,102,241,0.2)]"
        : "text-[#94A3B8] hover:text-white hover:bg-[#101420] border border-transparent hover:border-[#1E2436]",
      size === "sm" && "h-7 text-xs py-1",
      size === "default" && "h-9 py-2",
      size === "lg" && "h-11 py-2.5 text-sm",
      state === "collapsed" && "justify-center px-0",
      className
    );

    if (typeof render === "function") {
      return render({
        ref,
        className: baseClasses,
        "data-active": isActive,
        children,
        ...props,
      });
    }

    if (React.isValidElement(render)) {
      return React.cloneElement(render as React.ReactElement<any>, {
        ref,
        className: cn(baseClasses, (render.props as any).className),
        "data-active": isActive,
        children: children || (render.props as any).children,
        ...props,
      });
    }

    return (
      <button
        ref={ref}
        type="button"
        data-slot="sidebar-menu-button"
        data-active={isActive}
        className={baseClasses}
        {...props}
      >
        {children}
      </button>
    );
  }
);
SidebarMenuButton.displayName = "SidebarMenuButton";

/* ── SidebarMenuAction ───────────────────────────────────── */
export const SidebarMenuAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>(({ className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      data-slot="sidebar-menu-action"
      className={cn(
        "absolute right-1.5 top-1/2 -translate-y-1/2 flex size-6 items-center justify-center rounded text-[#64748B] hover:text-white hover:bg-[#161B2B] transition",
        className
      )}
      {...props}
    />
  );
});
SidebarMenuAction.displayName = "SidebarMenuAction";

/* ── SidebarMenuBadge ────────────────────────────────────── */
export const SidebarMenuBadge = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  const { state } = useSidebar();
  if (state === "collapsed") return null;

  return (
    <div
      ref={ref}
      data-slot="sidebar-menu-badge"
      className={cn(
        "ml-auto flex items-center justify-center text-[10px] font-mono font-bold text-[#64748B] group-hover:text-indigo-300 transition pointer-events-none select-none",
        className
      )}
      {...props}
    />
  );
});
SidebarMenuBadge.displayName = "SidebarMenuBadge";

/* ── SidebarMenuSub ──────────────────────────────────────── */
export const SidebarMenuSub = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => {
  return (
    <ul
      ref={ref}
      data-slot="sidebar-menu-sub"
      className={cn(
        "mx-3.5 flex min-w-0 flex-col gap-1 border-l border-[#1E2436] px-2.5 py-0.5 list-none",
        className
      )}
      {...props}
    />
  );
});
SidebarMenuSub.displayName = "SidebarMenuSub";

/* ── SidebarMenuSubItem ──────────────────────────────────── */
export const SidebarMenuSubItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ ...props }, ref) => {
  return <li ref={ref} {...props} />;
});
SidebarMenuSubItem.displayName = "SidebarMenuSubItem";

/* ── SidebarMenuSubButton ────────────────────────────────── */
export const SidebarMenuSubButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & { isActive?: boolean }
>(({ isActive = false, className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      data-slot="sidebar-menu-sub-button"
      className={cn(
        "flex h-7 min-w-0 items-center gap-2 overflow-hidden rounded-md px-2 text-xs font-mono text-[#94A3B8] hover:text-white hover:bg-[#161B2B] transition-colors",
        isActive && "text-white font-bold bg-indigo-600/15 text-indigo-300",
        className
      )}
      {...props}
    />
  );
});
SidebarMenuSubButton.displayName = "SidebarMenuSubButton";

/* ── SidebarMenuSkeleton ─────────────────────────────────── */
export const SidebarMenuSkeleton = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="sidebar-menu-skeleton"
      className={cn("flex h-8 items-center gap-2 rounded-md px-2", className)}
      {...props}
    >
      <div className="size-4 rounded bg-slate-800 animate-pulse" />
      <div className="h-3 flex-1 rounded bg-slate-800 animate-pulse" />
    </div>
  );
});
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton";

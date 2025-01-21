"use client";
import {
  DropdownMenu as DropdownMenuPrimitive,
  DropdownMenuContent as DropdownMenuContentPrimitive,
  DropdownMenuItem as DropdownMenuItemPrimitive,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn, iconStrokeWidth } from "@/lib/utils";
import { Ellipsis, EllipsisVertical } from "lucide-react";
import Link from "next/link";
import React from "react";

type Menu = {
  text?: string;
  Icon?: React.ComponentType<any>;
  onClick?: () => void;
  href?: React.ComponentProps<typeof Link>["href"];
  download?: React.ComponentProps<typeof Link>["download"];
  target?: React.ComponentProps<typeof Link>["target"];
  iconClassName?: string;
  active?: boolean;
} | null;

export default function DropdownMenu({
  children,
  className,
  trigger,
  onOpenChange,
  open,
  defaultOpen,
  modal = false,
  menus,
  align = "end",
  ...props
}: React.ComponentProps<typeof DropdownMenuContentPrimitive> & {
  trigger?: React.ReactNode;
  onOpenChange?: React.ComponentProps<
    typeof DropdownMenuPrimitive
  >["onOpenChange"];
  open?: React.ComponentProps<typeof DropdownMenuPrimitive>["open"];
  defaultOpen?: React.ComponentProps<
    typeof DropdownMenuPrimitive
  >["defaultOpen"];
  modal?: React.ComponentProps<typeof DropdownMenuPrimitive>["modal"];
  menus: Menu[];
}) {
  return (
    <DropdownMenuPrimitive
      modal={modal}
      onOpenChange={onOpenChange}
      defaultOpen={defaultOpen}
    >
      <DropdownMenuTrigger asChild>
        {trigger || (
          <button
            type="button"
            className="hover:bg-xxsurface text-xxsurface-foreground/70 py-1 px-1 rounded-md"
          >
            <Ellipsis width={18} height={18} />
          </button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContentPrimitive align={align} {...props}>
        {Array.isArray(menus) &&
          menus.map((menu: Menu, key: number) => {
            const icon = menu?.Icon && (
              <menu.Icon
                key={key}
                width={16}
                height={16}
                strokeWidth={iconStrokeWidth}
                className={cn("text-xxsurface-foreground", menu.iconClassName)}
              />
            );

            const className = cn("flex items-center gap-2 cursor-pointer");

            if (!menu) return <DropdownMenuSeparator key={key} />;

            return (
              <DropdownMenuItemPrimitive
                className={cn("rounded-md py-1.5")}
                asChild={menu?.href ? true : false}
                key={key}
              >
                {menu?.href ? (
                  <Link
                    href={menu.href}
                    className={className}
                    target={menu.target}
                    download={menu.download}
                  >
                    {icon} <span>{menu.text}</span>
                  </Link>
                ) : (
                  <div className={className}>
                    {icon} <span>{menu.text}</span>
                  </div>
                )}
              </DropdownMenuItemPrimitive>
            );
          })}
      </DropdownMenuContentPrimitive>
    </DropdownMenuPrimitive>
  );
}

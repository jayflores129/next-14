"use client";

import {
  ChevronsUpDown,
  Menu,
  MoonStar,
  Plus,
  Sun,
  SunMoon,
} from "lucide-react";
import MainMenus from "@/components/layouts/main-menus";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { baseUrl } from "@/api.utils";
import DropdownMenu from "@/components/DropdownMenu";
import { useSession } from "next-auth/react";
import { Div } from "@/hooks/useSize";
import { useMemo, useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Language from "./Language";
import Theme from "./Theme";
import { ThemeProvider } from "@/context/ThemeContext";
import { AccessTokenContext } from "@/context/AccessTokenContext";

const LogoImage = ({
  onClickToggler,
  className,
}: {
  onClickToggler?: () => void;
  className?: string;
}) => (
  <div className={cn("h-full flex items-center px-2 gap-1", className)}>
    <button
      className="hover:bg-xxmenuHover p-2 rounded-full"
      onClick={onClickToggler}
    >
      <Menu width={20} height={20} />
    </button>
    <img src="https://hotware.app/logos/main-logo-black.svg" />
  </div>
);

type MainLayout = {
  title?: string;
  children?: React.ReactNode;
  access_token: string;
};

const _sidebarWidth = 250;

export default function MainLayout({
  title,
  children,
  access_token,
}: MainLayout) {
  const { data: session, status }: any = useSession();
  const [wrapperSize, setWrapperSize] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarSheet, setSidebarSheet] = useState(false);

  const sidebarWidth = useMemo(() => {
    if (wrapperSize?.width > 1300 && wrapperSize?.width <= 1400) return 200;
    return _sidebarWidth;
  }, [wrapperSize]);

  const mainElemStyle = useMemo(() => {
    const style: any = {
      width: `calc(100% - ${sidebarWidth}px)`,
      marginLeft: "auto",
    };
    if (wrapperSize?.width <= 1300) {
      return {
        width: "100%",
        marginLeft: 0,
        borderRadius: 0,
      };
    }
    if (!sidebarOpen) {
      style.width = "100%";
      style.marginLeft = `-${sidebarWidth}px`;
      style.borderRadius = 0;
    }
    return style;
  }, [sidebarWidth, sidebarOpen, wrapperSize?.width]);

  const companyTriggerSelector = (
    <button
      className={cn(
        "hover:bg-xxhover flex items-center gap-1 px-2 py-1 rounded-full border border-xxborder data-[state=open]:bg-xxmenuHover",
        session?.user?.user_access?.length == 0 && "cursor-default"
      )}
    >
      <span>{session?.user?.company_name}</span>
      {session?.user?.user_access?.length > 0 && (
        <ChevronsUpDown width={14} height={14} strokeWidth={1} />
      )}
    </button>
  );

  return (
    <ThemeProvider>
      <AccessTokenContext.Provider value={access_token}>
        <Sheet onOpenChange={setSidebarSheet} open={sidebarSheet}>
          <SheetContent
            className="w-[250px] bg-xxsurface dark:bg-xxsurface p-0 border-0"
            side="left"
            useDefaultCloseButton={false}
          >
            <div>
              <LogoImage
                onClickToggler={() => setSidebarSheet(false)}
                className="h-[var(--header-height)]"
              />
              <ScrollArea className="h-[calc(100vh-var(--header-height))]">
                <MainMenus />
              </ScrollArea>
            </div>
          </SheetContent>
        </Sheet>
        <Div onChangeSize={(size) => setWrapperSize(size)}>
          <header className="w-full h-[var(--header-height)] flex">
            <LogoImage
              onClickToggler={() => {
                if (wrapperSize?.width > 1300) setSidebarOpen(!sidebarOpen);
                else setSidebarSheet(true);
              }}
            />

            {status === "authenticated" && (
              <div className="flex h-full items-center px-2 ms-auto pe-4 gap-2">
                {session?.user?.user_access?.length > 0 ? (
                  <DropdownMenu
                    menus={session?.user?.user_access?.map((acc: any) => ({
                      text: acc.company_name,
                    }))}
                    trigger={companyTriggerSelector}
                    align="end"
                  />
                ) : (
                  companyTriggerSelector
                )}

                <DropdownMenu
                  menus={[
                    "Offer",
                    "Order Confirmation",
                    "Delivery Note",
                    "Invoices",
                    "Credit Notes",
                    "Shipping List",
                  ]?.map((text: any) => ({
                    text,
                  }))}
                  trigger={
                    <button className="border border-xxborder hover:bg-xxmenuHover h-[35px] w-[35px] flex items-center justify-center rounded-full data-[state=open]:bg-xxmenuHover">
                      <Plus width={20} height={20} />
                    </button>
                  }
                  align="end"
                />

                <Language />
                <Theme />

                <Popover>
                  <PopoverTrigger asChild>
                    <button className="border border-xxborder h-[35px] w-[35px] flex items-center justify-center rounded-full">
                      <Image
                        src={
                          baseUrl + "/users/thumbnail/" + session?.user?.photo
                        }
                        height={35}
                        width={35}
                        alt={session?.user?.user_firstname || "Profile"}
                        className="rounded-full object-cover h-[35px] w-[35px]"
                      />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent>
                    Place content for the popover here.
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </header>
          <div className="flex relative h-[calc(100vh-var(--header-height))]">
            {wrapperSize?.width > 1300 && (
              <ScrollArea
                className="h-[calc(100vh-var(--header-height))] overflow-auto thin-scroll transition-transform duration-200"
                style={{
                  width: sidebarWidth + "px",
                  transform: !sidebarOpen
                    ? `translateX(-${sidebarWidth}px)`
                    : undefined,
                }}
              >
                <MainMenus />
              </ScrollArea>
            )}
            <main
              className="overflow-hidden rounded-tl-lg transition-all duration-200 absolute right-0 bottom-0 top-0"
              style={mainElemStyle}
            >
              <div className="bg-xxbackground h-[calc(100vh-var(--header-height))] overflow-y-scroll thin-scroll flex flex-col shadow">
                {title && (
                  <div className="px-3 py-4 mb-1">
                    <h1 className="text-2xl font-bold">{title}</h1>
                  </div>
                )}
                {children}
              </div>
            </main>
          </div>
        </Div>
      </AccessTokenContext.Provider>
    </ThemeProvider>
  );
}

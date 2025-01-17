import { ChevronsUpDown, Languages, Menu, Plus, SunMoon } from "lucide-react";
import MainMenus from "@/components/layouts/main-menus";
import List from "./list";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslation } from "@/app/i18n";

export default async function Page({
  params: { lng },
}: {
  params: { lng: any };
}) {
  const { t } = await useTranslation(lng);

  return (
    <div>
      <header className="w-full h-[var(--header-height)] flex">
        <div className="w-[var(--sidebar-width)] h-full flex items-center px-2 gap-2">
          <button className="hover:bg-red-300 p-2 rounded-full">
            <Menu width={20} height={20} />
          </button>
          <img src="https://hotware.app/logos/main-logo-black.svg" />
        </div>
        <div className="flex h-full items-center">
          <button className="hover:bg-xxhover flex items-center gap-1 px-2 py-1 rounded-md border border-xxborder">
            <span>Hotwork International AG</span>
            <ChevronsUpDown width={14} height={14} strokeWidth={1} />
          </button>
        </div>
        <div className="flex h-full items-center px-2 ms-auto pe-4 gap-2">
          <button className="border border-xxborder h-[35px] w-[35px] flex items-center justify-center rounded-full">
            <Plus width={20} height={20} />
          </button>
          <button className="border border-xxborder h-[35px] w-[35px] flex items-center justify-center rounded-full">
            <Languages width={18} height={18} />
          </button>
          <button className="border border-xxborder h-[35px] w-[35px] flex items-center justify-center rounded-full">
            <SunMoon width={18} height={18} />
          </button>
          <button className="border border-xxborder h-[35px] w-[35px] flex items-center justify-center rounded-full">
            <Languages width={18} height={18} className="text-transparent" />
          </button>
        </div>
      </header>
      <div className="flex">
        <ScrollArea className="h-[calc(100vh-var(--header-height))] overflow-auto w-[var(--sidebar-width)] thin-scroll">
          <MainMenus />
        </ScrollArea>
        <main className="w-[calc(100%-var(--sidebar-width))] overflow-hidden rounded-tl-lg">
          <div className="bg-xxbackground h-[calc(100vh-var(--header-height))] overflow-y-scroll thin-scroll flex flex-col shadow">
            <div className="px-3 py-4 mb-1">
              <h1 className="text-2xl font-bold">{t("ManageProjects")}</h1>
            </div>
            <List />
          </div>
        </main>
      </div>
    </div>
  );
}

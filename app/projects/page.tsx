import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ChevronsUpDown,
  FolderKanban,
  Globe,
  House,
  Info,
  Languages,
  Menu,
  Plus,
  SunMoon,
} from "lucide-react";
import MainMenus from "@/components/layouts/main-menus";
import AppCombobox from "@/components/@select/app";
import List from "./list";

export default async function Page() {
  return (
    <div>
      <header className="w-full h-[var(--header-height)] flex">
        <div className="w-[var(--sidebar-width)] h-full flex items-center px-2 gap-2">
          <button className="hover:bg-red-300 p-2 rounded-full">
            <Menu width={20} height={20} />
          </button>
          <img src="https://localhost:3000/logos/main-logo-black.svg" />
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
        <aside className="h-[calc(100vh-var(--header-height))] overflow-auto w-[var(--sidebar-width)] thin-scroll">
          <MainMenus />
        </aside>
        <main className="w-[calc(100%-var(--sidebar-width))] h-[calc(100vh-var(--header-height))] overflow-hidden">
          <div className="bg-xxbackground h-[calc(100vh-var(--header-height))] overflow-y-scroll thin-scroll">
            <div className="px-3 py-2 mb-1">
              <h1 className="text-2xl font-bold">Manage Projects</h1>
            </div>

            <List />
          </div>
        </main>
      </div>
    </div>
  );
}

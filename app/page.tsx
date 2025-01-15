"use client";

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
  Plus,
  SunMoon,
} from "lucide-react";
import MainMenus from "@/components/layouts/main-menus";
import { ScrollArea } from "@/components/ui/scroll-area";

export default async function Home() {
  return (
    <div>
      <header className="w-full bg-xxsurface h-[var(--header-height)] border-b border-xxborder flex">
        <div className="w-[var(--sidebar-width)] border-r border-xxborder h-full flex items-center px-4">
          <img src="https://localhost:3000/logos/main-logo-black.svg" />
        </div>
        <div className="flex h-full items-center px-2">
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
        <ScrollArea className="bg-xxsurface border-r border-xxborder h-[calc(100vh-var(--header-height))] overflow-auto w-[var(--sidebar-width)] thin-scroll">
          <MainMenus />
        </ScrollArea>
        <main className="bg-xxbackground w-[calc(100%-var(--sidebar-width))] h-[calc(100vh-var(--header-height))] overflow-auto thin-scroll">
          <h1 className="text-2xl font-bold">Projects</h1>
          {/* <table className="w-full">
            <thead>
              <tr>
                <th>Project #</th>
                <th>Client</th>
                <th>Project Name</th>
                <th>Manpower</th>
                <th>Date</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Delivery Date</th>
                <th>Added By</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
          </table> */}
          {/* <div className="flex items-center gap-2">
            <Button variant={"secondary"}>Secondary</Button>
            <Button>Primary</Button>
            <Button variant={"outline"}>Outline</Button>
            <Button variant={"destructive"}>Destructive</Button>
            <Button variant={"ghost"}>Ghost</Button>
          </div> */}
        </main>
      </div>
    </div>
  );
}

"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

function Pagination({
  pager,
  onPaginate,
  currPage,
  itemClassName,
  className,
}: {
  pager: string;
  onPaginate: (page: number) => void;
  currPage?: number;
  itemClassName?: string;
  className?: string;
}) {
  const pages = parsePager(pager, currPage);
  const pathname = usePathname();

  if (!Array.isArray(pages)) {
    return <div />;
  }

  if (Array.isArray(pages) && pages.length === 0) {
    return <div />;
  }

  return (
    <div
      className={cn(
        "flex justify-center items-center py-2 px-4 gap-1",
        className
      )}
    >
      {pages.map((item, key) => (
        <a
          key={key}
          onClick={(e: any) => {
            e.preventDefault();
            onPaginate(item.page);
          }}
          href={pathname + item.query}
          className={cn(
            "px-3.5 py-1.5 rounded-md font-medium bg-xxsurface hover:opacity-80",
            itemClassName,
            item.active && "bg-stone-800 text-stone-200"
          )}
        >
          {item.label}
        </a>
      ))}
    </div>
  );
}

export function parsePager(html: string, _currentPage: number = 0) {
  const links: any[] = [];

  if (typeof window !== "undefined") {
    const div = document.createElement("div");
    div.innerHTML = html;

    const anchorTags = Array.from(div.querySelectorAll("a"));

    if (anchorTags.length <= 1) {
      return [];
    }

    anchorTags.forEach((elem, index) => {
      if (!elem) return;

      const url = new URL(elem.href);
      const params = new URLSearchParams(url.search.replace("?", ""));
      const currentPage = params.get("page") || 1;

      const active =
        _currentPage > 0
          ? String(_currentPage) === params.get("page")
          : currentPage == params.get("page");

      let pattern = /[+*\n]|^\d+/g;
      let string = elem.innerText;
      string = string
        .replace(pattern, " ")
        .replace(/[ ]{2,}/g, " ")
        .trim();

      links.push({
        query: "?page=" + params.get("page"),
        label: string,
        page: params.get("page"),
        active: active,
      });
    });
  }

  return links;
}

export function beginScrollDataPagerForInfiniteswr(data: any, currPage = 1) {
  if (data && Array.isArray(data)) {
    const lastDataItem: any = data[data.length - 1];
    if (!lastDataItem) return null;
    const pages = parsePager(lastDataItem.pager, currPage);
    const page: any = pages.find((item: any) => item.active);
    if (!page) return null;
    const lastPage = pages[pages.length - 1];
    const activePagePage = Number(page.page);
    const lastPagePage = Number(lastPage.page);
    if (activePagePage === lastPagePage) return null;
    return activePagePage;
  }
  return null;
}

export default Pagination;

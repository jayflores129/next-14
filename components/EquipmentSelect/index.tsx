"use client";

import { useMemo, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import useSWRInfinite from "swr/infinite";
import { Button } from "../ui/button";
import LoadingMore from "../LoadingMore";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/app/i18n/client";
import { Input } from "../ui/input";
import useAccessToken from "@/hooks/useAccessToken";
import { fetchApi } from "@/api.utils";
import { beginScrollDataPagerForInfiniteswr } from "../Pagination";
import _ from "lodash";
import { useSearchParams } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const EquipmentSelect = ({
  onDoubleClick,
  className,
  title: _title,
  categories: item_categories,
}: {
  onDoubleClick?: (item?: any) => void;
  className?: string;
  title?: string;
  categories?: any;
}) => {
  const { t } = useTranslation();
  const [search, setSearch] = useState<any>("");

  const title = useMemo(() => {
    if (_title) return _title;
    return t("SelectEquipments");
  }, [t, _title]);

  console.log({ item_categories });

  return (
    <>
      <ScrollArea className={cn("text-xxsurface-foreground", className)}>
        {title && <p className="p-3 pb-0 font-medium">{title}</p>}

        <div
          className={cn(
            "flex flex-col gap-2 pb-2 px-3 pt-3",
            _title == " " && "pt-0"
          )}
        >
          <Input
            debounceTimeout={300}
            placeholder={t("Search") + "..."}
            className="rounded-full"
            value={search || ""}
            onChange={(e) => setSearch(e?.target?.value || "")}
          />
        </div>

        <div className="pb-3">
          {search ? (
            <ItemList search={search} onDoubleClick={onDoubleClick} />
          ) : (
            <ul className="flex flex-col gap-1">
              {Array.isArray(item_categories) &&
                item_categories.map((item: any, key: number) => (
                  <CategoryList
                    key={key}
                    text={item.text}
                    childrenContainerClassName="ps-0 ms-2 pt-0"
                  >
                    {Array.isArray(item?.categories) &&
                      item.categories.map((item2: any, key: number) => (
                        <CategoryList
                          key={key}
                          text={item2.text}
                          childrenContainerClassName="ps-0 ms-2 pt-0"
                        >
                          {Array.isArray(item2?.sub_categories) &&
                            item2.sub_categories.map(
                              (item3: any, key: number) => (
                                <CategoryList
                                  key={key}
                                  text={item3.text}
                                  childrenContainerClassName="ps-0 ms-2 pt-0"
                                >
                                  <ItemList
                                    item_sub_category_id={item3.id}
                                    search={search || ""}
                                    onDoubleClick={onDoubleClick}
                                  />
                                </CategoryList>
                              )
                            )}
                        </CategoryList>
                      ))}
                  </CategoryList>
                ))}
            </ul>
          )}
        </div>
      </ScrollArea>
    </>
  );
};

export default EquipmentSelect;

const ItemList = ({
  item_sub_category_id = null,
  search = null,
  onDoubleClick,
}: {
  item_sub_category_id?: any;
  search?: any;
  onDoubleClick?: (item?: any) => void;
}) => {
  const access_token = useAccessToken();
  const { t } = useTranslation();
  const searchParams = useSearchParams();

  const { data, isLoading, error, size, setSize, isValidating } =
    useSWRInfinite(
      (index) => {
        let param: any = {};
        param["page"] = index + 1;

        if (search) param.search = search;
        if (item_sub_category_id)
          param.item_sub_category_id = item_sub_category_id;

        let searchParams = new URLSearchParams(param);
        return [
          !open ? null : `/api/select/item?${searchParams.toString()}`,
          access_token,
        ];
      },
      fetchApi,
      {
        revalidateIfStale: false,
        revalidateOnFocus: false,
      }
    );

  const _data: any = data ? [].concat(...data) : [];
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");

  const currentPage = beginScrollDataPagerForInfiniteswr(_data, size);

  const onLoadMore = () => {
    if (currentPage) setSize(currentPage + 1);
  };

  if (
    Array.isArray(_data) &&
    Array.isArray(_data[0]?.list) &&
    _data[0].list.length === 0
  )
    return <span className="opacity-60 p-2">{t("NoRecordsFound")}</span>;

  return (
    <>
      <ul
        className={cn(
          "flex flex-col gap-1 pe-1",
          search && "px-3 gap-2 py-0 pe-3"
        )}
      >
        {Array.isArray(_data) &&
          _data.map((data: any) => {
            return (
              Array.isArray(data?.list) &&
              data.list.map((item: any, key: number) => (
                <li className="flex group" key={key}>
                  <button
                    className={cn(
                      "flex gap-2 bg-xxsurface hover:opacity-80 px-3 py-2 ps-2 w-full text-left rounded-e-sm border-l-4 border-l-transparent",
                      search && "rounded-s-sm",
                      searchParams.get("id") === item._item_id &&
                        "border-l-4 border-l-red-500 bg-gray-200/70"
                    )}
                    onDoubleClick={() => onDoubleClick && onDoubleClick(item)}
                    title="Double click to add"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="text-red-400 text-[0.8em] font-medium">
                        {item._item_number}
                      </span>
                      <span className="font-medium">{item.text}</span>
                      {search && (
                        <div className="flex items-center gap-1 text-xxsurface-foreground/70">
                          <span
                            className="text-[0.8em]"
                            title={item.item_main_category_name}
                          >
                            {_.truncate(item.item_main_category_name || "", {
                              length: 18,
                            })}
                          </span>
                          <ChevronRight className="w-[12px] h-[12px]" />
                          <span
                            className="text-[0.8em]"
                            title={item.item_category_name}
                          >
                            {_.truncate(item.item_category_name || "", {
                              length: 18,
                            })}
                          </span>
                          <ChevronRight className="w-[12px] h-[12px]" />
                          <span
                            className="text-[0.8em]"
                            title={item.item_sub_category_name}
                          >
                            {_.truncate(item.item_sub_category_name || "", {
                              length: 18,
                            })}
                          </span>
                        </div>
                      )}
                    </div>
                  </button>
                </li>
              ))
            );
          })}
      </ul>
      {isLoadingMore && (
        <div className="pb-2">
          <LoadingMore />
        </div>
      )}
      {!isLoadingMore && currentPage && (
        <div className="flex justify-center mb-1" onClick={onLoadMore}>
          <Button variant={"outline"} className="rounded">
            {t("LoadMore")}
          </Button>
        </div>
      )}
    </>
  );
};

const CategoryList = ({
  text,
  children,
  childrenContainerClassName,
}: {
  text?: any;
  children?: React.ReactNode;
  childrenContainerClassName?: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <li className={cn("flex relative flex-col", open && "")}>
      <div className="flex">
        <button
          className={cn(
            "flex items-start w-full p-2.5 pe-2 ps-2 justify-between text-left gap-1 hover:bg-xxmenuHover/50 dark:hover:bg-xxmenuHover rounded-md"
          )}
          onClick={() => setOpen(!open)}
        >
          {!open && <ChevronRight className="w-[20px] h-[20px] text-red-600" />}
          {open && <ChevronDown className="w-[20px] h-[20px] text-red-600" />}
          <span className={cn("w-[calc(100%-20px)]", open && "font-medium")}>
            {text}
          </span>
        </button>
      </div>
      {open && (
        <div
          className={cn(
            "ps-1.5 flex flex-col",
            open &&
              "border-l border-xxborder/40 border-t border-b rounded-l-md",
            childrenContainerClassName
          )}
        >
          {children}
        </div>
      )}
    </li>
  );
};

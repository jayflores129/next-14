import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React, {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import useSWRInfinite from "swr/infinite";
import { cn } from "@/lib/utils";
import { ChevronDown, X } from "lucide-react";
import { DebounceInput } from "react-debounce-input";
import { fetchApi } from "@/api.utils";
import { beginScrollDataPagerForInfiniteswr } from "../Pagination";
import { useSession } from "next-auth/react";
import { useTranslation } from "@/app/i18n/client";
import LoadingMore from "../LoadingMore";

type DefaultValue = { id?: any; text?: any };

const ApiCombobox = ({
  value,
  onChangeItem,
  render: _render,
  className,
  params,
  disabled,
  uri,
  itemNameKey = "text",
  placeholder,
  outlined = true,
  allowInputValue = false,
  error: formError,
  modal,
}: {
  value?: DefaultValue | null;
  onChangeItem?: (value: any) => void;
  render?: (item?: DefaultValue | any, active?: boolean) => React.ReactNode;
  className?: string;
  params?: any;
  disabled?: boolean;
  uri: any;
  itemNameKey?: any;
  placeholder?: string;
  outlined?: boolean;
  allowInputValue?: boolean;
  error?: any;
  modal?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState<any>(null);
  const [triggerWidth, setTriggerWidth] = useState<any>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [inputValue, setInputValue] = useState<any>(null);
  const [inputHeight, setInputHeight] = useState(0);
  const inputRef = useRef(null);
  const { data: session }: any = useSession();
  const { t } = useTranslation();

  const {
    data,
    isLoading,
    error: _errorFetch,
    size,
    setSize,
  } = useSWRInfinite(
    (index) => {
      let _paramsObj: any = {};
      _paramsObj["page"] = index + 1;

      if (searchValue) {
        _paramsObj["search"] = searchValue;
      }

      if (value?.id) _paramsObj["first"] = value.id;

      if (params) {
        for (let [key, value] of Object.entries(params)) {
          if (value) _paramsObj[key] = value;
        }
      }

      let searchParams = new URLSearchParams(_paramsObj);

      return [
        open &&
          session?.access_token &&
          `/api/select/${uri}?${searchParams.toString()}`,
        session?.access_token,
      ];
    },
    fetchApi,
    {
      revalidateFirstPage: true,
      revalidateIfStale: true,
      revalidateOnFocus: true,
    }
  );

  const _data: any = useMemo(() => (data ? [].concat(...data) : []), [data]);
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");

  const currentPage = beginScrollDataPagerForInfiniteswr(_data, size);

  const mapp = useCallback(
    (item: any) => ({
      ...item,
      ref: createRef(),
    }),
    []
  );

  const mergedData = useMemo(() => {
    const lists = [];
    if (Array.isArray(_data)) {
      for (let i = 0; i < _data.length; i++) {
        if (Array.isArray(_data[i].list)) {
          lists.push(..._data[i].list);
        }
      }
    }
    return lists.map(mapp);
  }, [_data, mapp]);

  const onSelectItem = (item: any) => {
    onChangeItem && onChangeItem(item);
    setOpen(false);
  };

  const onClearItem = () => {
    onSelectItem(null);
    setSearchValue(null);
    setInputValue(null);
  };

  const onChangeInput = (e: any) => {
    const __value = (e.target?.value || "").trim().replace(/\s+/g, " ");
    setSearchValue(__value);
    setInputValue(__value);

    if (allowInputValue) {
      onChangeItem &&
        onChangeItem({ ...value, [itemNameKey]: e.target.value, id: null });
    }
  };

  const render = (item: any) => {
    return (
      <button
        ref={item.ref}
        className={cn(
          "focus:bg-xxmenuHover/50 outline-1 w-full",
          value?.id == item?.id && "border-l-[3px] border-l-red-500"
        )}
        onClick={() => onSelectItem(item)}
      >
        {_render ? (
          _render(item)
        ) : (
          <div
            className={cn(
              "text-left hover:bg-xxmenuHover/50 dark:hover:bg-xxmenuHover px-2 py-1.5 w-full transition-[border] duration-100 flex items-center justify-between outline-none cursor-pointer rounded-md"
            )}
          >
            <div className="flex items-center gap-2">
              <span>{item?.[itemNameKey] || ""}</span>
            </div>
          </div>
        )}
      </button>
    );
  };

  const onkeyDown = (ev: any) => {
    if (!open) return;
    if (ev.key === "ArrowDown") {
      ev.preventDefault();
      setFocusedIndex((index) => (index + 1) % mergedData.length);
    } else if (ev.key === "ArrowUp") {
      ev.preventDefault();
      setFocusedIndex((index) => {
        if (index - 1 === -1) return mergedData.length - 1;
        return (index - 1) % mergedData.length;
      });
    }
  };

  useEffect(() => {
    setInputValue((value as any)?.[itemNameKey] ?? (value as any)?.text);
  }, [value, itemNameKey]);

  useEffect(() => {
    if (mergedData?.[focusedIndex]) {
      mergedData[focusedIndex]?.ref?.current?.focus();
    }
  }, [mergedData, focusedIndex]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const mouseEvent = new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
          });
          entry.target.dispatchEvent(mouseEvent);
        }
      });
    });

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [isLoading, loaderRef.current]);

  return (
    <div className="flex flex-col gap-1">
      <div
        className={cn(
          "flex items-center w-full rounded-md bg-transparent border overflow-hidden h-[35px] !p-0",
          outlined &&
            "focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
          className,
          formError && "ring-2 ring-ring ring-offset-2 ring-red-300"
        )}
        ref={(el) => {
          const elRect: any = el?.getBoundingClientRect();
          setTriggerWidth(elRect?.width);
          setInputHeight(elRect?.height);
        }}
        onKeyDown={onkeyDown}
      >
        <Popover
          modal={modal}
          open={open}
          onOpenChange={(open) => {
            if (!open) {
              setSearchValue("");
              setFocusedIndex(-1);
            }
          }}
        >
          <PopoverTrigger disabled={disabled} className="w-full">
            <div>
              <DebounceInput
                placeholder={placeholder || t("Select")}
                className={cn(
                  "ps-2.5 w-full outline-0 bg-transparent",
                  disabled && "cursor-not-allowed"
                )}
                style={{ height: inputHeight + "px" }}
                value={inputValue || ""}
                onChange={onChangeInput}
                debounceTimeout={300}
                disabled={disabled}
                inputRef={inputRef}
                onFocus={() => setOpen(true)}
              />
            </div>
          </PopoverTrigger>
          <div className="me-1.5 flex items-center">
            {value?.id ? (
              <button
                type="button"
                className={cn(
                  "rounded p-[2px] hover:bg-gray-300 cursor-default outline-none",
                  disabled && "opacity-30 pointer-events-none"
                )}
                title={searchValue ? "Remove" : undefined}
                onClick={onClearItem}
                disabled={disabled}
              >
                <X className={cn("w-[14px] h-[14px] text-gray-500")} />
              </button>
            ) : (
              <button
                type="button"
                className={cn(
                  "rounded p-[2px] hover:bg-gray-300 cursor-default outline-none",
                  disabled && "opacity-30 pointer-events-none"
                )}
                onClick={() => setOpen(true)}
                disabled={disabled}
              >
                <ChevronDown
                  className={cn("w-[14px] h-[14px] text-gray-500")}
                />
              </button>
            )}
          </div>

          <PopoverContent
            align="start"
            onOpenAutoFocus={(e) => e.preventDefault()}
            className={cn(
              "thin-scroll min-h-[200px] rounded-md p-1 thin-scroll max-h-[400px] overflow-auto border-xxborder shadow"
            )}
            style={{ minWidth: triggerWidth + "px" }}
            onInteractOutside={(e) => {
              if (e.target !== inputRef.current) setOpen(false);
            }}
          >
            {mergedData?.map((item: any, key: number) => (
              <React.Fragment key={key}>{render(item)}</React.Fragment>
            ))}
            {open &&
              !isLoading &&
              Array.isArray(mergedData) &&
              mergedData.length === 0 && (
                <p className="text-center opacity-60">{t("NoData")}</p>
              )}

            {open && isLoadingMore && (
              <div className="flex flex-col gap-2 items-center py-2 pointer-events-none">
                <LoadingMore className="py-1" />
              </div>
            )}
            <div
              ref={loaderRef}
              className="h-[5px]"
              onClick={() => {
                if (!isLoadingMore && currentPage) {
                  setSize(size + 1);
                }
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      {formError && (
        <span className="text-red-500 px-1 mt-1 flex">
          {formError?.message}
        </span>
      )}
    </div>
  );
};

export default ApiCombobox;

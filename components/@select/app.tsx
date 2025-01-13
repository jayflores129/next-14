"use client";

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
import { cn } from "@/lib/utils";
import { ChevronDown, X } from "lucide-react";
import { DebounceInput } from "react-debounce-input";
import Fuse from "fuse.js";
import { useSession } from "next-auth/react";

type DefaultValue = { id?: any; text?: any };

const AppCombobox = ({
  value,
  onChangeItem,
  render: _render,
  className,
  disabled,
  options: _options,
  placeholder,
  outlined = true,
  allowInputValue,
  error: formError,
  popoverContentClassName,
}: {
  value?: DefaultValue | null;
  onChangeItem?: (value: any) => void;
  render?: (item?: DefaultValue | any, active?: boolean) => React.ReactNode;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  outlined?: boolean;
  options: DefaultValue[];
  allowInputValue?: boolean;
  error?: any;
  popoverContentClassName?: any;
}) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState<any>(null);
  const [triggerWidth, setTriggerWidth] = useState<any>(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [inputValue, setInputValue] = useState<any>(null);
  const [inputHeight, setInputHeight] = useState(0);
  const [options, setOptions] = useState<any>([]);
  const inputRef = useRef(null);

  const mapp = useCallback(
    (item: any) => ({
      ...item,
      ref: createRef(),
    }),
    []
  );

  const mergedData = useMemo(() => {
    const lists = [...options];
    return lists.map(mapp);
  }, [options, mapp]);

  const onSelectItem = (item: any) => {
    onChangeItem && onChangeItem(item);
    setOpen(false);
  };

  const onClearItem = () => {
    onSelectItem(null);
    setSearchValue(null);
    setInputValue(null);
  };

  const onSearch = (e: any) => {
    setSearchValue(e.target.value);
    const __value = (e.target?.value || "").trim().replace(/\s+/g, " ");
    setInputValue(__value);

    const fuse = new Fuse(_options as any, {
      keys: ["text"],
    });
    const rv = fuse
      ?.search(e.target.value)
      ?.map((list: any) => list.item)
      .map(mapp);

    const searchResult = rv.length > 0 ? rv : _options?.map(mapp);
    setOptions(searchResult);

    if (allowInputValue) {
      onChangeItem && onChangeItem({ ...value, text: e.target.value });
    }
  };

  const render = (item: any) => {
    return (
      <button
        ref={item.ref}
        className={cn(
          "focus:bg-xxmenuHover outline-1 w-full",
          value?.id == item?.id && "border-l-[3px] border-l-red-500"
        )}
        onClick={() => onSelectItem(item)}
      >
        {_render ? (
          _render(item)
        ) : (
          <div
            className={cn(
              "text-left hover:bg-xxmenuHover/50 dark:hover:bg-xxmenuHover px-2.5 py-1.5 w-full transition-[border] duration-100 flex items-center justify-between outline-none cursor-pointer rounded-md"
            )}
          >
            <div className="flex items-center gap-2">
              <span>{item?.text || ""}</span>
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
    if (value) setInputValue((value as any)?.text);
  }, [value]);

  useEffect(() => {
    if (mergedData?.[focusedIndex]) {
      mergedData[focusedIndex]?.ref?.current?.focus();
    }
  }, [mergedData, focusedIndex]);

  useEffect(() => {
    if (Array.isArray(_options)) {
      setOptions(_options?.map(mapp));
    }
  }, [_options, mapp]);

  return (
    <div className="flex flex-col gap-1">
      <div
        className={cn(
          "flex items-center w-full bg-xxsurface rounded-md overflow-hidden h-[35px] !p-0",
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
          open={open}
          onOpenChange={(open) => {
            if (!open) {
              setOptions(_options?.map(mapp));
              setFocusedIndex(-1);
            }
          }}
        >
          <PopoverTrigger disabled={disabled} className="w-full">
            <DebounceInput
              placeholder={placeholder || "Select"}
              className={cn(
                "ps-2.5 w-full outline-0 bg-transparent placeholder:text-xxsurface-foreground",
                disabled && "cursor-not-allowed"
              )}
              style={{ height: inputHeight + "px" }}
              value={inputValue || ""}
              onChange={onSearch}
              debounceTimeout={300}
              disabled={disabled}
              inputRef={inputRef}
              onFocus={() => setOpen(true)}
            />
          </PopoverTrigger>
          <div className="me-1.5 flex items-center">
            {value?.id ? (
              <button
                type="button"
                className={cn(
                  "rounded p-[2px] hover:bg-xxsurface/60 cursor-default outline-none",
                  disabled && "opacity-30 pointer-events-none"
                )}
                title={searchValue ? "Remove" : undefined}
                onClick={onClearItem}
                disabled={disabled}
              >
                <X
                  className={cn("w-[14px] h-[14px] text-xxsurface-foreground")}
                />
              </button>
            ) : (
              <button
                type="button"
                className={cn(
                  "rounded p-[2px] hover:bg-xxsurface/60 cursor-default outline-none",
                  disabled && "opacity-30 pointer-events-none"
                )}
                onClick={() => setOpen(true)}
                disabled={disabled}
              >
                <ChevronDown
                  className={cn(
                    "w-[14px] h-[14px] text-xxsurface-foreground/60"
                  )}
                />
              </button>
            )}
          </div>

          <PopoverContent
            align="start"
            onOpenAutoFocus={(e) => e.preventDefault()}
            className={cn(
              "rounded-md p-1.5 thin-scroll max-h-[400px] overflow-auto border-xxborder shadow",
              popoverContentClassName
            )}
            style={{ minWidth: triggerWidth + "px" }}
            onInteractOutside={(e) => {
              if (e.target !== inputRef.current) setOpen(false);
            }}
          >
            {mergedData?.map((item: any, key: number) => (
              <React.Fragment key={key}>{render(item)}</React.Fragment>
            ))}
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

export default AppCombobox;

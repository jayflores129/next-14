"use client";

import { cn } from "@/lib/utils";

export const Table = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableElement>) => {
  return (
    <table
      className={cn("w-full text-xxsurface-foreground", className)}
      {...props}
    />
  );
};

export const THead = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) => {
  return <thead className={cn("bg-xxsurface/50", className)} {...props} />;
};

export const TBody = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) => {
  return <tbody className={cn(className)} {...props} />;
};

export const TD = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableCellElement>) => {
  return <td className={cn("py-2 px-2 align-top", className)} {...props} />;
};

export const TH = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableCellElement>) => {
  return (
    <th
      className={cn("py-1 px-2 text-[0.9em] text-left", className)}
      {...props}
    />
  );
};

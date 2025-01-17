"use client";

import { useTranslation } from "@/app/i18n/client";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function LoadingMore({ className }: { className?: string }) {
  const { t } = useTranslation();

  return (
    <>
      <div
        className={cn("flex items-center gap-2 pt-4 justify-center", className)}
      >
        <Image
          width={20}
          height={20}
          alt="Loading"
          src="/images/icons8-loading.gif"
        />
        <span>{t("Loading")}...</span>
      </div>
    </>
  );
}

"use client";
import { useTranslation } from "@/app/i18n/client";
import ApiCombobox from "@/components/@select/api";
import AppCombobox from "@/components/@select/app";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ACTIVE, CANCELLED, CLOSED, iconStrokeWidth } from "@/lib/utils";
import { ListFilter } from "lucide-react";

const statusOptions = [ACTIVE, CANCELLED, CLOSED].map((text: any) => ({
  text: <span className="capitalize">{text}</span>,
  id: text,
}));

export default function FilterButton() {
  const { t } = useTranslation();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-[30px]" variant={"outline"}>
          <ListFilter width={20} height={20} strokeWidth={iconStrokeWidth} />
          <span>{t("AdvanceFilter")}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[500px] text-xxbackground-foreground">
        <DialogHeader>
          <DialogTitle>{t("AdvanceFilter")}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-1">
          <p className="font-medium">{t("DateAdded")} (From - To)</p>
          <div className="flex items-center gap-2">
            <Input type="date" className="w-1/2 block" />
            <Input type="date" className="w-1/2 block" />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-medium">
            {t("StartDate")} - {t("EndDate")}
          </p>
          <div className="flex items-center gap-2">
            <Input type="date" className="w-1/2 block" />
            <Input type="date" className="w-1/2 block" />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-medium">{t("Company")}</p>
          <ApiCombobox uri="company" modal />
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-medium">{t("ProjectType")}</p>
          <ApiCombobox uri="project_type" modal />
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-medium">{t("Industry")}</p>
          <ApiCombobox uri="cms_industry" modal />
        </div>

        <div className="flex flex-col gap-1">
          <p className="font-medium">{t("Status")}</p>
          <AppCombobox options={statusOptions} />
        </div>

        <DialogFooter>
          <Button type="button" variant={"outline"}>
            {t("Cancel")}
          </Button>
          <Button type="button">{t("Filter")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

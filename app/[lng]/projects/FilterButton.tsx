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
import { useFilter } from "@/context/FilterContext";
import { ACTIVE, CANCELLED, CLOSED, iconStrokeWidth } from "@/lib/utils";
import { ListFilter } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const statusOptions = [ACTIVE, CANCELLED, CLOSED].map((text: any) => ({
  text: <span className="capitalize">{text}</span>,
  id: text,
}));

export default function FilterButton() {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const filter_project_type = useFilter("project_type");
  const filter_company = useFilter("company");
  const filter_cms_industry = useFilter("cms_industry");

  const [filterPayload, setFilterPayload] = useState<any>({
    to: searchParams.get("to") || "",
    from: searchParams.get("from") || "",
    start: searchParams.get("start") || "",
    end: searchParams.get("end") || "",
  });

  const [project_type, set_project_type] = useState<any>(filter_project_type);
  const [company, set_company] = useState<any>(filter_company);
  const [cms_industry, set_cms_industry] = useState<any>(filter_cms_industry);

  const onChangeInput = (type: any, value: any) => {
    setFilterPayload((prev: any) => ({ ...prev, [type]: value }));
  };

  const onFilter = () => {
    const _searchParams = new URLSearchParams(searchParams);

    for (const key in filterPayload) {
      if (filterPayload[key]) {
        _searchParams.set(key, filterPayload[key]);
      } else {
        _searchParams.delete(key);
      }
    }

    router.push(`${pathname}?${_searchParams.toString()}`);
  };

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
            <Input
              type="date"
              className="w-1/2 block"
              value={filterPayload?.from || ""}
              onChange={(e) => onChangeInput("from", e.target.value)}
            />
            <Input
              type="date"
              className="w-1/2 block"
              value={filterPayload?.to || ""}
              onChange={(e) => onChangeInput("to", e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-medium">
            {t("StartDate")} - {t("EndDate")}
          </p>
          <div className="flex items-center gap-2">
            <Input
              type="date"
              className="w-1/2 block"
              value={filterPayload?.start || ""}
              onChange={(e) => onChangeInput("start", e.target.value)}
            />
            <Input
              type="date"
              className="w-1/2 block"
              value={filterPayload?.end || ""}
              onChange={(e) => onChangeInput("end", e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-medium">{t("Company")}</p>
          <ApiCombobox
            uri="company"
            modal
            value={company}
            onChangeItem={(item) => {
              set_company(item);
              onChangeInput("company", item.id);
            }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-medium">{t("ProjectType")}</p>
          <ApiCombobox
            uri="project_type"
            modal
            value={project_type}
            onChangeItem={(item) => {
              set_project_type(item);
              onChangeInput("type", item.id);
            }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-medium">{t("Industry")}</p>
          <ApiCombobox
            uri="cms_industry"
            modal
            value={cms_industry}
            onChangeItem={(item) => {
              set_cms_industry(item);
              onChangeInput("industry_id", item.id);
            }}
          />
        </div>

        <div className="flex flex-col gap-1">
          <p className="font-medium">{t("Status")}</p>
          <AppCombobox
            options={statusOptions}
            onChangeItem={(item) => onChangeInput("status", item.id)}
          />
        </div>

        <DialogFooter>
          <Button type="button" variant={"outline"}>
            {t("Cancel")}
          </Button>
          <Button type="button" onClick={onFilter}>
            {t("Filter")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

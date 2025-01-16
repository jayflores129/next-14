"use client";
import { fetchApi } from "@/api.utils";
import { useTranslation } from "@/app/i18n/client";
import AppCombobox from "@/components/@select/app";
import DropdownMenu from "@/components/DropdownMenu";
import Pagination from "@/components/Pagination";
import StatusChip from "@/components/StatusChip";
import { Table, TBody, TD, TH, THead } from "@/components/Table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  ArrowRightLeft,
  Download,
  FileChartPie,
  Images,
  ListFilter,
  Pencil,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import useSWR from "swr";

import FilterButton from "./FilterButton";

const address = (row: any) => {
  let rows = [
    row.cms_address_building || null,
    row.cms_address_street || null,
    row.cms_address_zip || null,
    row.cms_address_city || null,
    row.cms_address_province || null,
    row.country_cms_address_country || null,
  ];
  return rows.filter((loc: any) => loc !== null).join(", ");
};

const sortBy = [
  {
    text: "Project Number",
    id: "number",
  },
  {
    text: "Client",
    id: "client",
  },
  {
    text: "Description",
    id: "description",
  },
  {
    text: "Date",
    id: "date",
  },
  {
    text: "Added By",
    id: "added_by",
  },
];

const orderBy = ["DESC", "ASC"].map((text: any) => ({
  text,
  id: text,
}));

export default function List({ lng }: { lng: any }) {
  const { data: session }: any = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const { t } = useTranslation(lng);

  const payload = useMemo(() => {
    const _payload: any = {};

    _payload.page = searchParams.get("page") || 1;

    for (let [key, value] of searchParams) {
      if (value) _payload[key] = value;
    }

    return _payload;
  }, [searchParams]);

  const { data, isLoading, error, mutate } = useSWR(
    [
      session?.access_token &&
        `/api/projects?${new URLSearchParams(payload).toString()}`,
      session?.access_token,
    ],
    fetchApi,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
    }
  );

  const sortValue = useMemo(() => {
    const values: any = {};

    if (searchParams.get("arrange")) {
      const sort = sortBy?.find(
        (item: any) => item.id == searchParams.get("arrange")
      );
      values.sort = sort;
    }

    if (searchParams.get("sort")) {
      const order = orderBy?.find(
        (item: any) => item.id == searchParams.get("sort")
      );
      values.order = order;
    }

    return values;
  }, [searchParams]);

  const onPaginate = (_page: any) => {
    const _searchParams = new URLSearchParams(searchParams.toString());
    _searchParams.set("page", _page);
    const href = `${pathname}?${_searchParams.toString()}`;
    router.push(href);
  };

  const onSearch = (searchValue: any) => {
    const _searchParams = new URLSearchParams({ search: searchValue });
    const href = `${pathname}?${_searchParams.toString()}`;
    router.push(href);
  };

  const onSort = (sortBy?: any, orderBy?: any) => {
    const _searchParams = new URLSearchParams(searchParams.toString());

    _searchParams.set("arrange", sortBy || "");
    _searchParams.set("sort", orderBy || "");

    const href = `${pathname}?${_searchParams.toString()}`;
    router.push(href);
  };

  return (
    <>
      <div className="flex items-center justify-between pe-2 mb-3">
        <div className="flex items-center gap-2 px-3">
          <AppCombobox
            placeholder={t("SortBy")}
            options={sortBy}
            className="w-[140px] h-[30px]"
            popoverContentClassName="max-w-[140px]"
            onChangeItem={(item) =>
              onSort(item?.id || "", searchParams.get("sort"))
            }
            value={sortValue?.sort}
          />
          <AppCombobox
            placeholder={t("Order By")}
            options={orderBy}
            className="w-[95px] h-[30px]"
            popoverContentClassName="max-w-[95px]"
            onChangeItem={(item) =>
              onSort(searchParams.get("arrange"), item?.id || "")
            }
            value={sortValue?.order}
          />
          <FilterButton />

          <div className="bg-xxborder w-[1px] h-[20px]" />
          <Button className="h-[30px]">
            <Download width={20} height={20} />
            <span>{t("Export")}</span>
          </Button>
          <Button className="h-[30px]" variant="secondary">
            <Images width={20} height={20} />
            <span>{t("Gallery")}</span>
          </Button>
        </div>
        <div>
          <Input
            type="search"
            className="h-[34px] w-[300px]"
            placeholder={t("Search")}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              onSearch(e.target.value);
            }}
            debounceTimeout={300}
          />
        </div>
      </div>
      <Table>
        <THead>
          <tr>
            <TH className="font-medium ps-4">{t("Project")} #</TH>
            <TH className="font-medium">{t("Client")}</TH>
            <TH className="font-medium"> {t("ProjectName")}</TH>
            <TH className="font-medium">{t("Manpower")}</TH>
            <TH className="font-medium w-[100px]">{t("Date")}</TH>
            <TH className="font-medium w-[100px]">{t("StartDate")}</TH>
            <TH className="font-medium w-[100px]">{t("EndDate")}</TH>
            <TH className="font-medium w-[100px]">{t("DeliveryDate")}</TH>
            <TH className="font-medium">{t("AddedBy")}</TH>
            <TH className="font-medium">{t("Status")}</TH>
            <TH className="font-medium pe-4 text-right">{t("Actions")}</TH>
          </tr>
        </THead>
        <TBody>
          {Array.isArray(data?.projects) &&
            data.projects.map((proj: any, key: number) => (
              <tr
                key={key}
                className="border-b border-xxtableBorder hover:bg-xxtableHover"
              >
                <TD className="text-blue-700 font-medium ps-4">
                  {proj.project_number}
                </TD>
                <TD>
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">{proj.cms_name}</span>
                    <span title={address(proj)}>{address(proj)}</span>
                  </div>
                </TD>
                <TD className="font-medium">{proj.project_name}</TD>
                <TD>{proj.project_man_power}</TD>
                <TD>{proj.added_date}</TD>
                <TD>{proj.project_start_date}</TD>
                <TD>{proj.project_end_date}</TD>
                <TD>{proj.project_delivery_date}</TD>
                <TD>
                  {proj.user_firstname} {proj.user_lastname}
                </TD>
                <TD>
                  <StatusChip status={proj.project_status} />
                </TD>
                <TD className="pe-4 text-right">
                  <DropdownMenu
                    menus={[
                      {
                        text: t("View"),
                        Icon: ArrowRight,
                        href: "https://hotware.app/projects",
                        target: "_blank",
                      },
                      null,
                      {
                        text: t("Update"),
                        Icon: Pencil,
                        href: "/",
                      },
                      {
                        text: t("CreateShippingList"),
                        Icon: FileChartPie,
                        href: "/",
                      },
                      {
                        text: t("ChangeStatus"),
                        Icon: ArrowRightLeft,
                        href: "/",
                      },
                    ]}
                  />
                </TD>
              </tr>
            ))}
        </TBody>
      </Table>
      <div className="flex items-center justify-between ps-4 py-2 mt-auto">
        <p className="text-xxsecondary-foreground">
          Total: {data?.total_list} items
        </p>
        <Pagination
          pager={data?.pager}
          onPaginate={onPaginate}
          currPage={payload.page}
        />
      </div>
    </>
  );
}

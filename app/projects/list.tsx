"use client";
import { fetchApi } from "@/api.utils";
import AppCombobox from "@/components/@select/app";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Images, ListFilter } from "lucide-react";
import { useSession } from "next-auth/react";
import { DebounceInput } from "react-debounce-input";
import useSWR from "swr";

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

export default function List() {
  const { data: session }: any = useSession();

  console.log(session?.access_token);

  const { data, isLoading, error, mutate } = useSWR(
    [session?.access_token && `/api/projects`, session?.access_token],
    fetchApi,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
    }
  );

  return (
    <>
      <div className="flex items-center justify-between pe-2 mb-3">
        <div className="flex items-center gap-2 px-3">
          <AppCombobox
            placeholder="Sort by"
            options={[
              "Project Number",
              "Client",
              "Description",
              "Date",
              "Added By",
            ].map((text: any) => ({ text, id: text }))}
            className="w-[120px] h-[30px] rounded-md bg-transparent border"
            popoverContentClassName="max-w-[140px]"
          />
          <AppCombobox
            placeholder="Order By"
            options={["DESC", "ASC"].map((text: any) => ({
              text,
              id: String(text).toLowerCase(),
            }))}
            className="w-[95px] h-[30px] rounded-md bg-transparent border"
            popoverContentClassName="max-w-[95px]"
          />
          <Button className="h-[30px]" variant={"outline"}>
            <ListFilter width={20} height={20} />
            <span>Advance Filter</span>
          </Button>
          <div className="bg-xxborder w-[1px] h-[20px]" />
          <Button className="h-[30px]">
            <Download width={20} height={20} />
            <span>Export</span>
          </Button>
          <Button className="h-[30px]" variant="secondary">
            <Images width={20} height={20} />
            <span>Gallery</span>
          </Button>
        </div>
        <div>
          <Input
            type="search"
            className="h-[34px] w-[300px]"
            placeholder="Search"
          />
        </div>
      </div>
      <table className="w-full text-xxsurface-foreground">
        <thead className="bg-xxsurface/50">
          <tr>
            <td className="py-1 px-2 text-[0.9em] font-medium ps-4">
              Project #
            </td>
            <td className="py-1 px-2 text-[0.9em] font-medium">Client</td>
            <td className="py-1 px-2 text-[0.9em] font-medium">Project Name</td>
            <td className="py-1 px-2 text-[0.9em] font-medium">Manpower</td>
            <td className="py-1 px-2 text-[0.9em] font-medium w-[100px]">
              Date
            </td>
            <td className="py-1 px-2 text-[0.9em] font-medium w-[100px]">
              Start Date
            </td>
            <td className="py-1 px-2 text-[0.9em] font-medium w-[100px]">
              End Date
            </td>
            <td className="py-1 px-2 text-[0.9em] font-medium w-[100px]">
              Delivery Date
            </td>
            <td className="py-1 px-2 text-[0.9em] font-medium">Added By</td>
            <td className="py-1 px-2 text-[0.9em] font-medium">Status</td>
            <td className="py-1 px-2 text-[0.9em] font-medium">Action</td>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data?.projects) &&
            data.projects.map((proj: any, key: number) => (
              <tr key={key} className="border-b last:border-b-0">
                <td className="py-2  px-2 text-blue-600 font-medium ps-4 align-top">
                  {proj.project_number}
                </td>
                <td className="py-2 px-2 align-top">
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">{proj.cms_name}</span>
                    <span title={address(proj)} className="">
                      {address(proj)}
                    </span>
                  </div>
                </td>
                <td className="py-2 px-2 font-medium align-top">
                  {proj.project_name}
                </td>
                <td className="py-2 px-2 align-top">
                  {proj.project_man_power}
                </td>
                <td className="py-2 px-2 align-top">{proj.added_date}</td>
                <td className="py-2 px-2 align-top">
                  {proj.project_start_date}
                </td>
                <td className="py-2 px-2 align-top">{proj.project_end_date}</td>
                <td className="py-2 px-2 align-top">
                  {proj.project_delivery_date}
                </td>
                <td className="py-2 px-2 align-top">
                  {proj.user_firstname} {proj.user_lastname}
                </td>
                <td className="py-2 px-2 align-top">
                  {proj.project_type_status}
                </td>
                <td className="py-2 px-2 align-top"></td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

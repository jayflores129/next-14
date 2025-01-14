"use client";
import { statuses } from "@/lib/utils";

export default function StatusChip({ status: statusName }: { status: any }) {
  if (!statuses[statusName])
    return <div className="capitalize">{statusName}</div>;

  return (
    <div
      style={{ ["--color" as any]: statuses[statusName].color }}
      className="bg-[rgb(var(--color))] text-white py-0.5 px-2 text-[0.95em] capitalize rounded-[3px] w-fit"
    >
      {statuses[statusName]?.name}
    </div>
  );
}

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const ACTIVE = "active";
export const SHIPPED = "shipped";
export const RETURNED = "returned";
export const CLOSED = "closed";
export const CANCELLED = "cancelled";
export const OPEN = "open";
export const WON = "won";
export const LOST = "lost";
export const APPROVED = "approved";
export const APPROVAL = "approval";
export const DECLINED = "declined";
export const PAID = "paid";
export const BOOKED = "booked";
export const UNBOOKED = "unbooked";
export const NO = "no";
export const YES = "yes";
export const RECEIVED = "received";
export const EQUIPMENT = "equipment";
export const IS_SET = "is_set";

export const statuses: any = {
  [ACTIVE]: {
    name: "Active",
    color: "34, 197, 94",
  },
  [SHIPPED]: {
    name: "Shipped",
    color: "248, 113, 113",
  },
  [RETURNED]: {
    name: "Returned",
    color: "253, 186, 116",
  },
  [CLOSED]: {
    name: "Closed",
    color: "248, 113, 113",
  },
  [CANCELLED]: {
    name: "Cancelled",
    color: "253, 186, 116",
  },
  [OPEN]: {
    name: "Open",
    color: "253, 186, 116",
  },
  [WON]: {
    name: "Won",
    color: "34, 197, 94",
  },
  [LOST]: {
    name: "Lost",
    color: "248, 113, 113",
  },
  [APPROVED]: {
    name: "Approved",
    color: "96 165 250",
  },
  [APPROVAL]: {
    name: "Approval",
    color: "253, 186, 116",
  },
  [DECLINED]: {
    name: "Declined",
    color: "248, 113, 113",
  },
  [PAID]: {
    name: "Paid",
    color: "96, 165, 250",
  },
  [BOOKED]: {
    name: "Booked",
    color: "34, 197, 94",
  },
  [UNBOOKED]: {
    name: "Unbooked",
    color: "253, 186, 116",
  },
  [NO]: {
    name: "No",
    color: "34, 197, 94",
  },
  [RECEIVED]: {
    name: "Received",
    color: "4, 222, 128",
  },
  [EQUIPMENT]: {
    name: "Equipment",
    color: "253, 186, 116",
  },
  [IS_SET]: {
    name: "Is set",
    color: "248, 113, 113",
  },
};

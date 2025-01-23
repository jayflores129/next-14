"use client";

import { useTranslation } from "@/app/i18n/client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { iconStrokeWidth } from "@/lib/utils";
import {
  BookCheck,
  BookDashed,
  Building,
  Calendar,
  CalendarX,
  Car,
  Cog,
  Contact,
  FilePenLine,
  FlagTriangleLeft,
  Folder,
  FolderCheck,
  FolderDot,
  FolderKanban,
  House,
  Info,
  Layers,
  LayoutList,
  ListCheck,
  ListOrdered,
  MailCheck,
  Pen,
  Pipette,
  ScrollText,
  ShoppingCart,
  Truck,
  User,
  Users,
  Warehouse,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

const iconProps = {
  width: 16,
  height: 16,
  strokeWidth: iconStrokeWidth,
  style: { marginTop: "4px" },
};

const subIconProps = {
  ...iconProps,
  height: 14,
  width: 14,
};

export default function MainMenus() {
  const { t } = useTranslation();
  const pathname = usePathname();

  const pathName = useMemo(() => {
    return `/${pathname.split("/")[2]}`;
  }, [pathname]);

  const dashboard = {
    name: t("Dashboard"),
    icon: <House {...iconProps} />,
    href: "/",
    condition: true,
  };

  const project_overview = {
    name: t(t("Overview")),
    icon: <Info {...iconProps} />,
    condition: true,
  };

  const project_offer = {
    name: t("Offers"),
    icon: <FolderDot {...iconProps} />,
    condition: true,
  };

  const project_order_confirmation = {
    name: t("OrderConfirmations"),
    icon: <FolderCheck {...iconProps} />,
    condition: true,
  };

  const project_delivery_note = {
    name: t("DeliveryNotes"),
    icon: <Truck {...iconProps} />,
    condition: true,
  };

  const project_invoice = {
    name: t("Invoices"),
    icon: <ScrollText {...iconProps} />,
    condition: true,
  };

  const project_credit_note = {
    name: t("CreditNotes"),
    icon: <BookCheck {...iconProps} />,
    condition: true,
  };

  const loadingListOverview = {
    name: t("Overview"),
    icon: <Info {...subIconProps} />,
    condition: true,
  };

  const loadingListTemplate = {
    name: t("Template"),
    icon: <BookDashed {...subIconProps} />,
    condition: true,
  };

  const loadingList = {
    name: t("LoadingList"),
    icon: <ListOrdered {...iconProps} />,
    condition: true,
    value: "project_loading_list",
    subs: [loadingListOverview, loadingListTemplate],
  };

  const project_shipping = {
    name: t("ShippingList"),
    icon: <ShoppingCart {...iconProps} />,
    condition: true,
  };

  const project = {
    name: t("Projects"),
    icon: <FolderKanban {...iconProps} />,
    value: "project",
    condition: true,
    subs: [
      project_overview,
      project_offer,
      project_order_confirmation,
      project_delivery_note,
      project_invoice,
      project_credit_note,
      loadingList,
      project_shipping,
    ],
  };

  const address_managerOverview = {
    name: t("Overview"),
    icon: <Info {...subIconProps} />,
    condition: true,
  };

  const address_managerUnAssignedReport = {
    name: t("Template"),
    icon: <FlagTriangleLeft {...subIconProps} />,
    condition: true,
  };

  const address_manager = {
    name: t("AddressManager"),
    icon: <Contact {...iconProps} />,
    condition: true,
    value: "address_manager",
    subs: [address_managerOverview, address_managerUnAssignedReport],
  };

  const document_company = {
    name: t("Company"),
    icon: <Contact {...subIconProps} />,
    condition: true,
  };

  const document_employee = {
    name: t("Employees"),
    icon: <Users {...subIconProps} />,
    condition: true,
  };

  const document_equipments = {
    name: t("Equipments"),
    icon: <LayoutList {...subIconProps} />,
    condition: true,
  };

  const document_my_documents = {
    name: t("MyDocuments"),
    icon: <Folder {...subIconProps} />,
    condition: true,
  };

  const documents = {
    name: t("Documents"),
    icon: <Contact {...subIconProps} />,
    condition: true,
    value: "documents",
    subs: [
      document_company,
      document_employee,
      document_equipments,
      document_my_documents,
    ],
  };

  const item_overview = {
    name: t("Overview"),
    icon: <Info {...subIconProps} />,
    condition: true,
  };

  const item_set = {
    name: t("Set"),
    icon: <FilePenLine {...subIconProps} />,
    condition: true,
  };

  const items = {
    name: t("Items"),
    icon: <Layers {...iconProps} />,
    condition: true,
    value: "items",
    subs: [item_overview, item_set],
  };

  const purchase_order = {
    name: t("PurchaseOrder"),
    icon: <ListCheck {...iconProps} />,
    condition: true,
  };

  const working_hours = {
    name: t("Working Hours"),
    icon: <Calendar {...iconProps} />,
    condition: true,
  };

  const tutorials = {
    name: t("Tutorials"),
    icon: <BookCheck {...iconProps} />,
    condition: true,
  };

  const settings = {
    name: t("Settings"),
    icon: <Cog {...iconProps} />,
    condition: true,
  };

  const admin_user = {
    name: t("Users"),
    icon: <User {...subIconProps} />,
    condition: true,
  };

  const admin_company_overview = {
    name: t("Overview"),
    icon: <User {...subIconProps} />,
    condition: true,
  };

  const admin_company_automated_letters = {
    name: t("AutomatedLetters"),
    icon: <MailCheck {...subIconProps} />,
    condition: true,
  };

  const admin_company_letter_signatories = {
    name: t("LetterSignatories"),
    icon: <Pen {...subIconProps} />,
    condition: true,
  };

  const admin_company_letter_categories = {
    name: t("LetterCategories"),
    icon: <MailCheck {...subIconProps} />,
    condition: true,
  };

  const admin_company = {
    name: t("Company"),
    icon: <Building {...subIconProps} />,
    value: "admin_company",
    condition: true,
    subs: [
      admin_company_overview,
      admin_company_automated_letters,
      admin_company_letter_signatories,
      admin_company_letter_categories,
    ],
  };

  const admin_warehouse = {
    name: t("Warehouse"),
    icon: <Warehouse {...subIconProps} />,
    condition: true,
  };

  const admin_leave = {
    name: t("Leave"),
    icon: <CalendarX {...subIconProps} />,
    condition: true,
  };

  const admin_car = {
    name: t("Car"),
    icon: <Car {...subIconProps} />,
    condition: true,
  };

  const admin_pipe_sizing = {
    name: t("PipeSizing"),
    icon: <Pipette {...subIconProps} />,
    condition: true,
  };

  const admin = {
    name: t("Admin"),
    icon: <MailCheck {...subIconProps} />,
    condition: true,
    value: "admin",
    subs: [
      admin_user,
      admin_company,
      admin_warehouse,
      admin_leave,
      admin_car,
      admin_pipe_sizing,
    ],
  };

  const links = [
    dashboard,
    project,
    address_manager,
    documents,
    items,
    purchase_order,
    working_hours,
    admin,
    tutorials,
    settings,
  ];

  const accordionValueLevel1 = useMemo(() => {
    if (
      pathName?.includes("/projects") ||
      pathName?.includes("/projects/offers") ||
      pathName?.includes("/projects/order-confirmation") ||
      pathName?.includes("/projects/delivery-note") ||
      pathName?.includes("/projects/invoices") ||
      pathName?.includes("/projects/credit-note") ||
      pathName?.includes("/projects/loading") ||
      pathName?.includes("/projects/loading/template") ||
      pathName?.includes("/projects/shipping-list") ||
      pathName?.includes("/projects/technician-view/technician-projects") ||
      pathName?.includes("/projects/technician-view/technician-tasks") ||
      pathName?.includes("/projects/technician-view/technician-tasks")
    ) {
      return ["project"];
    }

    if (
      pathName?.includes("/address-manager") ||
      pathName?.includes("/address-manager/un-assigned-reports")
    ) {
      return ["address_manager"];
    }

    if (
      pathName?.includes("/documents") ||
      pathName?.includes("/documents/company") ||
      pathName?.includes("/documents/employees") ||
      pathName?.includes("/documents/equipment") ||
      pathName?.includes("/documents/personal")
    ) {
      return ["document"];
    }

    if (pathName?.includes("/items") || pathName?.includes("/items/set")) {
      return ["items"];
    }

    if (
      pathName?.includes("/admin") ||
      pathName?.includes("/admin/users") ||
      pathName?.includes("/admin/company") ||
      pathName?.includes("/admin/companyletters") ||
      pathName?.includes("/admin/companyletters/create") ||
      pathName?.includes("/admin/companyletters/letter-category") ||
      pathName?.includes("/admin/warehouse") ||
      pathName?.includes("/admin/leave") ||
      pathName?.includes("/admin/cars") ||
      pathName?.includes("/admin/calculations/pipe-sizing")
    ) {
      return ["admin"];
    }

    return [];
  }, [pathName]);

  const accordionValueLevel2 = useMemo(() => {
    if (
      pathName?.includes("/projects/loading") ||
      pathName?.includes("/projects/loading/template")
    ) {
      return "project_loading_list";
    }

    if (
      pathName?.includes("/admin/company") ||
      pathName?.includes("/admin/companyletters") ||
      pathName?.includes("/admin/companyletters/create") ||
      pathName?.includes("/admin/companyletters/letter-category")
    ) {
      return "admin_company";
    }

    if (pathName === "/admin/calculations/pipe-sizing") {
      return "calculation";
    }

    return "";
  }, [pathName]);

  return (
    <Accordion
      type="multiple"
      className="p-2 flex flex-col gap-1 text-sm"
      defaultValue={accordionValueLevel1}
    >
      {Array.isArray(links) &&
        links.map((link: any, key: number) => {
          if (Array.isArray(link.subs) && link.subs.length > 0) {
            return (
              <AccordionItem
                key={key}
                value={link.value}
                className="border-b-0"
              >
                <AccordionTrigger className="text-xxsurface-foreground rounded-md p-2 font-normal data-[state=open]:font-medium data-[state=closed]:hover:bg-xxmenuHover data-[state=open]:rounded-b-none hover:no-underline">
                  <span className="flex items-start gap-2">
                    {link.icon}
                    {link.name}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="flex flex-col pb-0 ps-1 border-l ms-3">
                  {Array.isArray(link.subs) &&
                    link.subs.map((subLink: any, subKey: number) => {
                      if (subLink?.subs?.length > 0) {
                        return (
                          <Accordion
                            type="single"
                            collapsible
                            className="p-0 flex flex-col gap-1"
                            key={subKey}
                            defaultValue={accordionValueLevel2}
                          >
                            <AccordionItem
                              value={subLink.value}
                              className="border-b-0"
                            >
                              <AccordionTrigger className="rounded-md text-xxsurface-foreground p-2 font-normal data-[state=open]:font-medium data-[state=closed]:hover:bg-xxmenuHover data-[state=open]:rounded-b-none hover:no-underline">
                                <span className="flex items-start gap-2 ">
                                  {subLink.icon}
                                  {subLink.name}
                                </span>
                              </AccordionTrigger>
                              <AccordionContent className="flex flex-col pb-0 ps-1 border-l ms-3">
                                {Array.isArray(subLink?.subs) &&
                                  subLink?.subs.map(
                                    (sub2: any, sub2Key: number) => (
                                      <a
                                        href="#"
                                        className="hover:bg-xxmenuHover flex items-start gap-2 p-2 rounded-md text-sm text-xxsurface-foreground"
                                        key={sub2Key}
                                      >
                                        {sub2.icon}
                                        <span>{sub2.name}</span>
                                      </a>
                                    )
                                  )}
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        );
                      }
                      return (
                        <a
                          href="#"
                          className="hover:bg-xxmenuHover flex items-start gap-2 p-2 rounded-md text-sm text-xxsurface-foreground"
                          key={subKey}
                        >
                          {subLink.icon}
                          <span>{subLink.name}</span>
                        </a>
                      );
                    })}
                </AccordionContent>
              </AccordionItem>
            );
          }

          return (
            <a
              key={key}
              href="#"
              className="hover:bg-xxmenuHover flex items-start gap-2 p-2 rounded-md text-sm text-xxsurface-foreground"
            >
              {link.icon}
              <span>{link.name}</span>
            </a>
          );
        })}
    </Accordion>
  );
}

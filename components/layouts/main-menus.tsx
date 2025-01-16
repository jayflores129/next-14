import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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

const iconProps = {
  width: 16,
  height: 16,
  strokeWidth: 2,
};

const subIconProps = {
  ...iconProps,
  height: 14,
  width: 14,
};

export default function MainMenus() {
  const dashboard = {
    name: "Dashboard",
    icon: <House {...iconProps} />,
    href: "/",
    condition: true,
  };

  const project_overview = {
    name: "Overview",
    icon: <Info {...iconProps} />,
    condition: true,
  };

  const project_offer = {
    name: "Offer",
    icon: <FolderDot {...iconProps} />,
    condition: true,
  };

  const project_order_confirmation = {
    name: "Order Confirmation",
    icon: <FolderCheck {...iconProps} />,
    condition: true,
  };

  const project_delivery_note = {
    name: "Delivery Notes",
    icon: <Truck {...iconProps} />,
    condition: true,
  };

  const project_invoice = {
    name: "Invoices",
    icon: <ScrollText {...iconProps} />,
    condition: true,
  };

  const project_credit_note = {
    name: "Credit Notes",
    icon: <BookCheck {...iconProps} />,
    condition: true,
  };

  const loadingListOverview = {
    name: "Overview",
    icon: <Info {...subIconProps} />,
    condition: true,
  };

  const loadingListTemplate = {
    name: "Template",
    icon: <BookDashed {...subIconProps} />,
    condition: true,
  };

  const loadingList = {
    name: "Loading List",
    icon: <ListOrdered {...iconProps} />,
    condition: true,
    value: "project_loading_list",
    subs: [loadingListOverview, loadingListTemplate],
  };

  const project_shipping = {
    name: "Shipping List",
    icon: <ShoppingCart {...iconProps} />,
    condition: true,
  };

  const project = {
    name: "Projects",
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
    name: "Overview",
    icon: <Info {...subIconProps} />,
    condition: true,
  };

  const address_managerUnAssignedReport = {
    name: "Template",
    icon: <FlagTriangleLeft {...subIconProps} />,
    condition: true,
  };

  const address_manager = {
    name: "Address Manager",
    icon: <Contact {...iconProps} />,
    condition: true,
    value: "address_manager",
    subs: [address_managerOverview, address_managerUnAssignedReport],
  };

  const document_company = {
    name: "Company",
    icon: <Contact {...subIconProps} />,
    condition: true,
  };

  const document_employee = {
    name: "Employees",
    icon: <Users {...subIconProps} />,
    condition: true,
  };

  const document_equipments = {
    name: "Equipments",
    icon: <LayoutList {...subIconProps} />,
    condition: true,
  };

  const document_my_documents = {
    name: "My Documents",
    icon: <Folder {...subIconProps} />,
    condition: true,
  };

  const documents = {
    name: "Documents",
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
    name: "Overview",
    icon: <Info {...subIconProps} />,
    condition: true,
  };

  const item_set = {
    name: "Set",
    icon: <FilePenLine {...subIconProps} />,
    condition: true,
  };

  const items = {
    name: "Items",
    icon: <Layers {...iconProps} />,
    condition: true,
    value: "items",
    subs: [item_overview, item_set],
  };

  const purchase_order = {
    name: "Purchase Order",
    icon: <ListCheck {...iconProps} />,
    condition: true,
  };

  const working_hours = {
    name: "Working Hours",
    icon: <Calendar {...iconProps} />,
    condition: true,
  };

  const tutorials = {
    name: "Tutorials",
    icon: <BookCheck {...iconProps} />,
    condition: true,
  };

  const settings = {
    name: "Settings",
    icon: <Cog {...iconProps} />,
    condition: true,
  };

  const admin_user = {
    name: "Users",
    icon: <User {...subIconProps} />,
    condition: true,
  };

  const admin_company_overview = {
    name: "Overview",
    icon: <User {...subIconProps} />,
    condition: true,
  };

  const admin_company_automated_letters = {
    name: "Automated Letters",
    icon: <MailCheck {...subIconProps} />,
    condition: true,
  };

  const admin_company_letter_signatories = {
    name: "Letter Signatories",
    icon: <Pen {...subIconProps} />,
    condition: true,
  };

  const admin_company_letter_categories = {
    name: "Letter Categories",
    icon: <MailCheck {...subIconProps} />,
    condition: true,
  };

  const admin_company = {
    name: "Company",
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
    name: "Warehouse",
    icon: <Warehouse {...subIconProps} />,
    condition: true,
  };

  const admin_leave = {
    name: "Leave",
    icon: <CalendarX {...subIconProps} />,
    condition: true,
  };

  const admin_car = {
    name: "Leave",
    icon: <Car {...subIconProps} />,
    condition: true,
  };

  const admin_pipe_sizing = {
    name: "Pipe Sizing",
    icon: <Pipette {...subIconProps} />,
    condition: true,
  };

  const admin = {
    name: "Admin",
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

  return (
    <Accordion type="multiple" className="p-2 flex flex-col gap-1 text-sm">
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
                  <span className="flex items-center gap-2">
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
                          >
                            <AccordionItem
                              value={subLink.value}
                              className="border-b-0"
                            >
                              <AccordionTrigger className="rounded-md text-xxsurface-foreground p-2 font-normal data-[state=open]:font-medium data-[state=closed]:hover:bg-xxmenuHover data-[state=open]:rounded-b-none hover:no-underline">
                                <span className="flex items-center gap-2 ">
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
                                        className="hover:bg-xxmenuHover flex items-center gap-2 p-2 rounded-md text-sm text-xxsurface-foreground"
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
                          className="hover:bg-xxmenuHover flex items-center gap-2 p-2 rounded-md text-sm text-xxsurface-foreground"
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
              className="hover:bg-xxmenuHover flex items-center gap-2 p-2 rounded-md text-sm text-xxsurface-foreground"
            >
              {link.icon}
              <span>{link.name}</span>
            </a>
          );
        })}
    </Accordion>
  );
}

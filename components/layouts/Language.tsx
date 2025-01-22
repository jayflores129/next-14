"use client";

import { useEffect, useMemo } from "react";
import DropdownMenu from "../DropdownMenu";
import Image from "next/image";
import { Languages } from "lucide-react";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useSession } from "next-auth/react";

export default function Language() {
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session }: any = useSession();

  const languange = useMemo(() => {
    let _lang = session?.user?.languange || "en";
    const html = document.querySelector("html");
    const appLang = html?.getAttribute("lang");

    if (appLang) _lang = appLang;

    return _lang;
  }, [session?.user?.languange]);

  const basePathname = useMemo(() => {
    const searchString = searchParams.toString();
    const base = pathname.split(`/${params.lng}`)[1];

    if (searchString) return `${base}?${searchString}`;
    return base;
  }, [pathname, params, searchParams]);

  const languages: any = useMemo(() => {
    return [
      { name: "English", imageUrl: "/images/en-lang.svg", lng: "en" },
      { name: "German", imageUrl: "/images/de-lang.svg", lng: "de" },
      { name: "Spanish", imageUrl: "/images/es-lang.svg", lng: "es" },
      { name: "Dutch", imageUrl: "/images/nl-lang.svg", lng: "nl" },
      { name: "Portuguese", imageUrl: "/images/pt-lang.svg", lng: "pt" },
      { name: "Italian", imageUrl: "/images/it-lang.svg", lng: "it" },
      { name: "Indonesian", imageUrl: "/images/id-lang.svg", lng: "id" },
    ];
  }, []);

  const selectedLanguage = useMemo(() => {
    return languages?.find((lang: any) => lang.lng === languange);
  }, [languages]);

  return (
    <DropdownMenu
      align="end"
      menus={languages?.map((lang: any) => ({
        text: (
          <div className="flex items-center gap-2">
            <Image src={lang.imageUrl} height={20} width={20} alt={lang.name} />
            <span>{lang.name}</span>
          </div>
        ),
        onClick: () => {
          router.push(`/${lang.lng}/${basePathname}`);
        },
      }))}
      trigger={
        <button className="border border-xxborder hover:bg-xxmenuHover h-[35px] w-[35px] flex items-center justify-center rounded-full data-[state=open]:bg-xxmenuHover">
          {selectedLanguage?.imageUrl ? (
            <Image
              src={selectedLanguage?.imageUrl}
              height={35}
              width={35}
              alt={selectedLanguage?.name}
              className="rounded-full object-cover"
            />
          ) : (
            <Languages width={18} height={18} />
          )}
        </button>
      }
    />
  );
}

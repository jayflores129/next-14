import { MoonStar, Sun, SunMoon } from "lucide-react";
import DropdownMenu from "../DropdownMenu";
import { useTheme } from "@/context/ThemeContext";

export default function Theme() {
  const { theme, toggleTheme } = useTheme();

  return (
    <DropdownMenu
      align="end"
      menus={[
        { text: "Light", icon: <Sun width={18} height={18} />, name: "light" },
        {
          text: "Dark",
          icon: <MoonStar width={18} height={18} />,
          name: "dark",
        },
      ]?.map((theme: any) => ({
        text: (
          <div className="flex items-center gap-2">
            {theme.icon}
            {theme.text}
          </div>
        ),
        onClick: () => toggleTheme(theme.name),
      }))}
      trigger={
        <button className="border border-xxborder h-[35px] w-[35px] flex items-center justify-center rounded-full data-[state=open]:bg-xxmenuHover">
          {theme === "light" && <Sun width={18} height={18} />}
          {theme === "dark" && <MoonStar width={18} height={18} />}
        </button>
      }
    />
  );
}

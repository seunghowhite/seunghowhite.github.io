"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// import DarkMode from "@/components/DarkMode";
import DarkModeToggle from "@/components/layout/DarkModeToggle";
import ScrollProgressBar from "@/components/layout/ScrollProgressBar";
import { useSpyElem } from "@/hooks/useSpy";
import { cn } from "@/lib/utils";
import icon from "@/public/icon/stone_icon.png";

const navList = [
  { name: "Eat-Stone", href: "/blog" },
  { name: "About", href: "/about" },
];

// const localePathList = ["/about"];

const Nav = () => {
  const { ref, marginTop } = useSpyElem(65);
  const pathname = usePathname();

  // console.log("pathname: ", pathname);
  // const isLocalePath = localePathList.some((path) => pathname.startsWith(path));

  return (
    <nav
      style={{ marginTop }}
      ref={ref}
      className="fixed top-0 z-20 flex w-full justify-center border-b shadow-md print:hidden"
    >
      <ScrollProgressBar />
      <div className="post mt-1 flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 font-medium">
          <Image
            src={icon}
            alt="icon"
            className="h-5 w-7"
          />
          {navList.map((navItem) => (
            <Link
              href={navItem.href}
              key={navItem.name}
              className={cn(
                "hover:text-primary rounded-full px-4 py-1 text-center text-sm transition-colors",
                pathname?.startsWith(navItem.href) ? "text-primary bg-muted font-medium" : "text-muted-foreground"
              )}
            >
              {navItem.name}
            </Link>
          ))}
        </div>

        {/* {isLocalePath && <LanguageSelector className="hidden sm:flex" />} */}

        <div className="flex gap-3">
          <DarkModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Nav;

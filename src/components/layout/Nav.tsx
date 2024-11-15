"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import DarkModeToggle from "@/components/layout/DarkModeToggle";
import ScrollProgressBar from "@/components/layout/ScrollProgressBar";
import { useSpyElem } from "@/hooks/useSpy";
import { cn } from "@/lib/utils";
import icon from "@/public/icon/stone_icon.png";

const Nav = () => {
  const { ref, marginTop } = useSpyElem(65);
  const pathname = usePathname();
  const navList = [
    { name: "지(智)", href: "/knowledge" },
    { name: "덕(德)", href: "/moral" },
    { name: "체(體)", href: "/body" },
  ];

  return (
    <nav
      style={{ marginTop }}
      ref={ref}
      className="fixed top-0 z-20 flex w-full justify-center border-b shadow-md print:hidden"
    >
      <ScrollProgressBar />
      <div className="post mt-1 flex h-16 items-center justify-between">
        <section>
          <Link
            href={"/"}
            className="group flex items-center gap-1"
          >
            <Image
              src={icon}
              alt="icon"
              className="h-5 w-7 transition-transform duration-300 group-hover:-rotate-45"
            />
            <h1 className="text-lg font-bold transition-colors duration-300 group-hover:text-muted group-hover:delay-100">
              <span className="relative hidden 2sm:block">
                Eat-Stone
                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-muted transition-all duration-700 group-hover:w-full group-hover:delay-100"></span>
              </span>
            </h1>
          </Link>
        </section>
        <section className="absolute left-1/2 flex -translate-x-1/2 transform items-center font-medium">
          {navList.map((navItem) => (
            <Link
              href={navItem.href}
              key={navItem.name}
              className={cn(
                "rounded-full px-2 py-1 text-center text-sm transition-colors sm:px-4 lg:text-base",
                pathname?.startsWith(navItem.href) ? "text-primary bg-muted font-medium" : "text-muted-foreground"
              )}
            >
              {navItem.name}
            </Link>
          ))}
        </section>

        <section className="flex">
          <Link
            href={"/about"}
            className="hidden px-4 py-1 text-center text-sm 2sm:block"
          >
            About
          </Link>
          <DarkModeToggle />
        </section>
      </div>
    </nav>
  );
};

export default Nav;

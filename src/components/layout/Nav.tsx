"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import DarkModeToggle from "@/components/layout/DarkModeToggle";
import ScrollProgressBar from "@/components/layout/ScrollProgressBar";
import { useSpyElem } from "@/hooks/useSpy";
import icon from "@/public/icon/stone_icon.png";

const Nav = () => {
  const { ref, marginTop } = useSpyElem(65);
  const pathname = usePathname();
  const navList = [
    { name: "지(智)", href: "/knowledge", color: "#4A9ED4" },
    { name: "덕(德)", href: "/moral", color: "#F5A45D" },
    { name: "체(體)", href: "/body", color: "#E97362" },
  ];

  return (
    <nav
      style={{ marginTop }}
      ref={ref}
      className="fixed top-0 z-20 flex w-full justify-center border-b bg-background shadow-md print:hidden"
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
        <section className="absolute left-1/2 flex -translate-x-1/2 transform items-center gap-2 font-medium">
          {navList.map((navItem) => (
            <Link
              href={navItem.href}
              key={navItem.name}
              className="rounded-full border-2 px-2 py-1 text-center text-sm transition-colors sm:px-4 lg:text-base"
              style={
                pathname?.startsWith(navItem.href)
                  ? {
                      background: navItem.color + "22", // 투명도 13% 배경
                      borderColor: navItem.color,
                      color: navItem.color,
                    }
                  : { color: navItem.color }
              }
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

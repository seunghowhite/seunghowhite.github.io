"use client";

import Link from "next/link";

import { CopyLink, ScrollToComment, ScrollToTop } from "@/components/post_detail/UtilsButtons";
import { useHeadingsObserver } from "@/hooks/useHeadingsObserver";
import { cn } from "@/utils/cn";

interface Props {
  toc: {
    text: string;
    link: string;
    indent: number;
  }[];
}

const TableOfContent = ({ toc }: Props) => {
  const activeIdList = useHeadingsObserver("h2, h3");

  return (
    <aside className="not-prose absolute -top-[200px] left-full -mb-[100px] hidden h-[calc(100%+150px)] xl:block">
      <div className="sticky bottom-0 top-[200px] z-10 ml-[5rem] mt-[200px] w-[200px]">
        <div className="mb-4 border-l px-4 py-2">
          <div className="mb-1 font-bold">On this page</div>
          <ul className="text-xs">
            {toc.map((item) => {
              const isH3 = item.indent === 1;
              const isIntersecting = activeIdList.includes(item.link);
              return (
                <li
                  key={item.link}
                  className={cn(isH3 && "ml-4", isIntersecting && "font-medium text-blue-600", "py-1 transition")}
                >
                  <Link href={item.link}>{item.text}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex gap-2">
          <ScrollToTop />
          <ScrollToComment />
          <CopyLink />
        </div>
      </div>
    </aside>
  );
};

export default TableOfContent;

"use client";

import Link from "next/link";

import { CopyLink, ScrollToComment, ScrollToTop } from "@/components/post_detail/UtilsButtons";
import { useHeadingsObserver } from "@/hooks/useHeadingsObserver";
import { cn } from "@/utils/cn";

const getSubjectColor = (subject?: string): string => {
  switch (subject) {
    case "knowledge":
      return "var(--knowledge-color)"; // 지(智) - 파란색
    case "moral":
      return "var(--moral-color)"; // 덕(德) - 주황색
    case "body":
      return "var(--body-color)"; // 체(體) - 빨간색
    default:
      return "#3b82f6"; // 기본 파란색
  }
};

interface Props {
  toc: {
    text: string;
    link: string;
    indent: number;
  }[];
  subject?: string;
}

const TableOfContent = ({ toc, subject }: Props) => {
  const activeIdList = useHeadingsObserver("h2, h3");

  return (
    <aside className="not-prose absolute -top-[200px] left-full -mb-[100px] hidden h-[calc(100%+150px)] xl:block">
      <div className="sticky bottom-0 top-[200px] z-10 ml-[5rem] mt-[200px] w-[200px]">
        <div className="mb-4 border-l px-3 py-2">
          <div className="mb-1 font-bold">On this page</div>
          <ul className="text-xs">
            {toc.map((item) => {
              const isH3 = item.indent === 1;
              // 링크에서 # 제거하고 비교
              const linkId = item.link.replace("#", "");
              const isIntersecting = activeIdList.some((activeId) => activeId.replace("#", "") === linkId);
              const subjectColor = getSubjectColor(subject);

              return (
                <li
                  key={item.link}
                  className={cn(isH3 && "ml-4", "py-1 transition")}
                >
                  <Link
                    href={item.link}
                    style={isIntersecting ? { color: subjectColor, fontWeight: "500" } : {}}
                  >
                    {item.text}
                  </Link>
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

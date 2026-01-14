"use client";

import Link from "next/link";

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

const TableOfContentTop = ({ toc, subject }: Props) => {
  if (toc.length === 0) return null;

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    const hash = link.replace("#", "");
    if (!hash) return;

    // 즉시 heading 찾기
    try {
      // 해시 디코딩 및 이스케이프 처리
      const decodedHash = decodeURIComponent(hash);
      const heading = document.querySelector(`#${CSS.escape(decodedHash)}`);
      if (heading) {
        // heading의 부모 요소 중 Toggle 찾기
        let parent = heading.parentElement;
        let toggleContainer: HTMLElement | null = null;
        let toggleButton: HTMLButtonElement | null = null;

        while (parent) {
          // Toggle 컨테이너 찾기 (overflow-hidden 클래스가 있는 div)
          if (parent.classList.contains("overflow-hidden") && parent.querySelector('button[type="button"]')) {
            toggleContainer = parent as HTMLElement;
            toggleButton = parent.querySelector('button[type="button"]') as HTMLButtonElement;
            break;
          }
          parent = parent.parentElement;
        }

        if (toggleContainer && toggleButton) {
          // Toggle이 닫혀있는지 확인 (content div의 computed style 확인)
          const contentDiv = toggleContainer.querySelector("div[class*='overflow-hidden']") as HTMLElement;
          const isClosed =
            contentDiv &&
            (window.getComputedStyle(contentDiv).maxHeight === "0px" ||
              window.getComputedStyle(contentDiv).opacity === "0");

          if (isClosed) {
            // Toggle이 닫혀있으면 먼저 열기
            const clickEvent = new MouseEvent("click", {
              bubbles: true,
              cancelable: true,
              view: window,
            });
            toggleButton.dispatchEvent(clickEvent);

            // Toggle이 열리는 애니메이션 완료 후 스크롤 (약 300ms)
            setTimeout(() => {
              heading.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 350);
          } else {
            // Toggle이 이미 열려있으면 바로 스크롤
            setTimeout(() => {
              heading.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 50);
          }
        } else {
          // Toggle이 없으면 바로 스크롤
          setTimeout(() => {
            heading.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 50);
        }
      }
    } catch {
      // 셀렉터 오류 무시 (프로덕션에서는 로그 제거 가능)
    }
  };

  return (
    <nav className="xl:hidden">
      <h2 id="table-of-contents-top">On this page</h2>
      <ul>
        {toc.map((item, index) => (
          <li
            key={`${item.link}-${index}`}
            className={cn(item.indent === 1 && "ml-4", "my-0 py-1")}
          >
            <Link
              href={item.link}
              onClick={(e) => handleLinkClick(e, item.link)}
              className="underline-offset-4 transition-colors duration-200"
              style={
                {
                  "--hover-color": getSubjectColor(subject),
                  "--hover-color-rgb": getSubjectColor(subject).replace("var(--", "").replace(")", ""),
                } as React.CSSProperties
              }
            >
              {item.text}
            </Link>
          </li>
        ))}
      </ul>
      <hr />
    </nav>
  );
};

export default TableOfContentTop;

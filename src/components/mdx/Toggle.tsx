"use client";

import { PropsWithChildren, useEffect, useRef, useState } from "react";

import { cn } from "@/utils/cn";

interface ToggleProps extends PropsWithChildren {
  title: string;
  defaultOpen?: boolean;
}

export const Toggle = ({ title, children, defaultOpen = false }: ToggleProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const toggleRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isUserToggleRef = useRef(false);

  useEffect(() => {
    const handleHashChange = () => {
      // 사용자가 직접 토글 버튼을 클릭한 경우 무시
      if (isUserToggleRef.current) {
        isUserToggleRef.current = false;
        return;
      }

      const hash = window.location.hash;
      if (!hash || !toggleRef.current) return;

      try {
        // 해시에서 # 제거하고 디코딩
        const hashId = decodeURIComponent(hash.substring(1));
        // Toggle 내부의 heading을 ID로 찾기
        const heading = toggleRef.current.querySelector(`#${CSS.escape(hashId)}`);
        if (heading && !isOpen) {
          // heading이 이 Toggle 안에 있고, Toggle이 닫혀있으면 열기
          setIsOpen(true);
          // 스크롤이 제대로 작동하도록 약간의 지연
          setTimeout(() => {
            heading.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 100);
        }
      } catch {
        // 셀렉터 오류 무시 (프로덕션에서는 로그 제거 가능)
      }
    };

    // 초기 로드 시 체크
    handleHashChange();

    // hash 변경 감지
    window.addEventListener("hashchange", handleHashChange);

    // Toggle 내부의 링크 클릭 감지
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a[href^='#']");
      if (link && toggleRef.current?.contains(link)) {
        const href = link.getAttribute("href");
        if (href) {
          const heading = document.querySelector(href);
          if (heading && toggleRef.current.contains(heading) && !isOpen) {
            setIsOpen(true);
          }
        }
      }
    };

    document.addEventListener("click", handleLinkClick);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      document.removeEventListener("click", handleLinkClick);
    };
  }, [isOpen]);

  return (
    <div
      ref={toggleRef}
      className={cn(
        `my-4 overflow-hidden rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white shadow-sm transition-all
        duration-300 dark:border-gray-700 dark:from-gray-800 dark:to-gray-900`,
        isOpen && "shadow-md"
      )}
    >
      <button
        ref={buttonRef}
        type="button"
        onClick={() => {
          isUserToggleRef.current = true;
          setIsOpen(!isOpen);
        }}
        className={cn(
          `flex w-full items-center gap-3 px-5 py-4 text-left font-semibold transition-all duration-200 hover:bg-gray-100/50
          dark:hover:bg-gray-700/50`,
          isOpen && "bg-gray-100/50 dark:bg-gray-700/50"
        )}
      >
        <svg
          className={cn(
            "h-5 w-5 flex-shrink-0 text-gray-600 transition-transform duration-300 dark:text-gray-400",
            isOpen ? "rotate-90" : "rotate-0"
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M9 5l7 7-7 7"
          />
        </svg>
        <span className="flex-1 text-gray-900 dark:text-gray-100">{title}</span>
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-5 pb-5 pt-2 text-gray-900 dark:text-gray-100">{children}</div>
      </div>
    </div>
  );
};

"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import IconThinArrow from "@/components/Icons/ArrowThin";
import IconCheck from "@/components/Icons/Check";
import titleCase from "@/utils/titleCase";

interface SelectItemProps {
  category: string;
  count: number;
  subject: string;
  targetCategory: string | null;
  setIsOpen: (open: boolean) => void;
}

const SelectItem = ({ category, count, subject, targetCategory, setIsOpen }: SelectItemProps) => {
  const isSelected = category === targetCategory || (category === "all" && !targetCategory);

  return (
    <li
      key={category}
      className="cursor-pointer px-1"
    >
      <Link
        href={`/${subject}${category === "all" ? "" : "/" + category}`}
        onClick={() => setIsOpen(false)}
      >
        <div className="relative w-full rounded-sm py-1 pl-3 hover:bg-muted">
          {titleCase(category)} ({count}){isSelected && <IconCheck className="absolute right-2 top-2" />}
        </div>
      </Link>
    </li>
  );
};

interface SelectProps {
  list: [string, number][];
  subject: string;
  targetCategory: string | null;
}

export default function Select({ list, subject, targetCategory }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  // 메뉴 토글 함수
  const toggleMenu = () => setIsOpen((prev) => !prev);

  // 선택된 카테고리 찾기
  const selectedCategory = targetCategory
    ? list.find(([category]) => category === targetCategory)
    : list.find(([category]) => category === "all");

  const categoryLabel = selectedCategory ? `${selectedCategory[0]} (${selectedCategory[1]})` : "Select Category";

  useEffect(() => {
    const handleResize = () => {
      const isNoneSm = window.innerWidth > 640;

      if (isNoneSm) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative">
      {/* 메뉴 버튼 */}
      <button
        onClick={toggleMenu}
        className="relative mb-2 flex min-w-48 items-center justify-between gap-2 rounded-md border px-4 py-2 pr-10"
      >
        <span>{titleCase(categoryLabel)}</span>
        <IconThinArrow className="absolute right-3" />
      </button>

      {/* 카테고리 리스트 */}
      <ul
        className={`absolute left-0 top-12 z-30 min-w-48 overflow-y-auto rounded-md border bg-background py-2 shadow-xl transition-all
          duration-300 ease-in-out ${isOpen ? "h-auto opacity-100" : "max-h-0 opacity-0"}`}
      >
        {list.map(([category, count]) => (
          <SelectItem
            key={category}
            category={category}
            count={count}
            subject={subject}
            targetCategory={targetCategory}
            setIsOpen={setIsOpen}
          />
        ))}
      </ul>
    </div>
  );
}

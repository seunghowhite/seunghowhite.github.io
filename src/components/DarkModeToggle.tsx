"use client";

/* eslint-disable max-len */
import React, { useEffect, useState } from "react";

import Dark from "@/components/Icons/Dark";
import Light from "@/components/Icons/Light";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

const DarkModeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();

  // 컴포넌트 마운트 후에만 테마 관련 상태 업데이트
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // 현재 테마 상태 확인
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      className={`dark:shadow-[inset_0_8px_60px_rgba(0,0,0,0.3),inset_8px_0_8px_rgba(199, 117, 117, 0.3),inset_0_-4px_4px_rgba(0,0,0,0.3)]
        relative flex h-[2em] w-[4em] cursor-pointer items-center rounded-full bg-white px-[0.3em]
        shadow-[inset_0_8px_60px_rgba(0,0,0,0.1),inset_0_8px_8px_rgba(0,0,0,0.1),inset_0_-4px_4px_rgba(0,0,0,0.1)]`}
    >
      <div
        className={cn(
          `absolute flex h-[1.5em] w-[1.5em] items-center justify-center rounded-full bg-background transition-transform
          duration-300 ease-in-out`,
          currentTheme === "dark" && "translate-x-[2em]"
        )}
      >
        {/* 다크 모드일 때 달 아이콘 표시 */}
        {currentTheme === "dark" ? <Dark /> : <Light />}
      </div>
    </div>
  );
};

export default DarkModeToggle;

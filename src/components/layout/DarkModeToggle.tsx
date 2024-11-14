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
      className={`sm:dark:shadow-[inset_0_8px_60px_rgba(0,0,0,0.3),inset_8px_0_8px_rgba(199, 117, 117,
        0.3),inset_0_-4px_4px_rgba(0,0,0,0.3)] relative mr-4 flex cursor-pointer items-center rounded-full px-[0.3em] sm:mr-0
        sm:h-[2em] sm:w-[3em] sm:bg-white
        sm:shadow-[inset_0_8px_60px_rgba(0,0,0,0.1),inset_0_8px_8px_rgba(0,0,0,0.1),inset_0_-4px_4px_rgba(0,0,0,0.1)] md:h-[2em]
        md:w-[4em] md:px-[0.4em]`}
    >
      <div
        className={cn(
          `absolute flex h-[2em] w-[2em] items-center justify-center rounded-md bg-muted transition-transform duration-300
          ease-in-out sm:h-[1.3em] sm:w-[1.3em] sm:rounded-full sm:bg-background md:h-[1.5em] md:w-[1.5em]`,
          currentTheme === "dark" && "sm:translate-x-[1.2em] md:translate-x-[1.8em]"
        )}
      >
        {/* 다크 모드일 때 달 아이콘 표시 */}
        {currentTheme === "dark" ? <Dark /> : <Light />}
      </div>
    </div>
  );
};

export default DarkModeToggle;

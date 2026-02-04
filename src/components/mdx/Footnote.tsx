"use client";

import { PropsWithChildren } from "react";

import { cn } from "@/utils/cn";

interface FootnoteProps extends PropsWithChildren {
  className?: string;
}

export const Footnote = ({ children, className }: FootnoteProps) => {
  return (
    <div className={cn("my-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400", className)}>{children}</div>
  );
};

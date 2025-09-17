"use client";

import { ReactNode } from "react";

import Image from "next/image";
import Link from "next/link";

interface BookmarkProps {
  href: string;
  title: string;
  description?: string;
  children?: ReactNode;
}

// 기본 클립 아이콘 SVG
const DefaultLinkIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-muted-foreground"
  >
    <path
      d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect
      x="8"
      y="2"
      width="8"
      height="4"
      rx="1"
      ry="1"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
  </svg>
);

// URL에서 도메인 추출하여 favicon URL 생성
const getFaviconUrl = (url: string): string => {
  try {
    const urlObj = new URL(url);
    return `https://www.google.com/s2/favicons?domain=${urlObj.hostname}&sz=32`;
  } catch {
    return "";
  }
};

export const Bookmark = ({ href, title, description, children }: BookmarkProps) => {
  const faviconUrl = getFaviconUrl(href);

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="my-4 block rounded-lg border border-border bg-secondary p-4 no-underline transition-colors hover:bg-informative"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center">
          {faviconUrl ? (
            <Image
              src={faviconUrl}
              alt={`${title} favicon`}
              width={20}
              height={20}
              className="h-full w-full object-contain"
              onError={(e) => {
                // favicon 로드 실패 시 기본 아이콘으로 대체
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML = "";
                  parent.appendChild(document.createElement("div")).innerHTML =
                    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-gray-400"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1" stroke="currentColor" stroke-width="2" fill="none"/></svg>';
                }
              }}
            />
          ) : (
            <DefaultLinkIcon />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="mb-1 text-sm font-medium leading-5 text-foreground">{title}</h3>
          {description && <p className="mb-1 line-clamp-2 text-xs leading-4 text-foreground">{description}</p>}
          <p className="truncate text-[10px] text-muted-foreground">{href}</p>
        </div>
      </div>
    </Link>
  );
};

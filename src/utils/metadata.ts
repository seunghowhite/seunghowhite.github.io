import { Metadata } from "next";

export const BASE_URL = "https://seunghowhite.github.io";

const META = {
  title: "EatStone 블로그",
  siteName: "프론트엔드 개발자 백승호의 블로그",
  description: "지덕체 기반으로 기록을 합니다",
  keyword: [
    "Eat-Stone",
    "eat-stone",
    "seunghowhite",
    "stone",
    "eatstone",
    "EatStone",
    "백승호",
    "백승호 블로그",
    "백승호 블로그 프론트엔드",
  ],
  url: BASE_URL,
  googleVerification: "RvNTP2N2jJsl-LBo0aHC0kM5UlcISamJmr0SoXQsYbs",
  naverVerification: "553e9d800541385acd2d31f4e3e2b412e5aeeee8",
  ogImage: "/thumbnail.png",
} as const;

interface generateMetadataProps {
  title?: string;
  description?: string;
  keywords?: string[];
  asPath?: string;
  ogImage?: string;
}

export const getMetadata = (metadataProps: generateMetadataProps) => {
  const { title, description, asPath, ogImage, keywords } = metadataProps || {};

  const TITLE = title ? `${title} | EatStone 블로그` : META.title;
  const KEY_WORDS = [...META.keyword, ...(keywords || [])];
  const DESCRIPTION = description || META.description;
  const PAGE_URL = asPath ? asPath : "";
  const OG_IMAGE = ogImage || META.ogImage;
  const SITE_NAME = META.siteName;
  const ICON = "/icon/stone_icon.png";
  const metadata: Metadata = {
    metadataBase: new URL(META.url),
    alternates: {
      canonical: PAGE_URL,
    },
    title: TITLE,
    description: DESCRIPTION,
    icons: {
      icon: ICON,
    },
    keywords: KEY_WORDS,
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      siteName: SITE_NAME,
      locale: "ko_KR",
      type: "website",
      url: PAGE_URL,
      images: {
        url: OG_IMAGE,
      },
    },
    verification: {
      google: META.googleVerification,
      other: {
        "naver-site-verification": META.naverVerification,
      },
    },
    twitter: {
      card: "summary_large_image",
      title: TITLE,
      description: DESCRIPTION,
      images: {
        url: OG_IMAGE,
      },
    },
  };

  return metadata;
};

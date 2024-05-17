import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ScrollProgressBar from "@/app/components/ScrollProgressBar";

export const metadata: Metadata = {
  title: "eatstone log",
  description: "this is blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <ScrollProgressBar />
        {children}
      </body>
    </html>
  );
}

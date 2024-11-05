import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ScrollProgressBar from "@/app/components/ScrollProgressBar";
// import { Open_Sans } from 'next/font/google';
// const sans = Open_Sans({ subsets: ['latin'] });
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

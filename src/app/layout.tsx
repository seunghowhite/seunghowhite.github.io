import type { Metadata } from "next";
import "./globals.css";
import ScrollProgressBar from "@/app/components/ScrollProgressBar";
import Footer from "@/app/components/Footer";
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
        <main className="relative h-lvh bg-slate-500 pb-80">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

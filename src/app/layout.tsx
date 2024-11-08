import type { Metadata } from "next";

import "./globals.css";
import DarkModeToggle from "@/components/DarkModeToggle";
import Footer from "@/components/Footer";
import { Nav } from "@/components/Nav";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import Providers from "@/lib/Providers";

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
    <html
      lang="ko"
      className="scroll-my-20 scroll-smooth"
      suppressHydrationWarning
    >
      <body>
        <Providers>
          <Nav />
          <main className="bg-slate-300">{children}</main>
          <div className="mt-24 flex justify-center"></div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

import type { Metadata } from "next";

import Footer from "@/components/layout/Footer";
import Nav from "@/components/layout/Nav";
import Providers from "@/config/Providers";
import "@/config/globals.css";
import { getMetadata } from "@/utils/metadata";

export const metadata: Metadata = getMetadata({});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full scroll-my-20 scroll-smooth"
      suppressHydrationWarning
    >
      <body className="font-pretendard flex min-h-screen flex-col">
        <Providers>
          <Nav />
          <main className="mt-[70px] flex flex-1 flex-col">{children}</main>
          <Footer />
          <div id="toast-root" />
        </Providers>
        {/* 
        <GoogleAnalytics gaId="G-TRBVGE9TYP" />
        <GoogleTagManager gtmId="G-TRBVGE9TYP" /> */}
      </body>
    </html>
  );
}

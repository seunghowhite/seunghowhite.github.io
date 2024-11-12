import type { Metadata } from "next";

import Footer from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { baseDomain, blogDesc, blogName, blogThumbnailURL, icon } from "@/config/const";
import "@/config/globals.css";
import Providers from "@/lib/Providers";

export const metadata: Metadata = {
  metadataBase: new URL(baseDomain),
  title: blogName,
  description: blogDesc,
  icons: {
    icon: icon,
  },
  openGraph: {
    title: blogName,
    description: blogDesc,
    siteName: blogName,
    images: [blogThumbnailURL],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: blogName,
    description: blogDesc,
    images: [blogThumbnailURL],
  },
};

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
          <main className="mt-[64px] flex flex-1 flex-col">{children}</main>
          <Footer />
        </Providers>
        {/* <Toaster />
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics gaId="G-TRBVGE9TYP" />
        <GoogleTagManager gtmId="G-TRBVGE9TYP" /> */}
      </body>
    </html>
  );
}

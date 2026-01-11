import { Metadata } from "next";
import { Sofia_Sans } from "next/font/google";

import { Layout } from "@/components/layout";

import { themeClass } from "@/styles";

import "@/styles/global.css";

export const metadata: Metadata = {
  title: "Tipsters",
  description: "Tipsters - Your betting companion",
};

const sofiaFont = Sofia_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-sofia",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sofiaFont.variable} ${themeClass}`}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}

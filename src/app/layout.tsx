import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import root from "@/locales/root.json"
import AppNavbar from "@/components/app-navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: root.Website.longName,
  description: "Math website made as an modern enterprise-like website.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/gh/bitmaks/cm-web-fonts@latest/fonts.css"
          />
      </head>
      <body className="min-h-full flex flex-col">
        <AppNavbar />
        {children}
      </body>
    </html>
  );
}

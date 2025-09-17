import type { Metadata } from "next";
import Providers from "./Providers";
import Header from "./@header/default";
import Footer from "./@footer/default";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "캠핑 로그",
  description: "캠핑 정보를 확인할 수 있는 사이트",
};

interface RootLayout {
  children: React.ReactNode;
  header: React.ReactNode;
  footer: React.ReactNode;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "(주)대한수소발전",
  description: "수소 및 암모니아 기반 발전 기술 기업 홈페이지",
  icons: {
    icon: "/icon.png"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}

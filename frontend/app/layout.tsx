import type { Metadata } from "next";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "복지 서비스 길잡이",
  description: "조건에 맞는 복지 서비스와 기관을 찾습니다.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        <a className="skip-link" href="#main-content">
          본문으로 건너뛰기
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

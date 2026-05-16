import type { Metadata } from "next";
import { AuthHydrator } from "./components/AuthHydrator";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { SITE_NAME } from "./lib/constants";
import "./globals.css";

export const metadata: Metadata = {
  title: `${SITE_NAME} — 나에게 맞는 장애인 복지서비스를 찾는 가장 빠른 길`,
  description:
    "장애유형, 연령, 지역, 지원 분야를 선택하면 신청할 수 있는 공공 복지서비스와 담당 기관을 한 번에 확인할 수 있습니다.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        <a className="skip-link" href="#main-content">
          본문 바로가기
        </a>
        <AuthHydrator />
        <Header />
        <div id="main-content">{children}</div>
        <Footer />
      </body>
    </html>
  );
}

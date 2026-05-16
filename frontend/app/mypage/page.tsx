"use client";

import Link from "next/link";
import { AuthGuard } from "../components/auth/AuthGuard";
import { useAuthStore } from "../store/useAuthStore";

function MypageContent() {
  const { user, logout } = useAuthStore();

  return (
    <>
      <header className="page-header">
        <div className="container">
          <h1>마이페이지</h1>
          <p>{user?.name}님, 안녕하세요.</p>
        </div>
      </header>
      <section className="container section" style={{ paddingTop: 0 }}>
        <div className="step-card">
          <h2>계정 정보</h2>
          <dl className="service-card__facts">
            <dt>이름</dt>
            <dd>{user?.name}</dd>
            <dt>이메일</dt>
            <dd>{user?.email}</dd>
            <dt>역할</dt>
            <dd>{user?.role}</dd>
          </dl>
        </div>
        <div className="step-card" style={{ marginTop: "1rem" }}>
          <h2>즐겨찾기</h2>
          <p>로그인 연동 후 저장한 복지 서비스가 여기에 표시됩니다. (추후 구현)</p>
        </div>
        <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Link href="/search" className="btn btn--primary">
            서비스 찾기
          </Link>
          <Link href="/newdocument" className="btn btn--outline">
            새 문서
          </Link>
          <button type="button" className="btn btn--ghost" onClick={() => logout()}>
            로그아웃
          </button>
        </div>
        <p style={{ marginTop: "2rem" }}>
          <Link href="/">← 홈으로</Link>
        </p>
      </section>
    </>
  );
}

export default function MypagePage() {
  return (
    <AuthGuard>
      <MypageContent />
    </AuthGuard>
  );
}

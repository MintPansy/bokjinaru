"use client";

import Link from "next/link";
import { AuthGuard } from "../components/auth/AuthGuard";

function NewDocumentContent() {
  return (
    <>
      <header className="page-header">
        <div className="container">
          <h1>새 문서</h1>
          <p>로그인한 사용자만 접근할 수 있는 데모 화면입니다.</p>
        </div>
      </header>
      <section className="container section" style={{ paddingTop: 0 }}>
        <div className="filter-panel">
          <p>
            상담 메모·신청 체크리스트 등 개인 문서 기능이 이 영역에 추가될
            예정입니다.
          </p>
        </div>
        <p style={{ marginTop: "2rem" }}>
          <Link href="/mypage">← 마이페이지</Link>
        </p>
      </section>
    </>
  );
}

export default function NewDocumentPage() {
  return (
    <AuthGuard>
      <NewDocumentContent />
    </AuthGuard>
  );
}

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { demoLogin } from "../../services/api";
import { useAuthStore } from "../../store/useAuthStore";

function DemoLoginFormInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const login = useAuthStore((s) => s.login);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleDemoLogin() {
    setLoading(true);
    setError(null);
    try {
      const res = await demoLogin("demo", "demo1234");
      login(res.token, res.user);
      const redirect = searchParams.get("redirect") || "/mypage";
      router.push(redirect);
    } catch {
      setError(
        "로그인에 실패했습니다. NEXT_PUBLIC_API_URL과 Railway API 상태를 확인해 주세요."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="filter-panel">
      <p>
        데모 계정으로 로그인합니다. 실제 OAuth 연동 전까지 마이페이지·문서
        기능을 체험할 수 있습니다.
      </p>
      <p style={{ fontSize: "0.95rem", color: "var(--text-muted)" }}>
        아이디: <strong>demo</strong> · 비밀번호: <strong>demo1234</strong>
      </p>
      {error && (
        <p role="alert" style={{ color: "#b42318" }}>
          {error}
        </p>
      )}
      <button
        type="button"
        className="btn btn--primary"
        onClick={handleDemoLogin}
        disabled={loading}
        style={{ marginTop: "1rem" }}
      >
        {loading ? "로그인 중…" : "데모 로그인"}
      </button>
    </div>
  );
}

export function DemoLoginForm() {
  return (
    <Suspense fallback={<p>준비 중…</p>}>
      <DemoLoginFormInner />
    </Suspense>
  );
}

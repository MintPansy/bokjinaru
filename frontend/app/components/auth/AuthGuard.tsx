"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "../../store/useAuthStore";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { hydrated, token } = useAuthStore();

  useEffect(() => {
    if (hydrated && !token) {
      router.replace("/login?redirect=" + encodeURIComponent(window.location.pathname));
    }
  }, [hydrated, token, router]);

  if (!hydrated) {
    return <p className="container">확인 중…</p>;
  }

  if (!token) {
    return (
      <p className="container">
        로그인이 필요합니다.{" "}
        <Link href="/login">로그인 페이지로 이동</Link>
      </p>
    );
  }

  return <>{children}</>;
}

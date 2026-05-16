"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_ITEMS, SITE_NAME } from "../lib/constants";
import { useAuthStore } from "../store/useAuthStore";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { token, user, logout, hydrated } = useAuthStore();

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link href="/" className="site-logo" onClick={() => setOpen(false)}>
          <span className="site-logo__mark" aria-hidden="true">
            복
          </span>
          <span>
            {SITE_NAME}
            <span className="site-logo__sub">장애인 복지서비스 안내</span>
          </span>
        </Link>

        <nav className="site-nav" aria-label="주요 메뉴">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
          {hydrated && token && (
            <Link
              href="/mypage"
              aria-current={pathname === "/mypage" ? "page" : undefined}
            >
              마이페이지
            </Link>
          )}
        </nav>

        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          {hydrated && !token && (
            <Link href="/login" className="btn btn--ghost header-cta">
              로그인
            </Link>
          )}
          <Link href="/search" className="btn btn--primary header-cta">
            서비스 찾기
          </Link>
        </div>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          메뉴
        </button>
      </div>

      <div className="container">
        <nav
          id="mobile-menu"
          className={`mobile-nav${open ? " is-open" : ""}`}
          aria-label="모바일 메뉴"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          {hydrated && token ? (
            <>
              <Link href="/mypage" onClick={() => setOpen(false)}>
                마이페이지 ({user?.name})
              </Link>
              <button
                type="button"
                className="btn btn--ghost"
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
              >
                로그아웃
              </button>
            </>
          ) : (
            <Link href="/login" onClick={() => setOpen(false)}>
              로그인
            </Link>
          )}
          <Link href="/search" className="btn btn--primary" onClick={() => setOpen(false)}>
            서비스 찾기
          </Link>
        </nav>
      </div>
    </header>
  );
}

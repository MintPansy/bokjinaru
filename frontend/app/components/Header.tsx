"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_ITEMS, SITE_NAME } from "../lib/constants";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

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
        </nav>

        <Link href="/search" className="btn btn--primary header-cta">
          서비스 찾기
        </Link>

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
              aria-current={pathname === item.href ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/search" className="btn btn--primary" onClick={() => setOpen(false)}>
            서비스 찾기
          </Link>
        </nav>
      </div>
    </header>
  );
}

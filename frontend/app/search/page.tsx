"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ServiceCard } from "../components/ServiceCard";
import {
  DISABILITY_TYPES,
  FEATURED_SERVICES,
  SUPPORT_FIELDS,
} from "../lib/constants";

function SearchContent() {
  const params = useSearchParams();
  const disability = params.get("disability");
  const support = params.get("support");

  const results = FEATURED_SERVICES.filter((s) => {
    if (disability && !s.target.includes("모든") && !s.id.includes(disability)) {
      return false;
    }
    if (support && !s.tags.some((t) => t.includes(support === "care" ? "돌봄" : ""))) {
      if (support === "income" && s.category !== "소득지원") return false;
      if (support === "care" && !s.tags.some((t) => t.includes("돌봄"))) return false;
      if (support === "medical" && !s.tags.some((t) => t.includes("의료"))) return false;
    }
    return true;
  });

  return (
    <>
      <header className="page-header">
        <div className="container">
          <h1>서비스 찾기</h1>
          <p>장애유형, 연령, 지역, 지원 분야로 맞는 복지 서비스를 검색합니다.</p>
        </div>
      </header>

      <section className="container section" style={{ paddingTop: 0 }}>
        <form className="filter-panel" action="/search" method="get">
          <fieldset>
            <legend>장애유형</legend>
            <select name="disability" defaultValue={disability ?? ""}>
              <option value="">전체</option>
              {DISABILITY_TYPES.map((d) => (
                <option key={d.code} value={d.code}>
                  {d.label}
                </option>
              ))}
            </select>
          </fieldset>
          <fieldset>
            <legend>지원 분야</legend>
            <select name="support" defaultValue={support ?? ""}>
              <option value="">전체</option>
              {SUPPORT_FIELDS.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.label}
                </option>
              ))}
            </select>
          </fieldset>
          <button type="submit" className="btn btn--primary">
            검색
          </button>
        </form>

        <p aria-live="polite">
          <strong>{results.length}</strong>건의 서비스가 있습니다.
        </p>
        <div className="card-grid" style={{ marginTop: "1.5rem" }}>
          {results.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
        <p style={{ marginTop: "2rem" }}>
          <Link href="/">← 홈으로</Link>
        </p>
      </section>
    </>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<p className="container">불러오는 중…</p>}>
      <SearchContent />
    </Suspense>
  );
}

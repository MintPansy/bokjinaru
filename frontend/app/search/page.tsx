"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { MockDataBanner } from "../components/MockDataBanner";
import { ServiceCard } from "../components/ServiceCard";
import { toServiceCardItem } from "../lib/mappers";
import { AGE_GROUPS, DISABILITY_TYPES, REGIONS, SUPPORT_FIELDS } from "../lib/constants";
import {
  getFiltersClientWithFallback,
  getServicesClientWithFallback,
} from "../services/api-with-fallback";
import type { CodeLabel } from "../types/api";
import type { WelfareServiceItem } from "../lib/constants";

function SearchContent() {
  const params = useSearchParams();
  const disabilityType = params.get("disabilityType") ?? params.get("disability") ?? "";
  const supportType = params.get("supportType") ?? params.get("support") ?? "";
  const ageGroup = params.get("ageGroup") ?? "";
  const region = params.get("region") ?? "";
  const q = params.get("q") ?? "";

  const [results, setResults] = useState<WelfareServiceItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [useMock, setUseMock] = useState(false);
  const [filters, setFilters] = useState<{
    disability: CodeLabel[];
    support: CodeLabel[];
    age: CodeLabel[];
    region: CodeLabel[];
  } | null>(null);

  const searchParams = {
    disabilityType: disabilityType || undefined,
    supportType: supportType || undefined,
    ageGroup: ageGroup || undefined,
    region: region || undefined,
    q: q || undefined,
  };

  useEffect(() => {
    getFiltersClientWithFallback().then(({ data, source }) => {
      setFilters({
        disability: data.disabilityTypes,
        support: data.supportTypes,
        age: data.ageGroups,
        region: data.regions,
      });
      if (source === "mock") setUseMock(true);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    getServicesClientWithFallback(searchParams)
      .then(({ data, source }) => {
        setResults(data.items.map(toServiceCardItem));
        setTotal(data.total);
        if (source === "mock") setUseMock(true);
      })
      .finally(() => setLoading(false));
  }, [disabilityType, supportType, ageGroup, region, q]);

  const disabilityOptions = filters?.disability ?? DISABILITY_TYPES;
  const supportOptions = filters?.support ?? SUPPORT_FIELDS;
  const ageOptions = filters?.age ?? AGE_GROUPS;
  const regionOptions = filters?.region ?? REGIONS;

  return (
    <>
      <header className="page-header">
        <div className="container">
          <h1>서비스 찾기</h1>
          <p>장애유형, 연령, 지역, 지원 분야로 맞는 복지 서비스를 검색합니다.</p>
        </div>
      </header>

      <section className="container section" style={{ paddingTop: 0 }}>
        {useMock && <MockDataBanner compact />}
        <form className="filter-panel" action="/search" method="get">
          <fieldset>
            <legend>장애유형</legend>
            <select name="disabilityType" defaultValue={disabilityType}>
              <option value="">전체</option>
              {disabilityOptions.map((d) => (
                <option key={d.code} value={d.code}>
                  {d.label}
                </option>
              ))}
            </select>
          </fieldset>
          <fieldset>
            <legend>지원 분야</legend>
            <select name="supportType" defaultValue={supportType}>
              <option value="">전체</option>
              {supportOptions.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.label}
                </option>
              ))}
            </select>
          </fieldset>
          <fieldset>
            <legend>연령대</legend>
            <select name="ageGroup" defaultValue={ageGroup}>
              <option value="">전체</option>
              {ageOptions.map((a) => (
                <option key={a.code} value={a.code}>
                  {a.label}
                </option>
              ))}
            </select>
          </fieldset>
          <fieldset>
            <legend>지역</legend>
            <select name="region" defaultValue={region}>
              <option value="">전체</option>
              {regionOptions.map((r) => (
                <option key={r.code} value={r.code}>
                  {r.label}
                </option>
              ))}
            </select>
          </fieldset>
          <fieldset>
            <legend>검색어</legend>
            <input
              type="search"
              name="q"
              defaultValue={q}
              placeholder="서비스 이름·요약 검색"
              style={{
                width: "100%",
                maxWidth: "20rem",
                padding: "0.65rem",
                fontSize: "1rem",
              }}
            />
          </fieldset>
          <button type="submit" className="btn btn--primary">
            검색
          </button>
        </form>

        <p aria-live="polite">
          {loading ? (
            "검색 중…"
          ) : (
            <>
              <strong>{total}</strong>건의 서비스가 있습니다.
            </>
          )}
        </p>
        {!loading && (
          <div className="card-grid" style={{ marginTop: "1.5rem" }}>
            {results.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        )}
        {!loading && total === 0 && (
          <p>조건에 맞는 서비스가 없습니다. 필터를 넓혀 다시 검색해 보세요.</p>
        )}
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

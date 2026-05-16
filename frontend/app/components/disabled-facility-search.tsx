"use client";

import { useCallback, useState } from "react";
import { DisabledFacilityDetailPanel } from "./disabled-facility-detail";
import { DisabledFacilityList } from "./disabled-facility-list";
import type {
  DisabledFacilityApiError,
  DisabledFacilityDetail,
  DisabledFacilityItem,
  DisabledFacilityListResponse,
  DisabledFacilitySearchParams,
} from "@/lib/apis/disabledFacility.types";
import { FACILITY_TYPE_OPTIONS } from "@/lib/apis/disabledFacility.types";

const DEFAULT_ROWS = 20;

type FormState = {
  faclNm: string;
  siDoNm: string;
  cggNm: string;
  roadNm: string;
  faclTyCd: string;
  pageNo: string;
  numOfRows: string;
};

const initialForm: FormState = {
  faclNm: "",
  siDoNm: "",
  cggNm: "",
  roadNm: "",
  faclTyCd: "",
  pageNo: "1",
  numOfRows: String(DEFAULT_ROWS),
};

function buildQueryString(params: DisabledFacilitySearchParams): string {
  const q = new URLSearchParams();
  if (params.pageNo) q.set("pageNo", String(params.pageNo));
  if (params.numOfRows) q.set("numOfRows", String(params.numOfRows));
  if (params.faclNm) q.set("faclNm", params.faclNm);
  if (params.siDoNm) q.set("siDoNm", params.siDoNm);
  if (params.cggNm) q.set("cggNm", params.cggNm);
  if (params.roadNm) q.set("roadNm", params.roadNm);
  if (params.faclTyCd) q.set("faclTyCd", params.faclTyCd);
  return q.toString();
}

function parseApiError(body: unknown, fallback: string): string {
  if (
    body &&
    typeof body === "object" &&
    "ok" in body &&
    (body as DisabledFacilityApiError).ok === false
  ) {
    return (body as DisabledFacilityApiError).message;
  }
  return fallback;
}

export function DisabledFacilitySearch() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [items, setItems] = useState<DisabledFacilityItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [listLoading, setListLoading] = useState(false);
  const [listError, setListError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detail, setDetail] = useState<DisabledFacilityDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);

  const runSearch = useCallback(async (override?: Partial<FormState>) => {
    const merged = { ...form, ...override };
    setListLoading(true);
    setListError(null);
    setHasSearched(true);
    setSelectedId(null);
    setDetail(null);
    setDetailError(null);

    const params: DisabledFacilitySearchParams = {
      pageNo: Math.max(1, Number(merged.pageNo) || 1),
      numOfRows: Math.min(1000, Math.max(1, Number(merged.numOfRows) || DEFAULT_ROWS)),
      faclNm: merged.faclNm.trim() || undefined,
      siDoNm: merged.siDoNm.trim() || undefined,
      cggNm: merged.cggNm.trim() || undefined,
      roadNm: merged.roadNm.trim() || undefined,
      faclTyCd: merged.faclTyCd.trim() || undefined,
    };

    try {
      const res = await fetch(`/api/disabled-facilities?${buildQueryString(params)}`);
      const body: unknown = await res.json();

      if (!res.ok) {
        setItems([]);
        setTotalCount(0);
        setListError(parseApiError(body, "시설 목록을 불러오지 못했습니다."));
        return;
      }

      const data = body as DisabledFacilityListResponse;
      if (!data.ok) {
        setItems([]);
        setTotalCount(0);
        setListError("시설 목록 응답 형식이 올바르지 않습니다.");
        return;
      }

      setItems(data.items);
      setTotalCount(data.totalCount);
    } catch {
      setItems([]);
      setTotalCount(0);
      setListError("네트워크 오류로 시설 목록을 불러오지 못했습니다.");
    } finally {
      setListLoading(false);
    }
  }, [form]);

  const loadDetail = useCallback(async (wfcltId: string) => {
    setSelectedId(wfcltId);
    setDetailLoading(true);
    setDetailError(null);
    setDetail(null);

    try {
      const res = await fetch(
        `/api/disabled-facilities/${encodeURIComponent(wfcltId)}`
      );
      const body: unknown = await res.json();

      if (!res.ok) {
        setDetailError(parseApiError(body, "시설 상세를 불러오지 못했습니다."));
        return;
      }

      if (
        body &&
        typeof body === "object" &&
        "ok" in body &&
        (body as { ok: boolean }).ok === true &&
        "item" in body
      ) {
        setDetail((body as { item: DisabledFacilityDetail }).item);
      } else {
        setDetailError("시설 상세 응답 형식이 올바르지 않습니다.");
      }
    } catch {
      setDetailError("네트워크 오류로 시설 상세를 불러오지 못했습니다.");
    } finally {
      setDetailLoading(false);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void runSearch({ pageNo: "1" });
  };

  const updateField = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="facility-page">
      <form className="filter-panel facility-search-form" onSubmit={handleSubmit}>
        <fieldset>
          <legend>시설명</legend>
          <label htmlFor="faclNm" className="sr-only">
            시설명
          </label>
          <input
            id="faclNm"
            name="faclNm"
            type="search"
            value={form.faclNm}
            onChange={(e) => updateField("faclNm", e.target.value)}
            placeholder="예: 복지관"
          />
        </fieldset>

        <fieldset>
          <legend>시도</legend>
          <label htmlFor="siDoNm" className="sr-only">
            시도명
          </label>
          <input
            id="siDoNm"
            name="siDoNm"
            type="text"
            value={form.siDoNm}
            onChange={(e) => updateField("siDoNm", e.target.value)}
            placeholder="예: 서울특별시"
          />
        </fieldset>

        <fieldset>
          <legend>시군구</legend>
          <label htmlFor="cggNm" className="sr-only">
            시군구명
          </label>
          <input
            id="cggNm"
            name="cggNm"
            type="text"
            value={form.cggNm}
            onChange={(e) => updateField("cggNm", e.target.value)}
            placeholder="예: 종로구"
          />
        </fieldset>

        <fieldset>
          <legend>도로명</legend>
          <label htmlFor="roadNm" className="sr-only">
            도로명
          </label>
          <input
            id="roadNm"
            name="roadNm"
            type="text"
            value={form.roadNm}
            onChange={(e) => updateField("roadNm", e.target.value)}
            placeholder="예: 세종대로"
          />
        </fieldset>

        <fieldset>
          <legend>시설유형</legend>
          <label htmlFor="faclTyCd" className="sr-only">
            시설유형
          </label>
          <select
            id="faclTyCd"
            name="faclTyCd"
            value={form.faclTyCd}
            onChange={(e) => updateField("faclTyCd", e.target.value)}
          >
            <option value="">전체</option>
            {FACILITY_TYPE_OPTIONS.map((label) => (
              <option key={label} value={label}>
                {label}
              </option>
            ))}
          </select>
        </fieldset>

        <fieldset>
          <legend>페이지</legend>
          <label htmlFor="pageNo">페이지 번호</label>
          <input
            id="pageNo"
            name="pageNo"
            type="number"
            min={1}
            value={form.pageNo}
            onChange={(e) => updateField("pageNo", e.target.value)}
          />
        </fieldset>

        <fieldset>
          <legend>건수</legend>
          <label htmlFor="numOfRows">페이지당 건수</label>
          <input
            id="numOfRows"
            name="numOfRows"
            type="number"
            min={1}
            max={1000}
            value={form.numOfRows}
            onChange={(e) => updateField("numOfRows", e.target.value)}
          />
        </fieldset>

        <button
          type="submit"
          className="btn btn--primary"
          disabled={listLoading}
          aria-busy={listLoading}
        >
          {listLoading ? "검색 중…" : "검색"}
        </button>
      </form>

      {listError && (
        <p className="facility-alert" role="alert">
          {listError}
        </p>
      )}

      {hasSearched && !listLoading && !listError && (
        <p className="facility-result-count" aria-live="polite">
          총 <strong>{totalCount}</strong>건 (현재 페이지 {items.length}건 표시)
        </p>
      )}

      <div className="facility-layout">
        <section className="facility-layout__list" aria-label="검색 결과 목록">
          <DisabledFacilityList
            items={items}
            selectedId={selectedId}
            onSelect={(item) => {
              if (item.wfcltId) void loadDetail(item.wfcltId);
            }}
            loading={listLoading}
          />
        </section>

        <DisabledFacilityDetailPanel
          detail={detail}
          loading={detailLoading}
          error={detailError}
          onClose={() => {
            setSelectedId(null);
            setDetail(null);
            setDetailError(null);
          }}
        />
      </div>
    </div>
  );
}

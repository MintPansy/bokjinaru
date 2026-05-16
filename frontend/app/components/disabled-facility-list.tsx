"use client";

import type { DisabledFacilityItem } from "@/lib/apis/disabledFacility.types";

type Props = {
  items: DisabledFacilityItem[];
  selectedId: string | null;
  onSelect: (item: DisabledFacilityItem) => void;
  loading?: boolean;
};

function SkeletonRows() {
  return (
    <ul className="facility-list" aria-hidden="true">
      {Array.from({ length: 4 }).map((_, i) => (
        <li key={i} className="facility-card facility-card--skeleton">
          <div className="facility-skeleton facility-skeleton--title" />
          <div className="facility-skeleton facility-skeleton--line" />
          <div className="facility-skeleton facility-skeleton--line short" />
        </li>
      ))}
    </ul>
  );
}

export function DisabledFacilityList({
  items,
  selectedId,
  onSelect,
  loading,
}: Props) {
  if (loading) {
    return (
      <div aria-busy="true" aria-label="검색 결과 불러오는 중">
        <SkeletonRows />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <p className="facility-empty" role="status">
        검색 결과가 없습니다. 검색 조건을 바꿔 다시 시도해 보세요.
      </p>
    );
  }

  return (
    <ul className="facility-list" role="list">
      {items.map((item) => {
        const selected = item.wfcltId === selectedId;
        return (
          <li key={item.wfcltId || item.faclInfId} role="listitem">
            <button
              type="button"
              className={`facility-card${selected ? " facility-card--selected" : ""}`}
              onClick={() => onSelect(item)}
              aria-pressed={selected}
              aria-label={`${item.faclNm} 상세 보기`}
            >
              <h3 className="facility-card__title">{item.faclNm}</h3>
              <p className="facility-card__meta">
                <span className="badge">{item.faclTyCd || "시설유형 미상"}</span>
                {item.salStaNm && (
                  <span className="facility-card__status">{item.salStaNm}</span>
                )}
              </p>
              {item.lcMnad && (
                <p className="facility-card__address">{item.lcMnad}</p>
              )}
              {(item.faclLat != null || item.faclLng != null) && (
                <p className="facility-card__coords">
                  위치: {item.faclLat ?? "—"}, {item.faclLng ?? "—"}
                </p>
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

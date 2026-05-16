"use client";

import type { DisabledFacilityDetail } from "@/lib/apis/disabledFacility.types";

type Props = {
  detail: DisabledFacilityDetail | null;
  loading: boolean;
  error: string | null;
  onClose?: () => void;
};

export function DisabledFacilityDetailPanel({
  detail,
  loading,
  error,
  onClose,
}: Props) {
  return (
    <aside
      className="facility-detail"
      aria-labelledby="facility-detail-title"
      aria-busy={loading}
    >
      <div className="facility-detail__header">
        <h2 id="facility-detail-title">시설 기구표 상세</h2>
        {onClose && (
          <button type="button" className="btn btn--ghost" onClick={onClose}>
            닫기
          </button>
        )}
      </div>

      {loading && (
        <p className="facility-detail__loading" role="status" aria-live="polite">
          상세 정보를 불러오는 중…
        </p>
      )}

      {!loading && error && (
        <p className="facility-detail__error" role="alert">
          {error}
        </p>
      )}

      {!loading && !error && !detail && (
        <p className="facility-detail__placeholder" role="status">
          목록에서 시설을 선택하면 편의시설 기구표(평가 항목)를 확인할 수 있습니다.
        </p>
      )}

      {!loading && !error && detail && (
        <div>
          <p className="facility-detail__name">{detail.faclNm}</p>
          <p className="facility-detail__id">
            시설 ID: <code>{detail.wfcltId}</code>
          </p>

          <h3 className="facility-detail__subtitle">기구표 항목</h3>
          {detail.evalInfo.length === 0 ? (
            <p className="facility-detail__empty">등록된 기구표 항목이 없습니다.</p>
          ) : (
            <ul className="facility-eval-badges" aria-label="기구표 항목 목록">
              {detail.evalInfo.map((label) => (
                <li key={label}>
                  <span className="facility-eval-badge">{label}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </aside>
  );
}

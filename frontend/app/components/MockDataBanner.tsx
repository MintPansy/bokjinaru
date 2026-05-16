import Link from "next/link";
import { getApiHealthUrl } from "../lib/api-config";

type Props = {
  compact?: boolean;
};

/** API 대신 로컬 예시 데이터를 표시할 때 안내 */
export function MockDataBanner({ compact }: Props) {
  if (compact) {
    return (
      <p
        className="mock-data-banner mock-data-banner--compact"
        role="status"
        aria-live="polite"
      >
        예시 데이터를 표시 중입니다. 연결 복구 시 자동으로 최신 정보를 불러옵니다.
      </p>
    );
  }

  return (
    <div className="container mock-data-banner-wrap" role="status" aria-live="polite">
      <div className="mock-data-banner">
        <p style={{ margin: "0 0 0.35rem", fontWeight: 700 }}>
          예시 데이터를 표시하고 있습니다
        </p>
        <p style={{ margin: 0, fontSize: "0.95rem" }}>
          API 서버에 연결되지 않아 미리 준비한 복지 서비스 샘플을 보여 드립니다.
          실제 신청 전에는 공식 기관에서 최신 내용을 확인해 주세요.
        </p>
        <p style={{ margin: "0.75rem 0 0", fontSize: "0.9rem" }}>
          <a href={getApiHealthUrl()} target="_blank" rel="noopener noreferrer">
            API 연결 확인
          </a>
          {" · "}
          <Link href="/search">서비스 찾기</Link>
        </p>
      </div>
    </div>
  );
}

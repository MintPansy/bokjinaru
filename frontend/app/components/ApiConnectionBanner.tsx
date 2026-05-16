import Link from "next/link";
import { getApiBaseUrl, getApiHealthUrl, isLocalApi } from "../lib/api-config";

type Props = {
  /** 개발자용 상세 (로컬에서만 기본 표시) */
  showDetails?: boolean;
};

export function ApiConnectionBanner({ showDetails }: Props) {
  const apiUrl = getApiBaseUrl();
  const healthUrl = getApiHealthUrl();
  const local = isLocalApi();
  const details = showDetails ?? process.env.NODE_ENV === "development";

  return (
    <div
      className="container"
      role="alert"
      style={{
        paddingTop: "1rem",
        paddingBottom: "0.5rem",
      }}
    >
      <div
        className="filter-panel"
        style={{
          borderColor: "#f5c2c7",
          background: "#fff5f5",
        }}
      >
        <p style={{ margin: "0 0 0.75rem", fontWeight: 700 }}>
          API에 연결하지 못했습니다
        </p>
        <p style={{ margin: "0 0 0.5rem" }}>
          복지 서비스·기관 데이터를 불러올 수 없습니다. 아래를 확인해 주세요.
        </p>
        <ul style={{ margin: "0 0 0.75rem", paddingLeft: "1.25rem" }}>
          <li>
            <strong>배포 사이트(Vercel)</strong>: Environment Variables에{" "}
            <code>NEXT_PUBLIC_API_URL</code>이 Railway 주소로 설정되어 있는지
            확인 후 <strong>Redeploy</strong>
          </li>
          <li>
            <strong>로컬 개발</strong>: <code>frontend/.env.local</code>에
            Railway URL 또는 <code>http://localhost:8080</code>
          </li>
          <li>
            API 주소 끝에 <code>/</code>를 붙이지 마세요 (예:{" "}
            <code>...railway.app</code> 만)
          </li>
          <li>
            Railway <strong>CORS</strong>에 Vercel 도메인이 포함되어 있는지
            확인
          </li>
        </ul>
        {details && (
          <p style={{ margin: "0 0 0.5rem", fontSize: "0.9rem", color: "#555" }}>
            현재 연결 시도: <code>{apiUrl}</code>
            {local ? " (로컬)" : " (원격)"}
          </p>
        )}
        <p style={{ margin: 0, fontSize: "0.95rem" }}>
          <a href={healthUrl} target="_blank" rel="noopener noreferrer">
            API 상태 확인 ({healthUrl})
          </a>
          {" · "}
          <Link href="/search">검색 페이지로</Link>
        </p>
      </div>
    </div>
  );
}

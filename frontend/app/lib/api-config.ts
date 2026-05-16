/** API 베이스 URL (끝 슬래시 제거 — //api 경로 404 방지) */
export function getApiBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_API_URL?.trim();
  if (!raw) return "http://localhost:8080";
  return raw.replace(/\/+$/, "");
}

export function getApiHealthUrl(): string {
  return `${getApiBaseUrl()}/api/health`;
}

export function isLocalApi(): boolean {
  const base = getApiBaseUrl();
  return base.includes("localhost") || base.includes("127.0.0.1");
}

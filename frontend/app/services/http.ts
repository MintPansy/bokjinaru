import { getApiBaseUrl } from "../lib/api-config";

const TOKEN_KEY = "bokjinaru_token";

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setStoredToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

function buildUrl(path: string): string {
  const base = getApiBaseUrl();
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}

export async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getStoredToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...init?.headers,
  };
  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(buildUrl(path), {
    ...init,
    headers,
  });

  if (!res.ok) {
    const message = await res.text().catch(() => res.statusText);
    throw new Error(`HTTP ${res.status}: ${message || path}`);
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export async function serverHttp<T>(path: string): Promise<T> {
  const res = await fetch(buildUrl(path), {
    next: { revalidate: 30 },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${path}`);
  return res.json() as Promise<T>;
}

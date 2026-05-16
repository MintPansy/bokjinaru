import type {
  AuthUser,
  DemoLoginResponse,
  FilterMeta,
  OrganizationDetail,
  PlatformStats,
  ServiceDetail,
  ServiceListResponse,
  ServiceSummary,
} from "../types/api";
import { http, serverHttp } from "./http";

type OrgDto = {
  id: string;
  name: string;
  region: string;
  regionLabel?: string;
  phone: string;
  address?: string;
  website?: string;
  description?: string;
};

function mapSummary(raw: ServiceSummary): ServiceSummary {
  return {
    ...raw,
    disabilityTypes: raw.disabilityTypes?.map(String) ?? [],
    ageGroups: raw.ageGroups?.map(String) ?? [],
    regions: raw.regions?.map(String) ?? [],
    supportTypes: raw.supportTypes?.map(String) ?? [],
  };
}

export async function checkHealth(): Promise<boolean> {
  try {
    const data = await http<{ status: string }>("/api/health");
    return data.status === "ok";
  } catch {
    return false;
  }
}

export async function getFilters(): Promise<FilterMeta> {
  return serverHttp<FilterMeta>("/api/v1/meta/filters");
}

export async function getFiltersClient(): Promise<FilterMeta> {
  return http<FilterMeta>("/api/v1/meta/filters");
}

export async function getStats(): Promise<PlatformStats> {
  return serverHttp<PlatformStats>("/api/v1/meta/stats");
}

export async function getStatsClient(): Promise<PlatformStats> {
  return http<PlatformStats>("/api/v1/meta/stats");
}

export type ServiceSearchParams = {
  disabilityType?: string;
  ageGroup?: string;
  region?: string;
  supportType?: string;
  q?: string;
};

function buildQuery(params?: ServiceSearchParams): string {
  if (!params) return "";
  const q = new URLSearchParams();
  if (params.disabilityType) q.set("disabilityType", params.disabilityType);
  if (params.ageGroup) q.set("ageGroup", params.ageGroup);
  if (params.region) q.set("region", params.region);
  if (params.supportType) q.set("supportType", params.supportType);
  if (params.q) q.set("q", params.q);
  const s = q.toString();
  return s ? `?${s}` : "";
}

export async function getServices(
  params?: ServiceSearchParams
): Promise<ServiceListResponse> {
  const list = await serverHttp<ServiceSummary[]>(
    `/api/v1/services${buildQuery(params)}`
  );
  const items = list.map(mapSummary);
  return { items, total: items.length };
}

export async function getServicesClient(
  params?: ServiceSearchParams
): Promise<ServiceListResponse> {
  const list = await http<ServiceSummary[]>(`/api/v1/services${buildQuery(params)}`);
  const items = list.map(mapSummary);
  return { items, total: items.length };
}

export async function getServiceById(id: string): Promise<ServiceDetail> {
  const raw = await serverHttp<ServiceDetail>(`/api/v1/services/${id}`);
  return {
    ...raw,
    disabilityTypes: raw.disabilityTypes?.map(String) ?? [],
    ageGroups: raw.ageGroups?.map(String) ?? [],
    regions: raw.regions?.map(String) ?? [],
    supportTypes: raw.supportTypes?.map(String) ?? [],
    organization: {
      id: raw.organizationId ?? "",
      name: raw.organizationName ?? "",
      phone: "",
      address: "",
      website: "",
    },
  };
}

export async function getOrganizations(region?: string) {
  const q = region ? `?region=${encodeURIComponent(region)}` : "";
  const list = await serverHttp<OrgDto[]>(`/api/v1/organizations${q}`);
  return {
    items: list.map((o) => ({
      id: o.id,
      name: o.name,
      region: String(o.region),
      regionLabel: o.regionLabel ?? String(o.region),
      phone: o.phone,
      serviceCount: 0,
    })),
    total: list.length,
  };
}

export async function getOrganizationById(id: string): Promise<OrganizationDetail> {
  const o = await serverHttp<OrgDto>(`/api/v1/organizations/${id}`);
  return {
    id: o.id,
    name: o.name,
    region: String(o.region),
    phone: o.phone,
    address: o.address ?? "",
    website: o.website ?? "",
    description: o.description ?? "",
    services: [],
  };
}

export async function demoLogin(
  username = "demo",
  password = "demo1234"
): Promise<DemoLoginResponse> {
  return http<DemoLoginResponse>("/api/v1/auth/demo-login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

export async function getMe(): Promise<AuthUser> {
  return http<AuthUser>("/api/v1/auth/me");
}

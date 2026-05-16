import type { WithSource } from "../types/data-source";
import {
  filterMockServices,
  getMockFilters,
  getMockOrganizationById,
  getMockOrganizations,
  getMockServiceById,
  getMockServices,
  getMockStats,
} from "../lib/mock-data";
import type {
  FilterMeta,
  OrganizationDetail,
  OrganizationListResponse,
  PlatformStats,
  ServiceDetail,
  ServiceListResponse,
  ServiceSearchParams,
} from "../types/api";
import {
  getFilters,
  getFiltersClient,
  getOrganizationById,
  getOrganizations,
  getServiceById,
  getServices,
  getServicesClient,
  getStats,
  getStatsClient,
} from "./api";

async function withFallback<T>(
  apiFn: () => Promise<T>,
  mockFn: () => T
): Promise<WithSource<T>> {
  try {
    const data = await apiFn();
    return { data, source: "api" };
  } catch {
    return { data: mockFn(), source: "mock" };
  }
}

export async function getServicesWithFallback(
  params?: ServiceSearchParams
): Promise<WithSource<ServiceListResponse>> {
  return withFallback(
    () => getServices(params),
    () => (params ? filterMockServices(params) : getMockServices())
  );
}

export async function getServicesClientWithFallback(
  params?: ServiceSearchParams
): Promise<WithSource<ServiceListResponse>> {
  return withFallback(
    () => getServicesClient(params),
    () => (params ? filterMockServices(params) : getMockServices())
  );
}

export async function getStatsWithFallback(): Promise<WithSource<PlatformStats>> {
  return withFallback(() => getStats(), getMockStats);
}

export async function getStatsClientWithFallback(): Promise<WithSource<PlatformStats>> {
  return withFallback(() => getStatsClient(), getMockStats);
}

export async function getFiltersWithFallback(): Promise<WithSource<FilterMeta>> {
  return withFallback(() => getFilters(), getMockFilters);
}

export async function getFiltersClientWithFallback(): Promise<WithSource<FilterMeta>> {
  return withFallback(() => getFiltersClient(), getMockFilters);
}

export async function getOrganizationsWithFallback(
  region?: string
): Promise<WithSource<OrganizationListResponse>> {
  return withFallback(
    () => getOrganizations(region),
    () => getMockOrganizations(region)
  );
}

export async function getServiceByIdWithFallback(
  id: string
): Promise<WithSource<ServiceDetail | null>> {
  return withFallback(
    () => getServiceById(id),
    () => getMockServiceById(id) ?? null
  );
}

export async function getOrganizationByIdWithFallback(
  id: string
): Promise<WithSource<OrganizationDetail | null>> {
  return withFallback(
    () => getOrganizationById(id),
    () => getMockOrganizationById(id) ?? null
  );
}

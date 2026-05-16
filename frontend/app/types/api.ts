export type CodeLabel = { code: string; label: string };

export type FilterMeta = {
  disabilityTypes: CodeLabel[];
  ageGroups: CodeLabel[];
  regions: CodeLabel[];
  supportTypes: CodeLabel[];
};

export type PlatformStats = {
  serviceCount: number;
  regionCount: number;
  disabilityTypeCount: number;
};

export type ServiceSummary = {
  id: string;
  title: string;
  summary: string;
  disabilityTypes: string[];
  ageGroups: string[];
  regions: string[];
  supportTypes: string[];
  organizationId: string;
  organizationName: string;
  updatedAt?: string;
};

export type ServiceListResponse = {
  items: ServiceSummary[];
  total: number;
};

export type OrganizationSummary = {
  id: string;
  name: string;
  region: string;
  regionLabel?: string;
  phone: string;
  serviceCount: number;
};

export type OrganizationListResponse = {
  items: OrganizationSummary[];
  total: number;
};

export type OrganizationDetail = {
  id: string;
  name: string;
  region: string;
  phone: string;
  address: string;
  website: string;
  description: string;
  services: { id: string; title: string }[];
};

export type ServiceDetail = {
  id: string;
  title: string;
  summary: string;
  description: string;
  eligibility: string;
  applicationMethod: string;
  requiredDocuments: string[];
  disabilityTypes: string[];
  ageGroups: string[];
  regions: string[];
  supportTypes: string[];
  organizationId?: string;
  organizationName?: string;
  updatedAt?: string;
  relatedLinks: { label: string; url: string }[];
  organization: {
    id: string;
    name: string;
    phone: string;
    address: string;
    website: string;
  };
};

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export type DemoLoginResponse = {
  token: string;
  user: AuthUser;
};

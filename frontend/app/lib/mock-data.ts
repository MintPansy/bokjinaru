import {
  AGE_GROUPS,
  DISABILITY_TYPES,
  REGIONS,
  SUPPORT_FIELDS,
} from "./constants";
import type {
  FilterMeta,
  OrganizationDetail,
  OrganizationListResponse,
  PlatformStats,
  ServiceDetail,
  ServiceListResponse,
  ServiceSearchParams,
  ServiceSummary,
} from "../types/api";

const ORG_NAMES: Record<string, string> = {
  "org-001": "서울시립 발달장애인종합지원센터",
  "org-002": "경기도장애인복지종합지원센터",
  "org-003": "부산시 장애인일자리지원센터",
  "org-004": "대한시각장애인연합회",
};

const MOCK_SUMMARIES: ServiceSummary[] = [
  {
    id: "svc-001",
    title: "장애인연금",
    summary: "중증 장애인 소득 보전을 위한 공적 연금입니다.",
    disabilityTypes: ["PHYSICAL", "DEVELOPMENTAL", "BRAIN_LESION", "MENTAL"],
    ageGroups: ["ADULT", "SENIOR"],
    regions: ["NATIONWIDE"],
    supportTypes: ["INCOME"],
    organizationId: "org-002",
    organizationName: ORG_NAMES["org-002"],
    updatedAt: "2025-03-12",
  },
  {
    id: "svc-002",
    title: "장애인 활동지원 서비스",
    summary: "활동지원사 파견으로 일상생활·사회참여를 지원합니다.",
    disabilityTypes: ["PHYSICAL", "BRAIN_LESION"],
    ageGroups: ["YOUTH", "ADULT", "SENIOR"],
    regions: ["SEOUL", "GYEONGGI", "BUSAN", "NATIONWIDE"],
    supportTypes: ["CARE"],
    organizationId: "org-002",
    organizationName: ORG_NAMES["org-002"],
    updatedAt: "2025-04-02",
  },
  {
    id: "svc-003",
    title: "보조기기 교부 사업",
    summary: "필수 보조기기 구입·수리 비용을 지원합니다.",
    disabilityTypes: ["PHYSICAL", "SENSORY"],
    ageGroups: ["CHILD", "YOUTH", "ADULT", "SENIOR"],
    regions: ["NATIONWIDE"],
    supportTypes: ["MEDICAL"],
    organizationId: "org-004",
    organizationName: ORG_NAMES["org-004"],
    updatedAt: "2025-02-21",
  },
  {
    id: "svc-004",
    title: "발달장애인 주간활동서비스",
    summary: "주간 보호와 맞춤 활동 프로그램을 제공합니다.",
    disabilityTypes: ["DEVELOPMENTAL"],
    ageGroups: ["CHILD", "YOUTH", "ADULT"],
    regions: ["SEOUL", "GYEONGGI"],
    supportTypes: ["CARE"],
    organizationId: "org-001",
    organizationName: ORG_NAMES["org-001"],
    updatedAt: "2025-01-15",
  },
  {
    id: "svc-005",
    title: "장애인 일자리지원",
    summary: "맞춤형 취업 알선과 고용 유지 지원입니다.",
    disabilityTypes: ["PHYSICAL", "DEVELOPMENTAL", "MENTAL"],
    ageGroups: ["YOUTH", "ADULT"],
    regions: ["BUSAN", "SEOUL"],
    supportTypes: ["EMPLOYMENT"],
    organizationId: "org-003",
    organizationName: ORG_NAMES["org-003"],
    updatedAt: "2025-03-28",
  },
  {
    id: "svc-006",
    title: "장애인 전용 주택 우선공급",
    summary: "공공임대 주택 우선 입주 안내입니다.",
    disabilityTypes: ["PHYSICAL", "DEVELOPMENTAL", "SENSORY", "MENTAL"],
    ageGroups: ["ADULT", "SENIOR"],
    regions: ["SEOUL", "GYEONGGI", "BUSAN"],
    supportTypes: ["HOUSING"],
    organizationId: "org-002",
    organizationName: ORG_NAMES["org-002"],
    updatedAt: "2025-02-10",
  },
  {
    id: "svc-007",
    title: "장애아동 양육지원",
    summary: "특수보육·가정방문 양육 바우처를 지원합니다.",
    disabilityTypes: ["DEVELOPMENTAL", "PHYSICAL"],
    ageGroups: ["CHILD"],
    regions: ["SEOUL", "NATIONWIDE"],
    supportTypes: ["CHILDCARE"],
    organizationId: "org-001",
    organizationName: ORG_NAMES["org-001"],
    updatedAt: "2025-04-05",
  },
  {
    id: "svc-008",
    title: "정신건강 회복 지원",
    summary: "사례관리·동료지지 프로그램을 연계합니다.",
    disabilityTypes: ["MENTAL"],
    ageGroups: ["YOUTH", "ADULT", "SENIOR"],
    regions: ["SEOUL", "GYEONGGI"],
    supportTypes: ["MEDICAL", "CARE"],
    organizationId: "org-002",
    organizationName: ORG_NAMES["org-002"],
    updatedAt: "2025-03-01",
  },
];

const MOCK_DETAILS: Record<string, ServiceDetail> = {
  "svc-001": {
    id: "svc-001",
    title: "장애인연금",
    summary: "중증 장애인 소득 보전을 위한 공적 연금입니다.",
    description:
      "근로능력 상실 또는 현저한 감소로 인한 소득 보전을 위해 중증 장애인에게 매월 지급됩니다.",
    eligibility: "만 18세 이상 중증 장애인, 소득·재산 기준 충족",
    applicationMethod: "주소지 읍·면·동 행정복지센터 방문 신청",
    requiredDocuments: ["장애인등록증", "주민등록등본", "소득·재산 증빙"],
    disabilityTypes: ["PHYSICAL", "DEVELOPMENTAL", "BRAIN_LESION", "MENTAL"],
    ageGroups: ["ADULT", "SENIOR"],
    regions: ["NATIONWIDE"],
    supportTypes: ["INCOME"],
    organizationId: "org-002",
    organizationName: ORG_NAMES["org-002"],
    updatedAt: "2025-03-12",
    relatedLinks: [{ label: "복지로", url: "https://www.bokjiro.go.kr" }],
    organization: {
      id: "org-002",
      name: ORG_NAMES["org-002"],
      phone: "031-249-9114",
      address: "경기도 수원시 영통구 광교로 145",
      website: "https://www.ggwelfare.or.kr",
    },
  },
  "svc-002": {
    id: "svc-002",
    title: "장애인 활동지원 서비스",
    summary: "활동지원사 파견으로 일상생활·사회참여를 지원합니다.",
    description:
      "신변처리, 가사, 이동 등 활동보조가 필요한 장애인에게 시간제 지원을 제공합니다.",
    eligibility: "활동지원 등급 판정을 받은 장애인",
    applicationMethod: "읍·면·동 행정복지센터 신청",
    requiredDocuments: ["장애인등록증", "의사소견서"],
    disabilityTypes: ["PHYSICAL", "BRAIN_LESION"],
    ageGroups: ["YOUTH", "ADULT", "SENIOR"],
    regions: ["SEOUL", "GYEONGGI", "BUSAN", "NATIONWIDE"],
    supportTypes: ["CARE"],
    organizationId: "org-002",
    organizationName: ORG_NAMES["org-002"],
    updatedAt: "2025-04-02",
    relatedLinks: [],
    organization: {
      id: "org-002",
      name: ORG_NAMES["org-002"],
      phone: "031-249-9114",
      address: "경기도 수원시 영통구 광교로 145",
      website: "https://www.ggwelfare.or.kr",
    },
  },
  "svc-003": {
    id: "svc-003",
    title: "보조기기 교부 사업",
    summary: "필수 보조기기 구입·수리 비용을 지원합니다.",
    description: "저소득 장애인에게 휠체어, 보청기 등 보조기기를 지원합니다.",
    eligibility: "장애인등록자 중 보조기기 필요자",
    applicationMethod: "관할 보조기기센터 방문 신청",
    requiredDocuments: ["장애인등록증", "처방전", "견적서"],
    disabilityTypes: ["PHYSICAL", "SENSORY"],
    ageGroups: ["CHILD", "YOUTH", "ADULT", "SENIOR"],
    regions: ["NATIONWIDE"],
    supportTypes: ["MEDICAL"],
    organizationId: "org-004",
    organizationName: ORG_NAMES["org-004"],
    updatedAt: "2025-02-21",
    relatedLinks: [],
    organization: {
      id: "org-004",
      name: ORG_NAMES["org-004"],
      phone: "02-717-1004",
      address: "서울특별시 종로구 종로 33",
      website: "https://www.knba.or.kr",
    },
  },
};

// 나머지 상세는 요약 기반 최소 생성
for (const s of MOCK_SUMMARIES) {
  if (!MOCK_DETAILS[s.id]) {
    MOCK_DETAILS[s.id] = {
      ...s,
      description: s.summary,
      eligibility: "해당 기관 또는 행정복지센터에 문의하세요.",
      applicationMethod: "주소지 읍·면·동 행정복지센터",
      requiredDocuments: ["장애인등록증", "신분증"],
      relatedLinks: [],
      organization: {
        id: s.organizationId,
        name: s.organizationName,
        phone: "02-000-0000",
        address: "",
        website: "",
      },
    };
  }
}

const REGION_LABELS: Record<string, string> = {
  SEOUL: "서울",
  GYEONGGI: "경기",
  BUSAN: "부산",
  INCHEON: "인천",
  NATIONWIDE: "전국",
};

function matchesRegion(serviceRegions: string[], region?: string): boolean {
  if (!region) return true;
  return (
    serviceRegions.includes(region) || serviceRegions.includes("NATIONWIDE")
  );
}

export function filterMockServices(
  params?: ServiceSearchParams
): ServiceListResponse {
  const q = params?.q?.trim().toLowerCase();
  const items = MOCK_SUMMARIES.filter((s) => {
    if (params?.disabilityType && !s.disabilityTypes.includes(params.disabilityType))
      return false;
    if (params?.ageGroup && !s.ageGroups.includes(params.ageGroup)) return false;
    if (params?.region && !matchesRegion(s.regions, params.region)) return false;
    if (params?.supportType && !s.supportTypes.includes(params.supportType))
      return false;
    if (q) {
      const hay = `${s.title} ${s.summary}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
  return { items, total: items.length };
}

export function getMockServices(): ServiceListResponse {
  return { items: [...MOCK_SUMMARIES], total: MOCK_SUMMARIES.length };
}

export function getMockServiceById(id: string): ServiceDetail | undefined {
  return MOCK_DETAILS[id];
}

export function getMockStats(): PlatformStats {
  const regions = new Set(MOCK_SUMMARIES.flatMap((s) => s.regions));
  const disabilities = new Set(MOCK_SUMMARIES.flatMap((s) => s.disabilityTypes));
  return {
    serviceCount: MOCK_SUMMARIES.length,
    regionCount: regions.size,
    disabilityTypeCount: disabilities.size,
  };
}

export function getMockFilters(): FilterMeta {
  return {
    disabilityTypes: DISABILITY_TYPES.map((d) => ({ code: d.code, label: d.label })),
    ageGroups: AGE_GROUPS.map((a) => ({ code: a.code, label: a.label })),
    regions: REGIONS.map((r) => ({ code: r.code, label: r.label })),
    supportTypes: SUPPORT_FIELDS.map((s) => ({ code: s.code, label: s.label })),
  };
}

export function getMockOrganizations(region?: string): OrganizationListResponse {
  const orgs = [
    {
      id: "org-001",
      name: ORG_NAMES["org-001"],
      region: "SEOUL",
      regionLabel: REGION_LABELS.SEOUL,
      phone: "02-2133-3691",
      serviceCount: 2,
    },
    {
      id: "org-002",
      name: ORG_NAMES["org-002"],
      region: "GYEONGGI",
      regionLabel: REGION_LABELS.GYEONGGI,
      phone: "031-249-9114",
      serviceCount: 4,
    },
    {
      id: "org-003",
      name: ORG_NAMES["org-003"],
      region: "BUSAN",
      regionLabel: REGION_LABELS.BUSAN,
      phone: "051-888-1200",
      serviceCount: 1,
    },
    {
      id: "org-004",
      name: ORG_NAMES["org-004"],
      region: "NATIONWIDE",
      regionLabel: REGION_LABELS.NATIONWIDE,
      phone: "02-717-1004",
      serviceCount: 1,
    },
  ];
  const items = region
    ? orgs.filter((o) => o.region === region || o.region === "NATIONWIDE")
    : orgs;
  return { items, total: items.length };
}

export function getMockOrganizationById(id: string): OrganizationDetail | undefined {
  const data: Record<string, OrganizationDetail> = {
    "org-001": {
      id: "org-001",
      name: ORG_NAMES["org-001"],
      region: "SEOUL",
      phone: "02-2133-3691",
      address: "서울특별시 중구 을지로 100",
      website: "https://www.seoul.go.kr",
      description:
        "발달장애인과 가족을 위한 상담, 주간활동 연계, 권리 안내를 제공합니다.",
      services: MOCK_SUMMARIES.filter((s) => s.organizationId === "org-001").map(
        (s) => ({ id: s.id, title: s.title })
      ),
    },
    "org-002": {
      id: "org-002",
      name: ORG_NAMES["org-002"],
      region: "GYEONGGI",
      phone: "031-249-9114",
      address: "경기도 수원시 영통구 광교로 145",
      website: "https://www.ggwelfare.or.kr",
      description:
        "경기도 내 장애 유형별 복지 서비스 정보와 신청 절차를 안내합니다.",
      services: MOCK_SUMMARIES.filter((s) => s.organizationId === "org-002").map(
        (s) => ({ id: s.id, title: s.title })
      ),
    },
    "org-003": {
      id: "org-003",
      name: ORG_NAMES["org-003"],
      region: "BUSAN",
      phone: "051-888-1200",
      address: "부산광역시 해운대구 센텀중앙로 79",
      website: "https://www.busan.go.kr",
      description: "장애인 고용·직업훈련·사회적 일자리 연계를 지원합니다.",
      services: MOCK_SUMMARIES.filter((s) => s.organizationId === "org-003").map(
        (s) => ({ id: s.id, title: s.title })
      ),
    },
    "org-004": {
      id: "org-004",
      name: ORG_NAMES["org-004"],
      region: "NATIONWIDE",
      phone: "02-717-1004",
      address: "서울특별시 종로구 종로 33",
      website: "https://www.knba.or.kr",
      description:
        "시각장애인 보행·정보접근·보조기기 관련 서비스를 연계합니다.",
      services: MOCK_SUMMARIES.filter((s) => s.organizationId === "org-004").map(
        (s) => ({ id: s.id, title: s.title })
      ),
    },
  };
  return data[id];
}

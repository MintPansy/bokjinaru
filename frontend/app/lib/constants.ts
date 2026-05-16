export const SITE_NAME = "복지나루";

export const NAV_ITEMS = [
  { href: "/", label: "홈" },
  { href: "/search", label: "서비스 찾기" },
  { href: "/organizations", label: "지원 기관" },
  { href: "/accessibility", label: "접근성 안내" },
] as const;

export const DISABILITY_TYPES = [
  { code: "physical", label: "지체장애" },
  { code: "visual", label: "시각장애" },
  { code: "hearing", label: "청각장애" },
  { code: "intellectual", label: "지적장애" },
  { code: "developmental", label: "발달장애" },
  { code: "mental", label: "정신장애" },
] as const;

export const SUPPORT_FIELDS = [
  { code: "income", label: "소득지원" },
  { code: "care", label: "돌봄·활동지원" },
  { code: "employment", label: "고용·자립" },
  { code: "medical", label: "의료·재활" },
  { code: "education", label: "교육" },
  { code: "housing", label: "주거" },
] as const;

export const STEPS = [
  {
    num: "01",
    title: "조건을 선택합니다",
    desc: "장애유형, 연령, 거주 지역, 필요한 지원 분야를 고릅니다. 여러 항목을 함께 선택할 수 있습니다.",
  },
  {
    num: "02",
    title: "결과를 비교합니다",
    desc: "신청 자격, 지원 내용, 담당 기관이 한눈에 정리됩니다. 본인에게 해당되는지 명확하게 확인할 수 있습니다.",
  },
  {
    num: "03",
    title: "신청 방법을 확인합니다",
    desc: "어디로 가야 하는지, 어떤 서류가 필요한지, 누구에게 문의해야 하는지 단계별로 안내합니다.",
  },
] as const;

export type WelfareServiceItem = {
  id: string;
  title: string;
  summary: string;
  category: string;
  tags: string[];
  provider: string;
  target: string;
  application: string;
  updatedAt: string;
};

export const FEATURED_SERVICES: WelfareServiceItem[] = [
  {
    id: "disability-pension",
    title: "장애인연금",
    summary:
      "근로능력 상실 또는 현저한 감소로 인한 소득 보전을 위해 중증 장애인에게 매월 지급되는 공적 연금입니다.",
    category: "소득지원",
    tags: ["소득지원"],
    provider: "보건복지부 · 국민연금공단",
    target: "모든 장애유형",
    application: "주소지 읍·면·동 행정복지센터 방문 신청",
    updatedAt: "2025-03-12",
  },
  {
    id: "activity-support",
    title: "장애인 활동지원 서비스",
    summary:
      "혼자 일상생활과 사회생활을 하기 어려운 장애인에게 활동지원사를 파견해 신변처리·가사·이동 등을 지원합니다.",
    category: "돌봄·활동지원",
    tags: ["돌봄·활동지원", "이동·보조기기"],
    provider: "보건복지부 · 국민연금공단",
    target: "모든 장애유형",
    application: "주소지 읍·면·동 행정복지센터 신청",
    updatedAt: "2025-04-02",
  },
  {
    id: "assistive-device",
    title: "보조기기 교부 사업",
    summary:
      "일상생활과 사회참여를 돕는 보조기기를 저소득 장애인에게 무료로 교부합니다.",
    category: "이동·보조기기",
    tags: ["이동·보조기기", "의료·재활"],
    provider: "한국장애인개발원",
    target: "지체장애 · 시각장애 · 청각장애",
    application: "주소지 관할 보조기기센터 또는 행정복지센터 방문",
    updatedAt: "2025-02-21",
  },
];

export const STATS = [
  { value: "120+", label: "안내 중인 복지 서비스" },
  { value: "17", label: "전국 시·도 단위 지역 정보" },
  { value: "8", label: "장애유형별 맞춤 분류" },
] as const;

export const HOTLINES = [
  { label: "보건복지상담센터", tel: "129" },
  { label: "장애인고용공단", tel: "1588-1519" },
  { label: "정신건강위기 상담", tel: "1577-0199" },
] as const;

export function getServiceById(id: string): WelfareServiceItem | undefined {
  return FEATURED_SERVICES.find((s) => s.id === id);
}

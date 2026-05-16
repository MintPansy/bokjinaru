export const SITE_NAME = "복지나루";

export const NAV_ITEMS = [
  { href: "/", label: "홈" },
  { href: "/search", label: "서비스 찾기" },
  { href: "/organizations", label: "지원 기관" },
  { href: "/accessibility", label: "접근성 안내" },
] as const;

/** UI 폴백 — API 실패 시 검색 폼용 */
export const DISABILITY_TYPES = [
  { code: "PHYSICAL", label: "지체장애" },
  { code: "SENSORY", label: "시각·청각장애" },
  { code: "DEVELOPMENTAL", label: "발달장애" },
  { code: "MENTAL", label: "정신장애" },
  { code: "BRAIN_LESION", label: "뇌병변·중증" },
] as const;

export const SUPPORT_FIELDS = [
  { code: "INCOME", label: "소득지원" },
  { code: "CARE", label: "돌봄·활동지원" },
  { code: "EMPLOYMENT", label: "고용·자립" },
  { code: "MEDICAL", label: "의료·재활" },
  { code: "EDUCATION", label: "교육" },
  { code: "CHILDCARE", label: "아동양육" },
  { code: "HOUSING", label: "주거" },
  { code: "TRANSPORT", label: "교통" },
] as const;

export const AGE_GROUPS = [
  { code: "CHILD", label: "아동(0~12세)" },
  { code: "YOUTH", label: "청소년(13~18세)" },
  { code: "ADULT", label: "성인(19~64세)" },
  { code: "SENIOR", label: "어르신(65세+)" },
] as const;

export const REGIONS = [
  { code: "SEOUL", label: "서울" },
  { code: "GYEONGGI", label: "경기" },
  { code: "BUSAN", label: "부산" },
  { code: "INCHEON", label: "인천" },
  { code: "NATIONWIDE", label: "전국" },
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

export const HOTLINES = [
  { label: "보건복지상담센터", tel: "129" },
  { label: "장애인고용공단", tel: "1588-1519" },
  { label: "정신건강위기 상담", tel: "1577-0199" },
] as const;

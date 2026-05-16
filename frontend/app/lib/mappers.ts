import type { ServiceDetail, ServiceSummary } from "../types/api";
import type { WelfareServiceItem } from "./constants";

const SUPPORT_LABELS: Record<string, string> = {
  INCOME: "소득지원",
  CARE: "돌봄·활동지원",
  MEDICAL: "의료·재활",
  EMPLOYMENT: "고용·자립",
  EDUCATION: "교육",
  CHILDCARE: "아동양육",
  HOUSING: "주거",
  TRANSPORT: "교통",
};

export function toServiceCardItem(s: ServiceSummary): WelfareServiceItem {
  const category = s.supportTypes.map((t) => SUPPORT_LABELS[t] ?? t)[0] ?? "복지";
  return {
    id: s.id,
    title: s.title,
    summary: s.summary,
    category,
    tags: s.supportTypes.map((t) => SUPPORT_LABELS[t] ?? t),
    provider: s.organizationName,
    target: s.disabilityTypes.length ? "해당 장애유형" : "문의 필요",
    application: "상세 페이지에서 확인",
    updatedAt: s.updatedAt ?? "",
  };
}

export function toServiceCardFromDetail(d: ServiceDetail): WelfareServiceItem {
  return {
    id: d.id,
    title: d.title,
    summary: d.summary,
    category: d.supportTypes.map((t) => SUPPORT_LABELS[t] ?? t)[0] ?? "복지",
    tags: d.supportTypes.map((t) => SUPPORT_LABELS[t] ?? t),
    provider: d.organization.name,
    target: d.eligibility,
    application: d.applicationMethod,
    updatedAt: d.updatedAt ?? "",
  };
}

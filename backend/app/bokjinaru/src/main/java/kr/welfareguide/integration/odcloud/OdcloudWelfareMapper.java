package kr.welfareguide.integration.odcloud;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import kr.welfareguide.domain.AgeGroup;
import kr.welfareguide.domain.DisabilityType;
import kr.welfareguide.domain.Organization;
import kr.welfareguide.domain.Region;
import kr.welfareguide.domain.RelatedLink;
import kr.welfareguide.domain.SupportType;
import kr.welfareguide.domain.WelfareService;
import kr.welfareguide.integration.odcloud.dto.OdcloudWelfareItemDto;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component
public class OdcloudWelfareMapper {

    public OdcloudSyncResult map(List<OdcloudWelfareItemDto> items) {
        Map<String, Organization> organizations = new LinkedHashMap<>();
        List<WelfareService> services = new ArrayList<>();

        for (OdcloudWelfareItemDto item : items) {
            if (!StringUtils.hasText(item.getServiceId()) || !StringUtils.hasText(item.getServiceName())) {
                continue;
            }
            String orgId = resolveOrganizationId(item);
            organizations.putIfAbsent(orgId, toOrganization(orgId, item));
            services.add(toService(item, orgId));
        }

        return OdcloudSyncResult.builder()
                .organizations(new ArrayList<>(organizations.values()))
                .services(services)
                .build();
    }

    private String resolveOrganizationId(OdcloudWelfareItemDto item) {
        String dept = nullToEmpty(item.getDepartmentName());
        String org = nullToEmpty(item.getOrganizationName());
        String key = dept + "|" + org;
        int hash = Math.abs(key.hashCode());
        return "od-org-" + hash;
    }

    private Organization toOrganization(String orgId, OdcloudWelfareItemDto item) {
        String dept = trim(item.getDepartmentName());
        String org = trim(item.getOrganizationName());
        String displayName = StringUtils.hasText(org) ? org : dept;
        if (!StringUtils.hasText(displayName)) {
            displayName = "소관 기관 미상";
        } else if (StringUtils.hasText(dept) && StringUtils.hasText(org) && !org.contains(dept)) {
            displayName = dept + " " + org;
        }

        String website = firstNonBlank(item.getSite(), item.getServiceUrl());
        String description = StringUtils.hasText(dept)
                ? dept + (StringUtils.hasText(org) ? " · " + org : "")
                : displayName;

        return Organization.builder()
                .id(orgId)
                .name(displayName)
                .region(Region.NATIONWIDE)
                .phone(trim(item.getContact()))
                .address("")
                .website(website != null ? website : "")
                .description(description)
                .build();
    }

    private WelfareService toService(OdcloudWelfareItemDto item, String orgId) {
        String title = trim(item.getServiceName());
        String summary = trim(item.getServiceSummary());
        if (!StringUtils.hasText(summary)) {
            summary = title;
        }

        String dept = trim(item.getDepartmentName());
        String org = trim(item.getOrganizationName());
        String eligibility = buildEligibility(dept, org);
        String applicationMethod = buildApplicationMethod(item);

        List<RelatedLink> links = new ArrayList<>();
        if (StringUtils.hasText(item.getServiceUrl())) {
            links.add(new RelatedLink("공식 안내", item.getServiceUrl().trim()));
        }
        if (StringUtils.hasText(item.getSite()) && !item.getSite().trim().equals(trim(item.getServiceUrl()))) {
            links.add(new RelatedLink("관련 사이트", item.getSite().trim()));
        }

        String updatedAt = trim(item.getLastModified());
        if (!StringUtils.hasText(updatedAt) && item.getBaseYear() != null) {
            updatedAt = String.valueOf(item.getBaseYear());
        }

        return WelfareService.builder()
                .id("od-" + item.getServiceId().trim())
                .title(title)
                .summary(summary)
                .description(summary)
                .eligibility(eligibility)
                .applicationMethod(applicationMethod)
                .requiredDocuments(List.of())
                .disabilityTypes(inferDisabilityTypes(title, summary))
                .ageGroups(inferAgeGroups(title, summary))
                .regions(List.of(Region.NATIONWIDE))
                .supportTypes(inferSupportTypes(title, summary))
                .organizationId(orgId)
                .updatedAt(updatedAt)
                .relatedLinks(links)
                .build();
    }

    private String buildEligibility(String dept, String org) {
        if (StringUtils.hasText(dept) && StringUtils.hasText(org)) {
            return "소관: " + dept + " / " + org + " (공공데이터 기준, 상세 대상은 공식 안내를 확인하세요.)";
        }
        if (StringUtils.hasText(dept)) {
            return "소관: " + dept + " (공공데이터 기준, 상세 대상은 공식 안내를 확인하세요.)";
        }
        return "공식 안내 페이지에서 지원 대상·자격 요건을 확인하세요.";
    }

    private String buildApplicationMethod(OdcloudWelfareItemDto item) {
        if (StringUtils.hasText(item.getContact())) {
            return "문의: " + item.getContact().trim()
                    + (StringUtils.hasText(item.getServiceUrl())
                            ? " · 온라인: " + item.getServiceUrl().trim()
                            : "");
        }
        if (StringUtils.hasText(item.getServiceUrl())) {
            return "온라인 안내: " + item.getServiceUrl().trim();
        }
        return "복지로(www.bokjiro.go.kr) 또는 소관 부처 안내를 참고하세요.";
    }

    private List<DisabilityType> inferDisabilityTypes(String title, String summary) {
        String text = (title + " " + summary).toLowerCase(Locale.ROOT);
        List<DisabilityType> types = new ArrayList<>();
        if (containsAny(text, "발달")) types.add(DisabilityType.DEVELOPMENTAL);
        if (containsAny(text, "지적")) types.add(DisabilityType.DEVELOPMENTAL);
        if (containsAny(text, "시각", "맹")) types.add(DisabilityType.SENSORY);
        if (containsAny(text, "청각")) types.add(DisabilityType.SENSORY);
        if (containsAny(text, "정신", "자폐")) types.add(DisabilityType.MENTAL);
        if (containsAny(text, "뇌병", "뇌성")) types.add(DisabilityType.BRAIN_LESION);
        if (containsAny(text, "지체", "신체", "장애인")) types.add(DisabilityType.PHYSICAL);
        return types;
    }

    private List<AgeGroup> inferAgeGroups(String title, String summary) {
        String text = title + " " + summary;
        List<AgeGroup> groups = new ArrayList<>();
        if (containsAny(text, "아동", "유아", "영유아")) groups.add(AgeGroup.CHILD);
        if (containsAny(text, "청소년", "청년")) groups.add(AgeGroup.YOUTH);
        if (containsAny(text, "노인", "고령", "어르신")) groups.add(AgeGroup.SENIOR);
        if (groups.isEmpty()) {
            groups.add(AgeGroup.ADULT);
        }
        return groups;
    }

    private List<SupportType> inferSupportTypes(String title, String summary) {
        String text = title + " " + summary;
        List<SupportType> types = new ArrayList<>();
        if (containsAny(text, "연금", "수당", "소득", "생계")) types.add(SupportType.INCOME);
        if (containsAny(text, "활동지원", "돌봄", "간병", "케어")) types.add(SupportType.CARE);
        if (containsAny(text, "의료", "재활", "건강", "치료")) types.add(SupportType.MEDICAL);
        if (containsAny(text, "고용", "일자리", "취업")) types.add(SupportType.EMPLOYMENT);
        if (containsAny(text, "교육", "학습")) types.add(SupportType.EDUCATION);
        if (containsAny(text, "양육", "보육")) types.add(SupportType.CHILDCARE);
        if (containsAny(text, "주택", "임대", "주거")) types.add(SupportType.HOUSING);
        if (containsAny(text, "교통", "이동")) types.add(SupportType.TRANSPORT);
        return types;
    }

    private boolean containsAny(String text, String... keywords) {
        for (String keyword : keywords) {
            if (text.contains(keyword)) {
                return true;
            }
        }
        return false;
    }

    private String firstNonBlank(String... values) {
        for (String value : values) {
            if (StringUtils.hasText(value)) {
                return value.trim();
            }
        }
        return null;
    }

    private String trim(String value) {
        return value != null ? value.trim() : "";
    }

    private String nullToEmpty(String value) {
        return value != null ? value.trim() : "";
    }
}

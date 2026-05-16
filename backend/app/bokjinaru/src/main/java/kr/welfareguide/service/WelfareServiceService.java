package kr.welfareguide.service;

import java.util.List;
import java.util.Locale;
import kr.welfareguide.domain.AgeGroup;
import kr.welfareguide.domain.DisabilityType;
import kr.welfareguide.domain.Region;
import kr.welfareguide.domain.SupportType;
import kr.welfareguide.domain.WelfareService;
import kr.welfareguide.dto.WelfareServiceDetailResponse;
import kr.welfareguide.dto.WelfareServiceSummaryResponse;
import kr.welfareguide.exception.ResourceNotFoundException;
import kr.welfareguide.repository.WelfareServiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
@RequiredArgsConstructor
public class WelfareServiceService {

    private final WelfareServiceRepository welfareServiceRepository;
    private final OrganizationService organizationService;

    public List<WelfareServiceSummaryResponse> search(
            DisabilityType disabilityType,
            AgeGroup ageGroup,
            Region region,
            SupportType supportType,
            String q) {

        return welfareServiceRepository.findAll().stream()
                .filter(s -> matchesDisabilityType(s, disabilityType))
                .filter(s -> matchesAgeGroup(s, ageGroup))
                .filter(s -> matchesRegion(s, region))
                .filter(s -> matchesSupportType(s, supportType))
                .filter(s -> matchesQuery(s, q))
                .map(this::toSummary)
                .toList();
    }

    public WelfareServiceDetailResponse findById(String id) {
        WelfareService service = welfareServiceRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("복지 서비스를 찾을 수 없습니다: " + id));
        return toDetail(service);
    }

    private boolean matchesDisabilityType(WelfareService service, DisabilityType disabilityType) {
        if (disabilityType == null) {
            return true;
        }
        var types = service.getDisabilityTypes();
        return types == null || types.isEmpty() || types.contains(disabilityType);
    }

    private boolean matchesAgeGroup(WelfareService service, AgeGroup ageGroup) {
        if (ageGroup == null) {
            return true;
        }
        var groups = service.getAgeGroups();
        return groups == null || groups.isEmpty() || groups.contains(ageGroup);
    }

    private boolean matchesRegion(WelfareService service, Region region) {
        if (region == null) {
            return true;
        }
        return service.getRegions().contains(region)
                || service.getRegions().contains(Region.NATIONWIDE);
    }

    private boolean matchesSupportType(WelfareService service, SupportType supportType) {
        if (supportType == null) {
            return true;
        }
        var types = service.getSupportTypes();
        return types == null || types.isEmpty() || types.contains(supportType);
    }

    private boolean matchesQuery(WelfareService service, String q) {
        if (!StringUtils.hasText(q)) {
            return true;
        }
        String keyword = q.trim().toLowerCase(Locale.ROOT);
        return containsIgnoreCase(service.getTitle(), keyword)
                || containsIgnoreCase(service.getSummary(), keyword)
                || containsIgnoreCase(service.getDescription(), keyword);
    }

    private boolean containsIgnoreCase(String value, String keyword) {
        return value != null && value.toLowerCase(Locale.ROOT).contains(keyword);
    }

    private WelfareServiceSummaryResponse toSummary(WelfareService service) {
        return WelfareServiceSummaryResponse.builder()
                .id(service.getId())
                .title(service.getTitle())
                .summary(service.getSummary())
                .disabilityTypes(service.getDisabilityTypes())
                .ageGroups(service.getAgeGroups())
                .regions(service.getRegions())
                .supportTypes(service.getSupportTypes())
                .organizationId(service.getOrganizationId())
                .organizationName(organizationService.resolveName(service.getOrganizationId()))
                .updatedAt(service.getUpdatedAt())
                .build();
    }

    private WelfareServiceDetailResponse toDetail(WelfareService service) {
        return WelfareServiceDetailResponse.builder()
                .id(service.getId())
                .title(service.getTitle())
                .summary(service.getSummary())
                .description(service.getDescription())
                .eligibility(service.getEligibility())
                .applicationMethod(service.getApplicationMethod())
                .requiredDocuments(service.getRequiredDocuments())
                .disabilityTypes(service.getDisabilityTypes())
                .ageGroups(service.getAgeGroups())
                .regions(service.getRegions())
                .supportTypes(service.getSupportTypes())
                .organizationId(service.getOrganizationId())
                .organizationName(organizationService.resolveName(service.getOrganizationId()))
                .updatedAt(service.getUpdatedAt())
                .relatedLinks(service.getRelatedLinks())
                .build();
    }
}

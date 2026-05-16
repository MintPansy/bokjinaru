package kr.welfareguide.dto;

import java.util.List;
import kr.welfareguide.domain.AgeGroup;
import kr.welfareguide.domain.DisabilityType;
import kr.welfareguide.domain.Region;
import kr.welfareguide.domain.RelatedLink;
import kr.welfareguide.domain.SupportType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WelfareServiceDetailResponse {
    private String id;
    private String title;
    private String summary;
    private String description;
    private String eligibility;
    private String applicationMethod;
    private List<String> requiredDocuments;
    private List<DisabilityType> disabilityTypes;
    private List<AgeGroup> ageGroups;
    private List<Region> regions;
    private List<SupportType> supportTypes;
    private String organizationId;
    private String organizationName;
    private String updatedAt;
    private List<RelatedLink> relatedLinks;
}

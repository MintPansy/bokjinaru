package kr.welfareguide.domain;

import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WelfareService {
    private String id;
    private String title;
    private String summary;
    private String description;
    private String eligibility;
    private String applicationMethod;
    @Builder.Default
    private List<String> requiredDocuments = new ArrayList<>();
    @Builder.Default
    private List<DisabilityType> disabilityTypes = new ArrayList<>();
    @Builder.Default
    private List<AgeGroup> ageGroups = new ArrayList<>();
    @Builder.Default
    private List<Region> regions = new ArrayList<>();
    @Builder.Default
    private List<SupportType> supportTypes = new ArrayList<>();
    private String organizationId;
    private String updatedAt;
    @Builder.Default
    private List<RelatedLink> relatedLinks = new ArrayList<>();
}

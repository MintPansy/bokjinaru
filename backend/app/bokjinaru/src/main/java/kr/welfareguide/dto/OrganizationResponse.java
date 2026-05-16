package kr.welfareguide.dto;

import kr.welfareguide.domain.Region;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrganizationResponse {
    private String id;
    private String name;
    private Region region;
    private String regionLabel;
    private String phone;
    private String address;
    private String website;
    private String description;
}

package kr.welfareguide.integration.odcloud.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class OdcloudWelfareItemDto {

    @JsonProperty("서비스아이디")
    private String serviceId;

    @JsonProperty("서비스명")
    private String serviceName;

    @JsonProperty("서비스URL")
    @JsonAlias("서비스(URL)")
    private String serviceUrl;

    @JsonProperty("서비스요약")
    private String serviceSummary;

    @JsonProperty("사이트")
    private String site;

    @JsonProperty("대표문의")
    private String contact;

    @JsonProperty("소관부처명")
    private String departmentName;

    @JsonProperty("소관조직명")
    private String organizationName;

    @JsonAlias({"기준년도", "기준연도"})
    private Object baseYear;

    @JsonProperty("최종수정일")
    private String lastModified;
}

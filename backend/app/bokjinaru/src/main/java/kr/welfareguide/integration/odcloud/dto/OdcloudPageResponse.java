package kr.welfareguide.integration.odcloud.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.ArrayList;
import java.util.List;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class OdcloudPageResponse {

    private long page;
    private long perPage;
    private long totalCount;
    private long currentCount;
    private long matchCount;
    private List<OdcloudWelfareItemDto> data = new ArrayList<>();
}

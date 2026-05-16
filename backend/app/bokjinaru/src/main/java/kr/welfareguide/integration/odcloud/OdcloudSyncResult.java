package kr.welfareguide.integration.odcloud;

import java.util.List;
import kr.welfareguide.domain.Organization;
import kr.welfareguide.domain.WelfareService;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class OdcloudSyncResult {
    List<Organization> organizations;
    List<WelfareService> services;
}

package kr.welfareguide.integration.odcloud;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import kr.welfareguide.config.OdcloudProperties;
import kr.welfareguide.integration.odcloud.dto.OdcloudPageResponse;
import kr.welfareguide.integration.odcloud.dto.OdcloudWelfareItemDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestClient;
import org.springframework.web.util.UriComponentsBuilder;

@Slf4j
@Component
@RequiredArgsConstructor
public class OdcloudWelfareClient {

    private final RestClient odcloudRestClient;
    private final OdcloudProperties properties;
    private final OdcloudWelfareMapper mapper;

    public boolean isConfigured() {
        return properties.isEnabled() && StringUtils.hasText(properties.getServiceKey());
    }

    public OdcloudSyncResult fetchAll() {
        List<OdcloudWelfareItemDto> items = new ArrayList<>();
        int page = 1;
        long totalCount = Long.MAX_VALUE;

        while (page <= properties.getMaxPages()) {
            OdcloudPageResponse response = fetchPage(page);
            if (response.getData() != null && !response.getData().isEmpty()) {
                items.addAll(response.getData());
            }
            if (response.getTotalCount() > 0) {
                totalCount = response.getTotalCount();
            }
            if (items.size() >= totalCount || response.getData() == null || response.getData().isEmpty()) {
                break;
            }
            page++;
        }

        log.info("ODcloud API: fetched {} welfare services ({} page(s))", items.size(), page);
        return mapper.map(items);
    }

    private OdcloudPageResponse fetchPage(int page) {
        URI uri = UriComponentsBuilder.fromPath(properties.getDatasetPath())
                .queryParam("serviceKey", properties.getServiceKey())
                .queryParam("page", page)
                .queryParam("perPage", properties.getPerPage())
                .build()
                .encode()
                .toUri();

        OdcloudPageResponse body = odcloudRestClient
                .get()
                .uri(uri)
                .retrieve()
                .body(OdcloudPageResponse.class);
        return body != null ? body : new OdcloudPageResponse();
    }
}

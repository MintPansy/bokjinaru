package kr.welfareguide.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Data
@ConfigurationProperties(prefix = "welfare.odcloud")
public class OdcloudProperties {

    /** 공공데이터 API 사용 여부 (serviceKey 없으면 자동 비활성) */
    private boolean enabled = true;

    private String baseUrl = "https://api.odcloud.kr/api";

    /** 한국사회보장정보원_복지서비스정보_20240722 */
    private String datasetPath =
            "/15083323/v1/uddi:48d6c839-ce02-4546-901e-e9ad9bae8e0d";

    private String serviceKey = "";

    private int perPage = 100;

    /** 무한 루프 방지용 최대 페이지 */
    private int maxPages = 100;
}

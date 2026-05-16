package kr.welfareguide.config;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

@Configuration
@EnableConfigurationProperties(OdcloudProperties.class)
public class OdcloudConfig {

    @Bean
    RestClient odcloudRestClient(OdcloudProperties properties) {
        return RestClient.builder().baseUrl(properties.getBaseUrl()).build();
    }
}

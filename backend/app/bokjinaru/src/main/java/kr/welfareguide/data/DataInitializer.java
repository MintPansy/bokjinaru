package kr.welfareguide.data;

import com.fasterxml.jackson.databind.ObjectMapper;
import kr.welfareguide.dto.SeedData;
import kr.welfareguide.integration.odcloud.OdcloudSyncResult;
import kr.welfareguide.integration.odcloud.OdcloudWelfareClient;
import kr.welfareguide.repository.OrganizationRepository;
import kr.welfareguide.repository.WelfareServiceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final ObjectMapper objectMapper;
    private final OrganizationRepository organizationRepository;
    private final WelfareServiceRepository welfareServiceRepository;
    private final OdcloudWelfareClient odcloudWelfareClient;
    private final DataSourceHolder dataSourceHolder;

    @Override
    public void run(String... args) {
        if (odcloudWelfareClient.isConfigured()) {
            try {
                OdcloudSyncResult sync = odcloudWelfareClient.fetchAll();
                if (!sync.getServices().isEmpty()) {
                    organizationRepository.saveAll(sync.getOrganizations());
                    welfareServiceRepository.saveAll(sync.getServices());
                    dataSourceHolder.setSource(DataSourceHolder.ODCLOUD);
                    log.info(
                            "Loaded ODcloud public data: {} organizations, {} services",
                            sync.getOrganizations().size(),
                            sync.getServices().size());
                    return;
                }
                log.warn("ODcloud API returned no services; falling back to seed.json");
            } catch (Exception ex) {
                log.warn("ODcloud API load failed; falling back to seed.json: {}", ex.getMessage());
            }
        } else {
            log.info("ODcloud serviceKey not set; loading seed.json");
        }
        try {
            loadSeed();
        } catch (Exception ex) {
            throw new IllegalStateException("Failed to load seed data", ex);
        }
    }

    private void loadSeed() throws Exception {
        ClassPathResource resource = new ClassPathResource("data/seed.json");
        SeedData seedData = objectMapper.readValue(resource.getInputStream(), SeedData.class);
        organizationRepository.saveAll(seedData.getOrganizations());
        welfareServiceRepository.saveAll(seedData.getServices());
        dataSourceHolder.setSource(DataSourceHolder.SEED);
        log.info(
                "Loaded seed data: {} organizations, {} services",
                seedData.getOrganizations().size(),
                seedData.getServices().size());
    }
}

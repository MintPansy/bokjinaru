package kr.welfareguide.data;

import com.fasterxml.jackson.databind.ObjectMapper;
import kr.welfareguide.dto.SeedData;
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
public class SeedDataLoader implements CommandLineRunner {

    private final ObjectMapper objectMapper;
    private final OrganizationRepository organizationRepository;
    private final WelfareServiceRepository welfareServiceRepository;

    @Override
    public void run(String... args) throws Exception {
        ClassPathResource resource = new ClassPathResource("data/seed.json");
        SeedData seedData = objectMapper.readValue(resource.getInputStream(), SeedData.class);

        organizationRepository.saveAll(seedData.getOrganizations());
        welfareServiceRepository.saveAll(seedData.getServices());

        log.info(
                "Loaded seed data: {} organizations, {} services",
                seedData.getOrganizations().size(),
                seedData.getServices().size());
    }
}

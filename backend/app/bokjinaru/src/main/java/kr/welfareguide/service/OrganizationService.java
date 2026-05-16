package kr.welfareguide.service;

import java.util.List;
import kr.welfareguide.domain.Organization;
import kr.welfareguide.domain.Region;
import kr.welfareguide.dto.OrganizationResponse;
import kr.welfareguide.exception.ResourceNotFoundException;
import kr.welfareguide.repository.OrganizationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrganizationService {

    private final OrganizationRepository organizationRepository;

    public List<OrganizationResponse> findAll(Region region) {
        return organizationRepository.findByRegion(region).stream()
                .map(this::toResponse)
                .toList();
    }

    public OrganizationResponse findById(String id) {
        Organization organization = organizationRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("기관을 찾을 수 없습니다: " + id));
        return toResponse(organization);
    }

    public String resolveName(String organizationId) {
        return organizationRepository
                .findById(organizationId)
                .map(Organization::getName)
                .orElse(null);
    }

    private OrganizationResponse toResponse(Organization organization) {
        return OrganizationResponse.builder()
                .id(organization.getId())
                .name(organization.getName())
                .region(organization.getRegion())
                .regionLabel(organization.getRegion().getLabel())
                .phone(organization.getPhone())
                .address(organization.getAddress())
                .website(organization.getWebsite())
                .description(organization.getDescription())
                .build();
    }
}

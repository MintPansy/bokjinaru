package kr.welfareguide.controller;

import java.util.List;
import kr.welfareguide.domain.Region;
import kr.welfareguide.dto.OrganizationResponse;
import kr.welfareguide.service.OrganizationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/organizations")
@RequiredArgsConstructor
public class OrganizationController {

    private final OrganizationService organizationService;

    @GetMapping
    public List<OrganizationResponse> list(@RequestParam(required = false) Region region) {
        return organizationService.findAll(region);
    }

    @GetMapping("/{id}")
    public OrganizationResponse getById(@PathVariable String id) {
        return organizationService.findById(id);
    }
}

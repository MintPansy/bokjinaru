package kr.welfareguide.controller;

import java.util.List;
import kr.welfareguide.domain.AgeGroup;
import kr.welfareguide.domain.DisabilityType;
import kr.welfareguide.domain.Region;
import kr.welfareguide.domain.SupportType;
import kr.welfareguide.dto.WelfareServiceDetailResponse;
import kr.welfareguide.dto.WelfareServiceSummaryResponse;
import kr.welfareguide.service.WelfareServiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/services")
@RequiredArgsConstructor
public class WelfareServiceController {

    private final WelfareServiceService welfareServiceService;

    @GetMapping
    public List<WelfareServiceSummaryResponse> list(
            @RequestParam(required = false) DisabilityType disabilityType,
            @RequestParam(required = false) AgeGroup ageGroup,
            @RequestParam(required = false) Region region,
            @RequestParam(required = false) SupportType supportType,
            @RequestParam(required = false) String q) {
        return welfareServiceService.search(disabilityType, ageGroup, region, supportType, q);
    }

    @GetMapping("/{id}")
    public WelfareServiceDetailResponse getById(@PathVariable String id) {
        return welfareServiceService.findById(id);
    }
}

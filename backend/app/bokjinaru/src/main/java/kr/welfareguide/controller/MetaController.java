package kr.welfareguide.controller;

import kr.welfareguide.dto.FilterMetaResponse;
import kr.welfareguide.dto.StatsResponse;
import kr.welfareguide.service.MetaService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/meta")
@RequiredArgsConstructor
public class MetaController {

    private final MetaService metaService;

    @GetMapping("/filters")
    public FilterMetaResponse filters() {
        return metaService.getFilters();
    }

    @GetMapping("/stats")
    public StatsResponse stats() {
        return metaService.getStats();
    }
}

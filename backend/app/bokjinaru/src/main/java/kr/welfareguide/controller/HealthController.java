package kr.welfareguide.controller;

import java.util.LinkedHashMap;
import java.util.Map;
import kr.welfareguide.data.DataSourceHolder;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class HealthController {

    private final DataSourceHolder dataSourceHolder;

    @GetMapping("/api/health")
    public Map<String, String> health() {
        Map<String, String> body = new LinkedHashMap<>();
        body.put("status", "ok");
        body.put("dataSource", dataSourceHolder.getSource());
        return body;
    }
}

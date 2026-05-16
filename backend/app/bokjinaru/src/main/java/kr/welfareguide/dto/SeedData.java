package kr.welfareguide.dto;

import java.util.ArrayList;
import java.util.List;
import kr.welfareguide.domain.Organization;
import kr.welfareguide.domain.WelfareService;
import lombok.Data;

@Data
public class SeedData {
    private List<Organization> organizations = new ArrayList<>();
    private List<WelfareService> services = new ArrayList<>();
}

package kr.welfareguide.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FilterMetaResponse {
    private List<FilterOptionDto> disabilityTypes;
    private List<FilterOptionDto> ageGroups;
    private List<FilterOptionDto> regions;
    private List<FilterOptionDto> supportTypes;
}

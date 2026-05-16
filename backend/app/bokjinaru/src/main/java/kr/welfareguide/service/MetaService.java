package kr.welfareguide.service;

import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;
import kr.welfareguide.domain.AgeGroup;
import kr.welfareguide.domain.DisabilityType;
import kr.welfareguide.domain.Region;
import kr.welfareguide.domain.SupportType;
import kr.welfareguide.dto.FilterMetaResponse;
import kr.welfareguide.dto.FilterOptionDto;
import kr.welfareguide.dto.StatsResponse;
import kr.welfareguide.repository.WelfareServiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MetaService {

    private final WelfareServiceRepository welfareServiceRepository;

    public FilterMetaResponse getFilters() {
        return FilterMetaResponse.builder()
                .disabilityTypes(toOptions(DisabilityType.values(), DisabilityType::name, DisabilityType::getLabel))
                .ageGroups(toOptions(AgeGroup.values(), AgeGroup::name, AgeGroup::getLabel))
                .regions(toOptions(Region.values(), Region::name, Region::getLabel))
                .supportTypes(toOptions(SupportType.values(), SupportType::name, SupportType::getLabel))
                .build();
    }

    public StatsResponse getStats() {
        var services = welfareServiceRepository.findAll();

        Set<Region> regions = services.stream()
                .flatMap(s -> s.getRegions().stream())
                .collect(Collectors.toSet());

        Set<DisabilityType> disabilityTypes = services.stream()
                .flatMap(s -> s.getDisabilityTypes().stream())
                .collect(Collectors.toSet());

        return StatsResponse.builder()
                .serviceCount(services.size())
                .regionCount(regions.size())
                .disabilityTypeCount(disabilityTypes.size())
                .build();
    }

    private <E> List<FilterOptionDto> toOptions(
            E[] values, Function<E, String> codeFn, Function<E, String> labelFn) {
        return Arrays.stream(values)
                .map(v -> FilterOptionDto.builder()
                        .code(codeFn.apply(v))
                        .label(labelFn.apply(v))
                        .build())
                .toList();
    }
}

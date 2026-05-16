package kr.welfareguide.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum DisabilityType {
    PHYSICAL("신체장애"),
    SENSORY("감각장애"),
    DEVELOPMENTAL("발달장애"),
    MENTAL("정신장애"),
    BRAIN_LESION("뇌병변장애");

    private final String label;
}

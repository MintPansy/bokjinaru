package kr.welfareguide.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum SupportType {
    INCOME("소득·생활"),
    CARE("돌봄·활동"),
    MEDICAL("의료·건강"),
    EMPLOYMENT("고용·일자리"),
    EDUCATION("교육"),
    CHILDCARE("보육·양육"),
    HOUSING("주거"),
    TRANSPORT("교통·이동");

    private final String label;
}

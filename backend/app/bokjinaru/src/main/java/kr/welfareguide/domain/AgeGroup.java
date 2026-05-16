package kr.welfareguide.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum AgeGroup {
    CHILD("영유아·아동"),
    YOUTH("청소년"),
    ADULT("성인"),
    SENIOR("노인");

    private final String label;
}

package org.example.tarolabver2.card.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Card {

    @Id
    @Column(name = "card_id")
    private Long id;

    @Column(nullable = false, length = 50)
    private String name; // 카드 이름 (예: "The Fool")

    @Column(nullable = false, length = 20)
    private String type; // 카드 유형 (예: Major, Minor)

    @Column(length = 20)
    private String suit; // Minor일 경우 슈트 (예: Cups, Pentacles)

    @Column(nullable = true)
    private Integer number; // 카드 번호 (Major: 0~21, Minor: 1~14)

    @Column(columnDefinition = "TEXT")
    @JsonProperty("meaning_upright") // JSON 속성 이름 매핑
    private String meaningUpright;

    @Column(columnDefinition = "TEXT")
    @JsonProperty("meaning_reverse") // JSON 속성 이름 매핑
    private String meaningReverse;

    @Column(nullable = true, length = 200)
    private String image_url; // 카드 이미지 URL


}
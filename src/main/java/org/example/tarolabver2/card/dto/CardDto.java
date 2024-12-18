package org.example.tarolabver2.card.dto;

import lombok.*;
import org.example.tarolabver2.card.entity.Card;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor // 모든 필드의 생성자 자동 생성
public class CardDto {
    private Long id;
    private String name;
    private String type;          // Major 또는 Minor
    private String suit;          // Minor인 경우 Suit 정보
    private Integer number;       // 카드 번호
    private String meaningUpright; // 정방향 의미
    private String meaningReverse; // 역방향 의미
    private String image_url;      // 이미지 URL

    public CardDto(Card card) {
        this.id = card.getId();
        this.name = card.getName();
        this.type = card.getType();
        this.suit = card.getSuit();
        this.number = card.getNumber();
        this.meaningUpright = card.getMeaningUpright();
        this.meaningReverse = card.getMeaningReverse();
        this.image_url = card.getImage_url();
    }

}
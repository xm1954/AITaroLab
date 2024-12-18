package org.example.tarolabver2.result.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.tarolabver2.result.entity.Result;

import java.time.format.DateTimeFormatter;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResultDto {

    private Long id;
    private String createdDate;
    private String gptResult;
    private String question;

    private Long card1Id;
    private String card1Name;
    private String card1ImageUrl;
    private String card1Meaning;

    private Long card2Id;
    private String card2Name;
    private String card2ImageUrl;
    private String card2Meaning;

    private Long card3Id;
    private String card3Name;
    private String card3ImageUrl;
    private String card3Meaning;

    private Long card4Id;
    private String card4Name;
    private String card4ImageUrl;
    private String card4Meaning;

    private Long card5Id;
    private String card5Name;
    private String card5ImageUrl;
    private String card5Meaning;

    private Long card6Id;
    private String card6Name;
    private String card6ImageUrl;
    private String card6Meaning;

    // 기본 생성자: 모든 카드를 정방향 처리
    public ResultDto(Result result) {
        this(result, new boolean[]{false, false, false, false, false, false}); // 기본적으로 모두 정방향
    }

    // 정방향/역방향 여부 포함한 생성자
    public ResultDto(Result result, boolean[] isReversedArray) {
        this.id = result.getId();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
        this.createdDate = result.getTimestamp() != null
                ? result.getTimestamp().withNano(0).format(formatter)
                : null;

        this.gptResult = result.getGptResult();
        this.question = result.getQuestion();

        // 카드 1 정보
        this.card1Id = result.getCard1() != null ? result.getCard1().getId() : null;
        this.card1Name = result.getCard1() != null ? result.getCard1().getName() : null;
        this.card1ImageUrl = result.getCard1() != null ? result.getCard1().getImage_url() : null;
        this.card1Meaning = result.getCard1() != null
                ? (isReversedArray[0] ? result.getCard1().getMeaningReverse() : result.getCard1().getMeaningUpright()) : null;

        // 카드 2 정보
        this.card2Id = result.getCard2() != null ? result.getCard2().getId() : null;
        this.card2Name = result.getCard2() != null ? result.getCard2().getName() : null;
        this.card2ImageUrl = result.getCard2() != null ? result.getCard2().getImage_url() : null;
        this.card2Meaning = result.getCard2() != null
                ? (isReversedArray[1] ? result.getCard2().getMeaningReverse() : result.getCard2().getMeaningUpright()) : null;

        // 카드 3 ~ 6 동일 처리
        this.card3Id = result.getCard3() != null ? result.getCard3().getId() : null;
        this.card3Name = result.getCard3() != null ? result.getCard3().getName() : null;
        this.card3ImageUrl = result.getCard3() != null ? result.getCard3().getImage_url() : null;
        this.card3Meaning = result.getCard3() != null
                ? (isReversedArray[2] ? result.getCard3().getMeaningReverse() : result.getCard3().getMeaningUpright()) : null;

        this.card4Id = result.getCard4() != null ? result.getCard4().getId() : null;
        this.card4Name = result.getCard4() != null ? result.getCard4().getName() : null;
        this.card4ImageUrl = result.getCard4() != null ? result.getCard4().getImage_url() : null;
        this.card4Meaning = result.getCard4() != null
                ? (isReversedArray[3] ? result.getCard4().getMeaningReverse() : result.getCard4().getMeaningUpright()) : null;

        this.card5Id = result.getCard5() != null ? result.getCard5().getId() : null;
        this.card5Name = result.getCard5() != null ? result.getCard5().getName() : null;
        this.card5ImageUrl = result.getCard5() != null ? result.getCard5().getImage_url() : null;
        this.card5Meaning = result.getCard5() != null
                ? (isReversedArray[4] ? result.getCard5().getMeaningReverse() : result.getCard5().getMeaningUpright()) : null;

        this.card6Id = result.getCard6() != null ? result.getCard6().getId() : null;
        this.card6Name = result.getCard6() != null ? result.getCard6().getName() : null;
        this.card6ImageUrl = result.getCard6() != null ? result.getCard6().getImage_url() : null;
        this.card6Meaning = result.getCard6() != null
                ? (isReversedArray[5] ? result.getCard6().getMeaningReverse() : result.getCard6().getMeaningUpright()) : null;
    }
}

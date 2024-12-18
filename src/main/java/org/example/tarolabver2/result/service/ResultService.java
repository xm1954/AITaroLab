package org.example.tarolabver2.result.service;

import org.example.tarolabver2.card.entity.Card;
import org.example.tarolabver2.card.repository.CardRepository;
import org.example.tarolabver2.member.entity.Member;
import org.example.tarolabver2.result.entity.Result;
import org.example.tarolabver2.result.repository.ResultRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ResultService {
    private final ResultRepository taroResultRepository;
    private final CardRepository cardRepository;
    private final ResultRepository resultRepository;

    public ResultService(ResultRepository taroResultRepository, CardRepository cardRepository, ResultRepository resultRepository) {
        this.taroResultRepository = taroResultRepository;
        this.cardRepository = cardRepository;
        this.resultRepository = resultRepository;
    }

    public Result findById(Long id) {
        return taroResultRepository.findById(id).orElse(null);
    }

    // 선택된 카드 ID들로 타로 결과 저장 및 GPT 결과 추가
    public Result saveResultsWithGpt(Member member, List<Long> selectedCardIds, String gptResult) {
        if (selectedCardIds.size() != 6) {
            throw new IllegalArgumentException("선택된 카드가 6개여야 합니다.");
        }

        // 카드 ID로 카드 객체 조회
        Card card1 = cardRepository.findById(selectedCardIds.get(0))
                .orElseThrow(() -> new IllegalArgumentException("카드 1을 찾을 수 없습니다."));
        Card card2 = cardRepository.findById(selectedCardIds.get(1))
                .orElseThrow(() -> new IllegalArgumentException("카드 2를 찾을 수 없습니다."));
        Card card3 = cardRepository.findById(selectedCardIds.get(2))
                .orElseThrow(() -> new IllegalArgumentException("카드 3을 찾을 수 없습니다."));
        Card card4 = cardRepository.findById(selectedCardIds.get(3))
                .orElseThrow(() -> new IllegalArgumentException("카드 4를 찾을 수 없습니다."));
        Card card5 = cardRepository.findById(selectedCardIds.get(4))
                .orElseThrow(() -> new IllegalArgumentException("카드 5를 찾을 수 없습니다."));
        Card card6 = cardRepository.findById(selectedCardIds.get(5))
                .orElseThrow(() -> new IllegalArgumentException("카드 6을 찾을 수 없습니다."));

        // TaroResult 생성
        Result result = Result.builder()
                .member(member)
                .card1(card1)
                .card2(card2)
                .card3(card3)
                .card4(card4)
                .card5(card5)
                .card6(card6)
                .timestamp(LocalDateTime.now())  // 현재 시간
                .gptResult(gptResult)           // GPT 결과 추가
                .build();

        return taroResultRepository.save(result); // 결과 저장 후 반환
    }

    // 타로 결과 업데이트 (GPT 결과 추가)
    public Result updateGptResult(Long resultId, String gptResult) {
        Result result = taroResultRepository.findById(resultId)
                .orElseThrow(() -> new IllegalArgumentException("타로 결과를 찾을 수 없습니다."));

        result.setGptResult(gptResult); // GPT 결과 업데이트
        return taroResultRepository.save(result); // 업데이트된 결과 저장
    }

    public void deleteGptResult(Long resultId) {
        Optional<Result> result = taroResultRepository.findById(resultId);
        if(!result.isPresent()) {
            throw new IllegalArgumentException("점술 기록을 찾을 수 없습니다.");
        }
        resultRepository.deleteById(resultId);

    }
}

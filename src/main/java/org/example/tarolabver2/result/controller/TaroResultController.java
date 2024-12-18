package org.example.tarolabver2.result.controller;
import lombok.RequiredArgsConstructor;
import org.antlr.v4.runtime.RecognitionException;
import org.example.tarolabver2.card.entity.Card;
import org.example.tarolabver2.card.repository.CardRepository;
import org.example.tarolabver2.member.entity.Member;
import org.example.tarolabver2.member.repository.MemberRepository;
import org.example.tarolabver2.result.dto.ResultDto;
import org.example.tarolabver2.result.entity.Result;
import org.example.tarolabver2.result.repository.ResultRepository;
import org.example.tarolabver2.result.service.GPTService;
import org.example.tarolabver2.result.service.ResultService;
import org.example.tarolabver2.result.service.SaveResultRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/tarot")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class TaroResultController {

    private final ResultService taroResultService; // 생성자 주입
    private final ResultRepository resultRepository;
    private final MemberRepository memberRepository;
    private final CardRepository cardRepository;
    private final GPTService gptService; // GPTService 주입 추가

    // 유틸리티: 인증된 사용자 이메일 가져오기
    private String getAuthenticatedEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new IllegalStateException("사용자가 인증되지 않았습니다.");
        }
        return authentication.getName(); // 인증된 사용자의 이메일 반환
    }

    @PostMapping("/saveSelectedCards")
    public ResponseEntity<?> saveSelectedCards(@RequestBody SaveResultRequest request) {
        String email = getAuthenticatedEmail();
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        // 카드 ID가 3개인지 확인
        List<Long> selectedCardIds = request.getSelectedCardIds();
        if (selectedCardIds.size() != 6) {
            throw new IllegalArgumentException("6 장의 카드만 선택할 수 있습니다.");
        }

        // 카드 ID로 카드 객체를 찾고, TaroResult를 생성하여 저장
        Card card1 = cardRepository.findById(selectedCardIds.get(0))
                .orElseThrow(() -> new IllegalArgumentException("카드 1을 찾을 수 없습니다."));
        Card card2 = cardRepository.findById(selectedCardIds.get(1))
                .orElseThrow(() -> new IllegalArgumentException("카드 2를 찾을 수 없습니다."));
        Card card3 = cardRepository.findById(selectedCardIds.get(2))
                .orElseThrow(() -> new IllegalArgumentException("카드 3을 찾을 수 없습니다."));
        Card card4 = cardRepository.findById(selectedCardIds.get(3))
                .orElseThrow(() -> new IllegalArgumentException("카드 4을 찾을 수 없습니다."));
        Card card5 = cardRepository.findById(selectedCardIds.get(4))
                .orElseThrow(() -> new IllegalArgumentException("카드 5을 찾을 수 없습니다."));
        Card card6 = cardRepository.findById(selectedCardIds.get(5))
                .orElseThrow(() -> new IllegalArgumentException("카드 6을 찾을 수 없습니다."));

        // TaroResult 객체 생성
        Result result = Result.builder()
                .member(member)
                .card1(card1)
                .card2(card2)
                .card3(card3)
                .card4(card4)
                .card5(card5)
                .card6(card6)
                .timestamp(LocalDateTime.now())  // 현재 시간
                .build();

        // 타로 결과 저장
        resultRepository.save(result);

        return ResponseEntity.ok("타로 결과가 저장되었습니다.");
    }

    @PostMapping("/saveResult")
    public ResponseEntity<?> saveResult(@RequestBody SaveResultRequest request) {
        String email = getAuthenticatedEmail();
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        List<Long> selectedCardIds = request.getSelectedCardIds();
        boolean[] isReversedArray = request.getIsReversedArray();

        if (selectedCardIds.size() != 6 || isReversedArray.length != 6) {
            throw new IllegalArgumentException("6장의 카드와 6개의 역방향 여부가 필요합니다.");
        }

        // 카드 ID로 카드 객체 찾기
        List<Card> selectedCards = cardRepository.findAllById(selectedCardIds);
        if (selectedCards.size() != 6) {
            throw new IllegalArgumentException("일부 카드가 존재하지 않습니다.");
        }

        // Result 객체 생성
        Result result = Result.builder()
                .member(member)
                .card1(selectedCards.get(0))
                .card2(selectedCards.get(1))
                .card3(selectedCards.get(2))
                .card4(selectedCards.get(3))
                .card5(selectedCards.get(4))
                .card6(selectedCards.get(5))
                .question(request.getQuestion())
                .timestamp(LocalDateTime.now())
                .build();

        // 저장
        Result savedResult = resultRepository.save(result);


        String characterProfile =
                "당신은 '타로 괴짜'라는 캐릭터로 독설과 날카로운 분석으로 유명한 타로 전문가입니다. " +
                        "말투는 직설적이고 공격적이며 때로는 비꼬는 투로 상대방의 문제를 직시하게 만듭니다. " +
                        "하지만 그 속엔 진심 어린 조언과 해결책을 담고 있어 상대방을 변화시키려 합니다. " +
                        "당신은 모든 점괘를 있는 그대로 말하며, 감정을 배제한 냉철한 분석을 가미합니다. " +
                        "말 끝에 종종 '정신 차려!' 같은 강한 말투를 사용해 상대방을 깨우칩니다.";

        String gptPrompt = String.format(
                "%s\n\n" +  // 캐릭터 설정
                        "당신의 질문은 '%s'군. 6장의 타로 카드를 뽑았으니 해석해주겠다. 각 카드는 과거, 현재, 미래, 추가 상황, 결론, 조언을 나타낸다.\n\n" +
                        "**1. 과거** - '%s' [%s: %s]\n" +
                        "**2. 현재** - '%s' [%s: %s]\n" +
                        "**3. 미래** - '%s' [%s: %s]\n" +
                        "**4. 추가 상황** - '%s' [%s: %s]\n" +
                        "**5. 결론** - '%s' [%s: %s]\n" +
                        "**6. 조언** - '%s' [%s: %s]\n\n" +
                        "각 카드의 의미를 바탕으로 질문에 대한 종합적인 해석을 작성하라. 타로 괴짜의 직설적인 말투로 독설과 조언을 섞어 최대한 구체적이고 풍부하게 설명해라.",
                characterProfile,
                request.getQuestion(),

                // 카드 1
                selectedCards.get(0).getName(),
                isReversedArray[0] ? "역방향 의미" : "정방향 의미",
                isReversedArray[0] ? selectedCards.get(0).getMeaningReverse() : selectedCards.get(0).getMeaningUpright(),

                // 카드 2
                selectedCards.get(1).getName(),
                isReversedArray[1] ? "역방향 의미" : "정방향 의미",
                isReversedArray[1] ? selectedCards.get(1).getMeaningReverse() : selectedCards.get(1).getMeaningUpright(),

                // 카드 3
                selectedCards.get(2).getName(),
                isReversedArray[2] ? "역방향 의미" : "정방향 의미",
                isReversedArray[2] ? selectedCards.get(2).getMeaningReverse() : selectedCards.get(2).getMeaningUpright(),

                // 카드 4
                selectedCards.get(3).getName(),
                isReversedArray[3] ? "역방향 의미" : "정방향 의미",
                isReversedArray[3] ? selectedCards.get(3).getMeaningReverse() : selectedCards.get(3).getMeaningUpright(),

                // 카드 5
                selectedCards.get(4).getName(),
                isReversedArray[4] ? "역방향 의미" : "정방향 의미",
                isReversedArray[4] ? selectedCards.get(4).getMeaningReverse() : selectedCards.get(4).getMeaningUpright(),

                // 카드 6
                selectedCards.get(5).getName(),
                isReversedArray[5] ? "역방향 의미" : "정방향 의미",
                isReversedArray[5] ? selectedCards.get(5).getMeaningReverse() : selectedCards.get(5).getMeaningUpright()
        );



        String gptResult = gptService.getGptResult(gptPrompt);
        savedResult.setGptResult(gptResult);
        resultRepository.save(savedResult);

        // 결과 ID 반환
        return ResponseEntity.ok(savedResult.getId());
    }

    @PostMapping("/saveResultWithGpt")
    public ResponseEntity<?> saveResultWithGpt(@RequestBody SaveResultRequest request) {
        // 요청으로 전달된 resultId로 결과를 조회
        Long resultId = request.getResultId();
        String gptResult = request.getGptResult();

        Result existingResult = resultRepository.findById(resultId)
                .orElseThrow(() -> new IllegalArgumentException("해당 ID의 타로 결과를 찾을 수 없습니다."));

        if (existingResult.getGptResult() != null && !existingResult.getGptResult().isEmpty()) {
            // 이미 GPT 결과가 존재하는 경우, 아무 작업도 하지 않고 상태만 반환
            return ResponseEntity.ok("이미 GPT 결과가 저장되어 있습니다.");
        }

        // GPT 결과 저장
        existingResult.setGptResult(gptResult);
        resultRepository.save(existingResult);

        return ResponseEntity.ok("GPT 결과가 성공적으로 저장되었습니다.");
    }

    @PutMapping("/updateGptResult/{id}")
    public ResponseEntity<Result> updateGptResult(@PathVariable Long id, @RequestBody String gptResult) {
        Result updatedResult = taroResultService.updateGptResult(id, gptResult);
        return ResponseEntity.ok(updatedResult);
    }

    // 사용자 결과 조회
    @GetMapping("/results")
    public ResponseEntity<List<ResultDto>> getTarotResults() {
        // 인증된 사용자 이메일 가져오기
        String email = getAuthenticatedEmail();

        // 사용자가 저장한 타로 결과 가져오기
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        List<Result> results = resultRepository.findByMember(member);

        // TaroResult를 DTO로 변환하여 반환
        List<ResultDto> resultDtos = results.stream()
                .map(result -> new ResultDto(result))
                .toList();

        return ResponseEntity.ok(resultDtos);
    }

    @GetMapping("/results/{id}")
    public ResponseEntity<ResultDto> getTarotResultById(@PathVariable Long id) {
        try {
            System.out.println("받은 ID: " + id);
            // 타로 결과를 ID로 검색
            Result result = resultRepository.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException("해당 ID에 해당하는 타로 결과를 찾을 수 없습니다. ID: " + id));

            System.out.println("결과 조회 성공: " + result);

            // DTO로 변환하여 반환
            ResultDto resultDto = new ResultDto(result);
            return ResponseEntity.ok(resultDto);
        } catch (Exception e) {
            e.printStackTrace(); // 자세한 스택 트레이스 출력
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    @DeleteMapping("/delete/results/{id}")
    public ResponseEntity<String> deleteResults(@PathVariable Long id) {
        try {
            taroResultService.deleteGptResult(id); // 삭제 서비스 호출
            return ResponseEntity.ok("점술 기록이 삭제되었습니다.");
        } catch (IllegalArgumentException exception) {
            // 예외 처리: 예를 들어, 잘못된 ID를 전달받았을 경우
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("잘못된 요청입니다.");
        } catch (Exception e) {
            // 다른 예기치 않은 오류 처리
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류가 발생했습니다.");
        }
    }

}
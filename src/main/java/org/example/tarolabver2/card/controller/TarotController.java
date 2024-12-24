package org.example.tarolabver2.card.controller;

import lombok.RequiredArgsConstructor;
import org.example.tarolabver2.card.dto.CardDto;
import org.example.tarolabver2.card.dto.CardSelectionRequest;
import org.example.tarolabver2.card.entity.Card;
import org.example.tarolabver2.card.repository.CardRepository;
import org.example.tarolabver2.card.service.CardService;
import org.example.tarolabver2.member.repository.MemberRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/tarot")

public class TarotController {

    private final CardService cardService;
    private final CardRepository cardRepository;
    private final MemberRepository memberRepository;

    @PostMapping("/select")
    public ResponseEntity<CardDto> selectCard(@RequestBody CardSelectionRequest request) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication == null || !authentication.isAuthenticated()) {
            throw new IllegalArgumentException("인증된 회원이 아닙니다.");
        }
        Long cardId = request.getCardId(); // DTO 객체에서 cardId 추출
        CardDto selectedCard = cardService.selectCard(cardId);
        return ResponseEntity.ok(selectedCard);
    }
}

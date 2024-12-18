package org.example.tarolabver2.card.service;

import lombok.RequiredArgsConstructor;
import org.example.tarolabver2.card.dto.CardDto;
import org.example.tarolabver2.card.entity.Card;
import org.example.tarolabver2.card.repository.CardRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CardService {


    private final CardRepository cardRepository;



    public CardDto selectCard(Long cardId) {
        Card card = cardRepository.findById(cardId).orElseThrow(() -> new IllegalArgumentException("카드를 찾을 수 없습니다."));

        return new CardDto(
                card.getId(),
                card.getName(),
                card.getType(),
                card.getSuit(),
                card.getNumber(),
                card.getMeaningUpright(),
                card.getMeaningReverse(),
                card.getImage_url()
        );
    }
}

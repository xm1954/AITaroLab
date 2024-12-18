package org.example.tarolabver2.card.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.example.tarolabver2.card.entity.Card;
import org.example.tarolabver2.card.repository.CardRepository;
import org.example.tarolabver2.card.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/tarot-cards")
public class CardController {

    private static final Logger logger = LoggerFactory.getLogger(CardController.class);

    @Autowired
    private CardRepository cardRepository;
    @PostMapping
    public ResponseEntity<Card> createCard(@RequestBody Card tarotCard) {

        Optional<Card> card = cardRepository.findByName(tarotCard.getName());
        Card savedCard = cardRepository.save(tarotCard);
        logger.info("New card created with name {}", savedCard.getName());
        return ResponseEntity.ok(savedCard);

    }
}

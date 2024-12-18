//package org.example.tarolabver2.card.service;
//
//import com.fasterxml.jackson.core.type.TypeReference;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import org.example.tarolabver2.card.entity.Card;
//import org.example.tarolabver2.card.repository.CardRepository;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.stereotype.Component;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.io.InputStream;
//import java.util.List;
//@Component
//@Transactional
//public class DataLoader implements CommandLineRunner {
//
//    private final CardRepository cardRepository;
//
//    public DataLoader(CardRepository cardRepository) {
//        this.cardRepository = cardRepository;
//    }
//
//    @Override
//    public void run(String... args) throws Exception {
//        ObjectMapper mapper = new ObjectMapper();
//        InputStream inputStream = getClass().getResourceAsStream("/taro_db.json");
//        List<Card> cards = mapper.readValue(inputStream, new TypeReference<List<Card>>() {});
//
//        for (Card card : cards) {
//            if (cardRepository.existsById(card.getId())) {
//                // 데이터베이스에 이미 존재하는 경우 업데이트
//                Card existingCard = cardRepository.findById(card.getId()).orElse(null);
//                if (existingCard != null) {
//                    updateCard(existingCard, card);
//                    cardRepository.save(existingCard);
//                }
//            } else {
//                // 데이터베이스에 없는 경우 새로 삽입
//                cardRepository.save(card);
//            }
//        }
//
//        System.out.println("데이터가 성공적으로 DB에 저장되었습니다.");
//    }
//
//    private void updateCard(Card existingCard, Card newCard) {
//        existingCard.setName(newCard.getName());
//        existingCard.setType(newCard.getType());
//        existingCard.setSuit(newCard.getSuit());
//        existingCard.setNumber(newCard.getNumber());
//        existingCard.setMeaningUpright(newCard.getMeaningUpright());
//        existingCard.setMeaningReverse(newCard.getMeaningReverse());
//        existingCard.setImage_url(newCard.getImage_url());
//    }
//}

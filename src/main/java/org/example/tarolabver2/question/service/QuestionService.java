package org.example.tarolabver2.question.service;

import org.example.tarolabver2.member.entity.Member;
import org.example.tarolabver2.member.repository.MemberRepository;
import org.example.tarolabver2.notification.entity.Notification;
import org.example.tarolabver2.notification.repository.NotificationRepository;
import org.example.tarolabver2.question.entity.Question;
import org.example.tarolabver2.question.repository.QuestionRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final MemberRepository memberRepository;
    private final NotificationRepository notificationRepository;

    public QuestionService(QuestionRepository questionRepository, MemberRepository memberRepository, NotificationRepository notificationRepository) {
        this.questionRepository = questionRepository;
        this.memberRepository = memberRepository;
        this.notificationRepository = notificationRepository;
    }

    public Question saveQuestion(Long memberId, String content) {
        Question question = new Question();
        question.setMember(memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다.")));
        question.setContent(content);
        question.setAnswer(""); // 기본값 설정
        return questionRepository.save(question);
    }

    // QuestionService.java
    public Question saveAnswer(Long questionId, String answer) {
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Question not found"));

        question.setAnswer(answer);
        question.setAnsweredAt(LocalDateTime.now());
        questionRepository.save(question);

        // Create notification for user
        Notification notification = new Notification();
        notification.setUser(question.getMember());
        notification.setMessage("새 답변이 등록되었습니다: " + answer);
        notification.setRead(false);
        notificationRepository.save(notification);

        return question;
    }

    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    public Question getQuestionById(Long id) {
        return questionRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "질문을 찾을 수 없습니다."));
    }
}

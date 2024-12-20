package org.example.tarolabver2.question.cotroller;

import jakarta.validation.Valid;
import org.example.tarolabver2.member.repository.MemberRepository;
import org.example.tarolabver2.question.dto.AnswerRequestDto;
import org.example.tarolabver2.question.dto.QuestionRequestDto;
import org.example.tarolabver2.question.dto.QuestionResponseDto;
import org.example.tarolabver2.question.entity.Question;
import org.example.tarolabver2.question.service.QuestionMapper;
import org.example.tarolabver2.question.service.QuestionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/question")
public class QuestionController {

    private final QuestionService questionService;
    private final MemberRepository memberRepository;

    public QuestionController(QuestionService questionService, MemberRepository memberRepository) {
        this.questionService = questionService;
        this.memberRepository = memberRepository;
    }

    @PostMapping
    public ResponseEntity<QuestionResponseDto> createQuestion(
            @RequestBody @Valid QuestionRequestDto requestDto,
            @AuthenticationPrincipal UserDetails userDetails) {

        String email = userDetails.getUsername();
        Long memberId = memberRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "사용자를 찾을 수 없습니다."))
                .getId();

        Question question = questionService.saveQuestion(memberId, requestDto.getContent());
        QuestionResponseDto responseDto = QuestionMapper.toDto(question);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDto);
    }


    @GetMapping("/{id}")
    public ResponseEntity<QuestionResponseDto> getQuestionById(@PathVariable Long id) {
        Question question = questionService.getQuestionById(id);
        QuestionResponseDto responseDto = QuestionMapper.toDto(question);
        return ResponseEntity.ok(responseDto);
    }


    @PostMapping("/{id}/answer")
    public ResponseEntity<QuestionResponseDto> answerQuestion(
            @PathVariable Long id,
            @RequestBody @Valid AnswerRequestDto requestDto) {

        Question question = questionService.saveAnswer(id, requestDto.getAnswer());
        QuestionResponseDto responseDto = QuestionMapper.toDto(question);
        return ResponseEntity.ok(responseDto);
    }


    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<List<QuestionResponseDto>> getAllQuestions() {
        List<Question> questions = questionService.getAllQuestions();
        List<QuestionResponseDto> responseDtos = questions.stream()
                .map(QuestionMapper::toDto)
                .toList();
        return ResponseEntity.ok(responseDtos);
    }



}

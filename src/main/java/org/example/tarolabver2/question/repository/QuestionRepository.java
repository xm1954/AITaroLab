package org.example.tarolabver2.question.repository;

import org.example.tarolabver2.question.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question, Long> {
}
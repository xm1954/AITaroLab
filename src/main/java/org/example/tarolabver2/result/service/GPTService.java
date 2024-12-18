package org.example.tarolabver2.result.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import org.springframework.http.HttpHeaders; // 이 패키지를 사용
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Getter
@Setter
public class GPTService {

    @Value("${gpt.api.key}")
    private String apiKey;

    private static final String GPT_API_URL = "https://api.openai.com/v1/chat/completions";

    public String getGptResult(String prompt) {
        try {
            RestTemplate restTemplate = new RestTemplate();

            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + apiKey);
            headers.set("Content-Type", "application/json");

            // JSON 객체 생성
            ObjectMapper objectMapper = new ObjectMapper();
            Map<String, Object> requestBodyMap = new HashMap<>();
            requestBodyMap.put("model", "gpt-4"); // 또는 "gpt-4-32k"
            requestBodyMap.put("messages", List.of(Map.of("role", "user", "content", prompt)));
            requestBodyMap.put("max_tokens", 5000);
            requestBodyMap.put("temperature", 0.3); // 더 창의적인 응답을 위해 높임
            requestBodyMap.put("top_p", 0.4); // 기본값 유지

            // JSON 문자열로 변환
            String requestBody = objectMapper.writeValueAsString(requestBodyMap);

            HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

            // API 호출
            ResponseEntity<String> response = restTemplate.exchange(GPT_API_URL, HttpMethod.POST, entity, String.class);

            // 응답 코드 확인
            if (response.getStatusCode() != HttpStatus.OK) {
                throw new RuntimeException("Error occurred: " + response.getStatusCode() + " - " + response.getBody());
            }

            // 응답에서 텍스트 추출
            return extractTextFromGptResponse(response.getBody());
        } catch (Exception e) {
            e.printStackTrace();
            return "GPT 호출 실패: " + e.getMessage();
        }
    }

    private String extractTextFromGptResponse(String responseBody) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(responseBody);
            return jsonNode.get("choices").get(0).get("message").get("content").asText();
        } catch (Exception e) {
            e.printStackTrace();
            return "응답 파싱 실패: " + e.getMessage();
        }
    }
}
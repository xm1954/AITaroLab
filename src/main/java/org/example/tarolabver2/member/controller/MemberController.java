package org.example.tarolabver2.member.controller;

import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import jakarta.validation.Valid;
import org.example.tarolabver2.common.jwt.JwtTokenUtil;
import org.example.tarolabver2.member.dto.MemberDto;
import org.example.tarolabver2.member.entity.Member;
import org.example.tarolabver2.member.entity.MemberLoginDto;
import org.example.tarolabver2.member.repository.MemberRepository;
import org.example.tarolabver2.member.service.MemberService;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
@Slf4j

@RestController
@RequestMapping("/api/members")
public class MemberController {

    private final MemberService memberService;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;
    private final MemberRepository memberRepository;

    public MemberController(MemberService memberService, AuthenticationManager authenticationManager, JwtTokenUtil jwtTokenUtil, MemberRepository memberRepository) {
        this.memberService = memberService;
        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
        this.memberRepository = memberRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@Valid @RequestBody MemberDto memberDto) {
        memberService.registerMember(memberDto); // 회원가입 처리

        Map<String, String> response = new HashMap<>();
        response.put("nickname", memberDto.getNickname()); // 클라이언트 쪽에서 보낸 nickname을 반환.
        response.put("message", "회원가입이 완료 되었습니다.");

        return ResponseEntity.ok(response);
    }

    @GetMapping("/role")
    public ResponseEntity<?> getCurrentUser() {
        // 현재 인증된 사용자 정보 가져오기
        var authentication = SecurityContextHolder.getContext().getAuthentication();

        // 인증되지 않은 상태 처리 (익명 사용자일 경우)
        if (authentication == null || !authentication.isAuthenticated() || authentication.getPrincipal().equals("anonymousUser")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                    "message", "인증되지 않은 사용자입니다."
            ));
        }

        // 인증된 사용자 이메일 추출
        String email = authentication.getName();
        log.info("Authenticated user email: {}", email);

        // 데이터베이스에서 사용자 정보 조회
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        // 사용자 정보를 JSON 형태로 반환
        return ResponseEntity.ok(Map.of(
                "nickname", member.getNickname(),
                "role", member.getRole()
        ));
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody MemberLoginDto loginDto) {
        try {
            // 이메일과 비밀번호 인증
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword())
            );

            // 사용자 정보를 로드
            var userDetails = memberService.loadUserByUsername(loginDto.getEmail());

            // MemberRepository를 사용하여 Member 조회
            Optional<Member> memberOptional = memberRepository.findByEmail(loginDto.getEmail());

            if (memberOptional.isEmpty()) {
                log.error("User not found in database: {}", loginDto.getEmail());
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                        "message", "사용자를 찾을 수 없습니다."
                ));
            }

            // Optional에서 Member 객체 추출
            Member member = memberOptional.get();
            String username = userDetails.getUsername(); // UserDetails에서 username 가져오기
            String nickname = member.getNickname();      // Member 엔터티에서 nickname 가져오기
            String role = member.getRole().name();       // Member 엔터티에서 role 가져오기

            // JWT 생성
            String token = jwtTokenUtil.generateToken(username, nickname, role);

            // SecurityContextHolder에 인증 정보 저장
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                    userDetails, null, userDetails.getAuthorities()
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // 성공 응답 반환
            return ResponseEntity.ok(Map.of(
                    "message", "로그인 성공",
                    "token", token,
                    "nickname", nickname
            ));
        } catch (AuthenticationException e) {
            log.error("Authentication failed: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                    "message", "이메일 또는 비밀번호가 잘못되었습니다."
            ));
        } catch (Exception e) {
            log.error("Unexpected error during login: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "message", "서버 오류가 발생했습니다."
            ));
        }
    }


}

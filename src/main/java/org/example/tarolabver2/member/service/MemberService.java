package org.example.tarolabver2.member.service;

import org.example.tarolabver2.common.jwt.JwtTokenUtil;
import org.example.tarolabver2.member.ROLE;
import org.example.tarolabver2.member.dto.MemberDto;
import org.example.tarolabver2.member.entity.Member;
import org.example.tarolabver2.member.entity.MemberLoginDto;
import org.example.tarolabver2.member.repository.MemberRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MemberService {

    private final PasswordEncoder passwordEncoder;
    private final MemberRepository memberRepository;
    private final JwtTokenUtil jwtTokenUtil;

    public MemberService(MemberRepository memberRepository, PasswordEncoder passwordEncoder, JwtTokenUtil jwtTokenUtil) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    public Member registerMember(MemberDto memberDto) {
        if (memberRepository.findByEmail(memberDto.getEmail()).isPresent()) {
            throw new IllegalStateException("이미 사용중인 아이디 입니다.");
        }

        Member member = Member.builder()
                .name(memberDto.getName())
                .email(memberDto.getEmail())
                .nickname(memberDto.getNickname())
                .password(passwordEncoder.encode(memberDto.getPassword()))
                .role(ROLE.USER)
                .build();

        return memberRepository.save(member);
    }

    public String login(MemberLoginDto loginDto) {
        Member member = memberRepository.findByEmail(loginDto.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("이메일 또는 비밀번호가 잘못되었습니다."));

        if (!passwordEncoder.matches(loginDto.getPassword(), member.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        return jwtTokenUtil.generateToken(
                member.getEmail(),        // username
                member.getNickname(),    // nickname
                member.getRole().name()  // role
        );
    }

    // loadUserByUsername 추가
    public UserDetails loadUserByUsername(String email) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        return new org.springframework.security.core.userdetails.User(
                member.getEmail(),
                member.getPassword(),
                List.of(new SimpleGrantedAuthority(member.getRole().name()))
        );
    }

}
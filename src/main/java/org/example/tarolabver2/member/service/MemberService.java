package org.example.tarolabver2.member.service;

import org.example.tarolabver2.common.jwt.JwtTokenUtil;
import org.example.tarolabver2.member.ROLE;
import org.example.tarolabver2.member.dto.MemberDto;
import org.example.tarolabver2.member.entity.Member;
import org.example.tarolabver2.member.dto.MemberLoginDto;
import org.example.tarolabver2.member.repository.MemberRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

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

        // 정지된 계정인지 확인
        if (member.getBanEndDate() != null && member.getBanEndDate().isAfter(LocalDate.now())) {
            throw new IllegalStateException("정지된 계정입니다. 정지 해제 날짜: " + member.getBanEndDate());
        }

        // 비밀번호 확인
        if (!passwordEncoder.matches(loginDto.getPassword(), member.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 잘못되었습니다.");
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

    // 닉네임 변경
    public void updateNickname(Long id, String newNickname) {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("회원이 존재하지 않습니다."));
        member.setNickname(newNickname);
        memberRepository.save(member);
    }

    // 회원 정지
    public void banMember(Long id, int days, String reason) {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("회원이 존재하지 않습니다."));
        member.setBanEndDate(LocalDate.now().plusDays(days));
        member.setBanReason(reason);
        memberRepository.save(member);
    }

    // 정지 종료 날짜 조회
    public LocalDate getBanEndDate(Long id) {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("회원이 존재하지 않습니다."));
        return member.getBanEndDate();
    }

    public List<MemberDto> getAllMembers() {

        return memberRepository.findAll().stream()
                .map(member -> new MemberDto(
                        member.getId(), // id 추가
                        member.getName(),
                        member.getNickname(),
                        member.getEmail(),
                        member.getRole(),
                        member.getBanEndDate(),
                        member.getBanReason(),
                        member.getCreatedAt() // createdAt 추가
                ))
                .collect(Collectors.toList());
    }

    public void unbanMember(Long id) {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));
        member.unban(); // 정지 해제
        memberRepository.save(member); // 변경된 정보 저장
    }


    public MemberLoginDto update(Long id, String password) {
        Member member = memberRepository.findById(id).orElseThrow(()-> new IllegalArgumentException("회원을 찾을 수 없습니다"));
        member.setPassword(passwordEncoder.encode(password));
        memberRepository.save(member);
        return new MemberLoginDto();
    }

}
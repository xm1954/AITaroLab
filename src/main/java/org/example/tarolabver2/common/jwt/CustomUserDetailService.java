package org.example.tarolabver2.common.jwt;

import org.example.tarolabver2.member.ROLE;
import org.example.tarolabver2.member.entity.Member;
import org.example.tarolabver2.member.repository.MemberRepository;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

@Component
public class CustomUserDetailService implements UserDetailsService {


    private final MemberRepository memberRepository;

    public CustomUserDetailService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다."));


            // 정지된 계정 처리
        if (member.getBanEndDate() != null && member.getBanEndDate().isAfter(LocalDate.now())) {
            throw new InternalAuthenticationServiceException("정지된 계정입니다. 정지 해제 날짜: " + member.getBanEndDate());
        }


        return new org.springframework.security.core.userdetails.User(
                member.getEmail(),
                member.getPassword(),
                List.of(new SimpleGrantedAuthority(member.getRole().name()))
        );
    }

}
package com.wordtree.global.jwt;

import com.wordtree.member.Member;
import com.wordtree.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String userid) throws UsernameNotFoundException {

        Member member = memberRepository.findByUserId(userid);

        if(member != null){
            return new CustomUserDetails(member);
        }

        throw new UsernameNotFoundException("사용자를 찾을 수 없습니다.");
    }
    public Member getAuthenticatedEntity() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated() || authentication.getPrincipal().equals("anonymousUser")) {
            return null; // 인증되지 않은 사용자 처리
        }

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        String userid = userDetails.getUsername(); // `userid` 가져오기

        // 📌 DB에서 `userid`를 기반으로 다시 조회하여 영속 상태로 반환
        return memberRepository.findByUserId(userid);
    }
}

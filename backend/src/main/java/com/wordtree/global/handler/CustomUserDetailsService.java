package com.wordtree.global.handler;

import com.wordtree.member.Member;
import com.wordtree.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String userid) throws UsernameNotFoundException {

        Member member = memberRepository.findByUserId(userid);
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        if(member != null){
            return new CustomUserDetails(member);
        }

        throw new UsernameNotFoundException("사용자가 존재하지 않습니다." + userid);

    }
    public Member getAuthenticatedEntity() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated() || authentication.getPrincipal().equals("anonymousUser")) {
            return null; // 인증되지 않은 사용자 처리
        }

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        String userid = userDetails.getUsername(); // `userid` 가져오기

        return memberRepository.findByUserId(userid);
    }
}
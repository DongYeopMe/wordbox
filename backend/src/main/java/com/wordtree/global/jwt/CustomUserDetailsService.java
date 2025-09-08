package com.wordtree.global.jwt;

import com.wordtree.global.dto.CustomOAuth2User;
import com.wordtree.member.dto.MemberRequest;
import com.wordtree.member.entity.Member;
import com.wordtree.member.entity.SocialProviderType;
import com.wordtree.member.entity.UserRoleType;
import com.wordtree.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService extends DefaultOAuth2UserService implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Transactional(readOnly = true)
    @Override
    public UserDetails loadUserByUsername(String userid) throws UsernameNotFoundException {

        Member entity = memberRepository.findByUseridAndIsLockAndIsSocial(userid,false,false).orElseThrow(()-> new UsernameNotFoundException(userid));

        return User.builder()
                .username(entity.getUserid())
                .password(entity.getPassword())
                .roles(entity.getRoleType().name())
                .accountLocked(entity.getIsLock()).
                build();
    }
    public Member getAuthenticatedEntity() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated() || authentication.getPrincipal().equals("anonymousUser")) {
            return null; // 인증되지 않은 사용자 처리
        }

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        String userid = userDetails.getUsername(); // `userid` 가져오기

        // DB에서 `userid`를 기반으로 다시 조회하여 영속 상태로 반환
        return memberRepository.findByUserId(userid);
    }
    //소셜 로그인
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        //부모 메소드 호출
        OAuth2User oAuth2User = super.loadUser(userRequest);

        // 데이터
        Map<String, Object> attributes;
        List<GrantedAuthority> authorities;

        String userid;
        String role = UserRoleType.USER.name();
        String email;
        String username;

        // provider 제공자별 데이터 획득
        String registrationId = userRequest.getClientRegistration().getRegistrationId().toUpperCase(); //네이버인지 구글인지
        if (registrationId.equals(SocialProviderType.NAVER.name())) {

            attributes = (Map<String, Object>) oAuth2User.getAttributes().get("response");
            userid = registrationId + "_" + attributes.get("id");
            email = attributes.get("email").toString();
            username = attributes.get("nickname").toString();

        } else if (registrationId.equals(SocialProviderType.GOOGLE.name())) {

            attributes = (Map<String, Object>) oAuth2User.getAttributes();
            userid = registrationId + "_" + attributes.get("sub");
            email = attributes.get("email").toString();
            username = attributes.get("name").toString();

        } else {
            throw new OAuth2AuthenticationException("지원하지 않는 소셜 로그인입니다.");
        }
        Optional<Member> entity = memberRepository.findByUseridAndIsSocial(userid, true);
        if(entity.isPresent()){
            // role 조회
            role = entity.get().getRoleType().name();

            // 기존 유저 업데이트
            MemberRequest dto = new MemberRequest();
            dto.setUsername(username);
            dto.setEmail(email);
            entity.get().updateUser(dto);

            memberRepository.save(entity.get());
        }
        else{
            // 신규 유저 추가
            Member newMember = Member.builder()
                    .userid(userid)
                    .password("")
                    .isLock(false)
                    .isSocial(true)
                    .socialProviderType(SocialProviderType.valueOf(registrationId))
                    .roleType(UserRoleType.USER)
                    .username(username)
                    .email(email)
                    .build();

            memberRepository.save(newMember);
        }
        authorities = List.of(new SimpleGrantedAuthority(role));

        return new CustomOAuth2User(attributes, authorities, userid);

    }

}

package com.wordtree.member.service;

import com.wordtree.global.jwt.JwtService;
import com.wordtree.member.dto.MemberNickNameDto;
import com.wordtree.member.dto.MemberUserNameDto;
import com.wordtree.member.entity.UserRoleType;
import com.wordtree.member.repository.MemberRepository;
import com.wordtree.member.dto.MemberRequest;
import com.wordtree.member.dto.MemberResponse;
import com.wordtree.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.wordtree.member.entity.Member.requestConvert;
import static com.wordtree.member.dto.MemberResponse.memberConvert;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    // 회원가입
    @Transactional
    public Long createMember(MemberRequest memberRequest) {

        if( memberRepository.existsByUsername(memberRequest.getUsername())){
            throw new IllegalArgumentException("이미 유저가 존재합니다.");
        }
        Member member = requestConvert(memberRequest);
        member.updatePassword(passwordEncoder.encode(member.getPassword()));
        return memberRepository.save(member).getId();
    }
    // 수정
    @Transactional
    public Long editMember(MemberRequest memberRequest) throws AccessDeniedException {
        //본인만 수정 검증
        String sessionUserId = SecurityContextHolder.getContext().getAuthentication().getName();
        if (!sessionUserId.equals(memberRequest.getUsername())) {
            throw new AccessDeniedException("본인 계정만 수정 가능");
        }
        //조회
        Member findmember = memberRepository.findByUsernameAndIsLockAndIsSocial(memberRequest.getUsername(),false,false)
                .orElseThrow(() -> new UsernameNotFoundException(memberRequest.getUsername()));

        findmember.updateUser(memberRequest);
        return findmember.getId();
    }

    // 유저 가져오기
    public MemberResponse getMember(String username) {
        Member findMember = memberRepository.findByUserName(username);
        return memberConvert(findMember);
    }
    //자체, 소셜 로그인 회원 탈퇴
    @Transactional
    public void deleteMember(MemberRequest dto) throws AccessDeniedException{
        // 본인 및 어드민만 삭제 가능 검증
        SecurityContext context = SecurityContextHolder.getContext();
        String sessionUserid = context.getAuthentication().getName();
        String sessionRole = context.getAuthentication().getAuthorities().iterator().next().getAuthority();

        boolean isOwner = sessionUserid.equals(dto.getUsername());
        boolean isAdmin = sessionRole.equals("ROLE_"+ UserRoleType.ADMIN.name());

        if (!isOwner && !isAdmin) {
            throw new AccessDeniedException("본인 혹은 관리자만 삭제할 수 있습니다.");
        }
        // 유저 제거
        memberRepository.deleteByUsername(dto.getUsername());

        // Refresh 토큰 제거
        jwtService.removeRefreshUser(dto.getUsername());

    }
    //자체, 소셜 유저 정보 조회
    @Transactional(readOnly = true)
    public MemberResponse selectMember(){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        Member findMember = memberRepository.findByUsernameAndIsSocial(username,false)
                .orElseThrow(() -> new UsernameNotFoundException("해당 유저를 찾을 수 없습니다: " + username));
        return new MemberResponse(findMember.getUsername(),findMember.getIsSocial(),findMember.getNickname(), findMember.getEmail());
    }

    //존재 하는지 검증(username)
    @Transactional(readOnly = true)
    public Boolean existUser(MemberUserNameDto dto) {
        return memberRepository.existsByUsername(dto.getUsername());
    }
    //존재 하는지 검증(nickname)
    @Transactional(readOnly = true)
    public Boolean existUser(MemberNickNameDto dto) {
        return memberRepository.existsByNickname(dto.getNickname());
    }




}

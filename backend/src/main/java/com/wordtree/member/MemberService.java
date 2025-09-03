package com.wordtree.member;

import com.wordtree.member.dto.MemberRequest;
import com.wordtree.member.dto.MemberResponse;
import com.wordtree.member.entity.Member;
import com.wordtree.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
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
    // 회원가입
    @Transactional
    public void createMember(MemberRequest memberRequest) {

        if( memberRepository.existsByUserid(memberRequest.getUserid())){
            throw new IllegalArgumentException("이미 유저가 존재합니다.");
        }
        Member member = requestConvert(memberRequest);
        member.setPassword(passwordEncoder.encode(member.getPassword()));
        memberRepository.save(member);
    }
    // 수정
    @Transactional
    public void editMember(MemberRequest memberRequest) throws AccessDeniedException {
        //본인만 수정 검증
        String sessionUserId = SecurityContextHolder.getContext().getAuthentication().getName();
        if (!sessionUserId.equals(memberRequest.getUserid())) {
            throw new AccessDeniedException("본인 계정만 수정 가능");
        }
        //조회
        Member findmember = memberRepository.findByUseridAndIsLockAndIsSocial(memberRequest.getUserid(),false,false)
                        .orElseThrow(() -> new UsernameNotFoundException(memberRequest.getUserid()));

        findmember.updateUser(memberRequest);
    }
    // 유저 가져오기
    public MemberResponse getMember(String userId) {
        Member findMember = memberRepository.findByUserId(userId);
        return memberConvert(findMember);
    }
    //유저 삭제
    public void delete(String userId,String password) {
        Member findMember = memberRepository.findByUserId(userId);
        memberRepository.delete(findMember);
    }
    //존재 하는지 검증
    @Transactional(readOnly = true)
    public Boolean existUser(MemberRequest dto) {
        return memberRepository.existsByUserid(dto.getUserid());
    }

}

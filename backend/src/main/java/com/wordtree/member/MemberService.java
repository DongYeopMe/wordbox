package com.wordtree.member;

import com.wordtree.member.dto.MemberRequest;
import com.wordtree.member.dto.MemberResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.wordtree.member.Member.requestConvert;
import static com.wordtree.member.dto.MemberResponse.memberConvert;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    @Transactional
    public void createMember(MemberRequest memberRequest) {
        memberRepository.save(requestConvert(memberRequest));
    }

    @Transactional
    public void editMember(MemberRequest memberRequest) {
        Member findMember = memberRepository.findByUserId(memberRequest.getUserid());
        findMember.setPassword(memberRequest.getPassword());
        findMember.setUsername(memberRequest.getUsername());
    }

    public MemberResponse getMember(String userId) {
        Member findMember = memberRepository.findByUserId(userId);
        return memberConvert(findMember);
    }

    public void delete(String userId,String password) {
        Member findMember = memberRepository.findByUserId(userId);
        memberRepository.delete(findMember);
    }
}

package com.wordtree.member;

import com.wordtree.member.dto.LoginForm;
import com.wordtree.member.dto.MemberRequest;
import com.wordtree.member.dto.MemberResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.wordtree.member.Member.requestConvert;
import static com.wordtree.member.dto.MemberResponse.memberConvert;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    @Transactional
    public void createMember(MemberRequest memberRequest) {
        boolean isExist = memberRepository.existsByUserid(memberRequest.getUserid());
        if(isExist){
            return;
        }
        Member member = requestConvert(memberRequest);
        member.setRoles("ROLE_ADMIN");
        member.setPassword(passwordEncoder.encode(member.getPassword()));
        memberRepository.save(member);
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

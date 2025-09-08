package com.wordtree.member.dto;

import com.wordtree.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class MemberResponse {
    private String userid;
    private Boolean social;
    private String username;
    private String email;

    public MemberResponse(String userid, Boolean social, String username, String email) {
        this.userid = userid;
        this.social = social;
        this.username = username;
        this.email = email;
    }

    public static MemberResponse memberConvert(Member member){
        return new MemberResponse(member.getUserid(),member.getIsSocial(),member.getUsername(),member.getEmail());
    }
}

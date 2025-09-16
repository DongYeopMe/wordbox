package com.wordtree.member.dto;

import com.wordtree.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class MemberResponse {
    private String username;
    private Boolean social;
    private String nickname;
    private String email;

    public MemberResponse(String username, Boolean social, String nickname, String email) {
        this.username = username;
        this.social = social;
        this.nickname = nickname;
        this.email = email;
    }

    public static MemberResponse memberConvert(Member member){
        return new MemberResponse(member.getUsername(),member.getIsSocial(),member.getNickname(),member.getEmail());
    }
}

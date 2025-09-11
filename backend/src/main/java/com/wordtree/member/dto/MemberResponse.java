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
    private String nickname;

    public MemberResponse(String username, String nickname) {
        this.username = username;
        this.nickname = nickname;
    }

    public static MemberResponse memberConvert(Member member){
        return new MemberResponse(member.getUsername(),member.getNickname());
    }
}

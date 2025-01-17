package com.wordtree.member.dto;

import com.wordtree.member.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MemberRequest {
    private String userid;
    private String password;
    private String username;

    public MemberRequest(String userid, String password, String username) {
        this.userid = userid;
        this.password = password;
        this.username = username;
    }
}

package com.wordtree.member.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MemberRequest {
    private String userid;
    private String password;
    private String username;
    private String email;

    public MemberRequest(String userid, String password, String username,String email) {
        this.userid = userid;
        this.password = password;
        this.username = username;
        this.email = email;
    }
}

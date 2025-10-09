package com.wordtree.member.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MemberUserNameDto {

    private String username;

    public MemberUserNameDto(String username) {
        this.username = username;
    }
}


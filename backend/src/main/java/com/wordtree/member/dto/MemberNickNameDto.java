package com.wordtree.member.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MemberNickNameDto {

    private String nickname;

    public MemberNickNameDto(String nickname) {
        this.nickname = nickname;
    }
}

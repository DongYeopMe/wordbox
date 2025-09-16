package com.wordtree.global.jwt.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@AllArgsConstructor
@Getter
@Setter
public class JwtToken {

    private String grantType;
    private String accessToken;
    private String refreshToken;

}

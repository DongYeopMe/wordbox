package com.wordtree.global.handler;

import com.wordtree.global.jwt.JwtService;
import com.wordtree.global.jwt.JWTUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
@Component
@Qualifier("LoginSuccessHandler")// AuthenticationSuccessHandler 구현체가 여러가지 있는데 중복 안되게 빈 이름 지정
public class LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtService jwtService;
    private final JWTUtil jwtUtil;

    public LoginSuccessHandler(JwtService jwtService,JWTUtil jwtUtil) {
        this.jwtService = jwtService;
        this.jwtUtil = jwtUtil;
    }
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        // username, role
        String username =  authentication.getName();
        String role = authentication.getAuthorities().iterator().next().getAuthority();

        // JWT(Access/Refresh) 발급
        String accessToken = jwtUtil.createJwt(username, role, true);
        String refreshToken = jwtUtil.createJwt(username, role, false);

        ResponseCookie cookie = ResponseCookie.from("refreshToken", refreshToken)
                .httpOnly(true)
                .secure(true) // HTTPS에서만 전송
                .path("/") // 전체 경로에서 사용 가능
                .maxAge(7 * 24 * 60 * 60) // 7일
                .build();

        // 발급한 Refresh DB 테이블 저장
        jwtService.addRefresh(username, refreshToken);

        // 응답
        response.setHeader("Authorization", "Bearer " + accessToken);
    }
}
package com.wordtree.global.handler;

import com.wordtree.global.jwt.JwtService;
import com.wordtree.global.jwt.JWTUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Qualifier;
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
        String userid =  authentication.getName();
        String role = authentication.getAuthorities().iterator().next().getAuthority();

        // JWT(Access/Refresh) 발급
        String accessToken = jwtUtil.createJwt(userid, role, true);
        String refreshToken = jwtUtil.createJwt(userid, role, false);

        // 발급한 Refresh DB 테이블 저장
        jwtService.addRefresh(userid, refreshToken);

        // 응답
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        String json = String.format("{\"accessToken\":\"%s\", \"refreshToken\":\"%s\"}", accessToken, refreshToken);
        response.getWriter().write(json);
        response.getWriter().flush();
    }
}

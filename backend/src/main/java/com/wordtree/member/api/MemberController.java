package com.wordtree.member.api;

import com.wordtree.global.ResultResponse;
import com.wordtree.member.dto.MemberRequest;
import com.wordtree.member.dto.MemberResponse;
import com.wordtree.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;

import static com.wordtree.global.ResultCode.*;

@RestController
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;

    // 자체 로그인 유저 존재 확인
    @PostMapping(value = "/user/exist", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Boolean> existUserApi(
            @Validated(MemberRequest.existGroup.class) @RequestBody MemberRequest dto
    ) {
        return ResponseEntity.ok(memberService.existUser(dto));
    }
    //회원 가입
    @PostMapping(value = "/user", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Long>> joinApi(
            @Validated(MemberRequest.addGroup.class) @RequestBody MemberRequest dto
    ) {
        Long id = memberService.createMember(dto);
        Map<String, Long> responseBody = Collections.singletonMap("userId", id);
        return ResponseEntity.status(201).body(responseBody);
    }
    //유저 정보
    @GetMapping("/get")
    public ResponseEntity<Object> getMember(@RequestParam String userId){
        MemberResponse memberResponse = memberService.getMember(userId);
        return ResponseEntity.ok(ResultResponse.of(GET_MEMBER,memberResponse));
    }
    // 유저 정보
    @GetMapping(value = "/user", consumes = MediaType.APPLICATION_JSON_VALUE)
    public MemberResponse userMe() {
        return memberService.selectMember();
    }

    // 유저 수정 (자체 로그인 유저만)
    @PutMapping(value = "/user", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Long> updateUser(
            @Validated(MemberRequest.updateGroup.class) @RequestBody MemberRequest dto
    ) throws AccessDeniedException {
        return ResponseEntity.status(200).body(memberService.editMember(dto));
    }

    // 유저 제거 (자체/소셜)
    @DeleteMapping(value = "/user", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Boolean> deleteUser(
            @Validated(MemberRequest.deleteGroup.class) @RequestBody MemberRequest dto
    ) throws AccessDeniedException {

        memberService.deleteMember(dto);
        return ResponseEntity.status(200).body(true);
    }


}
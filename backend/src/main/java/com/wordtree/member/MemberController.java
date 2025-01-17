package com.wordtree.member;

import com.wordtree.global.ResultResponse;
import com.wordtree.member.dto.MemberRequest;
import com.wordtree.member.dto.MemberResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.wordtree.global.ResultCode.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {
    private final MemberService memberService;
    @PostMapping("/register")
    public ResponseEntity<Object> createMember(@RequestBody MemberRequest memberRequest){
        memberService.createMember(memberRequest);
        return ResponseEntity.ok(ResultResponse.of(SIGNUP_SUCCESS,true));
    }
    @PatchMapping("/update")
    public ResponseEntity<Object> updateMember(@RequestBody MemberRequest memberRequest){
        memberService.editMember(memberRequest);
        return ResponseEntity.ok(ResultResponse.of(UPDATE_SUCCESS,true));
    }
    @GetMapping("/get")
    public ResponseEntity<Object> getMember(@RequestParam String userId){
        MemberResponse memberResponse = memberService.getMember(userId);
        return ResponseEntity.ok(ResultResponse.of(GET_MEMBER,memberResponse));
    }
    @DeleteMapping("/delete")
    public ResponseEntity<Object> deleteMember(@RequestParam String userId,@RequestParam String password){
        memberService.delete(userId,password);
        return ResponseEntity.ok(ResultResponse.of(DELETE_SUCCESS,true));
    }



}

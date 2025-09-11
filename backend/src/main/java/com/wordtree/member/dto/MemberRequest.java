package com.wordtree.member.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MemberRequest {

    //그룹
    public interface existGroup {} // 회원 가입시 userid 존재 확인
    public interface addGroup {} // 회원 가입시
    public interface passwordGroup {} // 비밀번호 변경시
    public interface updateGroup {} // 회원 수정시
    public interface deleteGroup {} // 회원 삭제시


    @NotBlank(groups = {existGroup.class, addGroup.class, updateGroup.class, deleteGroup.class}) @Size(min = 4)
    private String username;
    @NotBlank(groups = {addGroup.class, passwordGroup.class}) @Size(min = 4)
    private String password;
    @NotBlank(groups = {addGroup.class, updateGroup.class})
    private String nickname;
    @Email(groups = {addGroup.class, updateGroup.class})
    private String email;

    public MemberRequest(String username, String password, String nickname) {
        this.username = username;
        this.password = password;
        this.nickname = nickname;
    }
}

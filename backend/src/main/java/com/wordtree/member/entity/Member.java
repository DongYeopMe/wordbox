package com.wordtree.member.entity;

import com.wordtree.member.dto.MemberRequest;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name="members")
public class Member {

    @Id
    @Column(name = "member_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name="member_username",nullable = false)
    private String username;
    @Column(name="member_password", nullable = false)
    private String password;
    @Column(name="member_nickname", nullable = false)
    private String nickname;
    @Column(name="member_role", nullable = false)
    private String roles;
    @Column(name = "is_lock")
    private Boolean isLock;
    @Column(name = "is_Social")
    private Boolean isSocial;
    @Column(name = "member_email")
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(name = "social_provider_type")
    private SocialProviderType socialProviderType;

    @Enumerated(EnumType.STRING)
    @Column(name = "role_type", nullable = false)
    private UserRoleType roleType;

    @CreatedDate
    @Column(name = "created_date", updatable = false)
    private LocalDateTime createdDate;

    @LastModifiedDate
    @Column(name = "updated_date")
    private LocalDateTime updatedDate;

    @Builder
    public static Member requestConvert(MemberRequest memberRequest){
        return Member.builder()
                .username(memberRequest.getUsername())
                .password(memberRequest.getPassword())
                .nickname(memberRequest.getNickname())
                .isLock(false)
                .isSocial(false)
                .roleType(UserRoleType.USER)
                .email(memberRequest.getEmail())
                .build();
    }
    public void updatePassword(String password){
        this.password = password;
    }
    public void updateUser(MemberRequest memberRequest){
        this.email = memberRequest.getEmail();
        this.username = memberRequest.getUsername();
    }
}

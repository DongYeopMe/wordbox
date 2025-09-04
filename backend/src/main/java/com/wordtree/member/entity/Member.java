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
@NoArgsConstructor
@Table(name="members")
public class Member {

    @Id
    @Column(name = "member_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name="member_userid",nullable = false)
    private String userid;
    @Column(name="member_password", nullable = false)
    private String password;
    @Column(name="member_username", nullable = false)
    private String username;
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
    public Member(String userid, String password, String username, Boolean isLock, Boolean isSocial, String email, UserRoleType roleType) {
        this.userid = userid;
        this.password = password;
        this.username = username;
        this.isLock = isLock;
        this.isSocial = isSocial;
        this.email = email;
        this.roleType = roleType;
    }

    @Builder
    public static Member requestConvert(MemberRequest memberRequest){
        return Member.builder()
                .userid(memberRequest.getUserid())
                .username(memberRequest.getUsername())
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

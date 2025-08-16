package com.wordtree.member;

import com.wordtree.card.Card;
import com.wordtree.member.dto.MemberRequest;
import com.wordtree.word.Word;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name="members")
public class Member {

    @Id
    @Column(name = "member_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name="member_userid",nullable = false,unique = true)
    private String userid;
    @Column(name="member_password", nullable = false)
    private String password;
    @Column(name="member_username", nullable = false,unique = true)
    private String username;
    @Enumerated(EnumType.STRING)
    private Role role;

    @Builder
    public Member(String userid, String password, String username, Role role) {
        this.userid = userid;
        this.password = password;
        this.username = username;
        this.role = role;
    }

    public static Member requestConvert(MemberRequest memberRequest){
        return Member.builder()
                .userid(memberRequest.getUserid())
                .password(memberRequest.getPassword())
                .username(memberRequest.getUsername())
                .build();
    }
    @Getter
    @RequiredArgsConstructor
    public enum Role {
        USER("USER", "일반유저"),
        ADMIN("ADMIN", "관리자");

        private final String key;
        private final String title;
    }
}

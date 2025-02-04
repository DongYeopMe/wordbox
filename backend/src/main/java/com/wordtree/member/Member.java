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
    @Column(name="member_userid",nullable = false)
    private String userid;
    @Column(name="member_password", nullable = false)
    private String password;
    @Column(name="member_username", nullable = false)
    private String username;
    @Column(name="member_role", nullable = false)
    private String roles;

    @Builder
    public Member(String userid, String password, String username) {
        this.userid = userid;
        this.password = password;
        this.username = username;
    }

    public static Member requestConvert(MemberRequest memberRequest){
        return Member.builder()
                .userid(memberRequest.getUserid())
                .password(memberRequest.getPassword())
                .username(memberRequest.getUsername())
                .build();
    }
}

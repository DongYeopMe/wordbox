package com.wordtree.member;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.wordtree.card.Card;
import com.wordtree.directory.Directory;
import com.wordtree.member.dto.MemberRequest;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

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

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Card> cards = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Directory> directoryList = new ArrayList<>();

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

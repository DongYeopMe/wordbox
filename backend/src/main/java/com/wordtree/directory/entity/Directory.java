package com.wordtree.directory.entity;

import com.wordtree.card.entity.Card;
import com.wordtree.member.Member;
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
public class Directory {

    @Id
    @Column(name = "directory_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="directory_title",nullable = false)
    private String title;

    @Column(name="directory_count",nullable = false)
    private int count;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "directory", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DirectoryCard> directoryCards = new ArrayList<>();

    @Builder
    public Directory(String title, List<DirectoryCard> directoryCards,int count) {
        this.title = title;
        this.directoryCards = directoryCards;
        this.count = count;
    }

    public static Directory createConvert(String title){
        return Directory.builder()
                .title(title)
                .directoryCards(new ArrayList<>())
                .count(0)
                .build();
    }

}

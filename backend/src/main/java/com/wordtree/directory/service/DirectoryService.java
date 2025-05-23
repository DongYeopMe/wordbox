package com.wordtree.directory.service;

import com.wordtree.card.dto.UserCardResponse;
import com.wordtree.card.entity.Card;
import com.wordtree.card.repository.CardRepository;
import com.wordtree.directory.entity.Directory;
import com.wordtree.directory.repository.DirectoryRepository;
import com.wordtree.directory.dto.DirectoryResponse;
import com.wordtree.directory.dto.UserDirectoryResponseDto;
import com.wordtree.global.jwt.CustomUserDetailsService;
import com.wordtree.member.Member;
import com.wordtree.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor

public class DirectoryService {
    private final DirectoryRepository directoryRepository;
    private final CardRepository cardRepository;
    private final CustomUserDetailsService customUserDetailsService;
    private final MemberRepository memberRepository;




    @Transactional
    public void createDirectory(String title) {
        Directory directory = Directory.createConvert(title);
        directory.setMember(customUserDetailsService.getAuthenticatedEntity());
        directoryRepository.save(directory);
    }
    @Transactional
    public void updateDirectoryTitle(Long id,String title){
        Directory findDirectory = directoryRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("폴더 엔티티를 못찾았습니다."));
        findDirectory.setTitle(title);
    }
    @Transactional
    public void deleteDirectory(Long id){
        directoryRepository.deleteById(id);
        cardRepository.deleteByDirectoryId(id);
    }
    public DirectoryResponse getDirectory(Long id){
        Directory findDirectory = directoryRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("폴더 엔티티를 못찾았습니다."));
        List<Card> cardlist = findDirectory.getCards();
        Member member = customUserDetailsService.getAuthenticatedEntity();
        List<UserCardResponse> cardResponses =
                cardlist.stream()
                        .map(card-> new UserCardResponse
                                (card.getId(),card.getTitle(),card.getCount(),card.getOwner().getUsername(),member.getId().equals(card.getOwner().getId()))).collect(Collectors.toList());

        return new DirectoryResponse(findDirectory.getTitle(), findDirectory.getCount(), cardResponses);
    }
    public List<UserDirectoryResponseDto> getDIRList(String username) {
        Member findmember = memberRepository.findByUserName(username);
        List<Directory> list =  directoryRepository.findByMember(findmember);

        List<UserDirectoryResponseDto> response = list.stream()
                .map(UserDirectoryResponseDto::fromEntity)
                .collect(Collectors.toList());
        return response;
    }
}

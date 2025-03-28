package com.wordtree.directory;

import com.wordtree.card.entity.Card;
import com.wordtree.card.repository.CardRepository;
import com.wordtree.global.jwt.CustomUserDetailsService;
import com.wordtree.member.Member;
import com.wordtree.member.MemberRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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
        directory.setOwner(customUserDetailsService.getAuthenticatedEntity());
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
        DirectoryResponse response = new DirectoryResponse(findDirectory.getTitle(), findDirectory.getCount(),findDirectory.getCards());
        return response;
    }
    public List<Directory> getDIRList(String username) {
        Member findmember = memberRepository.findByUserName(username);
        List<Directory> response =  directoryRepository.findByMember(findmember);
        return response;
    }
}

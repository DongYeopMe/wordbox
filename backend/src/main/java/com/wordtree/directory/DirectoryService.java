package com.wordtree.directory;

import com.wordtree.card.CardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor

public class DirectoryService {
    private final DireotoryRepository direotoryRepository;
    private final CardRepository cardRepository;



    @Transactional
    public void createFolder(String title) {
        //Member member;
        Directory directory = Directory.createConvert(title);
        direotoryRepository.save(directory);
    }
    @Transactional
    public void updateFolderTitle(Long id,String title){
        Directory findDirectory =direotoryRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("폴더 엔티티를 못찾았습니다."));
        findDirectory.setTitle(title);
    }
    @Transactional
    public void deleteFolder(Long id){
        direotoryRepository.deleteById(id);
        //card 삭제 로직
    }
    public Directory getFolder(Long id){
        Directory findDirectory =direotoryRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("폴더 엔티티를 못찾았습니다."));
        return findDirectory;
    }
    public List<Directory> getFolderList(){
        List<Directory> DirectoryList = direotoryRepository.findAll();
        return DirectoryList;
    }
}

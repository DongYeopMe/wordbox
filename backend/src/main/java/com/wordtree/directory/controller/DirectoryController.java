package com.wordtree.directory.controller;

import com.wordtree.directory.dto.DirectoryResponse;
import com.wordtree.directory.dto.UserDirectoryResponseDto;
import com.wordtree.directory.service.DirectoryService;
import com.wordtree.global.ResultResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.wordtree.global.ResultCode.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/directory")
public class DirectoryController {

    private final DirectoryService directoryService;

    @PostMapping("/create")
    public ResponseEntity<Object> createDirectory(@RequestParam String title){
        directoryService.createDirectory(title);
        return ResponseEntity.ok(ResultResponse.of(DIR_ADD_SUCCESS,true));
    }

    @PatchMapping("/update")
    public ResponseEntity<Object> updateDirectory(@RequestParam Long id,@RequestParam String title){
        directoryService.updateDirectoryTitle(id,title);
        return ResponseEntity.ok(ResultResponse.of(DIR_EDIT_SUCCESS,true));
    }
    @GetMapping("/get")
    public ResponseEntity<Object> getDirectory(@RequestParam Long id){
        DirectoryResponse response =directoryService.getDirectory(id);
        return ResponseEntity.ok(ResultResponse.of(DIR_GET_SUCCESS,response));
    }
    @DeleteMapping("/delete")
    public ResponseEntity<Object> deleteDirectory(@RequestParam Long id){
        directoryService.deleteDirectory(id);
        return ResponseEntity.ok(ResultResponse.of(DIR_DELETE_SUCCESS,true));
    }
    @GetMapping("/getUserList")
    public ResponseEntity<Object> getDirectoryList(@RequestParam String username){
        List<UserDirectoryResponseDto> response  =directoryService.getDIRList(username);
        return ResponseEntity.ok(ResultResponse.of(DIR_GET_SUCCESS,response));
    }
}

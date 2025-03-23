package com.wordtree.directory;

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
        directoryService.createFolder(title);
        return ResponseEntity.ok(ResultResponse.of(DIR_ADD_SUCCESS,true));
    }

    @PatchMapping("/update")
    public ResponseEntity<Object> updateDirectory(@RequestParam Long id,@RequestParam String title){
        directoryService.updateFolderTitle(id,title);
        return ResponseEntity.ok(ResultResponse.of(DIR_EDIT_SUCCESS,true));
    }
    @GetMapping("/get")
    public ResponseEntity<Object> getFolder(@RequestParam Long id){
        Directory response =directoryService.getFolder(id);
        return ResponseEntity.ok(ResultResponse.of(DIR_GET_SUCCESS,response));
    }
    @DeleteMapping("/delete")
    public ResponseEntity<Object> deleteFolder(@RequestParam Long id){
        directoryService.deleteFolder(id);
        return ResponseEntity.ok(ResultResponse.of(DIR_DELETE_SUCCESS,true));
    }
    @GetMapping("/getList")
    public ResponseEntity<Object> getFolderList(){
        List<Directory> response  =directoryService.getFolderList();
        return ResponseEntity.ok(ResultResponse.of(DIR_GET_SUCCESS,response));
    }
}

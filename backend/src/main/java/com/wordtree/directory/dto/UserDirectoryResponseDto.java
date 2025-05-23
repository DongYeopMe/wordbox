package com.wordtree.directory.dto;

import com.wordtree.directory.entity.Directory;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class UserDirectoryResponseDto {

    private Long id;
    private String title;
    private int count;

    public static UserDirectoryResponseDto fromEntity(Directory directory) {
        return new UserDirectoryResponseDto(
                directory.getId(),
                directory.getTitle(),
                directory.getCount()
        );
    }
}

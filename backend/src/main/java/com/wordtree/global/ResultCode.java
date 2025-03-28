package com.wordtree.global;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ResultCode {
    //멤버
    SIGNUP_SUCCESS(200,"회원가입을 성공했습니다."),
    UPDATE_SUCCESS(200,"수정 완료했습니다."),
    DELETE_SUCCESS(200,"회원 삭제 완료"),
    GET_MEMBER(200,"유저 가져오기 완료됐습니다."),

    CARD_ADD_SUCCESS(200, "카드 추가 성공했습니다."),
    CARD_EDIT_SUCCESS(200, "카드 수정 완료"),
    CARD_GET_SUCCESS(200, "카드 가져오기 완료"),
    CARDLIST_GET_SUCCESS(200, "카드 리스트 가져오기 완료"),
    CARD_DELETE_SUCCESS(200, "카드 삭제하기 완료"),

    WORD_ADD_SUCCESS(200, "단어 추가 성공했습니다."),
    WORD_EDIT_SUCCESS(200, "단어 수정 완료"),
    WORD_GET_SUCCESS(200, "단어 가져오기 완료"),
    WORDLIST_GET_SUCCESS(200, "단어 리스트 가져오기 완료"),
    WORDTITLES_GET_SUCCESS(200, "단어 카드이름들 가져오기 완료"),
    WORDLIST_UPDATE_SUCCESS(200, "단어리스트 업데이트 완료"),

    DIR_ADD_SUCCESS(200, "폴더 추가 성공했습니다."),
    DIR_EDIT_SUCCESS(200, "폴더 수정 완료"),
    DIR_GET_SUCCESS(200, "폴더 가져오기 완료"),
    DIR_DELETE_SUCCESS(200, "폴더 삭제하기 완료"),
    DIRLIST_GET_SUCCESS(200, "폴더 리스트 가져오기 완료"),

    ;





    private int code;
    private String memssage;
}

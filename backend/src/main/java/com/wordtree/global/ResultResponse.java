package com.wordtree.global;

import com.wordtree.global.ResultCode;
import lombok.Getter;

@Getter
public class ResultResponse {
    private  int status;
    private String message;
    private Object data;

    public ResultResponse(ResultCode resultCode, Object data) {
        this.status = resultCode.getCode();
        this.message = resultCode.getMemssage();
        this.data = data;
    }

    public static ResultResponse of(ResultCode resultCode, Object data){
        return new ResultResponse(resultCode, data);
    }
    public static ResultResponse of(ResultCode resultCode){
        return new ResultResponse(resultCode, null);
    }

}
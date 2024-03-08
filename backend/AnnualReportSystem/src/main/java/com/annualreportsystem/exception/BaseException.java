package com.annualreportsystem.exception;

public class BaseException extends RuntimeException{
    private Integer code;
    private String msg;

    public BaseException(Integer code,String msg){
        super(msg);
        this.code = code;
        this.msg = msg;
    }

    public Integer getCode() {
        return code;
    }

    public String getMsg() {
        return msg;
    }
}

package com.annualreportsystem.pojo;

public enum ResultEnum {
    SUCCESS(600, "请求成功"),
    NEW_TOKEN(601, "有新的令牌生成"),
    NOT_LOGIN(602, "登陆状态错误"),
    USERNAME_DUPLICATE(603, "用户名被占用"),
    USER_NOT_EXIST(604, "该用户不存在"),
    WRONG_PASSWORD(605, "密码错误"),
    UNKNOWN_ERROR(610, "未知错误");
    private Integer code;
    private String msg;

    ResultEnum(Integer code, String msg) {
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

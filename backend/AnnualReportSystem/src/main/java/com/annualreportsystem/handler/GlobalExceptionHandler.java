package com.annualreportsystem.handler;

import com.annualreportsystem.exception.BaseException;
import com.annualreportsystem.pojo.Result;
import com.annualreportsystem.pojo.ResultEnum;
import com.annualreportsystem.utils.JwtUtils;
import com.annualreportsystem.utils.ResultUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {
    @Autowired
    private ResultUtils resultUtils;

    @ExceptionHandler(BaseException.class)
    public Result handelException(BaseException e) {
        e.printStackTrace();
        if (e.getCode() == null)
            return resultUtils.error(ResultEnum.UNKNOWN_ERROR);
        return resultUtils.error(e.getCode(), e.getMsg());
    }
}

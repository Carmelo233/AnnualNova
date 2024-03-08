package com.annualreportsystem.utils;

import com.annualreportsystem.pojo.Result;
import com.annualreportsystem.pojo.ResultEnum;
import com.annualreportsystem.pojo.Token;
import com.annualreportsystem.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ResultUtils {
    @Autowired
    private JwtUtils jwtUtils;
    /**成功且带数据**/
    public Result success(Object object){
        Result result = new Result();
        result.setCode(ResultEnum.SUCCESS.getCode());
        result.setMsg(ResultEnum.SUCCESS.getMsg());
        result.setData(object);
        return result;
    }
    /**成功但不带数据**/
    public Result success(){
        return success(null);
    }
    /**失败**/
    public Result error(ResultEnum resultEnum){
        Result result = new Result();
        result.setCode(resultEnum.getCode());
        result.setMsg(resultEnum.getMsg());
        result.setData(null);
        return result;
    }

    public Result error(Integer code,String msg){
        Result result = new Result();
        result.setCode(code);
        result.setMsg(msg);
        result.setData(null);
        return result;
    }
    public Result newToken(User user){
        Result result = new Result();
        result.setCode(ResultEnum.NEW_TOKEN.getCode());
        result.setMsg(ResultEnum.NEW_TOKEN.getMsg());
        //生成新的token
        Integer uid = user.getUid();
        String username = user.getUsername();
        String accessToken = jwtUtils.generateAccessToken(uid,username);
        String refreshToken = jwtUtils.generateRefreshToken(uid,username);
        Token token = new Token(accessToken,refreshToken);
        result.setData(token);
        return result;
    }
}

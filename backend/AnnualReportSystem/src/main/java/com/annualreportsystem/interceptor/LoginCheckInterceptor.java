package com.annualreportsystem.interceptor;

import com.alibaba.fastjson.JSONObject;
import com.annualreportsystem.exception.BaseException;
import com.annualreportsystem.pojo.Result;
import com.annualreportsystem.pojo.ResultEnum;
import com.annualreportsystem.pojo.User;
import com.annualreportsystem.utils.JwtUtils;
import com.annualreportsystem.utils.ResultUtils;
import com.annualreportsystem.utils.SessionUtils;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.DecodedJWT;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Slf4j
@Component
public class LoginCheckInterceptor implements HandlerInterceptor {
    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private ResultUtils resultUtils;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        log.info("进入拦截器");
        Result responseResult = new Result<>();//定义要返回给前端的result
        ResultEnum resultEnum;//定义result的枚举类型
        //从header获取双token
        String accessToken = request.getHeader("Authorization");
        String refreshToken = request.getHeader("refresh-token");
        log.info("从请求头中获取的登录令牌：{}", accessToken);
        log.info("从请求头中获取的刷新令牌：{}", refreshToken);
        //判断两个令牌是否存在，如果不存在，返回错误结果（未登录）
        try {
            if ((!StringUtils.hasLength(accessToken)) || (!StringUtils.hasLength(refreshToken))) {
                log.info("Token不存在");
                throw new BaseException(ResultEnum.NOT_LOGIN.getCode(), ResultEnum.NOT_LOGIN.getMsg());
            }
            //尝试解析token
            DecodedJWT jwt = jwtUtils.parseAccessToken(accessToken);
            Integer uid = jwt.getClaim("uid").asInt();
            String username = jwt.getClaim("username").asString();
            User user = new User(uid, username, null);
            SessionUtils.set(user);//在threadLocal中存储user信息
            return true;
        } catch (TokenExpiredException e) {//accessToken过期，进入判断refreshToken
            //尝试解析refreshToken，没有错误才有可能无需用户登录，遇到所有的异常，都要重新登录
            try {
                DecodedJWT jwt = jwtUtils.parseRefreshToken(refreshToken);
                Integer uid = jwt.getClaim("uid").asInt();
                String username = jwt.getClaim("username").asString();
                User user = new User(uid, username, null);
                responseResult = resultUtils.newToken(user);
                SessionUtils.set(user);//在threadLocal中存储user信息
            } catch (Exception ex) {
                resultEnum = ResultEnum.NOT_LOGIN;
                responseResult = resultUtils.error(resultEnum);
            }
        } catch (Exception e) {
            resultEnum = ResultEnum.NOT_LOGIN;
            responseResult = resultUtils.error(resultEnum);
        }
        //把Result对象转换为JSON格式字符串 (fastjson是阿里巴巴提供的用于实现对象和json的转换工具类)
        String json = JSONObject.toJSONString(responseResult);
        response.setContentType("application/json;charset=utf8");//设置响应头（告知浏览器：响应的数据类型为json、响应的数据编码表为utf-8）
        //响应
        response.getWriter().write(json);
        return false;//不放行
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response,
                                Object handler, Exception ex) {
        SessionUtils.remove();
        log.info("afterCompletion");
    }
}

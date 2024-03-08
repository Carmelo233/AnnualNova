package com.annualreportsystem.service.impl;

import com.annualreportsystem.exception.BaseException;
import com.annualreportsystem.mapper.UserMapper;
import com.annualreportsystem.pojo.ResultEnum;
import com.annualreportsystem.pojo.Token;
import com.annualreportsystem.pojo.User;
import com.annualreportsystem.service.UserService;
import com.annualreportsystem.utils.JwtUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    UserMapper userMapper;
    @Autowired
    private BCryptPasswordEncoder encoder;
    @Autowired
    private JwtUtils jwtUtils;

    @Override
    public Token register(String username, String password) {
        log.info("判断用户名是否被占用");
        //先判断用户名是否被占用
        if (userMapper.selectUser(username) != null)
            throw new BaseException(ResultEnum.USERNAME_DUPLICATE.getCode(), ResultEnum.USERNAME_DUPLICATE.getMsg());
        //对密码进行加密
        String encryptedPassword = encoder.encode(password);
        User user = new User(null, username, encryptedPassword);
        userMapper.insertUser(user);
        //生成两个token返回
        String accessToken = jwtUtils.generateAccessToken(user.getUid(), username);
        String refreshToken = jwtUtils.generateRefreshToken(user.getUid(), username);
        //插入到数据库中
        Token token = new Token(accessToken, refreshToken);
        return token;
    }

    @Override
    public Token login(String username, String password) {
        log.info("判断用户是否存在");
        User user = userMapper.selectUser(username);
        //查找用户名未找到该用户
        if (user == null) {
            //抛出用户不存在异常
            throw new BaseException(ResultEnum.USER_NOT_EXIST.getCode(), ResultEnum.USER_NOT_EXIST.getMsg());
        } else if (encoder.matches(password, user.getUserPassword()) == false) {
            //密码不匹配，抛出用户密码错误异常
            throw new BaseException(ResultEnum.WRONG_PASSWORD.getCode(), ResultEnum.WRONG_PASSWORD.getMsg());
        } else {
            //生成两个token返回
            String accessToken = jwtUtils.generateAccessToken(user.getUid(), username);
            String refreshToken = jwtUtils.generateRefreshToken(user.getUid(), username);
            Token token = new Token(accessToken, refreshToken);
            return token;
        }
    }

    @Override
    public void logout(Token token) {
    }
}

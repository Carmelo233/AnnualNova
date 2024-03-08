package com.annualreportsystem.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Slf4j
@Component
public class JwtUtils {
    @Value("${arg.access-secret}")
    private String ACCESS_SECRET;
    @Value("${arg.refresh-secret}")
    private String REFRESH_SECRET;
    @Value("${arg.access-expire-time}")
    private int ACCESS_EXPIRE;
    @Value("${arg.refresh-expire-time}")
    private int REFRESH_EXPIRE;


    //生成AccessToken
    public String generateAccessToken(Integer uid, String username) {
        String accessToken = JWT.create()
                .withClaim("uid", uid)//自定义信息（有效载荷）
                .withClaim("username", username)
                .withExpiresAt(new Date(System.currentTimeMillis() + ACCESS_EXPIRE))//过期时间
                .sign(Algorithm.HMAC512(ACCESS_SECRET));//签名算法（头部）
        return accessToken;
    }

    //生成RefreshToken
    public String generateRefreshToken(Integer uid, String username) {
        String RefreshToken = JWT.create()
                .withClaim("uid", uid)//自定义信息（有效载荷）
                .withClaim("username", username)
                .withExpiresAt(new Date(System.currentTimeMillis() + REFRESH_EXPIRE))//过期时间
                .sign(Algorithm.HMAC512(REFRESH_SECRET));//签名算法（头部）
        return RefreshToken;
    }

    //解析AccessToken
    public DecodedJWT parseAccessToken(String accessToken) {
        log.info("解析AccessToken");
        log.info(ACCESS_SECRET);
        JWTVerifier jwtVerifier = JWT.require(Algorithm.HMAC512(ACCESS_SECRET)).build();
        log.info("生成jwtVerifier");
        DecodedJWT decodedJWT = jwtVerifier.verify(accessToken);
        log.info("解析完毕");
        return decodedJWT;
    }

    public DecodedJWT parseRefreshToken(String token) {
        JWTVerifier jwtVerifier = JWT.require(Algorithm.HMAC512(REFRESH_SECRET)).build();
        DecodedJWT decodedJWT = jwtVerifier.verify(token);
        return decodedJWT;
    }
}

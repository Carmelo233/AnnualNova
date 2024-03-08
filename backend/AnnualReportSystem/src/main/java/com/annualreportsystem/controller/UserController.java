package com.annualreportsystem.controller;

import com.annualreportsystem.pojo.Result;
import com.annualreportsystem.pojo.Token;
import com.annualreportsystem.service.UserService;
import com.annualreportsystem.utils.JwtUtils;
import com.annualreportsystem.utils.ResultUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/annual")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private ResultUtils resultUtils;
    @PostMapping("/register")
    public Result register(@RequestParam(value = "username")String username,
                           @RequestParam(value = "password")String password){
        Token token = userService.register(username,password);
        return resultUtils.success(token);
    }
    @PostMapping("/login")
    public Result login(@RequestParam(value = "username")String username,
                        @RequestParam(value = "password")String password){
        Token token = userService.login(username,password);
        return resultUtils.success(token);
    }
    @PostMapping("/logout")
    public Result logout(){
        return resultUtils.success();
    }
}

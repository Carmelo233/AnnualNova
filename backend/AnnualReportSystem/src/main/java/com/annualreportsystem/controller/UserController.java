package com.annualreportsystem.controller;

import com.annualreportsystem.model.Result;
import com.annualreportsystem.model.Token;
import com.annualreportsystem.service.UserService;
import com.annualreportsystem.utils.ResultUtils;
import com.github.xiaoymin.knife4j.annotations.ApiOperationSupport;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/annual")
@Api(tags = "用户管理")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private ResultUtils resultUtils;

    @ApiOperation("用户注册，注册成功后返回 token 用于后续请求")
    @ApiOperationSupport(author = "骆莹莺")
    @PostMapping("/register")
    public Result register(@RequestParam(value = "username") String username,
                           @RequestParam(value = "password") String password) {
        Token token = userService.register(username, password);
        return resultUtils.success(token);
    }

    @ApiOperation("用户登录，登录成功后返回 token 用于后续请求")
    @ApiOperationSupport(author = "骆莹莺")
    @PostMapping("/login")
    public Result login(@RequestParam(value = "username") String username,
                        @RequestParam(value = "password") String password) {
        Token token = userService.login(username, password);
        return resultUtils.success(token);
    }

    @PostMapping("test")
    public Result test() {
        return resultUtils.success();
    }
}

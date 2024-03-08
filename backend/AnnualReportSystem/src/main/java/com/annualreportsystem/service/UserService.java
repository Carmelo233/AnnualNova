package com.annualreportsystem.service;

import com.annualreportsystem.pojo.Token;

public interface UserService {
    Token register(String username, String password);

    Token login(String username, String password);

    void logout(Token token);
}

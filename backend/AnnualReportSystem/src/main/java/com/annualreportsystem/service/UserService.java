package com.annualreportsystem.service;

import com.annualreportsystem.pojo.Token;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

public interface UserService {
    Token register(String username, String password);
    Token login(String username, String password);
    void logout(Token token);
}

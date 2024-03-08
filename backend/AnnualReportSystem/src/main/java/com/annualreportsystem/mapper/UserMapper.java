package com.annualreportsystem.mapper;

import com.annualreportsystem.pojo.User;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Component;
@Mapper
public interface UserMapper {
    void insertUser(User user);//插入用户记录，自动插入该用户的uid
    User selectUser(String username);//根据用户名查找用户
    int selectMaxUid();
}

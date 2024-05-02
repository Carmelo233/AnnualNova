package com.annualreportsystem.utils;

import com.annualreportsystem.model.User;

public class SessionUtils {
    private static ThreadLocal<User> userSessionVOThreadLocal = new ThreadLocal<>();

    public static void set(User user) {
        userSessionVOThreadLocal.set(user);
    }

    public static User get() {
        return userSessionVOThreadLocal.get();
    }

    public static void remove() {
        userSessionVOThreadLocal.remove();
    }
}

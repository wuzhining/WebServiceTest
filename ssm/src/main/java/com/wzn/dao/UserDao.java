package com.wzn.dao;

import com.wzn.domain.User;

public interface UserDao {
    public abstract User findByUsername(String username);
}

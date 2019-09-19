package com.pragmatio.mojaepbih.service;

import com.pragmatio.mojaepbih.model.entity.User;

import java.util.Optional;

public interface UserService extends IService<User> {
    Boolean existsByEmail(String email);

    User findByEmail(String email);
}

package com.pragmatio.mojaepbih.service;

import com.pragmatio.mojaepbih.model.entity.User;

import java.util.Optional;

public interface UserService extends IService<User> {
    Boolean existsByEmail(String email);

    Boolean existsByUsername(String username);

    Optional<User> findByEmail(String email);

    User findByUsername(String username);
}

package com.pragmatio.mojaepbih.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.pragmatio.mojaepbih.model.entity.User;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    User findByUsername(String username);

    Boolean existsByEmail(String email);

    Boolean existsByUsername(String username);
}

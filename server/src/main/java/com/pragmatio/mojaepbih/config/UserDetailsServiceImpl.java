package com.pragmatio.mojaepbih.config;

import com.pragmatio.mojaepbih.model.entity.User;
import com.pragmatio.mojaepbih.service.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    UserServiceImpl userServiceImpl;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {
        User user = userServiceImpl.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException("User Not Found with -> email : " + email);
        }
        return UserPrinciple.build(user);
    }
}
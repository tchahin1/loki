package com.pragmatio.mojaepbih.service.impl;

import com.pragmatio.mojaepbih.model.UserEditDataDto;
import com.pragmatio.mojaepbih.model.entity.User;
import com.pragmatio.mojaepbih.repository.UserRepository;
import com.pragmatio.mojaepbih.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public User findById(Long id) {
        return userRepository.getOne(id);
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public Boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public void deleteAll() {
        userRepository.deleteAll();
    }

    @Override
    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    public ResponseEntity findUserData(String email) {
        User user = findByEmail(email);
        if(user == null) return ResponseEntity.status(400).body("User does not exist!");
        return new ResponseEntity(user, HttpStatus.OK);
    }

    public ResponseEntity editUser(UserEditDataDto userEditDataDto) {
        User user = findById(userEditDataDto.getId());
        if(user != null) {
            if(!user.getEmail().equals(userEditDataDto.getEmail())) user.setEmail(userEditDataDto.getEmail());
            if(!user.getName().equals(userEditDataDto.getName())) user.setName(userEditDataDto.getName());
            if(!user.getSurname().equals(userEditDataDto.getSurname())) user.setSurname(userEditDataDto.getSurname());
            if(!userEditDataDto.getPassword().equals("")) user.setPassword(userEditDataDto.getPassword());
            save(user);
            return ResponseEntity.ok().body("Successfully edited user!");
        }
        return ResponseEntity.status(400).body("User does not exist!");
    }

}

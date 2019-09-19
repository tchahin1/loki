package com.pragmatio.mojaepbih.service.impl;

import com.pragmatio.mojaepbih.model.UserEditDataDto;
import com.pragmatio.mojaepbih.model.entity.User;
import com.pragmatio.mojaepbih.repository.UserRepository;
import com.pragmatio.mojaepbih.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
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

    public Response findUserData(String email) {
        User user = findByEmail(email);
        if(user == null) return Response.status(400).entity("User does not exist!").build();
        return Response.ok(user, MediaType.APPLICATION_JSON).build();
    }

    public Response editUser(UserEditDataDto userEditDataDto) {
        User user = findById(userEditDataDto.getId());
        if(user != null) {
            user.setEmail(userEditDataDto.getEmail());
             user.setName(userEditDataDto.getName());
             user.setSurname(userEditDataDto.getSurname());
            user.setPassword(userEditDataDto.getPassword());
            save(user);
            return Response.ok().entity("Successfully edited user!").build();
        }
        return Response.status(400).entity("User does not exist!").build();
    }

}

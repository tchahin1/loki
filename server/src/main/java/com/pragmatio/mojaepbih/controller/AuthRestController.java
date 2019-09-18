package com.pragmatio.mojaepbih.controller;

import javax.validation.Valid;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.pragmatio.mojaepbih.config.JwtProvider;
import com.pragmatio.mojaepbih.config.JwtResponse;
import com.pragmatio.mojaepbih.service.impl.UserServiceImpl;
import com.pragmatio.mojaepbih.model.LoginData;
import com.pragmatio.mojaepbih.model.SignUpData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pragmatio.mojaepbih.model.entity.User;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/")
public class AuthRestController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserServiceImpl userServiceImpl;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtProvider jwtProvider;

    @PostMapping("/login")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginData loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtProvider.generateJwtToken(authentication);
        return ResponseEntity.ok(new JwtResponse(jwt));
    }

    @PostMapping("/register")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public ResponseEntity<String> registerUser(@Valid @RequestBody SignUpData signUpRequest) {
        if(userServiceImpl.existsByEmail(signUpRequest.getEmail())) {
            return new ResponseEntity<String>("Fail -> Email is already taken!",
                    HttpStatus.BAD_REQUEST);
        }
        if(userServiceImpl.existsByUsername(signUpRequest.getUsername())) {
            return new ResponseEntity<String>("Fail -> Username is already taken!",
                    HttpStatus.BAD_REQUEST);
        }
        User user = new User(signUpRequest.getEmail(), signUpRequest.getUsername(), encoder.encode(signUpRequest.getPassword()));
        userServiceImpl.save(user);
        return ResponseEntity.ok("Succesfully registered!");
    }
}

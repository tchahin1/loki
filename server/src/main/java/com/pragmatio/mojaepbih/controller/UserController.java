package com.pragmatio.mojaepbih.controller;

import com.pragmatio.mojaepbih.model.UserEditDataDto;
import com.pragmatio.mojaepbih.service.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/")
public class UserController {
    @Autowired
    UserServiceImpl userService;

    @GetMapping("/data")
    @Produces(MediaType.APPLICATION_JSON)
    public ResponseEntity findDataForUser(@QueryParam("email") String email) {
        return this.userService.findUserData(email);
    }

    @PostMapping("/edit")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public ResponseEntity editUsersData(@RequestBody UserEditDataDto userEditDataDto) {
        return this.userService.editUser(userEditDataDto);
    }
}

package com.pragmatio.mojaepbih.resource.rest;
import com.pragmatio.mojaepbih.hibernate.entity.User;
import com.pragmatio.mojaepbih.hibernate.services.UserService;
import com.pragmatio.mojaepbih.resource.model.SignUpData;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/")
public class SignUpService {
    UserService userService = new UserService();

    @POST
    @Path(value = "register")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response authorizationService(SignUpData signUpData) {
       return this.saveUser(signUpData);
    }

    Response saveUser(SignUpData signUpData) {
        User newUser = new User(signUpData.getUsername(), signUpData.getPassword(), signUpData.getEmail());
        User alreadyInDb = this.userService.findByUsername(signUpData.getUsername());
        if(alreadyInDb == null) {
            this.userService.persist(newUser);
            return Response.ok().entity("Successfully registered").build();
        } else {
            return Response.serverError().entity("Already exists!").build();
        }
    }
}

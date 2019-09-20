package com.pragmatio.mojaepbih.resource.rest;

import com.pragmatio.mojaepbih.hibernate.entity.User;
import com.pragmatio.mojaepbih.hibernate.services.UserService;
import com.pragmatio.mojaepbih.resource.dtos.UserEditDataDto;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/user")
public class UserController {
    UserService userService = new UserService();

    @GET
    @Path(value = "/data")
    @Produces(MediaType.APPLICATION_JSON)
    public Response findDataForUser(@QueryParam("username") String username) {
        return this.findUserData(username);
    }

    Response findUserData(String username) {
        User user = userService.findByUsername(username);
        if(user == null) return Response.status(400).entity("User does not exist!").build();
        return Response.ok(user, MediaType.APPLICATION_JSON).build();
    }

    @POST
    @Path(value = "/edit")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response editUsersData(UserEditDataDto userEditDataDto) {
        return this.editUser(userEditDataDto);
    }

    Response editUser(UserEditDataDto userEditDataDto) {
        User user = userService.findById(userEditDataDto.getId());
        if(user != null) {
            user.setEmail(userEditDataDto.getEmail());
            // user.setName(userEditDataDto.getName());
            // user.setSurname(userEditDataDto.getSurname());
            user.setPassword(userEditDataDto.getPassword());
            userService.update(user);
            return Response.ok().entity("Successfully edited user!").build();
        }
        return Response.status(400).entity("User does not exist!").build();
    }
}

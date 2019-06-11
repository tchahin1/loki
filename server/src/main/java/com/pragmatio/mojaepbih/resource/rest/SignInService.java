package com.pragmatio.mojaepbih.resource.rest;
import com.pragmatio.mojaepbih.helper.JwtTokenHelper;
import com.pragmatio.mojaepbih.hibernate.entity.User;
import com.pragmatio.mojaepbih.hibernate.services.UserService;
import com.pragmatio.mojaepbih.resource.model.UserCredentials;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/")
public class SignInService {
    UserService userService = new UserService();

    @POST
    @Path(value = "auth")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response authorizationService(UserCredentials credentials) {
        String username = credentials.getUsername();
        String password = credentials.getPassword();
        if (username.isEmpty())
            return Response.serverError().entity("username field cannot be empty!").build();
        if (password.isEmpty())
            return Response.serverError().entity("password field cannot be empty!").build();
        if(!this.isDataCorrect(username, password))
            return Response.serverError().entity("Incorrect credentials!").build();
        String privateKey = JwtTokenHelper.getInstance().generatePrivateKey(username, password);
        return Response.ok(privateKey, MediaType.APPLICATION_JSON).build();
    }

    private boolean isDataCorrect(String username, String password) {
        User alreadyInDb = this.userService.findByUsername(username);
        return alreadyInDb != null && alreadyInDb.getPassword().equals(password);
    }
}

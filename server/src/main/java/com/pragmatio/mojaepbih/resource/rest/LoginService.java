package com.pragmatio.mojaepbih.resource.rest;

import com.pragmatio.mojaepbih.annotation.JwtCustomToken;
import com.pragmatio.mojaepbih.helper.JwtTokenHelper;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/")
public class LoginService {

    @POST
    @Path(value = "login")
    @JwtCustomToken
    @Produces(MediaType.APPLICATION_JSON)
    public Response authorizationService(@QueryParam("username") String userName, @QueryParam("password") String password) {
        if (userName.isEmpty())
            return Response.serverError().entity("username field cannot be empty!").build();
        if (password.isEmpty())
            return Response.serverError().entity("password field cannot be empty!").build();
        String privateKey = JwtTokenHelper.getInstance().generatePrivateKey(userName, password);
        return Response.ok(privateKey, MediaType.APPLICATION_JSON).build();
    }
}

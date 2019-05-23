package com.pragmatio.mojaepbih.resource.filter;

import com.pragmatio.mojaepbih.helper.JwtTokenHelper;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;

import javax.annotation.Priority;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.Provider;
import javax.ws.rs.Priorities;

@Provider
@Priority(Priorities.AUTHENTICATION)
public class JwtTokenFilter implements ContainerRequestFilter {
    private static final String AUTHORIZATION_SERVICE_PATH = "/login";
    private static final String PRIVATE_KEY = "privateKey";
    private JwtTokenHelper jwtTokenHelper = JwtTokenHelper.getInstance();

    @Override
    public void filter(ContainerRequestContext request) {
        String path = request.getUriInfo().getPath();
        if(path.equals(AUTHORIZATION_SERVICE_PATH))
            return;
        String privateKeyHeaderValue = request.getHeaderString(PRIVATE_KEY);
        if (privateKeyHeaderValue == null || privateKeyHeaderValue.isEmpty())
            throw new WebApplicationException(getUnAuthorizeResponse(PRIVATE_KEY + " is missing in header"));
        try {
            jwtTokenHelper.claimKey(privateKeyHeaderValue);
        } catch(Exception e) {
            if (e instanceof ExpiredJwtException) {
                throw new WebApplicationException(getUnAuthorizeResponse(PRIVATE_KEY + " is expired"));
            } else if (e instanceof MalformedJwtException) {
                throw new WebApplicationException(getUnAuthorizeResponse(PRIVATE_KEY + " is not correct"));
            }
        }
    }
    private Response getUnAuthorizeResponse(String message) {
        return Response.ok(message
        ).status(Response.Status.UNAUTHORIZED)
                .type(MediaType.APPLICATION_JSON)
                .build();
    }
}

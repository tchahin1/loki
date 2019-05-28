package com.pragmatio.mojaepbih.resource.rest;


import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;

@Path("/hello")
public class HelloWorld {
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String getMessage(@HeaderParam("privateKey") String privateKey) {
        return "Hello world!";
    }

    public String getMessage() {
        return "Hello world!";
    }
}

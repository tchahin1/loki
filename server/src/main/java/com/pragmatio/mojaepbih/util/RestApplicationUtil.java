package com.pragmatio.mojaepbih.util;

import org.glassfish.jersey.server.ResourceConfig;

import javax.ws.rs.ApplicationPath;

@ApplicationPath("/")
public class RestApplicationUtil extends ResourceConfig {

    public RestApplicationUtil() {
        packages("com.pragmatio.mojaepbih");
    }
}

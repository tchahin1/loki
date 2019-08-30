package com.pragmatio.mojaepbih.resource.rest;

import com.pragmatio.mojaepbih.hibernate.entity.Failure;
import com.pragmatio.mojaepbih.hibernate.entity.User;
import com.pragmatio.mojaepbih.hibernate.services.FailureService;
import com.pragmatio.mojaepbih.hibernate.services.UserService;
import com.pragmatio.mojaepbih.resource.dtos.FailureDto;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/failure")
public class FailureController {
    FailureService measurementService = new FailureService();
    UserService userService = new UserService();

    @POST
    @Path(value = "/save")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addFailureReport(FailureDto failureDto) {
        return this.saveFailureReport(failureDto);
    }

    Response saveFailureReport(FailureDto failureDto) {
        User user = userService.findByUsername(failureDto.getUsername());
        if(user == null) return Response.status(400).entity("User does not exist!").build();
        Failure newFailure = new Failure(failureDto.getDescription(), failureDto.getPhoto(),
                user);
        this.measurementService.persist(newFailure);
        return Response.ok().entity("Successfully added new failure report!").build();
    }
}

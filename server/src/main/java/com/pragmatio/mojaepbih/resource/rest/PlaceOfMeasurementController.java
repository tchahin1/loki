package com.pragmatio.mojaepbih.resource.rest;

import com.pragmatio.mojaepbih.hibernate.entity.PlaceOfMeasurement;
import com.pragmatio.mojaepbih.hibernate.entity.User;
import com.pragmatio.mojaepbih.hibernate.services.PlaceOfMeasurementService;
import com.pragmatio.mojaepbih.hibernate.services.UserService;
import com.pragmatio.mojaepbih.resource.dtos.PlaceOfMeasurementDto;
import org.hibernate.annotations.Parameter;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/place")
public class PlaceOfMeasurementController {
    PlaceOfMeasurementService placeOfMeasurementService = new PlaceOfMeasurementService();
    UserService userService = new UserService();

    @POST
    @Path(value = "/save")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addMeasurementPlace(PlaceOfMeasurementDto placeOfMeasurementDto) {
        return this.saveMeasurementPlace(placeOfMeasurementDto);
    }

    Response saveMeasurementPlace(PlaceOfMeasurementDto placeOfMeasurementDto) {
        PlaceOfMeasurement alreadyInDb = this.placeOfMeasurementService.findByReference(placeOfMeasurementDto.getReference());
        if(alreadyInDb == null) {
            User user = userService.findByUsername(placeOfMeasurementDto.getUsername());
            if(user == null) return Response.status(400).entity("User does not exist!").build();
            PlaceOfMeasurement newPlaceOfMeasurement = new PlaceOfMeasurement(placeOfMeasurementDto.getName(),
                    placeOfMeasurementDto.getReference(), placeOfMeasurementDto.getPlaceNumber(),
                    user);
            this.placeOfMeasurementService.persist(newPlaceOfMeasurement);
            return Response.ok().entity("Successfully added new measurement place!").build();
        } else {
            return Response.status(400).entity("Place already exists!").build();
        }
    }

    @GET
    @Path(value = "/all")
    @Produces(MediaType.APPLICATION_JSON)
    public Response findAllMeasurementPlacesForUser(@QueryParam("username") String username) {
        return this.findMeasurementPlacesForUser(username);
    }

    Response findMeasurementPlacesForUser(String username) {
        User user = userService.findByUsername(username);
        if(user == null) return Response.status(400).entity("User does not exist!").build();
        List<PlaceOfMeasurement> places = placeOfMeasurementService.findAllByUserId(user.getId());
        return Response.ok(places, MediaType.APPLICATION_JSON).build();
    }
}

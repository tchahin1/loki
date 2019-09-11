package com.pragmatio.mojaepbih.resource.rest;

import com.pragmatio.mojaepbih.hibernate.entity.Measurement;
import com.pragmatio.mojaepbih.hibernate.entity.PlaceOfMeasurement;
import com.pragmatio.mojaepbih.hibernate.entity.User;
import com.pragmatio.mojaepbih.hibernate.services.MeasurementService;
import com.pragmatio.mojaepbih.hibernate.services.PlaceOfMeasurementService;
import com.pragmatio.mojaepbih.hibernate.services.UserService;
import com.pragmatio.mojaepbih.resource.controllerServices.ImageService;
import com.pragmatio.mojaepbih.resource.dtos.MeasurementDto;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/measurement")
public class MeasurementController {
    MeasurementService measurementService = new MeasurementService();
    UserService userService = new UserService();
    PlaceOfMeasurementService placeOfMeasurementService = new PlaceOfMeasurementService();
    ImageService imageService = new ImageService();

    @POST
    @Path(value = "/save")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addMeasurementPlace(MeasurementDto measurementDto) {
        return this.saveMeasurement(measurementDto);
    }

    private Response saveMeasurement(MeasurementDto measurementDto) {
        Measurement alreadyInDb = this.measurementService.findByPlaceId(measurementDto.getMeasurementPlace());
        if(alreadyInDb == null) {
            User user = userService.findByUsername(measurementDto.getUsername());
            if(user == null) return Response.status(400).entity("User does not exist!").build();
            PlaceOfMeasurement placeOfMeasurement = placeOfMeasurementService.findById(measurementDto.getMeasurementPlace());
            if(placeOfMeasurement == null) return Response.status(400).entity("Measurement place does not exist!").build();
            String image = this.imageService.printDataToImage(measurementDto.getPhoto(), measurementDto.getLargeTariff(), measurementDto.getSmallTariff());
            Measurement newMeasurement = new Measurement(measurementDto.getLargeTariff(),
                    measurementDto.getSmallTariff(), measurementDto.getNote(),
                    image, user, placeOfMeasurement, measurementDto.getLat(), measurementDto.getLon());
            this.measurementService.persist(newMeasurement);
            return Response.ok().entity("Successfully added new measurement for this place!").build();
        } else {
            return Response.status(400).entity("Measurement for this place already exists!").build();
        }
    }
}

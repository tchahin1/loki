package com.pragmatio.mojaepbih.resource.rest;

import com.pragmatio.mojaepbih.hibernate.entity.Measurement;
import com.pragmatio.mojaepbih.hibernate.entity.PlaceOfMeasurement;
import com.pragmatio.mojaepbih.hibernate.entity.User;
import com.pragmatio.mojaepbih.hibernate.services.MeasurementService;
import com.pragmatio.mojaepbih.hibernate.services.PlaceOfMeasurementService;
import com.pragmatio.mojaepbih.hibernate.services.UserService;
import com.pragmatio.mojaepbih.resource.controllerServices.MeasurementControllerServices;
import com.pragmatio.mojaepbih.resource.dtos.MeasurementDto;

import javax.imageio.ImageIO;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.util.Base64;
import java.util.zip.DeflaterOutputStream;
import java.util.zip.InflaterOutputStream;

@Path("/measurement")
public class MeasurementController {
    MeasurementService measurementService = new MeasurementService();
    UserService userService = new UserService();
    PlaceOfMeasurementService placeOfMeasurementService = new PlaceOfMeasurementService();
    MeasurementControllerServices measurementControllerServices = new MeasurementControllerServices(measurementService, userService, placeOfMeasurementService);

    @POST
    @Path(value = "/save")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addMeasurementPlace(MeasurementDto measurementDto) {
        return this.measurementControllerServices.saveMeasurement(measurementDto);
    }
}

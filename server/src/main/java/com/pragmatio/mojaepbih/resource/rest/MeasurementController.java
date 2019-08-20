package com.pragmatio.mojaepbih.resource.rest;

import com.pragmatio.mojaepbih.hibernate.services.MeasurementService;

import javax.ws.rs.Path;

@Path("/measurement")
public class MeasurementController {
    MeasurementService measurementService = new MeasurementService();
}

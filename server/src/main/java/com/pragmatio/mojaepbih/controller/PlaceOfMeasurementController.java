package com.pragmatio.mojaepbih.controller;

import com.pragmatio.mojaepbih.model.PlaceOfMeasurementDto;
import com.pragmatio.mojaepbih.service.impl.PlaceOfMeasurementServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/place")
public class PlaceOfMeasurementController {

    @Autowired
    private PlaceOfMeasurementServiceImpl placeOfMeasurementService;

    @PostMapping("/save")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response savePlace(@RequestBody PlaceOfMeasurementDto placeDto) {
        return this.placeOfMeasurementService.saveMeasurementPlace(placeDto);
    }

    @GetMapping("/all")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response findAllMeasurementPlacesForUser(@QueryParam("email") String email) {
        return this.placeOfMeasurementService.findMeasurementPlacesForUser(email);
    }
}

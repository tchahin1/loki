package com.pragmatio.mojaepbih.controller;

import com.pragmatio.mojaepbih.model.MeasurementDto;
import com.pragmatio.mojaepbih.service.impl.MeasurementServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/measurement")
public class MeasurementController {

    @Autowired
    private MeasurementServiceImpl measurementService;

    @PostMapping("/save")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public ResponseEntity addMeasurementPlace(@RequestBody MeasurementDto measurementDto) {
        return this.measurementService.saveMeasurement(measurementDto);
    }
}

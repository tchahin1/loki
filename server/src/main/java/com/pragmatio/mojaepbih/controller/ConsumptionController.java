package com.pragmatio.mojaepbih.controller;

import com.pragmatio.mojaepbih.model.ConsumptionDto;
import com.pragmatio.mojaepbih.model.GetConsumptionDto;
import com.pragmatio.mojaepbih.service.impl.ConsumptionServiceImpl;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/consumption")
public class ConsumptionController {
    @Autowired
    private ConsumptionServiceImpl consumptionService;

    @GetMapping("/all_by_year")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public ResponseEntity findAllConsumptionsForUser(@QueryParam("email") String email, @QueryParam("year") Integer year, @QueryParam("placeId") Long placeId) throws JSONException {
        GetConsumptionDto getConsumptionDto = new GetConsumptionDto(email, placeId, year);
        return this.consumptionService.findConsumptionsByUserAndYearAndPlaceId(getConsumptionDto);
    }

    @PostMapping("/save")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public ResponseEntity addMeasurementPlace(@RequestBody ConsumptionDto consumptionDto) {
        return this.consumptionService.saveConsumption(consumptionDto);
    }
}

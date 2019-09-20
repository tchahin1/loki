package com.pragmatio.mojaepbih.controller;

import com.pragmatio.mojaepbih.model.FailureDto;
import com.pragmatio.mojaepbih.service.impl.FailureServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/failure")
public class FailureController {

    @Autowired
    private FailureServiceImpl failureService;

    @PostMapping("/save")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public ResponseEntity saveFailureReport(@RequestBody FailureDto failureDto) {
        return this.failureService.saveFailureReport(failureDto);
    }
}

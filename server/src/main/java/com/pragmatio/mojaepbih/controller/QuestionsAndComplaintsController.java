package com.pragmatio.mojaepbih.controller;

import com.pragmatio.mojaepbih.model.QacDto;
import com.pragmatio.mojaepbih.service.impl.QuestionsAndComplaintsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/qac")
public class QuestionsAndComplaintsController {

    @Autowired
    private QuestionsAndComplaintsServiceImpl questionsAndComplaintsService;

    @PostMapping("/save")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response saveQaC(@RequestBody QacDto qacDto) {
        return this.questionsAndComplaintsService.saveQaC(qacDto);
    }
}

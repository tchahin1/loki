package com.pragmatio.mojaepbih.resource.rest;

import com.pragmatio.mojaepbih.hibernate.entity.*;
import com.pragmatio.mojaepbih.hibernate.services.*;
import com.pragmatio.mojaepbih.resource.controllerServices.ImageService;
import com.pragmatio.mojaepbih.resource.dtos.MeasurementDto;
import com.pragmatio.mojaepbih.resource.dtos.QacDto;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/qac")
public class QuestionsAndComplaintsController {
    QuestionsAndComplaintsService questionsAndComplaintsService = new QuestionsAndComplaintsService();
    SubsidiaryService subsidiaryService = new SubsidiaryService();
    CustomerService customerService = new CustomerService();

    @POST
    @Path(value = "/save")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addRequest(QacDto qacDto) {
        return this.saveRequest(qacDto);
    }

    private Response saveRequest(QacDto qacDto) {
        Customer customer = customerService.findById(qacDto.getCustomerType()+1);
        if(customer == null) return Response.status(400).entity("Customer type does not exist!").build();
        Subsidiary subsidiary = subsidiaryService.findById(qacDto.getSubsidiaryId()+1);
        if(subsidiary == null) return Response.status(400).entity("Subsidiary does not exist!").build();
        QuestionsAndComplaints newQuestionsAndComplaints = new QuestionsAndComplaints(qacDto.getName(), qacDto.getLegalName(),
                qacDto.getSurname(), qacDto.getAddress(), qacDto.getCode(), qacDto.getEmail(), qacDto.getPhone(),
                qacDto.getRequest(), customer, subsidiary);
        try{
            this.questionsAndComplaintsService.persist(newQuestionsAndComplaints);
            return Response.ok().entity("Request saved successfully!").build();
        }
        catch (Exception exception) {
            return Response.status(500).entity("Something went wrong!").build();
        }
    }
}


package com.pragmatio.mojaepbih.service.impl;

import com.pragmatio.mojaepbih.model.QacDto;
import com.pragmatio.mojaepbih.model.entity.Customer;
import com.pragmatio.mojaepbih.model.entity.QuestionsAndComplaints;
import com.pragmatio.mojaepbih.model.entity.Subsidiary;
import com.pragmatio.mojaepbih.repository.QuestionsAndComplaintsRepository;
import com.pragmatio.mojaepbih.service.QuestionsAndComplaintsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.ws.rs.core.Response;
import java.util.List;

@Service
public class QuestionsAndComplaintsServiceImpl implements QuestionsAndComplaintsService {

    private final QuestionsAndComplaintsRepository questionsAndComplaintsRepository;

    @Autowired
    private CustomerServiceImpl customerService;

    @Autowired
    private SubsidiaryServiceImpl subsidiaryService;

    @Autowired
    public QuestionsAndComplaintsServiceImpl(QuestionsAndComplaintsRepository questionsAndComplaintsRepository) {
        this.questionsAndComplaintsRepository = questionsAndComplaintsRepository;
    }

    @Override
    public QuestionsAndComplaints save(QuestionsAndComplaints questionsAndComplaints) {
        return questionsAndComplaintsRepository.save(questionsAndComplaints);
    }

    @Override
    public QuestionsAndComplaints findById(Long id) {
        return questionsAndComplaintsRepository.getOne(id);
    }

    @Override
    public List<QuestionsAndComplaints> findAll() {
        return questionsAndComplaintsRepository.findAll();
    }

    @Override
    public void deleteAll() {
        questionsAndComplaintsRepository.deleteAll();
    }

    @Override
    public void deleteById(Long id) {
        questionsAndComplaintsRepository.deleteById(id);
    }

    @Override
    public Response saveQaC(QacDto qacDto) {
        Customer customer = customerService.findById(qacDto.getCustomerType() + 1L);
        if (customer == null) return Response.status(400).entity("Customer type does not exist!").build();
        Subsidiary subsidiary = subsidiaryService.findById(qacDto.getSubsidiaryId() + 1L);
        if (subsidiary == null) return Response.status(400).entity("Subsidiary does not exist!").build();
        QuestionsAndComplaints newQuestionsAndComplaints = new QuestionsAndComplaints(qacDto.getName(), qacDto.getLegalName(),
                qacDto.getSurname(), qacDto.getAddress(), qacDto.getCode(), qacDto.getEmail(), qacDto.getPhone(),
                qacDto.getRequest(), customer, subsidiary);
        try {
            save(newQuestionsAndComplaints);
            return Response.ok().entity("Request saved successfully!").build();
        } catch (Exception exception) {
            return Response.status(500).entity("Something went wrong!").build();
        }
    }

}

package com.pragmatio.mojaepbih.service.impl;

import com.pragmatio.mojaepbih.model.QacDto;
import com.pragmatio.mojaepbih.model.entity.Customer;
import com.pragmatio.mojaepbih.model.entity.QuestionsAndComplaints;
import com.pragmatio.mojaepbih.model.entity.Subsidiary;
import com.pragmatio.mojaepbih.repository.QuestionsAndComplaintsRepository;
import com.pragmatio.mojaepbih.service.QuestionsAndComplaintsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity saveQaC(QacDto qacDto) {
        Customer customer = customerService.findById(qacDto.getCustomerType() + 1L);
        if (customer == null) return ResponseEntity.status(400).body("Customer type does not exist!");
        Subsidiary subsidiary = subsidiaryService.findById(qacDto.getSubsidiaryId() + 1L);
        if (subsidiary == null) return ResponseEntity.status(400).body("Subsidiary does not exist!");
        QuestionsAndComplaints newQuestionsAndComplaints = new QuestionsAndComplaints(qacDto.getName(), qacDto.getLegalName(),
                qacDto.getSurname(), qacDto.getAddress(), qacDto.getCode(), qacDto.getEmail(), qacDto.getPhone(),
                qacDto.getRequest(), customer, subsidiary);
        try {
            save(newQuestionsAndComplaints);
            return ResponseEntity.ok().body("Request saved successfully!");
        } catch (Exception exception) {
            return ResponseEntity.status(500).body("Something went wrong!");
        }
    }

}

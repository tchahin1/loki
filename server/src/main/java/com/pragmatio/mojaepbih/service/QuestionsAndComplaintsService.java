package com.pragmatio.mojaepbih.service;

import com.pragmatio.mojaepbih.model.QacDto;
import com.pragmatio.mojaepbih.model.entity.QuestionsAndComplaints;
import org.springframework.http.ResponseEntity;

import javax.ws.rs.core.Response;

public interface QuestionsAndComplaintsService extends IService<QuestionsAndComplaints> {
    ResponseEntity saveQaC(QacDto qacDto);
}

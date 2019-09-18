package com.pragmatio.mojaepbih.service;

import com.pragmatio.mojaepbih.model.FailureDto;
import com.pragmatio.mojaepbih.model.entity.Failure;

import javax.ws.rs.core.Response;

public interface FailureService extends IService<Failure> {
    Response saveFailureReport(FailureDto failureDto);
}

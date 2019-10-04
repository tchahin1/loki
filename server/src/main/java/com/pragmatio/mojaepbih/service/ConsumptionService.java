package com.pragmatio.mojaepbih.service;

import com.pragmatio.mojaepbih.model.GetConsumptionDto;
import com.pragmatio.mojaepbih.model.entity.Consumption;
import org.json.JSONException;
import org.springframework.http.ResponseEntity;

public interface ConsumptionService extends IService<Consumption> {
    ResponseEntity findConsumptionsByUserAndYearAndPlaceId(GetConsumptionDto getConsumptionDto) throws JSONException;
}

package com.pragmatio.mojaepbih.service;

import com.pragmatio.mojaepbih.model.MeasurementDto;
import com.pragmatio.mojaepbih.model.entity.Measurement;

import javax.ws.rs.core.Response;

public interface MeasurementService extends IService<Measurement> {
    Measurement findByPlaceId(Long placeId);
    Response saveMeasurement(MeasurementDto measurementDto);
}

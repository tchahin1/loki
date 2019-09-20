package com.pragmatio.mojaepbih.service;

import com.pragmatio.mojaepbih.model.PlaceOfMeasurementDto;
import com.pragmatio.mojaepbih.model.entity.PlaceOfMeasurement;
import org.springframework.http.ResponseEntity;

import javax.ws.rs.core.Response;
import java.util.List;

public interface PlaceOfMeasurementService extends IService<PlaceOfMeasurement> {
    PlaceOfMeasurement findByReference(String reference);

    List<PlaceOfMeasurement> findAllByUserId(Long userId);

    ResponseEntity saveMeasurementPlace(PlaceOfMeasurementDto placeOfMeasurementDto);

    ResponseEntity findMeasurementPlacesForUser(String email);
}

package com.pragmatio.mojaepbih.repository;

import com.pragmatio.mojaepbih.model.entity.PlaceOfMeasurement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaceOfMeasurementRepository extends JpaRepository<PlaceOfMeasurement, Long> {
    PlaceOfMeasurement findByReference(String reference);

    List<PlaceOfMeasurement> findAllByUserId(Long userId);

}

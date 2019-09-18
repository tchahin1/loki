package com.pragmatio.mojaepbih.repository;

import com.pragmatio.mojaepbih.model.entity.Measurement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface MeasurementRepository extends JpaRepository<Measurement, Long> {

    @Query("select m from Measurement m where m.placeOfMeasurement.id = ?1")
    Measurement findByPlaceId(Long id);

}

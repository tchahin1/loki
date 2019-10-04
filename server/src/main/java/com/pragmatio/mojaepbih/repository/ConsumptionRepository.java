package com.pragmatio.mojaepbih.repository;

import com.pragmatio.mojaepbih.model.entity.Consumption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ConsumptionRepository extends JpaRepository<Consumption, Long> {
    @Query("FROM Consumption WHERE user.id = ?1 AND year = ?2 AND placeOfMeasurement.id = ?3")
    List<Consumption> findAllByUserIdAndYearAndPlaceId(Long userId, Integer year, Long placeId);

    @Query("SELECT DISTINCT year FROM Consumption WHERE user.id = ?1")
    List<Integer> findAllYearsForUser(Long userId);
}

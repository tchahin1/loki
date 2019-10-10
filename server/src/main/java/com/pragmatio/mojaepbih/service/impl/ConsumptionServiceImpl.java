package com.pragmatio.mojaepbih.service.impl;

import com.pragmatio.mojaepbih.model.ConsumptionResponseDto;
import com.pragmatio.mojaepbih.model.GetConsumptionDto;
import com.pragmatio.mojaepbih.model.entity.Consumption;
import com.pragmatio.mojaepbih.model.entity.Measurement;
import com.pragmatio.mojaepbih.model.entity.PlaceOfMeasurement;
import com.pragmatio.mojaepbih.model.entity.User;
import com.pragmatio.mojaepbih.repository.ConsumptionRepository;
import com.pragmatio.mojaepbih.service.ConsumptionService;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;

@Service
public class ConsumptionServiceImpl implements ConsumptionService {
    private final ConsumptionRepository consumptionRepository;

    @Autowired
    UserServiceImpl userService;

    @Autowired
    PlaceOfMeasurementServiceImpl placeOfMeasurementService;

    @Autowired
    public ConsumptionServiceImpl(ConsumptionRepository consumptionRepository) {
        this.consumptionRepository = consumptionRepository;
    }

    @Override
    public Consumption save(Consumption consumption) {
        return consumptionRepository.save(consumption);
    }

    @Override
    public Consumption findById(Long id) {
        return consumptionRepository.getOne(id);
    }

    @Override
    public List<Consumption> findAll() {
        return consumptionRepository.findAll();
    }

    @Override
    public void deleteAll() {
        consumptionRepository.deleteAll();
    }

    @Override
    public void deleteById(Long id) {
        consumptionRepository.deleteById(id);
    }

    @Override
    public ResponseEntity findConsumptionsByUserAndYearAndPlaceId(GetConsumptionDto getConsumptionDto) throws JSONException {
        User user = userService.findByEmail(getConsumptionDto.getEmail());
        if(user.getId()!=null){
            PlaceOfMeasurement placeOfMeasurement = placeOfMeasurementService.findById(getConsumptionDto.getPlaceId());
            if(placeOfMeasurement.getId()!=null && getConsumptionDto.getYear()!=null){
                List<Consumption> consumptions = consumptionRepository.findAllByUserIdAndYearAndPlaceId(
                        user.getId(), getConsumptionDto.getYear(), placeOfMeasurement.getId()
                );
                List<Integer> years = consumptionRepository.findAllYearsForUserAndPlaceOfMeasurement(user.getId(),
                        placeOfMeasurement.getId());
                years.sort(Comparator.reverseOrder());
                ConsumptionResponseDto response = new ConsumptionResponseDto(
                        consumptions, years);
                return new ResponseEntity<>(response, HttpStatus.OK);
            }
            else return ResponseEntity.status(400).body("Something went wrong!");
        }
        return ResponseEntity.status(400).body("User does not exist!");
    }

    public void saveMeasuredConsumption(LocalDate now, Measurement measurement) {
        Integer day = now.getDayOfMonth();
        Integer month = now.getMonthValue();
        Integer year = now.getYear();
        Consumption consumption = new Consumption(year, month, day, measurement.getHighTariff(),
                measurement.getLowTariff(), measurement.getUser(), measurement.getPlaceOfMeasurement());
        this.save(consumption);
    }
}

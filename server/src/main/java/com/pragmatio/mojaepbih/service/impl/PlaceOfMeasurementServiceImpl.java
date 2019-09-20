package com.pragmatio.mojaepbih.service.impl;

import com.pragmatio.mojaepbih.model.PlaceOfMeasurementDto;
import com.pragmatio.mojaepbih.model.entity.PlaceOfMeasurement;
import com.pragmatio.mojaepbih.model.entity.User;
import com.pragmatio.mojaepbih.repository.PlaceOfMeasurementRepository;
import com.pragmatio.mojaepbih.repository.UserRepository;
import com.pragmatio.mojaepbih.service.PlaceOfMeasurementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Service
public class PlaceOfMeasurementServiceImpl implements PlaceOfMeasurementService {

    private final PlaceOfMeasurementRepository placeOfMeasurementRepository;
    private final UserRepository userRepository;

    @Autowired
    public PlaceOfMeasurementServiceImpl(PlaceOfMeasurementRepository placeOfMeasurementRepository,
                                         UserRepository userRepository) {
        this.placeOfMeasurementRepository = placeOfMeasurementRepository;
        this.userRepository = userRepository;
    }

    @Override
    public PlaceOfMeasurement save(PlaceOfMeasurement placeOfMeasurement) {
        return placeOfMeasurementRepository.save(placeOfMeasurement);
    }

    @Override
    public PlaceOfMeasurement findById(Long id) {
        return placeOfMeasurementRepository.getOne(id);
    }

    @Override
    public List<PlaceOfMeasurement> findAll() {
        return placeOfMeasurementRepository.findAll();
    }

    @Override
    public void deleteAll() {
        placeOfMeasurementRepository.deleteAll();
    }

    @Override
    public void deleteById(Long id) {
        placeOfMeasurementRepository.deleteById(id);
    }

    @Override
    public PlaceOfMeasurement findByReference(String reference) {
        return placeOfMeasurementRepository.findByReference(reference);
    }

    @Override
    public List<PlaceOfMeasurement> findAllByUserId(Long userId) {
        return placeOfMeasurementRepository.findAllByUserId(userId);
    }

    @Override
    public ResponseEntity saveMeasurementPlace(PlaceOfMeasurementDto placeOfMeasurementDto) {
        PlaceOfMeasurement alreadyInDb = findByReference(placeOfMeasurementDto.getReference());
        if (alreadyInDb == null) {
            User user = userRepository.findByEmail(placeOfMeasurementDto.getEmail());
            if (user == null) return ResponseEntity.status(400).body("User does not exist!");
            PlaceOfMeasurement newPlaceOfMeasurement = new PlaceOfMeasurement(placeOfMeasurementDto.getName(),
                    placeOfMeasurementDto.getReference(), placeOfMeasurementDto.getPlaceNumber(),
                    user);
            save(newPlaceOfMeasurement);
            return ResponseEntity.ok().body("Successfully added new measurement place!");
        } else {
            return ResponseEntity.status(400).body("Place already exists!");
        }
    }

    @Override
    public ResponseEntity findMeasurementPlacesForUser(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) return ResponseEntity.status(400).body("User does not exist!");
        List<PlaceOfMeasurement> places = findAllByUserId(user.getId());
        return new ResponseEntity(places, HttpStatus.OK);
    }
}

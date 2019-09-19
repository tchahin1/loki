package com.pragmatio.mojaepbih.service.impl;

import com.pragmatio.mojaepbih.model.MeasurementDto;
import com.pragmatio.mojaepbih.model.entity.Measurement;
import com.pragmatio.mojaepbih.model.entity.PlaceOfMeasurement;
import com.pragmatio.mojaepbih.model.entity.User;
import com.pragmatio.mojaepbih.repository.MeasurementRepository;
import com.pragmatio.mojaepbih.repository.UserRepository;
import com.pragmatio.mojaepbih.service.MeasurementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.ws.rs.core.Response;
import java.util.List;

@Service
public class MeasurementServiceImpl implements MeasurementService {

    private final MeasurementRepository measurementRepository;
    private final UserRepository userRepository;

    @Autowired
    private ImageServiceImpl imageService;

    @Autowired
    private PlaceOfMeasurementServiceImpl placeOfMeasurementService;

    @Autowired
    public MeasurementServiceImpl(MeasurementRepository measurementRepository,
                                  UserRepository userRepository) {
        this.measurementRepository = measurementRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Measurement save(Measurement measurement) {
        return measurementRepository.save(measurement);
    }

    @Override
    public Measurement findById(Long id) {
        return measurementRepository.getOne(id);
    }

    @Override
    public List<Measurement> findAll() {
        return measurementRepository.findAll();
    }

    @Override
    public void deleteAll() {
        measurementRepository.deleteAll();
    }

    @Override
    public void deleteById(Long id) {
        measurementRepository.deleteById(id);
    }

    @Override
    public Measurement findByPlaceId(Long placeId) {
        return measurementRepository.findByPlaceId(placeId);
    }

    @Override
    public Response saveMeasurement(MeasurementDto measurementDto) {
        Measurement alreadyInDb = this.measurementRepository.findByPlaceId(measurementDto.getMeasurementPlace());
        if (alreadyInDb == null) {
            User user = userRepository.findByEmail(measurementDto.getUsername());
            if (user == null) return Response.status(400).entity("User does not exist!").build();
            PlaceOfMeasurement placeOfMeasurement = placeOfMeasurementService.findById(measurementDto.getMeasurementPlace());
            if (placeOfMeasurement == null)
                return Response.status(400).entity("Measurement place does not exist!").build();
            String image = this.imageService.printDataToImage(measurementDto.getPhoto(), measurementDto.getLargeTariff(), measurementDto.getSmallTariff());
            Measurement newMeasurement = new Measurement(measurementDto.getLargeTariff(),
                    measurementDto.getSmallTariff(), measurementDto.getNote(),
                    image, user, placeOfMeasurement, measurementDto.getLat(), measurementDto.getLon());
            this.measurementRepository.save(newMeasurement);
            return Response.ok().entity("Successfully added new measurement for this place!").build();
        } else {
            return Response.status(400).entity("Measurement for this place already exists!").build();
        }
    }
}

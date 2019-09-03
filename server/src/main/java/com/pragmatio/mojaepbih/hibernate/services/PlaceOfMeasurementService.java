package com.pragmatio.mojaepbih.hibernate.services;

import com.pragmatio.mojaepbih.hibernate.dao.PlaceOfMeasurementDao;
import com.pragmatio.mojaepbih.hibernate.entity.PlaceOfMeasurement;

import java.util.List;

public class PlaceOfMeasurementService {
    private static PlaceOfMeasurementDao placeOfMeasurementDao;

    public PlaceOfMeasurementService() {
        placeOfMeasurementDao = new PlaceOfMeasurementDao();
    }

    public void persist(PlaceOfMeasurement entity) {
        placeOfMeasurementDao.openCurrentSessionwithTransaction();
        placeOfMeasurementDao.persist(entity);
        placeOfMeasurementDao.closeCurrentSessionwithTransaction();
    }

    public void update(PlaceOfMeasurement entity) {
        placeOfMeasurementDao.openCurrentSessionwithTransaction();
        placeOfMeasurementDao.update(entity);
        placeOfMeasurementDao.closeCurrentSessionwithTransaction();
    }

    public PlaceOfMeasurement findById(int id) {
        placeOfMeasurementDao.openCurrentSession();
        PlaceOfMeasurement placeOfMeasurement = placeOfMeasurementDao.findById(id);
        placeOfMeasurementDao.closeCurrentSession();
        return placeOfMeasurement;
    }

    public PlaceOfMeasurement findByReference(String reference){
        placeOfMeasurementDao.openCurrentSession();
        PlaceOfMeasurement placeOfMeasurement = placeOfMeasurementDao.findByReference(reference);
        placeOfMeasurementDao.closeCurrentSession();
        return placeOfMeasurement;
    }

    public List<PlaceOfMeasurement> findAllByUserId(int id){
        placeOfMeasurementDao.openCurrentSession();
        List<PlaceOfMeasurement> placesOfMeasurement = placeOfMeasurementDao.findAllByUserId(id);
        placeOfMeasurementDao.closeCurrentSession();
        return placesOfMeasurement;
    }

    public void delete(int id) {
        placeOfMeasurementDao.openCurrentSessionwithTransaction();
        PlaceOfMeasurement placeOfMeasurement = placeOfMeasurementDao.findById(id);
        placeOfMeasurementDao.delete(placeOfMeasurement);
        placeOfMeasurementDao.closeCurrentSessionwithTransaction();
    }

    public List<PlaceOfMeasurement> findAll() {
        placeOfMeasurementDao.openCurrentSession();
        List<PlaceOfMeasurement> places = placeOfMeasurementDao.findAll();
        placeOfMeasurementDao.closeCurrentSession();
        return places;
    }

    public void deleteAll() {
        placeOfMeasurementDao.openCurrentSessionwithTransaction();
        placeOfMeasurementDao.deleteAll();
        placeOfMeasurementDao.closeCurrentSessionwithTransaction();
    }

    public PlaceOfMeasurementDao userDao() {
        return placeOfMeasurementDao;
    }
}

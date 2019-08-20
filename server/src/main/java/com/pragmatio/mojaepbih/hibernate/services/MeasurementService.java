package com.pragmatio.mojaepbih.hibernate.services;

import com.pragmatio.mojaepbih.hibernate.dao.MeasurementDao;
import com.pragmatio.mojaepbih.hibernate.entity.Measurement;

import java.util.List;

public class MeasurementService {
    private static MeasurementDao measurementDao;

    public MeasurementService() {
        measurementDao = new MeasurementDao();
    }

    public void persist(Measurement entity) {
        measurementDao.openCurrentSessionwithTransaction();
        measurementDao.persist(entity);
        measurementDao.closeCurrentSessionwithTransaction();
    }

    public void update(Measurement entity) {
        measurementDao.openCurrentSessionwithTransaction();
        measurementDao.update(entity);
        measurementDao.closeCurrentSessionwithTransaction();
    }

    public Measurement findById(String id) {
        measurementDao.openCurrentSession();
        Measurement measurement = measurementDao.findById(id);
        measurementDao.closeCurrentSession();
        return measurement;
    }

    public void delete(String id) {
        measurementDao.openCurrentSessionwithTransaction();
        Measurement measurement = measurementDao.findById(id);
        measurementDao.delete(measurement);
        measurementDao.closeCurrentSessionwithTransaction();
    }

    public List<Measurement> findAll() {
        measurementDao.openCurrentSession();
        List<Measurement> places = measurementDao.findAll();
        measurementDao.closeCurrentSession();
        return places;
    }

    public void deleteAll() {
        measurementDao.openCurrentSessionwithTransaction();
        measurementDao.deleteAll();
        measurementDao.closeCurrentSessionwithTransaction();
    }

    public MeasurementDao userDao() {
        return measurementDao;
    }
}

package com.pragmatio.mojaepbih.hibernate.services;

import com.pragmatio.mojaepbih.hibernate.dao.FailureDao;
import com.pragmatio.mojaepbih.hibernate.entity.Failure;

import java.util.List;

public class FailureService {
    private static FailureDao failureDao;

    public FailureService() {
        failureDao = new FailureDao();
    }

    public void persist(Failure entity) {
        failureDao.openCurrentSessionwithTransaction();
        failureDao.persist(entity);
        failureDao.closeCurrentSessionwithTransaction();
    }

    public void update(Failure entity) {
        failureDao.openCurrentSessionwithTransaction();
        failureDao.update(entity);
        failureDao.closeCurrentSessionwithTransaction();
    }

    public Failure findById(String id) {
        failureDao.openCurrentSession();
        Failure measurement = failureDao.findById(id);
        failureDao.closeCurrentSession();
        return measurement;
    }

    public void delete(String id) {
        failureDao.openCurrentSessionwithTransaction();
        Failure failure = failureDao.findById(id);
        failureDao.delete(failure);
        failureDao.closeCurrentSessionwithTransaction();
    }

    public List<Failure> findAll() {
        failureDao.openCurrentSession();
        List<Failure> places = failureDao.findAll();
        failureDao.closeCurrentSession();
        return places;
    }

    public void deleteAll() {
        failureDao.openCurrentSessionwithTransaction();
        failureDao.deleteAll();
        failureDao.closeCurrentSessionwithTransaction();
    }

    public FailureDao failureDao() {
        return failureDao;
    }
}

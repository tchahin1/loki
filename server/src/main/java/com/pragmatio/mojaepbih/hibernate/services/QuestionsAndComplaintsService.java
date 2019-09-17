package com.pragmatio.mojaepbih.hibernate.services;

import com.pragmatio.mojaepbih.hibernate.dao.QuestionsAndComplaintsDao;
import com.pragmatio.mojaepbih.hibernate.entity.QuestionsAndComplaints;

import java.util.List;

public class QuestionsAndComplaintsService {
    private static QuestionsAndComplaintsDao questionsAndComplaintsDao;

    public QuestionsAndComplaintsService() {
        questionsAndComplaintsDao = new QuestionsAndComplaintsDao();
    }

    public void persist(QuestionsAndComplaints entity) {
        questionsAndComplaintsDao.openCurrentSessionwithTransaction();
        questionsAndComplaintsDao.persist(entity);
        questionsAndComplaintsDao.closeCurrentSessionwithTransaction();
    }

    public void update(QuestionsAndComplaints entity) {
        questionsAndComplaintsDao.openCurrentSessionwithTransaction();
        questionsAndComplaintsDao.update(entity);
        questionsAndComplaintsDao.closeCurrentSessionwithTransaction();
    }

    public QuestionsAndComplaints findById(String id) {
        questionsAndComplaintsDao.openCurrentSession();
        QuestionsAndComplaints questionsAndComplaints = questionsAndComplaintsDao.findById(id);
        questionsAndComplaintsDao.closeCurrentSession();
        return questionsAndComplaints;
    }

    public void delete(String id) {
        questionsAndComplaintsDao.openCurrentSessionwithTransaction();
        QuestionsAndComplaints questionsAndComplaints = questionsAndComplaintsDao.findById(id);
        questionsAndComplaintsDao.delete(questionsAndComplaints);
        questionsAndComplaintsDao.closeCurrentSessionwithTransaction();
    }

    public List<QuestionsAndComplaints> findAll() {
        questionsAndComplaintsDao.openCurrentSession();
        List<QuestionsAndComplaints> questionsAndComplaints = questionsAndComplaintsDao.findAll();
        questionsAndComplaintsDao.closeCurrentSession();
        return questionsAndComplaints;
    }

    public void deleteAll() {
        questionsAndComplaintsDao.openCurrentSessionwithTransaction();
        questionsAndComplaintsDao.deleteAll();
        questionsAndComplaintsDao.closeCurrentSessionwithTransaction();
    }

    public QuestionsAndComplaintsDao questionsAndComplaintsDao() {
        return questionsAndComplaintsDao;
    }
}

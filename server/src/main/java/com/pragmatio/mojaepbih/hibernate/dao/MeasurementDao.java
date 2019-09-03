package com.pragmatio.mojaepbih.hibernate.dao;

import com.pragmatio.mojaepbih.hibernate.entity.Measurement;
import com.pragmatio.mojaepbih.hibernate.interfaces.MeasurementDaoInterface;
import com.pragmatio.mojaepbih.util.HibernateUtil;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

import javax.persistence.NoResultException;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.List;

public class MeasurementDao implements MeasurementDaoInterface<Measurement, String> {
    private Session currentSession;

    private Transaction currentTransaction;

    public MeasurementDao() {
    }

    public Session openCurrentSession() {
        currentSession = getSessionFactory().openSession();
        return currentSession;
    }

    public Session openCurrentSessionwithTransaction() {
        currentSession = getSessionFactory().openSession();
        currentTransaction = currentSession.beginTransaction();
        return currentSession;
    }

    public void closeCurrentSession() {
        currentSession.close();
    }

    public void closeCurrentSessionwithTransaction() {
        currentTransaction.commit();
        currentSession.close();
    }

    private static SessionFactory getSessionFactory() {
        return HibernateUtil.getSessionFactory();
    }

    public Session getCurrentSession() {
        return currentSession;
    }

    public void setCurrentSession(Session currentSession) {
        this.currentSession = currentSession;
    }

    public Transaction getCurrentTransaction() {
        return currentTransaction;
    }

    public void setCurrentTransaction(Transaction currentTransaction) {
        this.currentTransaction = currentTransaction;
    }

    public void persist(Measurement entity) {
        getCurrentSession().save(entity);
    }

    public void update(Measurement entity) {
        getCurrentSession().update(entity);
    }

    public Measurement findById(String id) {
        return (Measurement) getCurrentSession().get(Measurement.class, id);
    }

    public Measurement findByPlaceId(int id) {
        try {
            CriteriaBuilder criteriaBuilder = getCurrentSession().getCriteriaBuilder();
            CriteriaQuery<Measurement> criteriaQuery = criteriaBuilder.createQuery(Measurement.class);
            Root<Measurement> measurement = criteriaQuery.from(Measurement.class);
            Predicate predicate = criteriaBuilder.equal(measurement.get("placeOfMeasurement"), id);
            Query query = getCurrentSession().createQuery(criteriaQuery.where(predicate));
            return (Measurement) query.getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }

    public void delete(Measurement entity) {
        getCurrentSession().delete(entity);
    }

    @SuppressWarnings("unchecked")
    public List<Measurement> findAll() {
        return (List<Measurement>) getCurrentSession().createQuery("from Measurement").list();
    }

    public void deleteAll() {
        List<Measurement> entityList = findAll();
        for (Measurement entity : entityList) {
            delete(entity);
        }
    }
}

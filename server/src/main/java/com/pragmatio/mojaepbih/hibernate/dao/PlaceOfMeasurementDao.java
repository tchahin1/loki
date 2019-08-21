package com.pragmatio.mojaepbih.hibernate.dao;

import com.pragmatio.mojaepbih.hibernate.entity.PlaceOfMeasurement;
import com.pragmatio.mojaepbih.hibernate.interfaces.PlaceOfMeasurementDaoInterface;
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

public class PlaceOfMeasurementDao implements PlaceOfMeasurementDaoInterface<PlaceOfMeasurement, Integer> {
    private Session currentSession;

    private Transaction currentTransaction;

    public PlaceOfMeasurementDao() {
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

    public void persist(PlaceOfMeasurement entity) {
        getCurrentSession().save(entity);
    }

    public void update(PlaceOfMeasurement entity) {
        getCurrentSession().update(entity);
    }

    public PlaceOfMeasurement findById(Integer id) {
        return (PlaceOfMeasurement) getCurrentSession().get(PlaceOfMeasurement.class, id);
    }

    public PlaceOfMeasurement findByReference(String reference) {
        try {
            CriteriaBuilder criteriaBuilder = getCurrentSession().getCriteriaBuilder();
            CriteriaQuery<PlaceOfMeasurement> criteriaQuery = criteriaBuilder.createQuery(PlaceOfMeasurement.class);
            Root<PlaceOfMeasurement> placeOfMeasurement = criteriaQuery.from(PlaceOfMeasurement.class);
            Predicate predicate = criteriaBuilder.equal(placeOfMeasurement.get("reference"), reference);
            Query query = getCurrentSession().createQuery(criteriaQuery.where(predicate));
            return (PlaceOfMeasurement) query.getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }

    public void delete(PlaceOfMeasurement entity) {
        getCurrentSession().delete(entity);
    }

    @SuppressWarnings("unchecked")
    public List<PlaceOfMeasurement> findAll() {
        return (List<PlaceOfMeasurement>) getCurrentSession().createQuery("from PlaceOfMeasurement").list();
    }

    public List<PlaceOfMeasurement> findAllByUserId(int id) {
        try {
            CriteriaBuilder criteriaBuilder = getCurrentSession().getCriteriaBuilder();
            CriteriaQuery<PlaceOfMeasurement> criteriaQuery = criteriaBuilder.createQuery(PlaceOfMeasurement.class);
            Root<PlaceOfMeasurement> placeOfMeasurement = criteriaQuery.from(PlaceOfMeasurement.class);
            Predicate predicate = criteriaBuilder.equal(placeOfMeasurement.get("user"), id);
            Query query = getCurrentSession().createQuery(criteriaQuery.where(predicate));
            return (List<PlaceOfMeasurement>) query.getResultList();
        } catch (NoResultException e) {
            return null;
        }
    }

    public void deleteAll() {
        List<PlaceOfMeasurement> entityList = findAll();
        for (PlaceOfMeasurement entity : entityList) {
            delete(entity);
        }
    }
}

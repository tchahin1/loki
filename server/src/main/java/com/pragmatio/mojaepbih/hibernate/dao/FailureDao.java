package com.pragmatio.mojaepbih.hibernate.dao;

import com.pragmatio.mojaepbih.hibernate.entity.Failure;
import com.pragmatio.mojaepbih.hibernate.interfaces.FailureDaoInterface;
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

public class FailureDao implements FailureDaoInterface<Failure, String> {
    private Session currentSession;

    private Transaction currentTransaction;

    public FailureDao() {
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

    public void persist(Failure entity) {
        getCurrentSession().save(entity);
    }

    public void update(Failure entity) {
        getCurrentSession().update(entity);
    }

    public Failure findById(String id) {
        return (Failure) getCurrentSession().get(Failure.class, id);
    }

    public void delete(Failure entity) {
        getCurrentSession().delete(entity);
    }

    @SuppressWarnings("unchecked")
    public List<Failure> findAll() {
        return (List<Failure>) getCurrentSession().createQuery("from Failure").list();
    }

    public void deleteAll() {
        List<Failure> entityList = findAll();
        for (Failure entity : entityList) {
            delete(entity);
        }
    }
}

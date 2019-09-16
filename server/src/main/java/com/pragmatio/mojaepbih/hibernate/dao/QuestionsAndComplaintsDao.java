package com.pragmatio.mojaepbih.hibernate.dao;

import com.pragmatio.mojaepbih.hibernate.entity.QuestionsAndComplaints;
import com.pragmatio.mojaepbih.hibernate.interfaces.QuestionsAndComplaintsDaoInterface;
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

public class QuestionsAndComplaintsDao implements QuestionsAndComplaintsDaoInterface<QuestionsAndComplaints, String> {
    private Session currentSession;

    private Transaction currentTransaction;

    public QuestionsAndComplaintsDao() {
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

    public void persist(QuestionsAndComplaints entity) {
        getCurrentSession().save(entity);
    }

    public void update(QuestionsAndComplaints entity) {
        getCurrentSession().update(entity);
    }

    public QuestionsAndComplaints findById(String id) {
        return (QuestionsAndComplaints) getCurrentSession().get(QuestionsAndComplaints.class, id);
    }

    public void delete(QuestionsAndComplaints entity) {
        getCurrentSession().delete(entity);
    }

    @SuppressWarnings("unchecked")
    public List<QuestionsAndComplaints> findAll() {
        return (List<QuestionsAndComplaints>) getCurrentSession().createQuery("from QuestionsAndComplaints").list();
    }

    public void deleteAll() {
        List<QuestionsAndComplaints> entityList = findAll();
        for (QuestionsAndComplaints entity : entityList) {
            delete(entity);
        }
    }
}

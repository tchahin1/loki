package com.pragmatio.mojaepbih.hibernate.dao;

import com.pragmatio.mojaepbih.hibernate.entity.Customer;
import com.pragmatio.mojaepbih.hibernate.interfaces.CustomerDaoInterface;
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

public class CustomerDao implements CustomerDaoInterface<Customer, Integer> {
    private Session currentSession;

    private Transaction currentTransaction;

    public CustomerDao() {
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

    public void persist(Customer entity) {
        getCurrentSession().save(entity);
    }

    public void update(Customer entity) {
        getCurrentSession().update(entity);
    }

    public Customer findById(Integer id) {
        return (Customer) getCurrentSession().get(Customer.class, id);
    }

    public void delete(Customer entity) {
        getCurrentSession().delete(entity);
    }

    @SuppressWarnings("unchecked")
    public List<Customer> findAll() {
        return (List<Customer>) getCurrentSession().createQuery("from Customer").list();
    }

    public void deleteAll() {
        List<Customer> entityList = findAll();
        for (Customer entity : entityList) {
            delete(entity);
        }
    }
}

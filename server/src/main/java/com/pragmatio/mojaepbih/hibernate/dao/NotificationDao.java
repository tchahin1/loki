package com.pragmatio.mojaepbih.hibernate.dao;

import com.pragmatio.mojaepbih.hibernate.entity.Notification;
import com.pragmatio.mojaepbih.hibernate.interfaces.NotificationDaoInterface;
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

public class NotificationDao implements NotificationDaoInterface<Notification, String> {
    private Session currentSession;

    private Transaction currentTransaction;

    public NotificationDao() {
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

    public void persist(Notification entity) {
        getCurrentSession().save(entity);
    }

    public void update(Notification entity) {
        getCurrentSession().update(entity);
    }

    public Notification findById(String id) {
        return (Notification) getCurrentSession().get(Notification.class, id);
    }

    public Notification findByDeviceToken(String token) {
        try {
            CriteriaBuilder criteriaBuilder = getCurrentSession().getCriteriaBuilder();
            CriteriaQuery<Notification> criteriaQuery = criteriaBuilder.createQuery(Notification.class);
            Root<Notification> notification = criteriaQuery.from(Notification.class);
            Predicate predicate = criteriaBuilder.equal(notification.get("deviceToken"), token);
            Query query = getCurrentSession().createQuery(criteriaQuery.where(predicate));
            return (Notification) query.getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }

    public Notification findByUserId(int id) {
        try {
            CriteriaBuilder criteriaBuilder = getCurrentSession().getCriteriaBuilder();
            CriteriaQuery<Notification> criteriaQuery = criteriaBuilder.createQuery(Notification.class);
            Root<Notification> notification = criteriaQuery.from(Notification.class);
            Predicate predicate = criteriaBuilder.equal(notification.get("user"), id);
            Query query = getCurrentSession().createQuery(criteriaQuery.where(predicate));
            return (Notification) query.getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }

    public void delete(Notification entity) {
        getCurrentSession().delete(entity);
    }

    @SuppressWarnings("unchecked")
    public List<Notification> findAll() {
        return (List<Notification>) getCurrentSession().createQuery("from Notification").list();
    }

    public void deleteAll() {
        List<Notification> entityList = findAll();
        for (Notification entity : entityList) {
            delete(entity);
        }
    }
}

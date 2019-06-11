package com.pragmatio.mojaepbih.hibernate.dao;

import com.pragmatio.mojaepbih.hibernate.entity.User;
import com.pragmatio.mojaepbih.hibernate.interfaces.UserDaoInterface;
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

public class UserDao implements UserDaoInterface<User, String> {
    private Session currentSession;

    private Transaction currentTransaction;

    public UserDao() {
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

    public void persist(User entity) {
        getCurrentSession().save(entity);
    }

    public void update(User entity) {
        getCurrentSession().update(entity);
    }

    public User findById(String id) {
        return (User) getCurrentSession().get(User.class, id);
    }
    public User findByUsername(String username) {
        try {
            CriteriaBuilder criteriaBuilder = getCurrentSession().getCriteriaBuilder();
            CriteriaQuery<User> criteriaQuery = criteriaBuilder.createQuery(User.class);
            Root<User> user = criteriaQuery.from(User.class);
            Predicate predicate = criteriaBuilder.equal(user.get("username"), username);
            Query query = getCurrentSession().createQuery(criteriaQuery.where(predicate));
            return (User) query.getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }


    public void delete(User entity) {
        getCurrentSession().delete(entity);
    }

    @SuppressWarnings("unchecked")
    public List<User> findAll() {
        return (List<User>) getCurrentSession().createQuery("from User").list();
    }

    public void deleteAll() {
        List<User> entityList = findAll();
        for (User entity : entityList) {
            delete(entity);
        }
    }
}

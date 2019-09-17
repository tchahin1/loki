package com.pragmatio.mojaepbih.hibernate.dao;

import com.pragmatio.mojaepbih.hibernate.entity.Subsidiary;
import com.pragmatio.mojaepbih.hibernate.interfaces.SubsidiaryDaoInterface;
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

public class SubsidiaryDao implements SubsidiaryDaoInterface<Subsidiary, Integer> {
    private Session currentSession;

    private Transaction currentTransaction;

    public SubsidiaryDao() {
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

    public void persist(Subsidiary entity) {
        getCurrentSession().save(entity);
    }

    public void update(Subsidiary entity) {
        getCurrentSession().update(entity);
    }

    public Subsidiary findById(Integer id) {
        return (Subsidiary) getCurrentSession().get(Subsidiary.class, id);
    }

    public Subsidiary findBySubsidiaryname(String username) {
        try {
            CriteriaBuilder criteriaBuilder = getCurrentSession().getCriteriaBuilder();
            CriteriaQuery<Subsidiary> criteriaQuery = criteriaBuilder.createQuery(Subsidiary.class);
            Root<Subsidiary> user = criteriaQuery.from(Subsidiary.class);
            Predicate predicate = criteriaBuilder.equal(user.get("username"), username);
            Query query = getCurrentSession().createQuery(criteriaQuery.where(predicate));
            return (Subsidiary) query.getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }


    public void delete(Subsidiary entity) {
        getCurrentSession().delete(entity);
    }

    @SuppressWarnings("unchecked")
    public List<Subsidiary> findAll() {
        return (List<Subsidiary>) getCurrentSession().createQuery("from Subsidiary").list();
    }

    public void deleteAll() {
        List<Subsidiary> entityList = findAll();
        for (Subsidiary entity : entityList) {
            delete(entity);
        }
    }
}

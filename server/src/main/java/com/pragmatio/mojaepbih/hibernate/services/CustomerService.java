package com.pragmatio.mojaepbih.hibernate.services;

import com.pragmatio.mojaepbih.hibernate.dao.CustomerDao;
import com.pragmatio.mojaepbih.hibernate.entity.Customer;

import java.util.List;

public class CustomerService {
    private static CustomerDao customerDao;

    public CustomerService() {
        customerDao = new CustomerDao();
    }

    public void persist(Customer entity) {
        customerDao.openCurrentSessionwithTransaction();
        customerDao.persist(entity);
        customerDao.closeCurrentSessionwithTransaction();
    }

    public void update(Customer entity) {
        customerDao.openCurrentSessionwithTransaction();
        customerDao.update(entity);
        customerDao.closeCurrentSessionwithTransaction();
    }

    public Customer findById(Integer id) {
        customerDao.openCurrentSession();
        Customer customer = customerDao.findById(id);
        customerDao.closeCurrentSession();
        return customer;
    }

    public void delete(Integer id) {
        customerDao.openCurrentSessionwithTransaction();
        Customer customer = customerDao.findById(id);
        customerDao.delete(customer);
        customerDao.closeCurrentSessionwithTransaction();
    }

    public List<Customer> findAll() {
        customerDao.openCurrentSession();
        List<Customer> customers = customerDao.findAll();
        customerDao.closeCurrentSession();
        return customers;
    }

    public void deleteAll() {
        customerDao.openCurrentSessionwithTransaction();
        customerDao.deleteAll();
        customerDao.closeCurrentSessionwithTransaction();
    }

    public CustomerDao customerDao() {
        return customerDao;
    }
}

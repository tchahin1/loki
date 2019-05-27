package com.pragmatio.mojaepbih.hibernate.services;

import com.pragmatio.mojaepbih.hibernate.dao.UserDao;
import com.pragmatio.mojaepbih.hibernate.entity.User;

import java.util.List;

public class UserService {
    private static UserDao userDao;

    public UserService() {
        userDao = new UserDao();
    }

    public void persist(User entity) {
        userDao.openCurrentSessionwithTransaction();
        userDao.persist(entity);
        userDao.closeCurrentSessionwithTransaction();
    }

    public void update(User entity) {
        userDao.openCurrentSessionwithTransaction();
        userDao.update(entity);
        userDao.closeCurrentSessionwithTransaction();
    }

    public User findById(String id) {
        userDao.openCurrentSession();
        User User = userDao.findById(id);
        userDao.closeCurrentSession();
        return User;
    }

    public User findByUsername(String username) {
        userDao.openCurrentSession();
        User User = userDao.findByUsername(username);
        userDao.closeCurrentSession();
        return User;
    }

    public void delete(String id) {
        userDao.openCurrentSessionwithTransaction();
        User User = userDao.findById(id);
        userDao.delete(User);
        userDao.closeCurrentSessionwithTransaction();
    }

    public List<User> findAll() {
        userDao.openCurrentSession();
        List<User> Users = userDao.findAll();
        userDao.closeCurrentSession();
        return Users;
    }

    public void deleteAll() {
        userDao.openCurrentSessionwithTransaction();
        userDao.deleteAll();
        userDao.closeCurrentSessionwithTransaction();
    }

    public UserDao userDao() {
        return userDao;
    }
}

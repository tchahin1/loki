package com.pragmatio.mojaepbih.hibernate.services;

import com.pragmatio.mojaepbih.hibernate.dao.NotificationDao;
import com.pragmatio.mojaepbih.hibernate.entity.Notification;

import java.util.List;

public class NotificationService {
    private static NotificationDao notificationDao;

    public NotificationService() {
        notificationDao = new NotificationDao();
    }

    public void persist(Notification entity) {
        notificationDao.openCurrentSessionwithTransaction();
        notificationDao.persist(entity);
        notificationDao.closeCurrentSessionwithTransaction();
    }

    public void update(Notification entity) {
        notificationDao.openCurrentSessionwithTransaction();
        notificationDao.update(entity);
        notificationDao.closeCurrentSessionwithTransaction();
    }

    public Notification findById(String id) {
        notificationDao.openCurrentSession();
        Notification notification = notificationDao.findById(id);
        notificationDao.closeCurrentSession();
        return notification;
    }

    public Notification findByDeviceToken(String token) {
        notificationDao().openCurrentSession();
        Notification notification = notificationDao().findByDeviceToken(token);
        notificationDao().closeCurrentSession();
        return notification;
    }

    public Notification findByUserId(int id) {
        notificationDao().openCurrentSession();
        Notification notification = notificationDao().findByUserId(id);
        notificationDao().closeCurrentSession();
        return notification;
    }

    public void delete(String id) {
        notificationDao.openCurrentSessionwithTransaction();
        Notification notification = notificationDao.findById(id);
        notificationDao.delete(notification);
        notificationDao.closeCurrentSessionwithTransaction();
    }

    public List<Notification> findAll() {
        notificationDao.openCurrentSession();
        List<Notification> places = notificationDao.findAll();
        notificationDao.closeCurrentSession();
        return places;
    }

    public void deleteAll() {
        notificationDao.openCurrentSessionwithTransaction();
        notificationDao.deleteAll();
        notificationDao.closeCurrentSessionwithTransaction();
    }

    public NotificationDao notificationDao() {
        return notificationDao;
    }
}

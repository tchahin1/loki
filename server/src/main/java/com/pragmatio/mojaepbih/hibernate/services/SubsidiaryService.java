package com.pragmatio.mojaepbih.hibernate.services;

import com.pragmatio.mojaepbih.hibernate.dao.SubsidiaryDao;
import com.pragmatio.mojaepbih.hibernate.entity.Subsidiary;

import java.util.List;

public class SubsidiaryService {
    private static SubsidiaryDao subsidiaryDao;

    public SubsidiaryService() {
        subsidiaryDao = new SubsidiaryDao();
    }

    public void persist(Subsidiary entity) {
        subsidiaryDao.openCurrentSessionwithTransaction();
        subsidiaryDao.persist(entity);
        subsidiaryDao.closeCurrentSessionwithTransaction();
    }

    public void update(Subsidiary entity) {
        subsidiaryDao.openCurrentSessionwithTransaction();
        subsidiaryDao.update(entity);
        subsidiaryDao.closeCurrentSessionwithTransaction();
    }

    public Subsidiary findById(Integer id) {
        subsidiaryDao.openCurrentSession();
        Subsidiary subsidiary = subsidiaryDao.findById(id);
        subsidiaryDao.closeCurrentSession();
        return subsidiary;
    }

    public void delete(Integer id) {
        subsidiaryDao.openCurrentSessionwithTransaction();
        Subsidiary subsidiary = subsidiaryDao.findById(id);
        subsidiaryDao.delete(subsidiary);
        subsidiaryDao.closeCurrentSessionwithTransaction();
    }

    public List<Subsidiary> findAll() {
        subsidiaryDao.openCurrentSession();
        List<Subsidiary> subsidiaries = subsidiaryDao.findAll();
        subsidiaryDao.closeCurrentSession();
        return subsidiaries;
    }

    public void deleteAll() {
        subsidiaryDao.openCurrentSessionwithTransaction();
        subsidiaryDao.deleteAll();
        subsidiaryDao.closeCurrentSessionwithTransaction();
    }

    public SubsidiaryDao subsidiaryDao() {
        return subsidiaryDao;
    }
}

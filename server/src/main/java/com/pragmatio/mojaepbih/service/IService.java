package com.pragmatio.mojaepbih.service;

import java.util.List;

public interface IService<T> {
    T save(T entity);

    T findById(Long id);

    List<T> findAll();

    void deleteById(Long id);

    void deleteAll();
}

package com.pragmatio.mojaepbih.service.impl;

import com.pragmatio.mojaepbih.model.entity.Subsidiary;
import com.pragmatio.mojaepbih.repository.SubsidiaryRepository;
import com.pragmatio.mojaepbih.service.SubsidiaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubsidiaryServiceImpl implements SubsidiaryService {

    private final SubsidiaryRepository subsidiaryRepository;

    @Autowired
    public SubsidiaryServiceImpl(SubsidiaryRepository subsidiaryRepository) {
        this.subsidiaryRepository = subsidiaryRepository;
    }

    @Override
    public Subsidiary save(Subsidiary subsidiary) {
        return subsidiaryRepository.save(subsidiary);
    }

    @Override
    public Subsidiary findById(Long id) {
        return subsidiaryRepository.getOne(id);
    }

    @Override
    public List<Subsidiary> findAll() {
        return subsidiaryRepository.findAll();
    }

    @Override
    public void deleteAll() {
        subsidiaryRepository.deleteAll();
    }

    @Override
    public void deleteById(Long id) {
        subsidiaryRepository.deleteById(id);
    }

}

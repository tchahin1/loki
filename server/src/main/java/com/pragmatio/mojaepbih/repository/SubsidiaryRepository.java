package com.pragmatio.mojaepbih.repository;

import com.pragmatio.mojaepbih.model.entity.Subsidiary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubsidiaryRepository extends JpaRepository<Subsidiary, Long> {

}

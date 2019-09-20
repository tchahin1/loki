package com.pragmatio.mojaepbih.repository;

import com.pragmatio.mojaepbih.model.entity.Failure;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FailureRepository extends JpaRepository<Failure, Long> {

}

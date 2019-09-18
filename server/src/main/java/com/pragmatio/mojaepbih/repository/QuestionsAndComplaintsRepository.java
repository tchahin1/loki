package com.pragmatio.mojaepbih.repository;

import com.pragmatio.mojaepbih.model.entity.QuestionsAndComplaints;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionsAndComplaintsRepository extends JpaRepository<QuestionsAndComplaints, Long> {

}

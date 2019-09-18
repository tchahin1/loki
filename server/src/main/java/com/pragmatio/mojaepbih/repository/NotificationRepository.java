package com.pragmatio.mojaepbih.repository;

import com.pragmatio.mojaepbih.model.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {

    Notification findByDeviceToken(String deviceToken);

    Notification findByUserId(Long userId);

}

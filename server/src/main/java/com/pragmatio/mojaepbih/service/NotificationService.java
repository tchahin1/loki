package com.pragmatio.mojaepbih.service;

import com.pragmatio.mojaepbih.model.UserNotificationDto;
import com.pragmatio.mojaepbih.model.entity.Notification;

import javax.ws.rs.core.Response;

public interface NotificationService extends IService<Notification> {
    Notification findByDeviceToken(String deviceToken);

    Notification findByUserId(Long userId);

    Response pushUserWithToken(UserNotificationDto userNotificationDto);
}

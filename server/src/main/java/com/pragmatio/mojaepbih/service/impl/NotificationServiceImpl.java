package com.pragmatio.mojaepbih.service.impl;

import com.pragmatio.mojaepbih.model.UserNotificationDto;
import com.pragmatio.mojaepbih.model.entity.Notification;
import com.pragmatio.mojaepbih.model.entity.User;
import com.pragmatio.mojaepbih.repository.NotificationRepository;
import com.pragmatio.mojaepbih.repository.UserRepository;
import com.pragmatio.mojaepbih.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.ws.rs.core.Response;
import java.util.List;

@Service
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    @Autowired
    private GCMServiceImpl gcmService;

    @Autowired
    public NotificationServiceImpl(NotificationRepository notificationRepository, UserRepository userRepository) {
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Notification save(Notification notification) {
        return notificationRepository.save(notification);
    }

    @Override
    public Notification findById(Long id) {
        return notificationRepository.getOne(id);
    }

    @Override
    public List<Notification> findAll() {
        return notificationRepository.findAll();
    }

    @Override
    public void deleteAll() {
        notificationRepository.deleteAll();
    }

    @Override
    public void deleteById(Long id) {
        notificationRepository.deleteById(id);
    }


    @Override
    public Notification findByDeviceToken(String deviceToken) {
        return notificationRepository.findByDeviceToken(deviceToken);
    }

    @Override
    public Notification findByUserId(Long userId) {
        return notificationRepository.findByUserId(userId);
    }

    @Override
    public ResponseEntity pushUserWithToken(UserNotificationDto userNotificationDto) {
        Notification alreadyInDb = null;
        if (!(userNotificationDto.getToken().equals("")))
            alreadyInDb = this.findByDeviceToken(userNotificationDto.getToken());
        if (alreadyInDb == null) {
            User user = userRepository.findByEmail(userNotificationDto.getEmail());
            if (user == null) return ResponseEntity.status(400).body("User does not exist!");
            String existingToken = this.gcmService.getDeviceTokenFromEmail(user.getEmail());
            if (!(existingToken.equals("")) && !(existingToken.equals(userNotificationDto.getToken()))) {
                Notification notification = findByUserId(user.getId());
                notification.setDeviceToken(userNotificationDto.getToken());
                save(notification);
            } else {
                Notification newNotification = new Notification(userNotificationDto.getToken(),
                        user);
                save(newNotification);
            }
            return ResponseEntity.ok().body("Successfully added new notification for user!");
        } else {
            return ResponseEntity.status(400).body("Something went wrong!");
        }
    }
}

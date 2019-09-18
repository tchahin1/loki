package com.pragmatio.mojaepbih.controller;

import com.pragmatio.mojaepbih.model.SendNotificationDto;
import com.pragmatio.mojaepbih.model.UserNotificationDto;
import com.pragmatio.mojaepbih.service.impl.GCMServiceImpl;
import com.pragmatio.mojaepbih.service.impl.NotificationServiceImpl;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.IOException;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/notifications")
public class NotificationsController {

    @Autowired
    private NotificationServiceImpl notificationService;

    @Autowired
    private GCMServiceImpl gcmService;

    @PostMapping("/send_notification")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response sendNotification(SendNotificationDto sendNotificationDto) throws IOException, JSONException {
        return this.gcmService.sendNotificationToUser(sendNotificationDto);
    }

    @PostMapping("/push_user")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response pushUser(UserNotificationDto userNotificationDto) {
        return this.notificationService.pushUserWithToken(userNotificationDto);
    }
}

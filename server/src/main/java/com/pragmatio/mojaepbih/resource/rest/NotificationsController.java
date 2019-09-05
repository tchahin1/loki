package com.pragmatio.mojaepbih.resource.rest;

import com.pragmatio.mojaepbih.hibernate.entity.Notification;
import com.pragmatio.mojaepbih.hibernate.entity.User;
import com.pragmatio.mojaepbih.hibernate.services.NotificationService;
import com.pragmatio.mojaepbih.hibernate.services.UserService;
import com.pragmatio.mojaepbih.resource.controllerServices.GCMService;
import com.pragmatio.mojaepbih.resource.dtos.SendNotificationDto;
import com.pragmatio.mojaepbih.resource.dtos.UserNotificationDto;
import org.json.JSONException;
import org.json.JSONObject;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;

@Path("/notifications")
public class NotificationsController {
    NotificationService notificationService = new NotificationService();
    UserService userService = new UserService();
    GCMService gcmService = new GCMService(notificationService, userService);

    @POST
    @Path(value = "/send_notification")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response sendNotification(SendNotificationDto sendNotificationDto) throws IOException, JSONException {
        return this.gcmService.sendNotificationToUser(sendNotificationDto);
    }

    @POST
    @Path(value = "/push_user")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response pushUser(UserNotificationDto userNotificationDto) {
        return this.pushUserWithToken(userNotificationDto);
    }

    Response pushUserWithToken(UserNotificationDto userNotificationDto) {
        Notification alreadyInDb = null;
        if(!(userNotificationDto.getToken().equals(""))) alreadyInDb = this.notificationService.findByDeviceToken(userNotificationDto.getToken());
        if(alreadyInDb == null) {
            User user = userService.findByUsername(userNotificationDto.getUsername());
            if(user == null) return Response.status(400).entity("User does not exist!").build();
            Notification newNotification = new Notification(userNotificationDto.getToken(),
                    user);
            this.notificationService.persist(newNotification);
            return Response.ok().entity("Successfully added new notification for user!").build();
        } else {
            return Response.status(400).entity("Something went wrong!").build();
        }
    }
}

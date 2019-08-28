package com.pragmatio.mojaepbih.resource.rest;

import com.pragmatio.mojaepbih.hibernate.entity.Notification;
import com.pragmatio.mojaepbih.hibernate.entity.User;
import com.pragmatio.mojaepbih.hibernate.services.NotificationService;
import com.pragmatio.mojaepbih.hibernate.services.UserService;
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

    @POST
    @Path(value = "/send_notification")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response sendNotification(SendNotificationDto sendNotificationDto) throws IOException, JSONException {
        return this.sendNotificationToUser(sendNotificationDto);
    }

    Response sendNotificationToUser(SendNotificationDto sendNotificationDto) throws IOException, JSONException {
        final String API_URL = "https://exp.host/--/api/v2/push/send";

        String result = "";
        URL url = new URL(API_URL);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();

        conn.setUseCaches(false);
        conn.setDoInput(true);
        conn.setDoOutput(true);

        conn.setRequestMethod("POST");
        conn.setRequestProperty("Content-Type", "application/json");
        conn.setRequestProperty("Accept", "application/json");
        conn.setRequestProperty("Accept-Encoding", "application/gzip");
        conn.setRequestProperty("Host", "exp.host");

        JSONObject json = new JSONObject();

        String token = this.getDeviceTokenFromUsername(sendNotificationDto.getUsername());

        json.put("to", token.trim());
        json.put("title", "ŠOKANTNO!!!"); // Notification title
        json.put("body", "Osvojili ste milion maraka xD"); // Notification
        json.put("sound", "default");
        try {
            OutputStreamWriter wr = new OutputStreamWriter(conn.getOutputStream());
            wr.write(json.toString());
            wr.flush();

            BufferedReader br = new BufferedReader(new InputStreamReader(
                    (conn.getInputStream())));

            String output;
            System.out.println("Output from Server .... \n");
            while ((output = br.readLine()) != null) {
                System.out.println(output);
            }
            result = "OK";
        } catch (Exception e) {
            e.printStackTrace();
            result = "NOT OKAY";
        }
        System.out.println("GCM Notification is sent successfully");

        if(result.equals("OK")) return Response.ok().entity("").build();
        else return Response.status(400).entity("Something went wrong!").build();
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

    private String getDeviceTokenFromUsername(String username){
        String token = "";
        User user = userService.findByUsername(username);
        if(user != null) {
            Notification notification = notificationService.findByUserId(user.getId());
            if(notification != null) token = notification.getDeviceToken();
        }
        return token;
    }
}
package com.pragmatio.mojaepbih.service.impl;

import com.pragmatio.mojaepbih.model.SendNotificationDto;
import com.pragmatio.mojaepbih.model.entity.Notification;
import com.pragmatio.mojaepbih.model.entity.User;
import com.pragmatio.mojaepbih.repository.NotificationRepository;
import com.pragmatio.mojaepbih.repository.UserRepository;
import com.pragmatio.mojaepbih.service.GCMService;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.ws.rs.core.Response;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;

@Service
public class GCMServiceImpl implements GCMService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    @Autowired
    public GCMServiceImpl(NotificationRepository notificationRepository, UserRepository userRepository) {
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Response sendNotificationToUser(SendNotificationDto sendNotificationDto) throws IOException, JSONException {
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

        String token = this.getDeviceTokenFromEmail(sendNotificationDto.getEmail());

        json.put("to", token.trim());
        json.put("title", "test"); // Notification title
        json.put("body", "test"); // Notification
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

    @Override
    public String getDeviceTokenFromEmail(String email){
        String token = "";
        User user = userRepository.findByEmail(email);
        if(user != null) {
            Notification notification = notificationRepository.findByUserId(user.getId());
            if(notification != null) token = notification.getDeviceToken();
        }
        return token;
    }
}

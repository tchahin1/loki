package com.pragmatio.mojaepbih.service;

import com.pragmatio.mojaepbih.model.SendNotificationDto;

import javax.ws.rs.core.Response;
import java.io.IOException;
import org.json.JSONException;
import org.springframework.http.ResponseEntity;

public interface GCMService {
    ResponseEntity sendNotificationToUser(SendNotificationDto sendNotificationDto) throws IOException, JSONException;

    String getDeviceTokenFromEmail(String email);
}

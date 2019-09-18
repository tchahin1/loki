package com.pragmatio.mojaepbih.service;

import com.pragmatio.mojaepbih.model.SendNotificationDto;

import javax.ws.rs.core.Response;
import java.io.IOException;
import org.json.JSONException;

public interface GCMService {
    Response sendNotificationToUser(SendNotificationDto sendNotificationDto) throws IOException, JSONException;

    String getDeviceTokenFromUsername(String username);
}

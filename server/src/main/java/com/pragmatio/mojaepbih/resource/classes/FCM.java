package com.pragmatio.mojaepbih.resource.classes;

import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;

public class FCM {
    // Method to send Notifications from server to client end.
    public final static String SERVER_KEY_FCM = "Here write you FCM Server Key";
    public final static String API_URL_FCM = "https://exp.host/--/api/v2/push/send";
    public final static String DEVICE_TOKEN="here write your device token";

    public static void main(String[] args) throws Exception {
        // TODO Auto-generated method stub
        pushFCMNotification(DEVICE_TOKEN);

    }

    public static void pushFCMNotification(String DeviceIdKey) throws Exception {

        URL url = new URL(API_URL_FCM);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();

        conn.setUseCaches(false);
        conn.setDoInput(true);
        conn.setDoOutput(true);
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Authorization", "key=" + SERVER_KEY_FCM);
        conn.setRequestProperty("Content-Type", "application/json");
        JSONObject data = new JSONObject();
        data.put("to", DeviceIdKey.trim());
        JSONObject info = new JSONObject();
        info.put("title", "This test message from java"); // Notification title
        info.put("body", "Hello First Test notification"); // Notification body
        data.put("notification", info);
        System.out.println(data.toString());
        OutputStreamWriter wr = new OutputStreamWriter(conn.getOutputStream());
        wr.write(data.toString());
        wr.flush();
        wr.close();
        int responseCode = conn.getResponseCode();
        System.out.println("Response Code : " + responseCode);

        BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        String inputLine;
        StringBuffer response = new StringBuffer();

        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();
    }
}

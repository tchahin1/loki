package com.pragmatio.mojaepbih.resource.controllerServices;

import com.pragmatio.mojaepbih.hibernate.entity.Measurement;
import com.pragmatio.mojaepbih.hibernate.entity.PlaceOfMeasurement;
import com.pragmatio.mojaepbih.hibernate.entity.User;
import com.pragmatio.mojaepbih.hibernate.services.MeasurementService;
import com.pragmatio.mojaepbih.hibernate.services.PlaceOfMeasurementService;
import com.pragmatio.mojaepbih.hibernate.services.UserService;
import com.pragmatio.mojaepbih.resource.dtos.MeasurementDto;

import javax.imageio.ImageIO;
import javax.ws.rs.core.Response;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.util.Base64;
import java.util.zip.DeflaterOutputStream;
import java.util.zip.InflaterOutputStream;

public class ImageService {
    public String printDataToImage(String data, String largeTariff, String smallTariff) {
        BufferedImage image = null;

        try {
            String base64Image = data;
            byte[] imageBytes = javax.xml.bind.DatatypeConverter.parseBase64Binary(base64Image);
            image = ImageIO.read(new ByteArrayInputStream(imageBytes));

            Graphics g = image.getGraphics();
            g.setFont(g.getFont().deriveFont(150f));
            g.setColor(new Color(0,0,0));
            g.fillRect(0,0, 2000, 450);
            g.setColor(new Color(255,255,255));
            g.drawString("Large Tariff: " + largeTariff, 100, 150);
            g.drawString( "Small Tariff: " + smallTariff, 100, 400);
            g.dispose();

            ImageIO.write(image, "jpg", new File("test.jpg"));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return encodeImageToString(image, "jpg");
    }

    private static String encodeImageToString(BufferedImage image, String type) {
        String imageString = null;
        ByteArrayOutputStream bos = new ByteArrayOutputStream();

        try {
            ImageIO.write(image, type, bos);
            byte[] imageBytes = bos.toByteArray();
            byte[] compressedImageBytes = compress(imageBytes);
            imageString = Base64.getEncoder().encodeToString(compressedImageBytes);
            bos.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return imageString;
    }

    private static BufferedImage decodeStringToImage(String imageString) {
        BufferedImage image = null;
        byte[] imageByte;
        try {
            imageByte = Base64.getDecoder().decode(imageString);
            byte[] decompressedImageBytes = decompress(imageByte);
            ByteArrayInputStream bis = new ByteArrayInputStream(decompressedImageBytes);
            image = ImageIO.read(bis);
            bis.close();

            ImageIO.write(image, "jpg", new File("decodedImage.jpg"));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    private static byte[] compress(byte[] in) {
        try {
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            DeflaterOutputStream defl = new DeflaterOutputStream(out);
            defl.write(in);
            defl.flush();
            defl.close();

            return out.toByteArray();
        } catch (Exception e) {
            e.printStackTrace();
            System.exit(150);
            return null;
        }
    }

    private static byte[] decompress(byte[] in) {
        try {
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            InflaterOutputStream infl = new InflaterOutputStream(out);
            infl.write(in);
            infl.flush();
            infl.close();

            return out.toByteArray();
        } catch (Exception e) {
            e.printStackTrace();
            System.exit(150);
            return null;
        }
    }
}

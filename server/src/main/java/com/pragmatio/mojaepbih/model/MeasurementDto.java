package com.pragmatio.mojaepbih.model;

import lombok.Data;

@Data
public class MeasurementDto {
    private String largeTariff;
    private String smallTariff;
    private String photo;
    private String note;
    private String email;
    private Long measurementPlace;
    Double lat;
    Double lon;
}

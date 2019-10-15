package com.pragmatio.mojaepbih.model;

import lombok.Data;

@Data
public class ConsumptionDto {
    private String date;
    private String highTariff;
    private String lowTariff;
    private String email;
    private Long placeOfMeasurement;
}

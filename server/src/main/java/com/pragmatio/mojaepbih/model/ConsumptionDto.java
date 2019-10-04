package com.pragmatio.mojaepbih.model;

import lombok.Data;

@Data
public class ConsumptionDto {
    private Integer year;
    private Integer month;
    private String highTariff;
    private String lowTariff;
    private String email;
}

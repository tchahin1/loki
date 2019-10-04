package com.pragmatio.mojaepbih.model;

import lombok.Data;

@Data
public class GetConsumptionDto {
    String email;
    Long placeId;
    Integer year;

    public GetConsumptionDto(String email, Long placeId, Integer year) {
        this.email = email;
        this.placeId = placeId;
        this.year = year;
    }
}

package com.pragmatio.mojaepbih.resource.dtos;

import com.pragmatio.mojaepbih.hibernate.entity.PlaceOfMeasurement;

public class PlaceOfMeasurementDto {
    private String name;
    private String reference;
    private Integer placeNumber;
    private String username;

    public PlaceOfMeasurementDto() {

    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getReference() {
        return reference;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public Integer getPlaceNumber() {
        return placeNumber;
    }

    public void setPlaceNumber(Integer placeNumber) {
        this.placeNumber = placeNumber;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}

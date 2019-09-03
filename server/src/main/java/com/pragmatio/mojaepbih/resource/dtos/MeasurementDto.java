package com.pragmatio.mojaepbih.resource.dtos;

public class MeasurementDto {
    private String largeTariff;
    private String smallTariff;
    private String photo;
    private String note;
    private String username;
    private int measurementPlace;

    public String getLargeTariff() {
        return largeTariff;
    }

    public void setLargeTariff(String largeTariff) {
        this.largeTariff = largeTariff;
    }

    public String getSmallTariff() {
        return smallTariff;
    }

    public void setSmallTariff(String smallTariff) {
        this.smallTariff = smallTariff;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getMeasurementPlace() {
        return measurementPlace;
    }

    public void setMeasurementPlace(int measurementPlace) {
        this.measurementPlace = measurementPlace;
    }
}

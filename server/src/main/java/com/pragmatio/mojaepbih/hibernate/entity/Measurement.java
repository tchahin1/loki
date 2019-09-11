package com.pragmatio.mojaepbih.hibernate.entity;

import javax.persistence.*;

@Entity
@Table(name = "measurement")
public class Measurement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "highTariff")
    private String highTariff;

    @Column(name = "lowTariff")
    private String lowTariff;

    @Column(name = "note")
    private String note;

    @Column(name = "latitude")
    private Double lat;

    @Column(name = "longitude")
    private Double lon;

    @Lob
    @Column(name = "photo")
    private String photo;

    @ManyToOne
    private User user;

    @OneToOne
    private PlaceOfMeasurement placeOfMeasurement;

    public Measurement() {
    }

    public Measurement(String highTariff, String lowTariff, String note, String photo, User user, PlaceOfMeasurement placeOfMeasurement,
                        Double lat, Double lon) {
        this.setHighTariff(highTariff);
        this.setLowTariff(lowTariff);
        this.setNote(note);
        this.setPhoto(photo);
        this.setUser(user);
        this.setPlaceOfMeasurement(placeOfMeasurement);
        this.setLat(lat);
        this.setLon(lon);
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getHighTariff() {
        return highTariff;
    }

    public void setHighTariff(String highTariff) {
        this.highTariff = highTariff;
    }

    public String getLowTariff() {
        return lowTariff;
    }

    public void setLowTariff(String lowTariff) {
        this.lowTariff = lowTariff;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public PlaceOfMeasurement getPlaceOfMeasurement() {
        return placeOfMeasurement;
    }

    public void setPlaceOfMeasurement(PlaceOfMeasurement placeOfMeasurement) {
        this.placeOfMeasurement = placeOfMeasurement;
    }

    public Double getLat() {
        return lat;
    }

    public void setLat(Double lat) {
        this.lat = lat;
    }

    public Double getLon() {
        return lon;
    }

    public void setLon(Double lon) {
        this.lon = lon;
    }
}

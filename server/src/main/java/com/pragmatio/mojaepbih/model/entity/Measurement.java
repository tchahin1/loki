package com.pragmatio.mojaepbih.model.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@Entity
@Table(name = "measurement")
public class Measurement {

    public Measurement(String highTariff, String lowTariff, String note, String date, String photo, User user, PlaceOfMeasurement placeOfMeasurement,
                       Double lat, Double lon, Boolean granted) {
        this.setHighTariff(highTariff);
        this.setLowTariff(lowTariff);
        this.setNote(note);
        this.setPhoto(photo);
        this.setUser(user);
        this.setPlaceOfMeasurement(placeOfMeasurement);
        this.setLat(lat);
        this.setLon(lon);
        this.date = date;
        this.granted = granted;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "high_tariff")
    private String highTariff;

    @Column(name = "low_tariff")
    private String lowTariff;

    @Column(name = "note")
    private String note;

    @Column(name = "latitude")
    private Double lat;

    @Column(name = "longitude")
    private Double lon;

    @Column(name = "date")
    private String date;

    @Column(name = "granted")
    private Boolean granted;

    @Lob
    @Column(name = "photo")
    private String photo;

    @ManyToOne
    private User user;

    @OneToOne
    private PlaceOfMeasurement placeOfMeasurement;
}

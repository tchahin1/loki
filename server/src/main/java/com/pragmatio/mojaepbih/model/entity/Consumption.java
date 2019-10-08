package com.pragmatio.mojaepbih.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@Entity
@Table(name = "consumption")
public class Consumption {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "year")
    private Integer year;

    @Column(name = "month")
    private Integer month;

    @Column(name = "day")
    private Integer day;

    @Column(name = "high_tariff")
    private String highTariff;

    @Column(name = "low_tariff")
    private String lowTariff;

    @ManyToOne
    private User user;

    @ManyToOne
    @JsonIgnore
    private PlaceOfMeasurement placeOfMeasurement;

    public Consumption(Integer year, Integer month, Integer day, String highTariff, String lowTariff, User user, PlaceOfMeasurement placeOfMeasurement) {
        this.year = year;
        this.month = month;
        this.day = day;
        this.highTariff = highTariff;
        this.lowTariff = lowTariff;
        this.user = user;
        this.placeOfMeasurement = placeOfMeasurement;
    }
}

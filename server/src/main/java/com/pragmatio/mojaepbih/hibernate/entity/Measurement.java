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

    public Measurement() {
    }

    public Measurement(String highTariff) {
        this.setHighTariff(highTariff);
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
}

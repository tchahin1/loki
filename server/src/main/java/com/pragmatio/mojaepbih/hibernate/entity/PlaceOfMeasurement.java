package com.pragmatio.mojaepbih.hibernate.entity;

import javax.persistence.*;

@Entity
@Table(name = "place_of_measurement")
public class PlaceOfMeasurement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "references")
    private Integer references;

    public PlaceOfMeasurement(String name, Integer references, Integer numberOfMeasurement) {
        this.name = name;
        this.references = references;
        this.numberOfMeasurement = numberOfMeasurement;
    }

    public String getName() {
        return name;
    }

    public Integer getReferences() {
        return references;
    }

    public Integer getNumberOfMeasurement() {
        return numberOfMeasurement;
    }

    private Integer numberOfMeasurement;

    public void setName(String name) {
        this.name = name;
    }

    public void setReferences(Integer references) {
        this.references = references;
    }

    public void setNumberOfMeasurement(Integer numberOfMeasurement) {
        this.numberOfMeasurement = numberOfMeasurement;
    }
}

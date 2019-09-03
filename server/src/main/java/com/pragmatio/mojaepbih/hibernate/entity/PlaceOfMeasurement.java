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

    @Column(name = "reference")
    private String reference;

    @Column(name = "place_number")
    private Integer numberOfMeasurement;

    @ManyToOne
    private User user;

    public PlaceOfMeasurement() {
    }

    public PlaceOfMeasurement(String name, String reference, Integer numberOfMeasurement, User user) {
        this.setName(name);
        this.setReference(reference);
        this.setNumberOfMeasurement(numberOfMeasurement);
        this.setUser(user);
    }

    public String getName() {
        return name;
    }

    public String getReference() {
        return reference;
    }

    public Integer getNumberOfMeasurement() {
        return numberOfMeasurement;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public void setNumberOfMeasurement(Integer numberOfMeasurement) {
        this.numberOfMeasurement = numberOfMeasurement;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}

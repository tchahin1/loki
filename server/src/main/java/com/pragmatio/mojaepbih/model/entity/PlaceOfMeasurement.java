package com.pragmatio.mojaepbih.model.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Data
@NoArgsConstructor
@Entity
@Table(name = "place_of_measurement")
public class PlaceOfMeasurement implements Serializable {

    public PlaceOfMeasurement(String name, String reference, Integer numberOfMeasurement, User user) {
        super();
        this.setName(name);
        this.setReference(reference);
        this.setNumberOfMeasurement(numberOfMeasurement);
        this.setUser(user);
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "reference")
    private String reference;

    @Column(name = "place_number")
    private Integer numberOfMeasurement;

    @ManyToOne
    private User user;
}
